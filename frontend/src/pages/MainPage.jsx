import React from 'react';
import '../styles/pages.css';

export default function HomePage({ onPageChange }) {
  const handleEmergencyClick = () => {};

  return (
    <div className="homepage">
      {/* КНОПКА ЭКСТРЕННОЙ ПОМОЩИ - В ПРАВОМ ВЕРХНЕМ УГЛУ */}
      <div className="emergency-corner-button">
        <button className="emergency-button-top" onClick={handleEmergencyClick}>
          <span className="emergency-icon-top">🚨</span>
          <span className="emergency-text-top">АВАРИЯ</span>
        </button>
      </div>

      <section className="hero-section">
        <div className="hero-container">
          
          {/* ЛЕВАЯ ЧАСТЬ - ТЕКСТ */}
          <div className="hero-content">
            <div className="hero-badge">Бесплатный сервис для граждан</div>
            
            <h1 className="hero-title">
              Разберитесь с <span className="highlight">ЖКХ</span> раз и навсегда
            </h1>
            
            <p className="hero-description">
              Проверяйте начисления, формируйте жалобы, получайте юридические 
              консультации и узнавайте права — всё в одном месте.
            </p>
            
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => onPageChange && onPageChange('faq')}
              >
                Задать вопрос →
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => onPageChange && onPageChange('documents')}
              >
                Создать жалобу
              </button>
            </div>
          </div>

          {/* ПРАВАЯ ЧАСТЬ - ЧАТ */}
          <div className="hero-chat-mockup">
            <div className="chat-mockup-window">
              <div className="chat-mockup-header">
                <span className="chat-dot">🟢</span>
                <span className="chat-title">ЖКХ Помощник · онлайн</span>
              </div>
              
              <div className="chat-mockup-messages">
                <div className="chat-message chat-message-bot">
                  <div className="message-avatar">ЖКХ</div>
                  <div className="message-text">
                    Здравствуйте! Чем могу помочь? Задайте вопрос о коммунальных услугах
                  </div>
                </div>
                
                <div className="chat-message chat-message-user">
                  <div className="message-text">
                    Управляющая компания не делает ремонт в подъезде уже 2 года
                  </div>
                  <div className="message-avatar user-avatar">Я</div>
                </div>
                
                <div className="chat-message chat-message-bot">
                  <div className="message-avatar">ЖКХ</div>
                  <div className="message-text">
                    Это нарушение ст.145 ЖК РФ. Вы можете подать жалобу в ГЖИ или прокуратуру. Я помогу составить документ.
                  </div>
                </div>
                
                <div className="chat-action-button">
                  📄 Составить жалобу в ГЖИ
                </div>
              </div>
              
              <div className="chat-mockup-input">
                <div className="input-placeholder">Напишите вопрос...</div>
                <button className="send-button">→</button>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">доступ к ИИ консультациям</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">8</div>
            <div className="stat-label">разделов сервиса</div>
          </div>
        </div>
      </section>
    </div>
  );
}