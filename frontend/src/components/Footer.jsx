import React from 'react';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-main">
            <div className="footer-logo">ЖКХ<span>Помощник</span></div>
          </div>

          <div className="footer-col">
            <h4>Сервисы</h4>
            <ul className="footer-links">
              <li><a href="#">Проверка начислений</a></li>
              <li><a href="#">Формирование документов</a></li>
              <li><a href="#">Чат с ИИ</a></li>
              <li><a href="#">Самопроверка</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Информация</h4>
            <ul className="footer-links">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Новости</a></li>
              <li><a href="#">Нормативные документы</a></li>
              <li><a href="#">Контакты</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 ЖКХ Помощник</span>
        </div>
      </div>
    </footer>
  );
}
