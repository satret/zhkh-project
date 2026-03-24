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
      icon: '📜',
      documents: [
        {
          title: 'Жилищный кодекс РФ',
          shortTitle: 'ЖК РФ',
          year: 2004,
          relevance: 'Основной закон',
          topics: ['Права собственников', 'Содержание имущества', 'Правление домом'],
          links: [
            { title: 'Консультант+', url: 'https://www.consultant.ru/document/cons_doc_LAW_51057/' },
            { title: 'МТЛИ', url: 'http://pravo.gov.ru/proxy/ips/?doc_itself=&backlink=1&nd=102052653&page=1' }
          ]
        },
        {
          title: 'Федеральный закон «О защите прав потребителей»',
          shortTitle: 'ФЗ от 07.02.1992 №2300-1',
          year: 1992,
          relevance: 'Защита интересов жильцов',
          topics: ['Качество услуг', 'Претензии', 'Судебная защита'],
          links: [
            { title: 'Консультант+', url: 'https://www.consultant.ru/document/cons_doc_LAW_305/' },
            { title: 'Госуслуги', url: 'https://pravo.gov.ru/laws/law_2300/' }
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
      id: 'government',
      name: 'Постановления Правительства РФ',
      icon: '⚖️',
      documents: [
        {
          title: 'ПП РФ №354 «Правила предоставления коммунальных услуг собственникам и пользователям помещений в многоквартирных домах»',
          shortTitle: 'ПП №354 от 06.05.2011',
          year: 2011,
          relevance: 'Основной подзаконный акт',
          topics: ['Размер платы', 'Качество услуг', 'Перерасчёты', 'ОДН'],
          links: [
            { title: 'Консультант+', url: 'https://www.consultant.ru/document/cons_doc_LAW_115130/' },
            { title: 'Гарант', url: 'https://base.garant.ru/12183121/' }
          ]
        },
        {
          title: 'ПП РФ №290 «Об установлении и применении повышающих коэффициентов к платежам за содержание жилого помещения и коммунальные услуги»',
          shortTitle: 'ПП №290 от 21.06.2011',
          year: 2011,
          relevance: 'Повышающие коэффициенты',
          topics: ['Коэффициент за задолженность', 'Штрафные санкции'],
          links: [
            { title: 'Консультант+', url: 'https://www.consultant.ru/document/cons_doc_LAW_116049/' }
          ]
        },
        {
          title: 'ПП РФ №329 «О внесении изменений в некоторые акты Правительства РФ по вопросам сторнирования и снижения размера пени»',
          shortTitle: 'ПП №329 от 27.04.2022',
          year: 2022,
          relevance: 'Льготы по пени (действует до 31.12.2025)',
          topics: ['Пени', 'Задолженность', 'Рассрочка'],
          links: [
            { title: 'Консультант+', url: 'https://www.consultant.ru/document/cons_doc_LAW_412234/' }
          ]
        },
        {
          title: 'ПП РФ №123 «Об установлении размеров регулируемых тарифов на коммунальные услуги»',
          shortTitle: 'ПП №123 (ежегодно обновляется)',
          year: 2024,
          relevance: 'Федеральные тарифы',
          topics: ['Максимальные тарифы', 'Регулирование цен'],
          links: [
            { title: 'Консультант+', url: 'https://www.consultant.ru/' }
          ]
        }
      ]
    },
    {
      id: 'regional',
      name: 'Нормативные акты Кировской области',
      icon: '🏛️',
      documents: [
        {
          title: 'Закон Кировской области №298-ЗО «О программе капитального ремонта общего имущества многоквартирных домов в Кировской области»',
          shortTitle: 'Закон КО №298-ЗО от 02.07.2013',
          year: 2013,
          relevance: 'Программа капремонта региона',
          topics: ['Объемы капремонта', 'Взносы', 'Сроки выполнения'],
          links: [
            { title: 'Официальный сайт', url: 'https://docs.cntd.ru/document/465319968' }
          ]
        },
        {
          title: 'Постановление Правительства КО №254/210 «Об утверждении Программы капитального ремонта общего имущества многоквартирных домов в Кировской области»',
          shortTitle: 'ПП КО №254/210 от 21.03.2014',
          year: 2014,
          relevance: 'План капремонта по годам',
          topics: ['Адреса домов', 'Сроки выполнения'],
          links: [
            { title: 'Фонд капремонта КО', url: 'https://www.fkr43.ru/' }
          ]
        },
        {
          title: 'Постановление Правительства КО «О внесении изменений в Положение об установлении размеров платы в целях формирования и использования фонда капитального ремонта»',
          shortTitle: 'ПП КО (различные номера)',
          year: 2024,
          relevance: 'Размер взносов в регионе',
          topics: ['Взносы на капремонт', 'Дифференциация'],
          links: [
            { title: 'ФЦ КР', url: 'https://www.fkr43.ru/' }
          ]
        }
      ]
    },
    {
      id: 'sanitary',
      name: 'Санитарные правила и нормы',
      icon: '🏥',
      documents: [
        {
          title: 'СанПиН 2.1.2.2645-10 «Санитарно-эпидемиологические требования к условиям проживания в жилых зданиях и помещениях»',
          shortTitle: 'СанПиН 2.1.2.2645-10',
          year: 2010,
          relevance: 'Микроклимат, влажность, освещение',
          topics: ['Температура в помещениях', 'Влажность воздуха', 'Вентиляция', 'Шумоизоляция'],
          links: [
            { title: 'CNTD', url: 'https://docs.cntd.ru/document/902217328' }
          ]
        },
        {
          title: 'СанПиН 1.2.3685-21 «Гигиенические нормативы и требования к обеспечению безопасности и (или) безвредности для человека факторов среды обитания»',
          shortTitle: 'СанПиН 1.2.3685-21',
          year: 2021,
          relevance: 'Комплексные требования санитарии',
          topics: ['Освещенность', 'Вентиляция', 'Микроклимат'],
          links: [
            { title: 'CNTD', url: 'https://docs.cntd.ru/document/573500115' }
          ]
        },
        {
          title: 'СП 60.13330.2016 «Отопление, вентиляция и кондиционирование. Актуализированная редакция СНиП 41-01-2003»',
          shortTitle: 'СП 60.13330.2016',
          year: 2016,
          relevance: 'Технические нормы отопления',
          topics: ['Температура в доме', 'Система отопления'],
          links: [
            { title: 'CNTD', url: 'https://docs.cntd.ru/document/456054206' }
          ]
        }
      ]
    },
    {
      id: 'gost',
      name: 'ГОСТ и технические стандарты',
      icon: '🔧',
      documents: [
        {
          title: 'ГОСТ Р 56193-2024 «Услуги жилищно-коммунального хозяйства. Технический контроль качества выполнения работ по капитальному ремонту»',
          shortTitle: 'ГОСТ Р 56193-2024',
          year: 2024,
          relevance: 'Контроль качества капремонта',
          topics: ['Приемка работ', 'Выявление дефектов'],
          links: [
            { title: 'CNTD', url: 'https://docs.cntd.ru/document/420376836' }
          ]
        },
        {
          title: 'ГОСТ Р 60570-2022 «Услуги жилищно-коммунального хозяйства. Система управления качеством. Показатели качества, результаты и эффективность»',
          shortTitle: 'ГОСТ Р 60570-2022',
          year: 2022,
          relevance: 'Качество услуг ЖКХ',
          topics: ['Стандарты качества', 'Показатели'],
          links: [
            { title: 'CNTD', url: 'https://docs.cntd.ru/document/1200197289' }
          ]
        }
      ]
    },
    {
      id: 'procedure',
      name: 'Процедурные документы',
      icon: '📋',
      documents: [
        {
          title: 'Приказ Минобрнауки России №1050 «Об утверждении порядка рассмотрения жалоб и заявлений граждан органами ФСУ в сфере ЖКХ»',
          shortTitle: 'Приказ №1050',
          year: 2020,
          relevance: 'Подача жалоб в ГЖИ',
          topics: ['ГИС ЖКХ', 'Жалобы', 'Сроки рассмотрения'],
          links: [
            { title: 'Портал Госуслуг', url: 'https://dom.gosuslugi.ru/' }
          ]
        },
        {
          title: 'Положение о Государственной жилищной инспекции Кировской области',
          shortTitle: 'Положение о ГЖИ',
          year: 2023,
          relevance: 'Структура и полномочия ГЖИ',
          topics: ['Проверки', 'Претензии', 'Контроль'],
          links: [
            { title: 'ГЖИ Кировской области', url: 'https://zhkh.kirov.ru/' }
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
            <h3>📌 Как использовать нормативные документы</h3>
            <ul>
              <li><strong>При жалобе:</strong> Ссылайтесь на конкретные статьи и пункты документов, которые нарушила УК</li>
              <li><strong>В суде:</strong> Подавайте копии документов в качестве приложения к иску</li>
              <li><strong>При переговорах:</strong> Зная закон, вы можете требовать свои права аргументированно</li>
              <li><strong>Проверка решений:</strong> Прочитайте закон сами, не полагайтесь на слова УК</li>
            </ul>
          </div>

          <div className="useful-links">
            <h3>🔗 Полезные ресурсы</h3>
            <ul>
              <li><a href="https://dom.gosuslugi.ru/" target="_blank" rel="noopener noreferrer">ГИС ЖКХ — Портал управления многоквартирным домом →</a></li>
              <li><a href="https://rstkirov.ru/" target="_blank" rel="noopener noreferrer">РЭК Кировской области — Тарифы на ЖКХ →</a></li>
              <li><a href="https://www.fkr43.ru/" target="_blank" rel="noopener noreferrer">Фонд капремонта КО — Программа капремонта →</a></li>
              <li><a href="https://zhkh.kirov.ru/" target="_blank" rel="noopener noreferrer">ГЖИ Кировской области — Жалобы и проверки →</a></li>
              <li><a href="https://www.consultant.ru/" target="_blank" rel="noopener noreferrer">Консультант+ — Справочная правовая система →</a></li>
              <li><a href="https://base.garant.ru/" target="_blank" rel="noopener noreferrer">Гарант — Справочная правовая система →</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
