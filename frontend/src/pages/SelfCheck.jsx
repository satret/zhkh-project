import React, { useState } from 'react';
import '../styles/selfcheck.css';

export default function SelfCheck() {
  const [selectedCategory, setSelectedCategory] = useState('fix');
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

 const checklistCategories = [
    {
      id: 'fix',
      name: 'Фиксация нарушений',
      items: [
        {
          id: 'f1',
          title: 'Заявка в УК',
          tip: 'Зарегистрируйте заявку в аварийно-диспетчерской службе',
          link: '',
          linkText: '',
          importance: 'high'
        },
        {
          id: 'f2',
          title: 'Акт осмотра',
          tip: 'Укажите адрес, дату, время, суть проблемы (например, «протечка крыши», «нет горячей воды 5 дней»), соберите подписи свидетелей.',
          link: '',
          linkText: '',
          importance: 'high'
        },
        {
          id: 'f3',
          title: 'Фото и видео подтверждения',
          tip: 'Если есть',
          link: '',
          linkText: '',
          importance: 'medium'
        },
        {
          id: 'f4',
          title: 'Чеки',
          tip: 'Если были расходы',
          link: '',
          linkText: '',
          importance: 'medium'
        }
      ]
    },
    {
      id: 'choice_of_court',
      name: 'Определение суда, в который необходимо обратиться',
      items: [
        {
          id: 'coc1',
          title: 'Определите суд, в который будете обращаться',
          tip: 'Иск подается по месту нахождения ответчика или по месту жительства истца',
          link: 'https://податьвсуд.рф/справочник-судов/дагестан/районные',
          linkText: 'Определить свой суд можно по ссылке',
          importance: 'high'
        }
      ]
    },
    {
      id: 'pre-trial_claim',
      name: 'Досудебная претензия',
      items: [
        {
          id: 'ptc1',
          title: 'Составить претензию',
          tip: 'Укажите требования и срок для ответа (обычно 10-30 дней)',
          link: '',
          linkText: '',
          importance: 'high'
        },
        {
          id: 'ptc2',
          title: 'Отправить заказным письмом',
          tip: 'Сохраните квитанцию и опись вложения',
          link: '',
          linkText: '',
          importance: 'high'
        }
      ]
    },
    {
      id: 'claim',
      name: 'Иск',
      items: [
        {
          id: 'c1',
          title: 'Составить исковое заявление',
          tip: 'По требованиям ст. 131-132 ГПК РФ',
          link: '',
          linkText: '',
          importance: 'high'
        },
        {
          id: 'c2',
          title: 'Приложить все доказательства',
          tip: 'Копии документов по количеству участников процесса',
          link: '',
          linkText: '',
          importance: 'high'
        }
      ]
    },
    {
      id: 'duty',
      name: 'Госпошлина',
      items: [
        {
          id: 'd1',
          title: 'Рассчитайте госпошлину',
          tip: '',
          link: 'https://calc.consultant.ru/gosposhlina-soj',
          linkText: 'Рассчитать госпошлину на сайте Консультант+',
          importance: 'medium'
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
        const importanceText = item.importance === 'high' ? 'Критично' : (item.importance === 'medium' ? 'Важно' : 'Обычно');
        
        itemsHtml += `
          <div style="margin-bottom: 15px; padding: 8px; border-left: 3px solid ${isChecked ? '#4CAF50' : '#FF9800'}; background: ${isChecked ? '#f9fff9' : '#fff'};">
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
              <span style="font-size: 16px; margin-right: 8px;">${isChecked ? '✅' : '⬜'}</span>
              <strong style="font-size: 13px;">${item.title}</strong>
              <span style="margin-left: 8px; font-size: 11px; ">${importanceText}</span>
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
      const importanceText = item.importance === 'high' ? 'Критично' : (item.importance === 'medium' ? 'Важно' : 'Обычно');
      
      itemsHtml += `
        <div style="margin-bottom: 20px; padding: 10px; border-left: 4px solid ${isChecked ? '#4CAF50' : '#FF9800'}; background: ${isChecked ? '#f0f8f0' : '#fff'};">
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 18px; margin-right: 10px;">${isChecked ? '✅' : '⬜'}</span>
            <strong style="font-size: 14px;">${item.title}</strong>
            <span style="margin-left: 10px; font-size: 12px;">${importanceText}</span>
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
              <p className="page-subtitle">Проверьте готовность документов перед подачей в суд</p>
            </div>
          </div>
        </div>

        {/* Общий прогресс по всем разделам */}
          <div className="total-progress-wrapper">
            <div className="total-progress">
              <h3>Общий прогресс по всем разделам</h3>
              <div className="total-progress-percent">{totalAllPercent}%</div>
              <div className="total-progress-text">
                Выполнено {checkedAllCount} из {totalAllItems} пунктов
              </div>
              <button 
              onClick={downloadFullChecklistAsWord}
              className="download-full-btn"
            >
              Скачать полный чек-лист (Word)
            </button>
            </div>
          </div>

        <div className="selfcheck-container">
          <div className="check-nav">
            <h3>Категории проверки</h3>
            <div className="check-nav-buttons">
              {checklistCategories.map(cat => {
                const catItems = cat.items;
                const catChecked = catItems.filter(item => checkedItems[item.id]).length;
                const catPercent = catItems.length > 0 ? Math.round((catChecked / catItems.length) * 100) : 0;
                
                return (
                  <button
                    key={cat.id}
                    className={`check-nav-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span className="nav-text">{cat.name}</span>
                    <span className="nav-percent">{catPercent}%</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="check-content">
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
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${completionPercent}%` }}></div>
              </div>
              <p className="progress-text">{checkedCountInCurrent} из {totalCount} пунктов ({completionPercent}%)</p>
            </div>

            <div className="checklist">
              {currentCategory?.items.map(item => (
                <div 
                  key={item.id} 
                  className={`check-item importance-${item.importance} ${checkedItems[item.id] ? 'checked' : ''}`}
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
                      {item.importance === 'high' && <span className="importance-badge">Критично</span>}
                      {item.importance === 'medium' && <span className="importance-badge">Важно</span>}
                      <div className="check-tip">
                        {item.tip}
                        {item.link && (
                          <div className="check-link">
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
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
          </div>
        </div>
      </div>
    </section>
  );
}