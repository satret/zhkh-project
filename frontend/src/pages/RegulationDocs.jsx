import React, { useState } from 'react';
import '../styles/regulation-docs.css';

export default function RegulationDocs() {
  const [expandedGroups, setExpandedGroups] = useState({ federal: false });

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
        "title": "Гражданский кодекс РФ",
        "shortTitle": "ГК РФ",
        "year": 1994,
        "relevance": "Основной закон",
        "topics": [
          "Общие положения гражданского права",
          "Право собственности",
          "Обязательственное право"
        ],
        "links": [
          {
            "title": "КонсультантПлюс",
            "url": "https://www.consultant.ru/document/cons_doc_LAW_5142/"
          }
        ]
      },
      {
        "title": "Жилищный кодекс РФ",
        "shortTitle": "ЖК РФ",
        "year": 2004,
        "relevance": "Основной закон",
        "topics": [
          "Права собственников",
          "Содержание имущества",
          "Правление домом"
        ],
        "links": [
          {
            "title": "Консультант+",
            "url": "https://www.consultant.ru/document/cons_doc_LAW_51057/"
          }
        ]
      },
      {
        "title": "Федеральный закон «О защите прав потребителей»",
        "shortTitle": "ФЗ от 07.02.1992 №2300-1",
        "year": 1992,
        "relevance": "Защита интересов жильцов",
        "topics": [
          "Качество услуг",
          "Претензии",
          "Судебная защита"
        ],
        "links": [
          {
            "title": "Консультант+",
            "url": "https://www.consultant.ru/document/cons_doc_LAW_305/"
          }
        ]
      },
      {
        "title": "Федеральный закон «О водоснабжении и водоотведении»",
        "shortTitle": "ФЗ № 416",
        "year": 2011,
        "relevance": "Специализированный закон",
        "topics": [
          "Коммунальные услуги",
          "Водоснабжение",
          "Водоотведение"
        ],
        "links": [
          {
            "title": "КонсультантПлюс",
            "url": "https://www.consultant.ru/document/cons_doc_LAW_122867/"
          }
        ]
      },
      {
        "title": "Федеральный закон «Об основах охраны здоровья граждан РФ»",
        "shortTitle": "ФЗ от 21.11.2011 №323-ФЗ",
        "year": 2011,
        "relevance": "Санитарные нормы в доме",
        "topics": [
          "Качество воды",
          "Микроклимат",
          "Эпидемиологическая безопасность"
        ],
        "links": [
          {
            "title": "Консультант+",
            "url": "https://www.consultant.ru/document/cons_doc_LAW_121895/"
          }
        ]
      },
      {
        "title": "Правила и нормы технической эксплуатации жилищного фонда",
        "shortTitle": "Постановление Госстроя № 170",
        "year": 2003,
        "relevance": "Технические стандарты",
        "topics": [
          "Техническая эксплуатация",
          "Содержание имущества",
          "Ремонт общего имущества",
          "Придомовая территория"
        ],
        "links": [
          {
            "title": "КонсультантПлюс",
            "url": "https://www.consultant.ru/document/cons_doc_LAW_44772/"
          }
        ]
      },
      {
        "title": "Постановление правительства «О содействии развитию жилищного строительства»",
        "shortTitle": "ПП РФ от 29.07.1998 N 856",
        "year": 1998,
        "relevance": "Капитальный ремонт",
        "topics": [
          "Программа капремонта",
          "Взносы на ремонт"
        ],
        "links": [
          {
            "title": "Консультант+",
            "url": "https://www.consultant.ru/document/cons_doc_LAW_19589/"
          }
        ]
      },
      {
        "title": "Правила содержания общего имущества в МКД",
        "shortTitle": "ПП РФ № 491",
        "year": 2006,
        "relevance": "Ключевой подзаконный акт",
        "topics": [
          "Содержание имущества",
          "Общее имущество МКД",
          "Управление домом"
        ],
        "links": [
          {
            "title": "КонсультантПлюс",
            "url": "https://www.consultant.ru/document/cons_doc_LAW_62293/"
          }
        ]
      },
      {
        "title": "Правила предоставления субсидий на оплату жилого помещения и коммунальных услуг",
        "shortTitle": "ПП РФ № 761",
        "year": 2005,
        "relevance": "Меры социальной поддержки",
        "topics": [
          "Субсидии ЖКХ",
          "Льготы",
          "Расчет доходов"
        ],
        "links": [
          {
            "title": "КонсультантПлюс",
            "url": "https://www.consultant.ru/document/cons_doc_LAW_45158/"
          }
        ]
      },
      {
        "title": "Правила предоставления коммунальных услуг",
        "shortTitle": "ПП РФ № 354",
        "year": 2011,
        "relevance": "Ключевой подзаконный акт",
        "topics": [
          "Коммунальные услуги",
          "Расчеты и платежи ЖКХ",
          "Права потребителей"
        ],
        "links": [
          {
            "title": "КонсультантПлюс",
            "url": "https://www.consultant.ru/document/cons_doc_LAW_114247/"
          }
        ]
      },
      {
        "title": "Правила обращения с твердыми коммунальными отходами",
        "shortTitle": "ПП РФ № 1156",
        "year": 2016,
        "relevance": "Регулирование отрасли",
        "topics": [
          "ТКО",
          "Вывоз мусора",
          "Обращение с отходами"
        ],
        "links": [
          {
            "title": "КонсультантПлюс",
            "url": "https://www.consultant.ru/document/cons_doc_LAW_207118/"
          }
        ]
      },
      {
        "title": "Минимальный перечень услуг и работ для содержания общего имущества",
        "shortTitle": "ПП РФ № 290",
        "year": 2013,
        "relevance": "Обязательный стандарт",
        "topics": [
          "Содержание имущества",
          "Ремонт общего имущества",
          "Минимальный перечень работ"
        ],
        "links": [
          {
            "title": "КонсультантПлюс",
            "url": "https://www.consultant.ru/document/cons_doc_LAW_144804/"
          }
        ]
      },
      {
        "title": "Постановление Пленума Верховного Суда РФ № 22",
        "shortTitle": "Постановление пленума ВС РФ № 22",
        "year": 2017,
        "relevance": "Судебная практика",
        "topics": [
          "Оплата ЖКУ",
          "Споры с управляющими организациями",
          "Защита прав собственников"
        ],
        "links": [
          {
            "title": "КонсультантПлюс",
            "url": "https://www.consultant.ru/document/cons_doc_LAW_218822/"
          }
        ]
      }
    ]
  },
  {
  "id": "regional",
  "name": "Нормативные акты Республики Дагестан",
  "documents": [
    {
      "title": "Закон Республики Дагестан «Об организации проведения капитального ремонта общего имущества в многоквартирных домах в Республике Дагестан»",
      "shortTitle": "Закон РД № 57",
      "year": 2013,
      "relevance": "Региональный закон",
      "topics": [
        "Капитальный ремонт",
        "Региональный оператор",
        "Фонд капремонта"
      ],
      "links": [
        {
          "title": "Портал правовой информации",
          "url": "http://pravo.gov.ru/proxy/ips/?docbody=&prevDoc=133015149&backlink=1&&nd=133014954"
        }
      ]
    },
    {
      "title": "Постановление Правительства Республики Дагестан «Об утверждении Порядка предоставления компенсации расходов на уплату взноса на капитальный ремонт общего имущества в многоквартирных домах, расположенных на территории Республики Дагестан, отдельным категориям граждан, проживающих на территории Республики Дагестан»",
      "shortTitle": "ПП РД № 96",
      "year": 2018,
      "relevance": "Компенсация взносов на капремонт",
      "topics": [
        "Капитальный ремонт",
        "Льготы",
        "Компенсация расходов"
      ],
      "links": [
        {
          "title": "Официальное опубликование",
          "url": "http://publication.pravo.gov.ru/Document/View/0500201807200004"
        }
      ]
    },
    {
      "title": "Постановление Правительства Республики Дагестан № 219 «О внесении изменений в постановление Правительства Республики Дагестан от 18 апреля 2014 г. № 175»",
      "shortTitle": "ПП РД № 219",
      "year": 2020,
      "relevance": "Регулирование ЖКХ",
      "topics": [
        "Жилищно-коммунальное хозяйство",
        "Региональные стандарты"
      ],
      "links": [
        {
          "title": "Официальное опубликование",
          "url": "http://publication.pravo.gov.ru/document/0500202010150002"
        }
      ]
    },
    {
      "title": "Постановление Правительства Республики Дагестан № 330 «Об установлении минимального размера взноса на капитальный ремонт общего имущества в многоквартирном доме, расположенном на территории Республики Дагестан, на 2026 год»",
      "shortTitle": "ПП РД № 330",
      "year": 2025,
      "relevance": "Минимальный взнос на капремонт",
      "topics": [
        "Капитальный ремонт",
        "Минимальный взнос",
        "Тарифы"
      ],
      "links": [
        {
          "title": "Официальное опубликование",
          "url": "http://publication.pravo.gov.ru/document/0500202511060002"
        }
      ]
    },
    {
      "title": "Постановление правительсва Республики Дагестан «Об утверждении порядка осуществления ежемесячной денежной выплаты по оплате жилого помещения и коммунальных услуг отдельным категориям граждан в Республике Дагестан»",
      "shortTitle": "ПП РД от 28 января 2011 г. N 20",
      "year": 2011,
      "relevance": "Социальная поддержка",
      "topics": ["Субсидии ЖКХ",],
      "links": [
        {
          "title": "Портал правовой информации РД",
          "url": "https://e-dag.ru/docs/6559"
        }
      ],
      },
    {
      "title": "Приказ Минстроя Дагестана № 11-пр-601 «Об утверждении краткосрочного плана реализации в 2026 - 2028 годах Региональной программы по проведению капитального ремонта общего имущества в многоквартирных домах в Республике Дагестан на 2014 - 2046 годы»",
      "shortTitle": "Приказ Минстроя РД",
      "year": 2025,
      "relevance": "Краткосрочный план капремонта",
      "topics": [
        "Капитальный ремонт",
        "Краткосрочный план",
        "Перечень домов"
      ],
      "links": [
        {
          "title": "Портал правовой информации РД",
          "url": "https://pravo.e-dag.ru/document/05024017499/"
        }
      ]
    },
    {
      "title": "Приказ Минстроя Дагестана № 11-Пр-314 «О республиканских стандартах оплаты жилого помещения и коммунальных услуг на второе полугодие 2025 года и первое полугодие 2026 года»",
      "shortTitle": "Приказ Минстроя РД",
      "year": 2025,
      "relevance": "Республиканские стандарты оплаты ЖКУ",
      "topics": [
        "Субсидии ЖКХ",
        "Стандарты оплаты",
        "Льготы"
      ],
      "links": [
        {
          "title": "Портал правовой информации РД",
          "url": "https://pravo.e-dag.ru/document/05024016210/"
        }
      ]
    }
  ]
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
