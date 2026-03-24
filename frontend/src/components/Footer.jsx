import React from 'react';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-main">
            <div className="footer-logo">ЖКХ<span>Помощник</span></div>
            <p className="footer-desc">
              Бесплатный информационный сервис для граждан в сфере жилищно-коммунального хозяйства. 
              Не является юридической фирмой.
            </p>
          </div>

          <div className="footer-col">
            <h4>Сервисы</h4>
            <ul className="footer-links">
              <li><a href="#">Справочник тарифов</a></li>
              <li><a href="#">Создать документ</a></li>
              <li><a href="#">Проверить начисления</a></li>
              <li><a href="#">Чат с ИИ</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Информация</h4>
            <ul className="footer-links">
              <li><a href="#">О проекте</a></li>
              <li><a href="#">Новости ЖКХ</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Контакты</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Правовая база</h4>
            <ul className="footer-links">
              <li><a href="#">Жилищный кодекс РФ</a></li>
              <li><a href="#">ПП РФ №354</a></li>
              <li><a href="#">ПП РФ №290</a></li>
              <li><a href="#">ФЗ «О защите прав потребителей»</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 ЖКХ Помощник — информационный сервис</span>
          <span>Дипломный проект · Предзащита 15.04.2026</span>
        </div>
      </div>
    </footer>
  );
}
