import React from 'react';
import '../styles/pages.css';

export default function HomePage({ onPageChange }) {
  return (
    <div className="homepage">
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

          {/* ПРАВАЯ ЧАСТЬ - ПРОСТО КАРТИНКА */}
          


<div className="hero-chat-mockup">
            <div className="chat-mockup-window">
              {/* Шапка чата */}
              <div className="chat-mockup-header">
                <span className="chat-dot">🟢</span>
                <span className="chat-title">ЖКХ Помощник · онлайн</span>
              </div>
              
              {/* Сообщения */}
              <div className="chat-mockup-messages">
                {/* Сообщение бота */}
                <div className="chat-message chat-message-bot">
                  <div className="message-avatar">ЖКХ</div>
                  <div className="message-text">
                    Здравствуйте! Чем могу помочь? Задайте вопрос о коммунальных услугах
                  </div>
                </div>
                
                {/* Сообщение пользователя */}
                <div className="chat-message chat-message-user">
                  <div className="message-text">
                    Управляющая компания не делает ремонт в подъезде уже 2 года
                  </div>
                  <div className="message-avatar user-avatar">Я</div>
                </div>
                
                {/* Сообщение бота */}
                <div className="chat-message chat-message-bot">
                  <div className="message-avatar">ЖКХ</div>
                  <div className="message-text">
                    Это нарушение ст.145 ЖК РФ. Вы можете подать жалобу в ГЖИ или прокуратуру. Я помогу составить документ.
                  </div>
                </div>
                
                {/* Кнопка действия */}
                <div className="chat-action-button">
                  📄 Составить жалобу в ГЖИ
                </div>
              </div>
              
              {/* Поле ввода */}
              <div className="chat-mockup-input">
                <div className="input-placeholder">Напишите вопрос...</div>
                <button className="send-button">→</button>
              </div>
            </div>
          </div>















        </div>

        {/* Статистика */}
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
