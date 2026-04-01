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
              Жилищный вопрос? <span className="highlight"> Мы уже решили</span>
            </h1>
            
            <p className="hero-description">
              Проверяйте начисления, формируйте жалобы, узнавайте права — всё в одном месте.
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
  );ы
}