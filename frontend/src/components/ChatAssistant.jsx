import React, { useState, useEffect, useRef } from 'react';
import { chatScenarios } from '../data/chatScenarios';
import { detectEmergency } from '../data/emergencyKeywords';
import { detectProblem } from '../data/problemKeywords';
import { logEvent } from '../utils/chatLogger';
import { detectSection } from '../data/sectionKeywords';
import '../styles/chat-assistant.css';

export default function ChatAssistant({ 
  open, 
  onToggle, 
  onPageChange, 
  initialScenario,
  onScenarioHandled 
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [chatInitialized, setChatInitialized] = useState(false);
  
  const messagesEndRef = useRef(null);

  // 1. Инициализация только при первом открытии
useEffect(() => {
  if (open && !chatInitialized) {
    if (initialScenario === 'emergency') {
      const scenario = chatScenarios['emergency_type_select'];
      setMessages([{
        id: 1,
        type: 'bot',
        text: scenario.text,
        options: scenario.options
      }]);
    } else {
      const scenario = chatScenarios['start'];
      setMessages([{
        id: 1,
        type: 'bot',
        text: scenario.text,
        options: scenario.options
      }]);
    }
    setChatInitialized(true);
    logEvent('session_open', { initialScenario: initialScenario || 'start' });
    
    if (initialScenario && onScenarioHandled) {
      onScenarioHandled();
    }
  }
}, [open, initialScenario, onScenarioHandled]);

// 2. Реакция на initialScenario при открытом чате
useEffect(() => {
  if (open && initialScenario === 'emergency' && chatInitialized) {
    const scenario = chatScenarios['emergency_type_select'];
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'bot',
      text: scenario.text,
      options: scenario.options
    }]);
    
    if (onScenarioHandled) {
      onScenarioHandled();
    }
  }
}, [initialScenario, open, chatInitialized, onScenarioHandled]);


  // Автопрокрутка вниз
  useEffect(() => {
  if (open) {  // ← Прокручиваем только когда чат открыт
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}, [messages, loading, open]);  // ← Добавили 'open'

  const getBotResponse = (optionValue) => {
    return chatScenarios[optionValue] || chatScenarios['start'];
  };

  const handleRedirect = (redirect) => {
    if (!redirect || !onPageChange) return;
    logEvent('redirect', { page: redirect.page, subsection: redirect.subsection || null });
    onPageChange(redirect.page, redirect.subsection || null);
  };

  const handleSendMessage = () => {
  if (!input.trim()) return;

  const userMessage = {
    id: Date.now(),
    type: 'user',
    text: input
  };
  logEvent('user_message', { text: input });
  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setShowOptions(false);

  // Шаг 1: Определяем контексты (Важно: проверяем по очереди)
  const emergency = detectEmergency(input);
  const problem = !emergency.isEmergency ? detectProblem(input) : { isProblem: false };
  const sectionNav = (!emergency.isEmergency && !problem.isProblem) ? detectSection(input) : { found: false };

  setLoading(true);
  
  setTimeout(() => {
    let botMessage;

    // Приоритет 1: Аварии (Самый высокий)
    if (emergency.isEmergency) {
      logEvent('emergency_detected', { type: emergency.type, title: emergency.title });
      
      if (emergency.type === 'emergency') {
        const scenario = chatScenarios['emergency_type_select'];
        botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          text: `Понял, у вас аварийная ситуация.\n\n${scenario.text}`,
          options: scenario.options,
          scenarioStep: 'emergency_type_select'
        };
      } else {
        const scenario = chatScenarios[`emergency_${emergency.type}_start`];
        botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          text: `${emergency.title}\n\n${scenario?.text || 'Срочно вызовите аварийную службу!'}`,
          options: scenario?.options || [{ label: 'Вызвать аварийную службу', value: 'emergency_phones' }],
          scenarioStep: `emergency_${emergency.type}_start`
        };
      }
    }
    // Приоритет 2: Проблемы ЖКХ
    else if (problem.isProblem) {
      logEvent('problem_detected', { scenario: problem.scenario, title: problem.title });
      const scenario = chatScenarios[problem.scenario];
      botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: `${problem.title}\n\n${scenario?.text || 'Расскажите подробнее о вашей проблеме.'}`,
        options: scenario?.options || [{ label: 'В главное меню', value: 'start' }],
        scenarioStep: problem.scenario
      };
      if (scenario?.redirect) handleRedirect(scenario.redirect);
    }
    // Приоритет 3: Навигация по разделам
    else if (sectionNav.found) {
      logEvent('section_navigation', { section: sectionNav.section, title: sectionNav.title });
      
      botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: `Понял, перенаправляю вас в раздел «${sectionNav.title}».`,
        options: [
          { label: 'В главное меню', value: 'start' }
        ],
        scenarioStep: 'section_navigation'
      };

      // Автоматическое перенаправление
      if (sectionNav.redirect && onPageChange) {
          handleRedirect(sectionNav.redirect);
        }
    }
    // Приоритет 4: Обычный ответ
    else {
      const response = getBotResponse('default');
      botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: response.text,
        options: response.options,
        redirect: response.redirect
      };
      if (response.redirect) handleRedirect(response.redirect);
    }

    setMessages(prev => [...prev, botMessage]);
    logEvent('bot_message', {
      text: botMessage.text,
      scenarioStep: botMessage.scenarioStep,
      optionsCount: botMessage.options?.length || 0
    });
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
    logEvent('user_option', { label: option.label, value: option.value });
    setMessages(prev => [...prev, userMessage]);
    setShowOptions(false);

    if (option.redirect) {
      handleRedirect(option.redirect);
    }

    if (option.value === 'call_104') {
      logEvent('phone_call', { number: '104' });
      window.location.href = 'tel:104';
      return;
    }
    if (option.value === 'call_112') {
      logEvent('phone_call', { number: '112' });
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
      logEvent('bot_message', {
        text: botMessage.text,
        scenarioStep: botMessage.scenarioStep,
        optionsCount: botMessage.options?.length || 0
      });
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

  const handleClose = () => {
    logEvent('session_close');
    onToggle(false);
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
            <button className="chat-close-btn" onClick={handleClose} title="Закрыть">X</button>
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
