import React, { useState, useEffect, useRef } from 'react';
import { chatScenarios } from '../data/chatScenarios';
import { detectEmergency } from '../data/emergencyKeywords';
import '../styles/chat-assistant.css';

export default function ChatAssistant({ open, onToggle, onPageChange }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Привет! Я ИИ-консультант по вопросам ЖКХ. Помогу разобраться в тарифах, оформить документы и защитить ваши права.',
      options: [
        { label: 'Проверить начисления', value: 'check' },
        { label: 'Подать жалобу', value: 'complaint' },
        { label: 'Задать вопрос', value: 'question' },
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const getBotResponse = (optionValue) => {
    return chatScenarios[optionValue] || chatScenarios['start'];
  };

  const handleRedirect = (redirect) => {
    if (!redirect || !onPageChange) return;
    
    onPageChange(redirect.page, redirect.subsection || null);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowOptions(false);

    const emergency = detectEmergency(input);
    
    setLoading(true);
    setTimeout(() => {
      let botMessage;
      
      if (emergency.isEmergency && emergency.type === 'water') {
        const scenario = getBotResponse('emergency_water_start');
        botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          text: `${emergency.title}\n\n${scenario.text}`,
          options: scenario.options,
          scenarioStep: 'emergency_water_start'
        };
      } else {
        const response = getBotResponse('default');
        botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          text: response.text,
          options: response.options
        };
      }
      
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
      setShowOptions(true);
    }, 600);
  };

  const handleOptionClick = (option) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: option.label,
      isOption: true
    };
    setMessages(prev => [...prev, userMessage]);
    setShowOptions(false);

    if (option.redirect) {
      handleRedirect(option.redirect);
    }

    if (option.value === 'call_104') {
      window.location.href = 'tel:104';
      return;
    }
    if (option.value === 'call_112') {
      window.location.href = 'tel:112';
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const response = getBotResponse(option.value);
      
      if (response.redirect) {
        handleRedirect(response.redirect);
      }
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: response.text,
        options: response.options,
        scenarioStep: option.value
      };
      
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
      setShowOptions(true);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {!open && (
        <button className="chat-float-btn" onClick={() => onToggle(true)} title="Открыть чат">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {open && (
        <div className="chat-window">
          <div className="chat-window-header">
            <h3>ЖКХ Помощник онлайн</h3>
            <button className="chat-close-btn" onClick={() => onToggle(false)} title="Закрыть">X</button>
          </div>

          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-message chat-message-${msg.type}`}>
                {msg.type === 'bot' && (
                  <div className="message-avatar">ЖКХ</div>
                )}
                
                <div className="chat-message-body">
                  <div className="chat-message-content">
                    {msg.text}
                  </div>
                  
                  {msg.type === 'bot' && msg.options && showOptions && messages[messages.length - 1]?.id === msg.id && (
                    <div className="message-options">
                      {msg.options.map((option, index) => (
                        <button
                          key={index}
                          className="chat-option-btn"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.type === 'user' && (
                  <div className="message-avatar user-avatar">Я</div>
                )}
              </div>
            ))}
            
            {loading && (
              <div className="chat-message chat-message-bot">
                <div className="message-avatar">ЖКХ</div>
                <div className="chat-message-body">
                  <div className="chat-message-content">
                    <div className="typing-indicator">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <textarea
              className="chat-input"
              placeholder="Опишите вашу проблему..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              rows="3"
            />
            <button 
              className="chat-send-btn"
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
            >
              Отправить
            </button>
          </div>
        </div>
      )}
    </>
  );
}