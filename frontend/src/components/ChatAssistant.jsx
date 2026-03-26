import React, { useState } from 'react';
import '../styles/chat-assistant.css';

export default function ChatAssistant({ open, onToggle }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Привет! Я ИИ-консультант по вопросам ЖКХ. Помогу разобраться в тарифах, оформить документы и защитить ваши права.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Добавляем сообщение пользователя
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input
    };
    setMessages([...messages, userMessage]);
    setInput('');

    // Имитируем ответ бота
    setLoading(true);
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: 'Спасибо за ваш вопрос. Я анализирую информацию и подготавливаю ответ...'
      };
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Плавающая кнопка */}
      {!open && (
        <button 
          className="chat-float-btn"
          onClick={() => onToggle(true)}
          title="Открыть чат"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {/* Окно чата */}
      {open && (
        <div className="chat-window">
          <div className="chat-window-header">
            <h3>ИИ Консультант</h3>
            <button 
              className="chat-close-btn"
              onClick={() => onToggle(false)}
              title="Закрыть"
            >
              ✕
            </button>
          </div>

          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-message chat-message-${msg.type}`}>
                <div className="chat-message-content">
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-message chat-message-bot">
                <div className="chat-message-content">
                  <div className="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="chat-input-area">
            <textarea
              className="chat-input"
              placeholder="Напишите вопрос..."
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
