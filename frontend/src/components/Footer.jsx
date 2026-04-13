import React from 'react';
import '../styles/footer.css';

export default function Footer({ onPageChange }) {
  const go = (page) => (e) => {
    e.preventDefault();
    onPageChange(page);
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-main">
            <a href="#" onClick={go('mainpage')} className="footer-logo">
              ЖКХ <span>Помощник</span>
            </a>
          </div>

          <div className="footer-col">
            <h4>Сервисы</h4>
            <ul className="footer-links">
              <li><a href="#" onClick={go('calculator')}>Проверка начислений</a></li>
              <li><a href="#" onClick={go('documents')}>Формирование документов</a></li>
              <li><a href="#" onClick={go('selfcheck')}>Самопроверка</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Информация</h4>
            <ul className="footer-links">
              <li><a href="#" onClick={go('regulations')}>Нормативные документы</a></li>
              <li><a href="#" onClick={go('faq')}>FAQ</a></li>
              <li><a href="#" onClick={go('news')}>Новости</a></li>
              <li><a href="#" onClick={go('contacts')}>Контакты</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            Сервис носит информационный характер и не является юридической консультацией.
            <br />© 2026 ЖКХ Помощник
          </span>
        </div>
      </div>
    </footer>
  );
}