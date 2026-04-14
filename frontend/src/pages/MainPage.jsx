import React from 'react';
import '../styles/pages.css';

export default function HomePage({ onPageChange, onChatToggle }) {
  const handleEmergencyClick = () => {
    if (onChatToggle) {
      onChatToggle('emergency');
    }
  };

  const handleClick = () => {
    const chatButton = document.querySelector('.chat-float-btn');
    if (chatButton) {
      chatButton.click();
    }
  };

  return (
    <div className="homepage">
      {/* КНОПКА ЭКСТРЕННОЙ ПОМОЩИ - В ЛЕВОМ ВЕРХНЕМ УГЛУ */}
      <div className="emergency-corner-button">
        <button className="emergency-button-top" onClick={handleEmergencyClick}>
          <span className="emergency-text-top">АВАРИЯ</span>
        </button>
      </div>

      <section className="hero-section">
        <div className="hero-container">
          
          <div className="hero-content">
            <div className="hero-badge">Бесплатный сервис для граждан</div>
            
            <h1 className="hero-title">
              Вопрос в сфере ЖКХ? <span className="highlight"> Знаем, с чего начать</span>
            </h1>
            
            <p className="hero-description">
              Проверяйте начисления, формируйте жалобы, узнавайте права — всё в одном месте.
            </p>
            
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={handleClick}
              >
                Задать вопрос →
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => onPageChange && onPageChange('documents')}
              >
                Создать жалобу
              </button>
              <button
                className="btn btn-primary"
                onClick={() => onPageChange && onPageChange('faq')}
                >
                  Частые вопросы
                </button>
            </div>

          </div>

          <aside
            className="hero-selfcheck-card"
            onClick={() => onPageChange && onPageChange('selfcheck')}
            role="button"
            tabIndex="0"
            onKeyDown={(event) => {
              if ((event.key === 'Enter' || event.key === ' ') && onPageChange) {
                event.preventDefault();
                onPageChange('selfcheck');
              }
            }}
          >
            <div className="hero-selfcheck-badge">Юридический навигатор</div>
            <h2 className="hero-selfcheck-title">Проблемы с управляющей компанией?</h2>
            <p className="hero-selfcheck-text">
              Пройдите по шагам и поймите, что делать дальше: от фиксации проблемы до претензии и иска.
            </p>
            <div className="hero-selfcheck-questions">
              <div className="hero-selfcheck-question">Управляющая компания бездействует?</div>
              <div className="hero-selfcheck-question">Не знаете, с чего начать?</div>
            </div>
            <div className="hero-selfcheck-link">Открыть алгоритм судебного сопровождения →</div>
          </aside>
          
        </div>
      </section>
    </div>
  );ы
}
