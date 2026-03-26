import React, { useState } from 'react';
import '../styles/pages.css';

export default function RegulationDocs() {
  const [expandedGroups, setExpandedGroups] = useState({ federal: true });

  const toggleGroup = (id) => {
    setExpandedGroups(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const documentGroups = [
    {
      id: 'federal',
      name: 'Федеральные законы',
      documents: [
        {
          title: 'Жилищный кодекс РФ',
          shortTitle: 'ЖК РФ',
          year: 2004,
          relevance: 'Основной закон',
          topics: ['Права собственников', 'Содержание имущества', 'Правление домом'],
          links: [
            { title: 'Консультант+', url: 'https://www.consultant.ru/document/cons_doc_LAW_51057/' }
          ]
        },
        {
          title: 'Федеральный закон «О защите прав потребителей»',
          shortTitle: 'ФЗ от 07.02.1992 №2300-1',
          year: 1992,
          relevance: 'Защита интересов жильцов',
          topics: ['Качество услуг', 'Претензии', 'Судебная защита'],
          links: [
            { title: 'Консультант+', url: 'https://www.consultant.ru/document/cons_doc_LAW_305/' }
          ]
        },
        {
          title: 'Федеральный закон «О содействии развитию жилищного строительства»',
          shortTitle: 'ФЗ от 16.07.1998 №102-ФЗ',
          year: 1998,
          relevance: 'Капитальный ремонт',
          topics: ['Программа капремонта', 'Взносы на ремонт'],
          links: [
            { title: 'Консультант+', url: 'https://www.consultant.ru/document/cons_doc_LAW_19589/' }
          ]
        },
        {
          title: 'Федеральный закон «Об основах охраны здоровья граждан РФ»',
          shortTitle: 'ФЗ от 21.11.2011 №323-ФЗ',
          year: 2011,
          relevance: 'Санитарные нормы в доме',
          topics: ['Качество воды', 'Микроклимат', 'Эпидемиологическая безопасность'],
          links: [
            { title: 'Консультант+', url: 'https://www.consultant.ru/document/cons_doc_LAW_121895/' }
          ]
        }
      ]
    },
    {
      id: 'regional',
      name: 'Нормативные акты Республики Дагестан',
      documents: []
    }
  ];

  return (
    <section className="page-section">
      <div className="section-inner">
        <div className="page-header">
          <h1>Нормативные документы</h1>
          <p className="page-subtitle">Законы, постановления и правила, связанные с жилищно-коммунальным хозяйством</p>
        </div>

        <div className="regulations-container">
          {documentGroups.map(group => (
            <div key={group.id} className="regulation-group">
              <button 
                className={`group-header ${expandedGroups[group.id] ? 'open' : ''}`}
                onClick={() => toggleGroup(group.id)}
              >
                <span className="group-icon">{group.icon}</span>
                <h2>{group.name}</h2>
                <span className="group-arrow">▼</span>
              </button>

              {expandedGroups[group.id] && (
                <div className="group-documents">
                  {group.documents.map((doc, idx) => (
                    <div key={idx} className="doc-item">
                      <div className="doc-header">
                        <div className="doc-titles">
                          <h3 className="doc-title">{doc.title}</h3>
                          <p className="doc-short">{doc.shortTitle}</p>
                        </div>
                        <span className="doc-year">{doc.year}</span>
                      </div>

                      <div className="doc-meta">
                        <span className="relevance-badge">{doc.relevance}</span>
                        <div className="doc-topics">
                          {doc.topics.map((topic, i) => (
                            <span key={i} className="topic-tag">{topic}</span>
                          ))}
                        </div>
                      </div>

                      <div className="doc-links">
                        {doc.links.map((link, i) => (
                          <a 
                            key={i}
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="doc-link-btn"
                          >
                            {link.title} →
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="regulations-footer">
          <div className="help-section">
            <h3>Как использовать нормативные документы</h3>
            <ul>
              <li><strong>При жалобе:</strong> Ссылайтесь на конкретные статьи и пункты документов, которые нарушила УК</li>
              <li><strong>В суде:</strong> Подавайте копии документов в качестве приложения к иску</li>
              <li><strong>При переговорах:</strong> Зная закон, вы можете требовать свои права аргументированно</li>
              <li><strong>Проверка решений:</strong> Прочитайте закон сами, не полагайтесь на слова УК</li>
            </ul>
          </div>

          <div className="useful-links">
            <h3>Полезные ресурсы</h3>
            <ul>
              <li><a href="https://minstroy.e-dag.ru/documents?ysclid=mn76pfmjd756863927" target="_blank" rel="noopener noreferrer">Официальный сайт министерства строительства, архитектуры и жилищно-коммунального хозяйства РД →</a></li>
              <li><a href="https://dom.gosuslugi.ru/" target="_blank" rel="noopener noreferrer">ГИС ЖКХ — Портал управления многоквартирным домом →</a></li>
              <li><a href="https://www.consultant.ru/" target="_blank" rel="noopener noreferrer">Консультант+ — Справочная правовая система →</a></li>
              <li><a href="https://base.garant.ru/" target="_blank" rel="noopener noreferrer">Гарант — Справочная правовая система →</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
