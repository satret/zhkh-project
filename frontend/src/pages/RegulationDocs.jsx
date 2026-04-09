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
    name: 'Акты федерального уровня',
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
            "title": "Консультант Плюс",
            "url": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=508490&dst=1000000001&cacheid=C4ABFD200A33ECEDE84B7EECE6B22B28&mode=splus&rnd=LT4YHGVQkAzBAX0t#nm5YHGVeUaEV1JrD"
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
            "title": "Консультант Плюс",
            "url": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=511791&dst=1000000001&cacheid=60F4318BE36A3CA028CD9812EB4C1867&mode=splus&rnd=LT4YHGVQkAzBAX0t#4V4ZHGVvojLUWpJJ"
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
            "title": "Консультант Плюс",
            "url": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=515330&dst=1000000001&cacheid=31868727B3EB52C3985FB57A784AAF69&mode=splus&rnd=W3YHA#KRGZHGVawianZXYK1"
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
            "title": "Консультант Плюс",
            "url": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=529676&dst=1000000001&cacheid=19E2433A3B5B6BCD256E2589071C5038&mode=splus&rnd=W3YHA#5QSZHGVExAWmL6gx1"
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
            "title": "Консультант Плюс",
            "url": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=523556&dst=1000000001&cacheid=93B23A1070544950820BF8DA2D08E790&mode=splus&rnd=W3YHA#nIqZHGVFBCOnH9g7"
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
            "title": "Консультант Плюс",
            "url": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=44772&dst=1000000001&cacheid=41093C2C82EFAAECC377A839D3148761&mode=splus&rnd=W3YHA#uZ0aHGVEfHNsjux4"
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
            "title": "Консультант Плюс",
            "url": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=19589&cacheid=19D1A66A7F085C28BF21BB9E5910B847&mode=splus&rnd=W3YHA#M2saHGV4ot1RUZYp1"
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
            "title": "Консультант Плюс",
            "url": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=500914&dst=1000000001&cacheid=0E9A90B2B9664EF3DF2D338D136B61B8&mode=splus&rnd=W3YHA#Rm1bHGViEqAm7no51"
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
            "title": "Консультант Плюс",
            "url": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=479460&dst=1000000001&cacheid=C54904437AE6340AD5EB4BC95699D138&mode=splus&rnd=W3YHA#A5ObHGVwleuxBFO91"
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
            "title": "Консультант Плюс",
            "url": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=522272&dst=1000000001&cacheid=4079BF9C6AB3745406D996BCCB1718A2&mode=splus&rnd=W3YHA#zkWbHGVgT4WyFwgT1"
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
            "title": "Консультант Плюс",
            "url": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=500912&dst=1000000001&cacheid=D16983935A4E3976BBC40F403366E96D&mode=splus&rnd=W3YHA#q9rbHGViYt2LCIam"
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
            "title": "Консультант Плюс",
            "url": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=500908&dst=1000000001&cacheid=81C4A42206FC57634E4B34B30787B8E3&mode=splus&rnd=W3YHA#Ws0cHGVwHAoIFnTn2"
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
            "title": "Консультант Плюс",
            "url": "https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=218822&dst=1000000001&cacheid=12BAD8C135CCC34939E311D49DDAD447&mode=splus&rnd=W3YHA#NBAcHGVEPoCXHN9q"
          }
        ]
      }
    ]
  },
  {
  "id": "regional",
  "name": "Акты регионального уровня",
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
              <li><a href="https://www.consultant.ru/" target="_blank" rel="noopener noreferrer">Консультант Плюс — Справочная правовая система →</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
