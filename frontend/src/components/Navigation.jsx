import React from 'react';
import '../styles/navigation.css';

export default function Navigation({ currentPage, onPageChange }) {
  const navItems = [
    { id: 'mainpage', label: 'Главная страница'},
    { id: 'faq', label: 'FAQ' },
    { id: 'news', label: 'Новости' },
    { id: 'calculator', label: 'Проверка начислений' },
    { id: 'documents', label: 'Формирование документов' },
    { id: 'selfcheck', label: 'Самопроверка' },
    { id: 'regulations', label: 'Нормативные документы' },
    { id: 'contacts', label: 'Контакты' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-inner">
        <a href="#" className="nav-logo" onClick={() => onPageChange('mainpage')}>
          ЖКХ<span>Помощник</span>
        </a>
        
        <div className="nav-links">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onPageChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* <button className="nav-cta">Авторизация</button> */}
      </div>
    </nav>
  );
}
