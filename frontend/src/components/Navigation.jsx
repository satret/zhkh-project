import React from 'react';
import '../styles/navigation.css';

export default function Navigation({ currentPage, onPageChange }) {
  const navItems = [
    { id: 'calculator', label: 'Проверка начислений' },
    { id: 'documents', label: 'Формирование документов' },
    { id: 'selfcheck', label: 'Алгоритм судебного сопровождения' },
    { id: 'regulations', label: 'Нормативные документы' },
    { id: 'contacts', label: 'Контакты служб' }
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
