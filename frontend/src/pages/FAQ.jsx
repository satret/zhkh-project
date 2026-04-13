import React, { useState } from 'react';
import '../styles/pages.css';
import zhkhGlossaryPdf from '../reminders/ZhKH-Slovar.pdf';

export default function FAQ({ onPageChange }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const categories = [
    {
      id: 'section1',
      title: 'Начисления и платежи',
      questions: [
        {
          id: 'q1',
          q: 'Почему пришла огромная сумма за ЖКУ, хотя я платил регулярно?',
          a: (
            <>
              <p>Причины: корректировка за прошлые периоды, изменение тарифов, начисление пени, ошибка в показаниях или расчет по нормативу.</p>
              <p>
                Что делать: запросите детализацию в{' '}
                <button 
                  className="inline-link" 
                  onClick={() => onPageChange('contacts')}
                >
                  УК (контакты)
                </button>{' '}
                или через ГИС ЖКХ.
              </p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a 
                  href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=511791&dst=100910&cacheid=A06604E423EC215C24148F7B48F8F6E4&mode=splus&rnd=W3YHA#nsOrHGVUBkCGKZ702" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="npa-link"
                >
                  ЖК РФ ст. 155 
                </a>;{' '}
                <a 
                  href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=522272&cacheid=3B55D258AE1C56D9A2121FCD677651A7&mode=splus&rnd=W3YHA#55QtHGVKMQpaEqDt" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="npa-link"
                >
                  ПП РФ № 354, п. 61–72
                </a>
              </p>
            </>
          )
        },
        {
          id: 'q2',
          q: 'Что такое ОДН и почему я должен за него платить?',
          a: (
            <>
              <p>ОДН - ресурсы на содержание общего имущества (лифт, освещение, уборка, потери в сетях). Платите за разницу между общедомовым и индивидуальными счетчиками.</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=511791&dst=100900&cacheid=9D25F3CFAA868532E4A106BF6F85B63A&mode=splus&rnd=W3YHA#rpxnHGVgfFHE11DS1" target="_blank" rel="noreferrer" className="npa-link">ЖК РФ ст. 36, 154; ПП РФ № 354, п. 40–44</a>
              </p>
            </>
          )
        },
        {
          id: 'q3',
          q: 'Как проверить начисления, если нет счётчиков?',
          a: (
            <>
              <p>Плата = Норматив × Тариф × Число проживающих (для отопления + площадь). Если счетчик не установлен по вашей вине - применяется повышающий коэффициент.</p>
              <p>
                Проверьте расчет в{' '}
                <button 
                  className="inline-link" 
                  onClick={() => onPageChange('calculator')}
                >
                  нашем калькуляторе
                </button>.
              </p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=511791&dst=79&field=134&rnd=W3YHA#JI6rHGVmafhrA5UI1" target="_blank" rel="noreferrer" className="npa-link">ЖК РФ ст. 157; ПП РФ № 354</a>
              </p>
            </>
          )
        },
        {
          id: 'q4',
          q: 'Не согласен с начислением пени - что делать?',
          a: (
            <>
              <p>С 2025 г. пени рассчитываются по льготной ставке (минимум из ключевой ставки ЦБ на 27.02.2022 или на день оплаты). Если сумма завышена - пишите претензию в УК.</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a 
                  href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=501136&dst=1000000001&cacheid=D743D83767333E230C419AA20DC195C4&mode=splus&rnd=W3YHA#Z4auHGVScId2HMQw" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="npa-link"
                >
                  ПП РФ № 329 от 18.03.2025 
                </a>;{' '}
                <a 
                  href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=511791&dst=100910&cacheid=A06604E423EC215C24148F7B48F8F6E4&mode=splus&rnd=W3YHA#rfvuHGVGqSqysclN2" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="npa-link"
                >
                  ЖК РФ ст. 155 ч. 14
                </a>
              </p>
            </>
          )
        },
        {
          id: 'q5',
          q: 'Как получить субсидию на оплату ЖКУ?',
          a: (
            <>
              <p>Условие: Субсидия положена, если расходы на ЖКХ превышают 22% дохода семьи.</p>
              <p>Куда: МФЦ, Госуслуги, орган соцзащиты.</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a 
                  href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=511791&dst=100946&cacheid=2ABF37EE15B400590FE4B9350DEB7D37&mode=splus&rnd=W3YHA#In3vHGVBuO4sUT0W" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="npa-link"
                >
                  ЖК РФ ст. 159
                </a>;{' '}
                <a 
                  href="https://www.consultant.ru/document/cons_doc_LAW_45158/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="npa-link"
                >
                  ПП РФ № 761
                </a>;{' '}
                <a 
                  href="https://www.consultant.ru/document/cons_doc_LAW_55352/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="npa-link"
                >
                  ПП РФ № 541
                </a>
              </p>
            </>
          )
        },
        {
          id: 'q6',
          q: 'Почему в квитанции новые строки (капремонт, содержание, ОДН)?',
          a: (
            <>
              <p>Это обязательные компоненты платы по закону: содержание жилья (текущий ремонт, уборка, управление), ОДН (общедомовые ресурсы) и капремонт(взносы в региональный фонд или на спецсчет).</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a href="https://www.consultant.ru/document/cons_doc_LAW_51057/61daeebf9c8ca3f4be07be8de9bd59c9e5a5820b/" target="_blank" rel="noreferrer" className="npa-link">ЖК РФ ст. 154</a>
              </p>
            </>
          )
        },
        {
          id: 'q7',
          q: 'Как производится перерасчёт за временное отсутствие?',
          a: (
            <>
              <p>Условия: отсутствие &gt; 5 дней подряд + документы (билеты, справка). Перерасчет - только для воды/водоотведения (при отсутствии счетчиков). Не применяется к отоплению и содержанию жилья.</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a href="https://www.consultant.ru/document/cons_doc_LAW_114247/" target="_blank" rel="noreferrer" className="npa-link">ПП РФ № 354, п. 86–97</a>
              </p>
            </>
          )
        },
        {
          id: 'q8',
          q: 'Что такое повышающий коэффициент и когда он применяется?',
          a: (
            <>
              <p>Коэффициент 1,5 применяется, если технически возможно установить счетчик, но он не установлен. Не применяется, если есть акт об отсутствии технической возможности.</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a href="https://www.consultant.ru/document/cons_doc_LAW_114247/" target="_blank" rel="noreferrer" className="npa-link">ПП РФ № 354, п. 42(1)</a>
              </p>
            </>
          )
        },
        {
          id: 'q9',
          q: 'Как отказаться от радиоточки и коллективной антенны?',
          a: (
            <>
              <p>Подайте письменное заявление в УК/РСО на отключение. После демонтажа плата не начисляется.</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a 
                  href="https://www.consultant.ru/document/cons_doc_LAW_51057/61daeebf9c8ca3f4be07be8de9bd59c9e5a5820b/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="npa-link"
                >
                  ЖК РФ ст. 154 
                </a>;{' '}
                <a 
                  href="https://www.consultant.ru/document/cons_doc_LAW_305/758e2cfdf136a621c8f66dcb3372b772c7b5e6e8/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="npa-link"
                >
                  ЗоЗПП ст. 32
                </a>
              </p>
            </>
          )
        },
        {
          id: 'q10',
          q: 'Можно ли не платить за капремонт, если дом новый?',
          a: (
            <>
              <p>Нет, обязанность возникает с момента включения дома в региональную программу. Льгота (освобождение на 3-5 лет) - только если дом введен в эксплуатацию после утверждения программы и включен в нее позже.</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a href="https://www.consultant.ru/document/cons_doc_LAW_51057/cc9137589dd15d74afed9cc942fe2ce69987516b/" target="_blank" rel="noreferrer" className="npa-link">ЖК РФ ст. 169 ч. 5.1</a>
              </p>
            </>
          )
        }
      ]
    },
    {
      id: 'section2',
      title: 'Качество услуг',
      questions: [
        {
          id: 'q11',
          q: 'Какая температура должна быть в квартире зимой в Дагестане?',
          a: (
            <>
              <p>Норма: в жилых комнатах не ниже +20°C, в угловых - +22°C.</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a 
                  href="https://www.consultant.ru/document/cons_doc_LAW_375617/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="npa-link"
                >
                  СанПиН 1.2.3685-21, Прил. №2 
                </a>;{' '}
                <a 
                  href="https://www.consultant.ru/document/cons_doc_LAW_114247/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="npa-link"
                >
                  ПП РФ №354, Прил. №1
                </a>
              </p>
            </>
          )
        },
        {
          id: 'q12',
          q: 'Батареи еле тёплые, а УК говорит «по норме»?',
          a: (
            <>
              <p>Требуйте замеры температуры и составления акта. При отклонении - перерасчет (-0,15% платы за каждый час)</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a 
                  href="https://www.consultant.ru/document/cons_doc_LAW_114247/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="npa-link"
                >
                  ПП РФ №354, п. 104–108 
                </a>;{' '}
                <a 
                  href="https://www.consultant.ru/document/cons_doc_LAW_51057/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="npa-link"
                >
                  ЖК РФ ст. 157
                </a>
              </p>
            </>
          )
        },
        {
          id: 'q13',
          q: 'Из крана идёт ржавая вода - куда жаловаться?',
          a: (
            <>
              <p>Подайте заявку в УК на проверку качества воды. При подтверждении нарушения - требуйте перерасчета. Параллельно - жалоба в Роспотребнадзор.</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a href="https://www.consultant.ru/document/cons_doc_LAW_114247/" target="_blank" rel="noreferrer" className="npa-link">ПП РФ №354, Прил. №1</a>
              </p>
            </>
          )
        },
        {
          id: 'q14',
          q: 'Как часто могут отключать горячую воду летом?',
          a: (
            <>
              <p>Плановое отключение - до 14 дней в году суммарно; аварийное - не более 4 часов единовременно.</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a href="https://www.consultant.ru/document/cons_doc_LAW_114247/" target="_blank" rel="noreferrer" className="npa-link">ПП РФ №354, Прил. №1, п. 4</a>
              </p>
            </>
          )
        },
        {
          id: 'q15',
          q: 'Нет воды дольше допустимого перерыва что делать?',
          a: (
            <>
              <p>Допустимые перерывы: ХВС - 8 часов/мес (не более 4 ч единовременно), ГВС - 4 часа. При превышении - требуйте перерасчета.</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a 
                  href="https://www.consultant.ru/document/cons_doc_LAW_114247/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="npa-link"
                >
                  ПП РФ №354, Прил. №1, п. 3–4 
                </a>;{' '}
                <a 
                  href="https://www.consultant.ru/document/cons_doc_LAW_51057/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="npa-link"
                >
                  ЖК РФ ст. 157 ч. 9–10
                </a>
              </p>
            </>
          )
        }
      ]
    },
    {
      id: 'section3',
      title: 'Управляющая компания и соседи',
      questions: [
        {
          id: 'q16',
          q: 'Кто должен убирать в подъезде и как часто?',
          a: (
            <>
              <p>УК/ТСЖ обязаны убирать места общего пользования. Минимум: влажная уборка - 1 раз в 3–5 дней, мытьё окон - 1 раз в год, уборка прилегающей территории - ежедневно.</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a href="https://www.consultant.ru/document/cons_doc_LAW_144804/" target="_blank" rel="noreferrer" className="npa-link">Постановление Правительства №290</a>
              </p>
            </>
          )
        },
        {
          id: 'q17',
          q: 'Как сменить управляющую компанию?',
          a: (
            <>
              <p>Проведите ОСС (общее собрание собственников): решение принимается &gt;50% голосов за смену УК. Протокол направьте в ГЖИ и новую УК.</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a href="https://www.consultant.ru/document/cons_doc_LAW_51057/14e9738be002fe3ab76c0d580b863aac1ac65fb7/" target="_blank" rel="noreferrer" className="npa-link">ЖК РФ ст. 161, 162</a>
              </p>
            </>
          )
        },
        {
          id: 'q18',
          q: 'Кто отвечает за замену стояков ХВС/ГВС?',
          a: (
            <>
              <p>Стояки до первого отключающего устройства - общее имущество, заменяет УК/РСО за счёт средств на содержание жилья или капремонт. Разводка внутри квартиры - за счёт собственника.</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a href="https://www.consultant.ru/document/cons_doc_LAW_62293/" target="_blank" rel="noreferrer" className="npa-link">ПП РФ №491</a>
              </p>
            </>
          )
        },
        {
          id: 'q19',
          q: 'Соседи залили квартиру и отказываются платить - что делать?',
          a: (
            <>
              <p>Зафиксируйте ущерб актом (с УК/соседями), направьте досудебную претензию, при отказе - иск в суд + независимая оценка ущерба. У нас можно {/* ПЕРЕХОД: Ссылка на документы */} сформировать документ.</p>
            </>
          )
        },
        {
          id: 'q20',
          q: 'Может ли УК навязывать дополнительные услуги (консьерж, охрана)?',
          a: (
            <>
              <p>Нет. Дополнительные услуги вводятся только по решению ОСС (большинством голосов). Если услуга включена в квитанцию без собрания - требуйте исключения и перерасчета.</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a href="https://www.ksrf.ru/doc/KSRFDecision804093.pdf" target="_blank" rel="noreferrer" className="npa-link">Постановление КС РФ</a>
              </p>
            </>
          )
        }
      ]
    },
    {
      id: 'section4',
      title: 'Капитальный ремонт',
      questions: [
        {
          id: 'q21',
          q: 'Что входит в капитальный ремонт в Дагестане?',
          a: (
            <>
              <p>Согласно перечню, утвержденному законом Республики Дагестан от 9 июля 2013 года №57, в капитальный ремонт общего имущества в многоквартирных домах в Дагестане входят: Ремонт инженерных систем (электро-, тепло-, газо-, водоснабжение, водоотведение); Ремонт/замена лифтового оборудования; Ремонт крыши, подвалов, фасада, фундамента; Разработка проектной документации и строительный контроль.</p>
              <p className="npa-row">
                <span className="npa-abbr">НПА:</span>{' '}
                <a href="https://docs.cntd.ru/document/460155234" target="_blank" rel="noreferrer" className="npa-link">Закон РД №57 от 09.07.2013</a>
              </p>
            </>
          )
        },
        {
          id: 'q22',
          q: 'Нужно ли платить взносы на капремонт, если дом новый?',
          a: (
            <>
              <p>Да, обязанность возникает с момента включения дома в региональную программу. Льгота (освобождение на 3–5 лет) - только если дом введен в эксплуатацию после утверждения программы и включён в неё позже.</p>
              <p className="npa-row">
                <span className="npa-abbr">Источник:</span>{' '}
                <a href="https://dagfkr.ru/dolzhny-li-platit-vznosy-na-kapremont-sobstvenniki-kvartir-v-novostrojkah/" target="_blank" rel="noreferrer" className="npa-link">ФКР Дагестана</a>
              </p>
            </>
          )
        }
      ]
    }
  ];

  return (
    <section className="page-section">
      <div className="section-inner">
        <div className="page-header">
          <h1>Часто задаваемые вопросы</h1>
          <p className="page-subtitle">Подробная база знаний со ссылками на законодательство</p>
          <a
            href={zhkhGlossaryPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="faq-top-link"
          >
            Открыть словарь терминов ЖКХ
          </a>
        </div>

        <div className="faq-container">
          {categories.map(category => (
            <div key={category.id} className="faq-category">
              <button 
                className={`faq-category-header ${expandedCategory === category.id ? 'open' : ''}`}
                onClick={() => toggleCategory(category.id)}
              >
                <h3>{category.title}</h3>
                <span className="category-arrow">▼</span>
              </button>

              {expandedCategory === category.id && (
                <div className="faq-items">
                  {category.questions.map(question => (
                    <div key={question.id} className="faq-item">
                      <button 
                        className={`faq-question ${expandedItems[question.id] ? 'open' : ''}`}
                        onClick={() => toggleItem(question.id)}
                      >
                        <span className="faq-q-text">{question.q}</span>
                        <span className="faq-arrow">+</span>
                      </button>
                      {expandedItems[question.id] && (
                        <div className="faq-answer">
                          {question.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
