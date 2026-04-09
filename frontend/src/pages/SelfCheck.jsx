import React, { useEffect, useState } from 'react';
import '../styles/selfcheck.css';
import courtReminderPdf from '../reminders/Kak-opredelit-svoj-sud.pdf';

export default function SelfCheck({ subsection, onPageChange }) {
  const [selectedCategory, setSelectedCategory] = useState('fix');
  const [activeTab, setActiveTab] = useState('steps');
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleItemLinkClick = (event, item) => {
    if (item.link !== '#') return;

    event.preventDefault();

    if (!onPageChange) return;

    if (item.id === 'ptc1') {
      onPageChange('documents', 'pretenziya');
      return;
    }

    if (item.id === 'c3') {
      onPageChange('documents', 'claim');
      return;
    }

    if (item.id === 'f1' || item.id === 'ptc3') {
      onPageChange('contacts');
    }
  };

 const checklistCategories = [
    {
      id: 'fix',
      name: 'Зафиксируйте нарушение',
      items: [
        {
          id: 'f1',
          title: 'Позвоните в диспетчерскую службу вашей УК/ТСЖ, оставьте заявку',
          tip: 'Запишите номер заявки, дату, время и фамилию оператора',
          link: '#',
          linkText: 'Найти контакты своего УК/ТСЖ можно в разделе "Контакты"'
        },
        {
          id: 'f2',
          title: 'Потребуйте составления акта осмотра',
          tip: 'Если представитель не пришёл составьте акт сами с двумя соседями-свидетелями.В акте укажите: адрес, дату, время, суть проблемы (например, «протечка крыши», «нет горячей воды 5 дней»), подписи свидетелей',
          link: '',
          linkText: ''
        },
        {
          id: 'f3',
          title: 'Сделайте фото и видео нарушения',
          tip: 'Важно, чтобы на записи была видна дата и адрес дома',
          link: '',
          linkText: ''
        }
        ,
        {
          id: 'f4',
          title: 'Сохраните все чеки',
          tip: 'Если понесли расходы из-за нарушения (ремонт, покупка оборудования, испорченные вещи)',
          link: '',
          linkText: ''
        }
      ]
    },
    {
      id: 'pre-trial_claim',
      name: 'Направьте досудебную претензию',
      items: [
        {
          id: 'ptc1',
          title: 'Напишите претензию в свободной форме',
          tip: 'Кто вы, что произошло, чего требуете (устранить нарушение, вернуть деньги, выплатить компенсацию)',
          link: '#',
          linkText: 'Составить досудебную претензию можно в разделе "Формирование документов"'
        },
        {
          id: 'ptc2',
          title: 'Приложите копии документов',
          tip: 'Акт осмотра, фото, чеки, справка из УК',
          link: '',
          linkText: ''
        },
        {
          id: 'ptc3',
          title: 'Отправьте претензию в УК',
          tip: 'Отправить можно Почтой России заказным письмом с описью вложения и уведомлением о вручении, через ГИС ЖКХ или на официальный email УК. Сохраните почтовую квитанцию и опись - это доказательство для суда. Ждите ответа до 30 дней',
          link: '#',
          linkText: 'Найти email своего УК можно в разделе "Контакты"'
        }
      ]
    },
    {
      id: 'prepare_for_trial',
      name: 'Если претензию проигнорировали или отказали - готовьтесь к суду',
      items: [
        {
          id: 'pft1',
          title: 'Закажите независимую экспертизу, если нужно оценить ущерб (залив, поломка техники)',
          tip: 'Эксперт должен иметь лицензию',
          link: '',
          linkText: ''
        },
        {
          id: 'pft2',
          title: 'Уведомите ответчика об осмотре эксперта',
          tip: 'Отправьте телеграмму или заказное письмо за 3–5 дней до визита эксперта',
          link: '',
          linkText: ''
        }
        ,
        {
          id: 'pft3',
          title: 'Получите письменный отчёт эксперта с расчётом суммы ущерба',
          tip: '',
          link: '',
          linkText: ''
        }
      ]
    },
    {
      id: 'claim',
      name: 'Подайте иск в суд',
      items: [
        {
          id: 'c1',
          title: 'Определите свой суд',
          tip: '',
          link: courtReminderPdf,
          linkText: 'Памятка по определению суда'
        },
        {
          id: 'c2',
          title: 'Рассчитайте госпошлину',
          tip: '',
          link: 'https://calc.consultant.ru/gosposhlina-soj',
          linkText: 'Рассчитать госпошлину на сайте "Консультант Плюс"'
        },
        {
          id: 'c3',
          title: 'Составьте и подайте иск',
          tip: '',
          link: '#',
          linkText: 'Составить иск можно в разделе "Формирование документов"'
        }
      ]
    },
    {
      id: 'trial',
      name: 'Участвуйте в суде',
      items: [
        {
          id: 't1',
          title: 'Приходите на заседания',
          tip: 'Если не можете направьте письменное ходатайство о рассмотрении без вас или отправьте представителя',
          link: '',
          linkText: ''
        },
        {
          id: 't2',
          title: 'Предоставляйте суду оригиналы документов, если попросят',
          tip: '',
          link: '',
          linkText: ''
        }
      ]
    },
  ];

  // Получаем все пункты из всех категорий для общего чек-листа
  const getAllItems = () => {
    const allItems = [];
    checklistCategories.forEach(category => {
      category.items.forEach(item => {
        allItems.push({
          ...item,
          categoryName: category.name,
          categoryId: category.id
        });
      });
    });
    return allItems;
  };

  const allItems = getAllItems();
  const totalAllItems = allItems.length;
  const checkedAllCount = allItems.filter(item => checkedItems[item.id]).length;
  const totalAllPercent = totalAllItems > 0 ? Math.round((checkedAllCount / totalAllItems) * 100) : 0;

  useEffect(() => {
    if (subsection === 'representative') {
      setActiveTab('representative');
      return;
    }

    const availableCategories = new Set(checklistCategories.map(category => category.id));
    if (subsection && availableCategories.has(subsection)) {
      setActiveTab('steps');
      setSelectedCategory(subsection);
    }
  }, [subsection]);

 // Функция экспорта общего чек-листа в Word
  const downloadFullChecklistAsWord = () => {
    const currentDate = new Date().toLocaleDateString('ru-RU');
    
    // Группируем пункты по категориям для экспорта
    let categoriesHtml = '';
    checklistCategories.forEach(category => {
      const categoryItems = category.items;
      const categoryCheckedCount = categoryItems.filter(item => checkedItems[item.id]).length;
      const categoryTotalCount = categoryItems.length;
      const categoryPercent = categoryTotalCount > 0 ? Math.round((categoryCheckedCount / categoryTotalCount) * 100) : 0;
      
      let itemsHtml = '';
      categoryItems.forEach(item => {
        const isChecked = checkedItems[item.id] || false;
        
        itemsHtml += `
          <div style="margin-bottom: 15px; padding: 8px; border-left: 3px solid ${isChecked ? '#4CAF50' : '#FF9800'}; background: ${isChecked ? '#f9fff9' : '#fff'};">
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
              <span style="font-size: 16px; margin-right: 8px;">${isChecked ? '✅' : '⬜'}</span>
              <strong style="font-size: 13px;">${item.title}</strong>
            </div>
            ${item.tip ? `<div style="margin-left: 24px; font-size: 11px; font-style: italic;">${item.tip}</div>` : ''}
            ${item.link ? `<div style="margin-left: 24px; font-size: 11px; margin-top: 4px;">🔗 <a href="${item.link}" style="color: #2c7da0;">${item.linkText || 'Ссылка'}</a></div>` : ''}
          </div>
        `;
      });
      
      categoriesHtml += `
        <div style="margin-bottom: 30px;">
          <div style="background: #f0f0f0; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
            <h3 style="margin: 0;">${category.name}</h3>
            <div style="font-size: 12px; margin-top: 5px;">
              Выполнено: ${categoryCheckedCount} из ${categoryTotalCount} (${categoryPercent}%)
            </div>
          </div>
          ${itemsHtml}
        </div>
      `;
    });
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Полный чек-лист подготовки к суду</title>
        <style>
          body {
            font-family: 'Calibri', 'Arial', sans-serif;
            margin: 40px;
            line-height: 1.4;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #333;
          }
          h1 {
            margin-bottom: 10px;
          }
          .meta {
            color: #666;
            font-size: 12px;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ccc;
            font-size: 11px;
            color: #999;
            text-align: center;
          }
          a {
            color: #2c7da0;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Полный чек-лист подготовки к суду</h1>
          <div class="meta">Дата создания: ${currentDate}</div>
        </div>

        ${categoriesHtml}
        
        <div class="footer">
          Сгенерировано в разделе самопроверки системы ЖКХ помощник<br>
          * Отмеченные ✅ пункты уже выполнены<br>
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const fileName = `Полный_чеклист_подготовки_к_суду_${currentDate}.doc`;
    
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Функция экспорта текущего раздела в Word
  const downloadChecklistAsWord = () => {
    const currentCategory = checklistCategories.find(c => c.id === selectedCategory);
    const currentItemIds = currentCategory?.items.map(item => item.id) || [];
    const checkedCountInCurrent = currentItemIds.filter(id => checkedItems[id]).length;
    const totalCount = currentCategory?.items.length || 0;
    const completionPercent = totalCount > 0 ? Math.round((checkedCountInCurrent / totalCount) * 100) : 0;
    
    const currentDate = new Date().toLocaleDateString('ru-RU');
    
    let itemsHtml = '';
    currentCategory?.items.forEach(item => {
      const isChecked = checkedItems[item.id] || false;
     
      itemsHtml += `
        <div style="margin-bottom: 20px; padding: 10px; border-left: 4px solid ${isChecked ? '#4CAF50' : '#FF9800'}; background: ${isChecked ? '#f0f8f0' : '#fff'};">
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 18px; margin-right: 10px;">${isChecked ? '✅' : '⬜'}</span>
            <strong style="font-size: 14px;">${item.title}</strong>
          </div>
          ${item.tip ? `<div style="margin-left: 28px; font-size: 12px;font-style: italic;">${item.tip}</div>` : ''}
          ${item.link ? `<div style="margin-left: 28px; font-size: 12px; margin-top: 5px;"> <a href="${item.link}" style="color: #2c7da0;">${item.linkText || 'Ссылка'}</a></div>` : ''}
        </div>
      `;
    });
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Чек-лист: ${currentCategory?.name}</title>
        <style>
          body {
            font-family: 'Calibri', 'Arial', sans-serif;
            margin: 40px;
            line-height: 1.5;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #333;
          }
          h1 {
            color: #2c3e50;
            margin-bottom: 10px;
          }
          .meta {
            color: #666;
            font-size: 12px;
          }
          .status {
            font-size: 14px;
            font-weight: bold;
            margin-top: 10px;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ccc;
            font-size: 11px;
            color: #999;
            text-align: center;
          }
          a {
            color: #2c7da0;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Чек-лист: ${currentCategory?.name}</h1>
          <div class="meta">Дата создания: ${currentDate}</div>
        </div>
               
        <h2>Список задач:</h2>
        ${itemsHtml}
        
        <div class="footer">
          Сгенерировано в разделе самопроверки системы ЖКХ помощник<br>
          * Отмеченные ✅ пункты уже выполнены
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const fileName = `Чеклист_${currentCategory?.name.replace(/[^а-яА-Яa-zA-Z0-9]/g, '_')}_${currentDate}.doc`;
    
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  const currentCategory = checklistCategories.find(c => c.id === selectedCategory);
  const totalCount = currentCategory?.items.length || 0;
  const currentItemIds = currentCategory?.items.map(item => item.id) || [];
  const checkedCountInCurrent = currentItemIds.filter(id => checkedItems[id]).length;
  const completionPercent = totalCount > 0 ? Math.round((checkedCountInCurrent / totalCount) * 100) : 0;

  return (
    <section className="page-section">
      <div className="section-inner">
        <div className="page-header">
          <div>
            <div>
              <h1>Самопроверка</h1>
              <p className="page-subtitle">Этот раздел поможет Вам пройти путь от фиксации факта нарушения до суда с соблюдением всех необходимых требований.</p>
               <button 
              onClick={downloadFullChecklistAsWord}
              className="download-full-btn"
            >
              Скачать полный чек-лист (Word)
            </button>
            </div>
          </div>
        </div>

        <div className="selfcheck-container">
          <div className="check-nav">
            <div className="check-nav-title">
              <h3>Шаги</h3>
              <div className="steps-info-tooltip" tabIndex="0" aria-label="Подсказка о шагах">
                <span className="steps-info-icon" aria-hidden="true">i</span>
                <div className="steps-info-bubble" role="tooltip">
                  Каждый шаг - самостоятельный этап, но выполнение всех этапов последовательно повышает шансы на успех.
                </div>
              </div>
            </div>
            <div className="check-nav-buttons">
              {checklistCategories.map(cat => {
                const catItems = cat.items;
                const catChecked = catItems.filter(item => checkedItems[item.id]).length;
                const catPercent = catItems.length > 0 ? Math.round((catChecked / catItems.length) * 100) : 0;
                
                return (
                  <button
                    key={cat.id}
                    className={`check-nav-btn ${activeTab === 'steps' && selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab('steps');
                      setSelectedCategory(cat.id);
                    }}
                  >
                    <span className="nav-text">{cat.name}</span>
                    <span className="nav-percent">{catPercent}%</span>
                  </button>
                );
              })}
            </div>
            <div className="check-nav-divider"></div>
            <button
              className={`check-nav-btn check-nav-info-btn ${activeTab === 'representative' ? 'active' : ''}`}
              onClick={() => setActiveTab('representative')}
            >
              <span className="nav-text">Как действовать через представителя?</span>
            </button>
          </div>

          <div className="check-content">
            {activeTab === 'representative' ? (
              <div className="representative-guide">
                <h2>Как действовать через представителя?</h2>
                <p>
                  Спор с управляющей компанией через представителя это стандартная и часто более эффективная практика,
                  чем самостоятельное ведение дела.
                </p>
                <p>
                  Представителем может быть юрист, адвокат или просто доверенное лицо, если у него есть надлежащим
                  образом оформленная доверенность.
                </p>

                <h3>1. Оформление полномочий представителя</h3>
                <h4>Доверенность</h4>
                <p>
                  Для суда: доверенность должна быть нотариально удостоверена. В ней должны быть четко прописаны
                  полномочия: право на подачу иска, изменение требований, подписание мирового соглашения, получение
                  решений/определений, обжалование.
                </p>
                <p>
                  Для досудебного порядка: часто достаточно простой письменной формы, но многие госорганы требуют
                  нотариальную доверенность или доверенность, заверенную по месту работы/учебы/лечения собственника.
                  Лучше сразу делать нотариальную, чтобы избежать отказов в приеме документов.
                </p>

                <h3>Какие споры чаще всего решаются через представителя?</h3>
                <ul>
                  <li>
                    Перерасчет коммунальных платежей: некачественные услуги (холодная вода, отопление), отсутствие услуг
                    в период отъезда (если были основания).
                  </li>
                  <li>
                    Устранение недостатков общего имущества: протечки, плесень в подъезде, сломанный лифт, отсутствие
                    освещения.
                  </li>
                  <li>
                    Оспаривание решений общих собраний собственников: если УК манипулировала голосами или нарушила
                    процедуру.
                  </li>
                  <li>
                    Взыскание ущерба: затопление квартиры по вине УК (прорыв стояка), падение сосульки на машину и т.д.
                  </li>
                  <li>
                    Навязанные услуги: включение в квитанцию услуг, на которые не было согласия собственников.
                  </li>
                </ul>

                <h3>Преимущества использования представителя</h3>
                <ul>
                  <li>
                    Профессионализм: юрист знает, какие нормы закона применять, как правильно формулировать требования,
                    чтобы их не отклонили.
                  </li>
                  <li>Экономия времени: вам не нужно ходить в суды, писать жалобы, отслеживать сроки.</li>
                  <li>Объективность: представитель действует без эмоций, что важно в переговорах и суде.</li>
                  <li>
                    Правильное оформление документов: ошибки в иске или доверенности могут привести к оставлению
                    заявления без движения или возвращению.
                  </li>
                </ul>

                <h3>Риски и на что обратить внимание</h3>
                <ul>
                  <li>
                    Стоимость услуг: услуги юриста могут стоить дорого. Оцените, соразмерна ли сумма спора расходам на
                    представителя. Однако по делам о защите прав потребителей можно взыскать судебные расходы с УК в
                    случае победы.
                  </li>
                  <li>
                    Полномочия: внимательно проверяйте текст доверенности. Там должно быть право на подписание искового
                    заявления, представление интересов в суде, получение присужденного имущества/денег.
                  </li>
                  <li>
                    Выбор представителя: лучше обращаться к юристам, специализирующимся именно на жилищном праве.
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <div className="check-header">
                  <div className="header-actions">
                    <h2>{currentCategory?.name}</h2>
                    <button 
                      onClick={downloadChecklistAsWord}
                      className="download-section-btn"
                    >
                      Скачать чек-лист (Word)
                    </button>
                  </div>
                  {selectedCategory === 'pre-trial_claim' && (
                    <div className="category-note">
                      Закон не обязывает писать претензию, если этого нет в договоре - можно сразу подавать иск.
                      Однако на практике "досудебка" часто экономит время и нервы: возможно, спор решится без участия
                      суда, а если нет, то претензия станет документальным подтверждением попытки урегулировать конфликт.
                    </div>
                  )}
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${completionPercent}%` }}></div>
                  </div>
                  <p className="progress-text">{checkedCountInCurrent} из {totalCount} пунктов ({completionPercent}%)</p>
                </div>

                <div className="checklist">
                  {currentCategory?.items.map(item => (
                    <div 
                      key={item.id} 
                      className={`check-item importance-${'medium'} ${checkedItems[item.id] ? 'checked' : ''}`}
                    >
                      <label className="check-label">
                        <input 
                          type="checkbox"
                          checked={checkedItems[item.id] || false}
                          onChange={() => toggleCheck(item.id)}
                          className="check-input"
                        />
                        <span className="check-box"></span>
                        <span className="check-text">
                          <strong>{item.title}</strong>
                          <div className="check-tip">
                            {item.tip}
                            {item.link && (
                              <div className="check-link">
                                <a 
                                  href={item.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  onClick={(event) => handleItemLinkClick(event, item)}
                                >
                                  {item.linkText || 'Открыть ссылку'}
                                </a>
                              </div>
                            )}
                          </div>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="selfcheck-footer">
          <div className="footer-tips">
            <div className="footer-tips-grid">
              <div className="footer-tip-card">
                <h5>Что можно взыскать сверх ущерба</h5>
                <ul>
                  <li>Неустойку (пени) за каждый день просрочки выполнения требований</li>
                  <li>Компенсацию морального вреда (обычно 5–30 тыс. руб., по усмотрению суда)</li>
                  <li>Расходы на экспертизу, почтовые отправления, услуги юриста</li>
                </ul>
              </div>
              <div className="footer-tip-card">
                <h5>Сроки, которые важно помнить</h5>
                <ul>
                  <li>Срок исковой давности: 3 года с момента нарушения</li>
                  <li>Ответ на претензию: 10–30 дней</li>
                  <li>Уведомление об экспертизе: за 3–5 дней до осмотра</li>
                  <li>Вступление решения суда в силу: 1 месяц (если нет обжалования)</li>
                </ul>
              </div>
              <div className="footer-tip-card">
                <h5>Главные ошибки, которых надо избегать</h5>
                <ul>
                  <li>Не зафиксировали нарушение актом или фото сложно доказать вину ответчика</li>
                  <li>Не уведомили ответчика об экспертизе  суд назначит повторную экспертизу, дело затянется</li>
                  <li>Ошиблись с ответчиком  иск вернут, потеряете время</li>
                  <li>Пропустили срок подачи иска дело прекратят</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
