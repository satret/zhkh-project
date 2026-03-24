import React, { useState } from 'react';
import '../styles/pages.css';

export default function SelfCheck() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const checklistCategories = [
    {
      id: 'general',
      name: 'Общие требования к документам',
      icon: '📋',
      items: [
        {
          id: 'g1',
          title: 'Все ФИО указаны полностью',
          tip: 'Используйте данные из паспорта, без сокращений',
          importance: 'high'
        },
        {
          id: 'g2',
          title: 'Адрес дома совпадает с паспортом и лицевым счётом',
          tip: 'Даже малейшие расхождения могут привести к отказу',
          importance: 'high'
        },
        {
          id: 'g3',
          title: 'Указаны номер квартиры и лицевого счета',
          tip: 'Найдите в квитанции ЖКХ',
          importance: 'high'
        },
        {
          id: 'g4',
          title: 'Контактный телефон и e-mail (если требуется)',
          tip: 'Позволит суду связаться с вами при необходимости',
          importance: 'medium'
        },
        {
          id: 'g5',
          title: 'Документы напечатаны на бумаге формата А4',
          tip: 'Нестандартные форматы могут не приняться в суде',
          importance: 'medium'
        },
        {
          id: 'g6',
          title: 'Все документы оригиналы или заверенные копии',
          tip: 'Ксерокопии нужно заверить у нотариуса',
          importance: 'high'
        }
      ]
    },
    {
      id: 'claims',
      name: 'Исковое заявление',
      icon: '⚖️',
      items: [
        {
          id: 'c1',
          title: 'Четко определены требования (конкретная сумма)',
          tip: 'Суд не может присудить больше, чем вы просите',
          importance: 'high'
        },
        {
          id: 'c2',
          title: 'Указаны обстоятельства нарушения',
          tip: 'Кто, что, когда, где и почему нарушил закон',
          importance: 'high'
        },
        {
          id: 'c3',
          title: 'Приложены ссылки на законы и нормативные акты',
          tip: 'Жилищный кодекс РФ, ПП №354, ПП №290 и др.',
          importance: 'high'
        },
        {
          id: 'c4',
          title: 'Все доказательства перечислены и приложены',
          tip: 'Квитанции, акты, переписка, фотографии, экспертизы',
          importance: 'high'
        },
        {
          id: 'c5',
          title: 'Указана неправомерность действий ответчика',
          tip: 'Покажите, какой закон нарушила УК',
          importance: 'high'
        },
        {
          id: 'c6',
          title: 'Указано расчетное обоснование суммы',
          tip: 'Как вы пришли к этой цифре (документооборот, расчеты)',
          importance: 'high'
        }
      ]
    },
    {
      id: 'evidence',
      name: 'Доказательства',
      icon: '🔍',
      items: [
        {
          id: 'e1',
          title: 'Квитанции об оплате за 12 месяцев',
          tip: 'Подтверждают, что вы добросовестно платили',
          importance: 'high'
        },
        {
          id: 'e2',
          title: 'Акты о выявленных дефектах / нарушениях',
          tip: 'Составлены в присутствии представителя УК и соседей',
          importance: 'high'
        },
        {
          id: 'e3',
          title: 'Переписка с УК (письма, SMS, e-mail)',
          tip: 'Все обращения с датами и ответами',
          importance: 'high'
        },
        {
          id: 'e4',
          title: 'Фотографии и видео нарушений',
          tip: 'С датой съемки, видно масштаб проблемы',
          importance: 'medium'
        },
        {
          id: 'e5',
          title: 'Справки из организаций (МЖД, МУП, соседей)',
          tip: 'Подтверждающие факты нарушений или убытков',
          importance: 'high'
        },
        {
          id: 'e6',
          title: 'Независимая экспертиза (если требуется)',
          tip: 'При материальном ущербе или качественных нарушениях',
          importance: 'medium'
        },
        {
          id: 'e7',
          title: 'Выписка из протокола общего собрания',
          tip: 'Если решение собрания является основанием требования',
          importance: 'medium'
        }
      ]
    },
    {
      id: 'pretension',
      name: 'Претензия (досудебное урегулирование)',
      icon: '⚠️',
      items: [
        {
          id: 'p1',
          title: 'Претензия отправлена ДО подачи в суд',
          tip: 'Это обязательный этап для большинства споров',
          importance: 'high'
        },
        {
          id: 'p2',
          title: 'Претензия отправлена заказным письмом',
          tip: 'Простое письмо не будет принято в суде как доказательство',
          importance: 'high'
        },
        {
          id: 'p3',
          title: 'Получена расписка о получении претензии',
          tip: 'Или ответ от компании (согласие/отказ)',
          importance: 'high'
        },
        {
          id: 'p4',
          title: 'Задана конкретная сумма требований',
          tip: 'С расчетом и ссылками на документы',
          importance: 'high'
        },
        {
          id: 'p5',
          title: 'Установлен срок ответа (7-14 дней)',
          tip: 'Суд может отказать в иске, если сроки не соблюдены',
          importance: 'high'
        }
      ]
    },
    {
      id: 'procedure',
      name: 'Процедурные требования',
      icon: '📑',
      items: [
        {
          id: 'pr1',
          title: 'Известен правильный суд (мировой или районный)',
          tip: 'До 100 000 ₽ — мировой судья, свыше — районный суд',
          importance: 'high'
        },
        {
          id: 'pr2',
          title: 'Установлена подсудность (по адресу ответчика)',
          tip: 'Чаще всего это Киров, если УК там зарегистрирована',
          importance: 'high'
        },
        {
          id: 'pr3',
          title: 'Рассчитана судебная пошлина',
          tip: 'Зависит от суммы иска. Можно потребовать компенсацию',
          importance: 'medium'
        },
        {
          id: 'pr4',
          title: 'Иск подан в трёх экземплярах',
          tip: 'Один суду, два — ответчику и истцу',
          importance: 'high'
        },
        {
          id: 'pr5',
          title: 'Есть номер телефона и адрес ответчика',
          tip: 'Для надлежащего вручения документов',
          importance: 'high'
        }
      ]
    },
    {
      id: 'special',
      name: 'Специальные требования',
      icon: '⭐',
      items: [
        {
          id: 's1',
          title: 'При требовании перерасчета ЖКУ: все подтверждающие акты',
          tip: 'Акты о нарушении температурного режима, водоснабжения и т.д.',
          importance: 'high'
        },
        {
          id: 's2',
          title: 'При залитии: справка о размере убытков',
          tip: 'От соседей о согласии на компенсацию или независимая экспертиза',
          importance: 'high'
        },
        {
          id: 's3',
          title: 'При нарушении качества услуг: справки МУП',
          tip: 'Подтверждающие нарушение стандартов (температура, давление и т.д.)',
          importance: 'medium'
        },
        {
          id: 's4',
          title: 'При требовании компенсации морального вреда: доказательства страданий',
          tip: 'Справки из больницы, психолога, свидетельства очевидцев',
          importance: 'medium'
        }
      ]
    }
  ];

  const currentCategory = checklistCategories.find(c => c.id === selectedCategory);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = currentCategory?.items.length || 0;
  const completionPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <section className="page-section">
      <div className="section-inner">
        <div className="page-header">
          <h1>Самопроверка перед судом</h1>
          <p className="page-subtitle">Проверьте, правильно ли заполнены все документы и собраны ли доказательства</p>
        </div>

        <div className="selfcheck-container">
          <div className="check-nav">
            <h3>Категории проверки</h3>
            <div className="check-nav-buttons">
              {checklistCategories.map(cat => (
                <button
                  key={cat.id}
                  className={`check-nav-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span className="nav-icon">{cat.icon}</span>
                  <span className="nav-text">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="check-content">
            <div className="check-header">
              <h2>{currentCategory?.name}</h2>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${completionPercent}%` }}></div>
              </div>
              <p className="progress-text">{checkedCount} из {totalCount} пунктов ({completionPercent}%)</p>
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
                      {item.importance === 'high' && <span className="importance-badge">⚠️ Критично</span>}
                      {item.importance === 'medium' && <span className="importance-badge">ℹ️ Важно</span>}
                      <div className="check-tip">{item.tip}</div>
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="selfcheck-footer">
          {completionPercent === 100 ? (
            <div className="success-message">
              <h3>✅ Отлично! Документы готовы к подаче в суд</h3>
              <p>Все пункты проверки пройдены. Ваш иск имеет хорошие шансы на успех.</p>
              <p className="small-text">Помните: судья оценивает не только документы, но и их содержание. Будьте готовы ответить на уточняющие вопросы.</p>
            </div>
          ) : completionPercent >= 70 ? (
            <div className="warning-message">
              <h3>⚠️ Почти готово</h3>
              <p>Заполните оставшиеся пункты для полноты документов.</p>
            </div>
          ) : (
            <div className="alert-message">
              <h3>📋 Требуется внимание</h3>
              <p>Заполните все пункты перед подачей в суд. Неполные документы могут привести к отказу.</p>
            </div>
          )}

          <div className="footer-tips">
            <h4>💡 Дополнительные советы:</h4>
            <ul>
              <li>Судебная пошлина для физических лиц по гражданским делам: 3% от суммы иска, но не менее 100 и не более 15 000 ₽</li>
              <li>Срок исковой давности: 3 года с момента нарушения прав</li>
              <li>Если вы выиграете дело, можете требовать компенсацию судебных издержек</li>
              <li>При наличии инвалидности или статуса малоимущего можно просить льготу на пошлину</li>
              <li>Все документы нужно подавать в оригинале или нотариально заверенных копиях</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
