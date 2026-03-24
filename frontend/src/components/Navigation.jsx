import React from 'react';
import '../styles/navigation.css';

export default function Navigation({ currentPage, onPageChange }) {
  const navItems = [
    { id: 'faq', label: 'FAQ' },
    { id: 'news', label: 'Новости ЖКХ' },
    { id: 'calculator', label: 'Калькулятор' },
    { id: 'documents', label: 'Документы' },
    { id: 'selfcheck', label: 'Самопроверка' },
    { id: 'regulations', label: 'Нормативы' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-inner">
        <a href="#" className="nav-logo" onClick={() => onPageChange('faq')}>
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

        <button className="nav-cta">Авторизация</button>
      </div>
    </nav>
  );
}
