import React, { useState } from 'react';
import '../styles/pages.css';

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const newsItems = [
    {
      id: 1,
      date: '20 марта 2026',
      title: 'В Дагестане повысили тарифы на отопление на 5.2% с 1 апреля',
      excerpt: 'Решение принято республиканской энергетической комиссией. Новые тарифы начнут применяться с начала нового отопительного сезона.',
      category: 'tariffs',
      importance: 'high'
    },
    {
      id: 2,
      date: '15 марта 2026',
      title: 'Новый пакет услуг для собственников жилья на портале Госуслуги',
      excerpt: 'Теперь можно подать жалобу на УК, скачать справку о регистрации и проверить статус квитанции в одном месте.',
      category: 'services',
      importance: 'medium',
    },
    {
      id: 3,
      date: '10 марта 2026',
      title: 'Судебная практика: жильцы выиграли дело о перерасчете ОДН',
      excerpt: 'Рассмотрено дело об избыточном начислении ОДН. Суд обязал УК провести перерасчет на сумму 2.3 млн рублей.',
      category: 'legal',
      importance: 'high'
    },
    {
      id: 4,
      date: '5 марта 2026',
      title: 'Рекомендация: как правильно фиксировать дефекты в квартире',
      excerpt: 'Эксперты рассказали о требованиях к оформлению актов дефектов и как они помогут в суде.',
      category: 'tips',
      importance: 'low'
    },
    {
      id: 5,
      date: '28 февраля 2026',
      title: 'Изменения в ПП РФ №354: новые правила расчета взносов на капремонт',
      excerpt: 'С 1 марта вступили в силу поправки, касающиеся расчета взносов на капитальный ремонт для домов, находящихся в программе.',
      category: 'legislation',
      importance: 'high'
    },
    {
      id: 6,
      date: '25 февраля 2026',
      title: 'Опрос: как жители республики оценивают качество услуг ЖКХ',
      excerpt: 'Результаты исследования показали, что 67% респондентов недовольны качеством отопления зимой.',
      category: 'stats',
      importance: 'low'
    },
    {
      id: 7,
      date: '20 февраля 2026',
      title: 'Новый способ оплаты ЖКХ: платежи через мобильное приложение',
      excerpt: 'Несколько крупных УК внедрили возможность оплаты через собственные приложения с функцией отслеживания статуса платежа.',
      category: 'services',
      importance: 'medium'
    }
  ];

  const categories = [
    { id: 'all', label: 'Все новости', count: newsItems.length },
    { id: 'tariffs', label: 'Тарифы', count: newsItems.filter(n => n.category === 'tariffs').length },
    { id: 'control', label: 'Контроль', count: newsItems.filter(n => n.category === 'control').length },
    { id: 'services', label: 'Сервисы', count: newsItems.filter(n => n.category === 'services').length },
    { id: 'legal', label: 'Судебная практика', count: newsItems.filter(n => n.category === 'legal').length },
    { id: 'legislation', label: 'Законодательство', count: newsItems.filter(n => n.category === 'legislation').length },
    { id: 'tips', label: 'Советы', count: newsItems.filter(n => n.category === 'tips').length },
    { id: 'stats', label: 'Статистика', count: newsItems.filter(n => n.category === 'stats').length }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(n => n.category === selectedCategory);

  const sortedNews = [...filteredNews].sort((a, b) => {
    const priorityMap = { high: 0, medium: 1, low: 2 };
    const diffPriority = priorityMap[a.importance] - priorityMap[b.importance];
    if (diffPriority !== 0) return diffPriority;
    
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  return (
    <section className="page-section">
      <div className="section-inner">
        <div className="page-header">
          <h1>Новости ЖКХ</h1>
          <p className="page-subtitle">Новости в сфере жилищно-коммунального хозяйства</p>
        </div>

        <div className="news-filters">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`news-filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
              <span className="filter-count">{cat.count}</span>
            </button>
          ))}
        </div>

        <div className="news-list">
          {sortedNews.map(news => (
            <article key={news.id} className={`news-card news-importance-${news.importance}`}>
              <div className="news-icon">{news.image}</div>
              
              <div className="news-content">
                <div className="news-meta">
                  <span className="news-date">{news.date}</span>
                  <span className={`news-badge badge-${news.importance}`}>
                    {news.importance === 'high' ? '★ Важно' : news.importance === 'medium' ? '● Актуально' : '○ Интересно'}
                  </span>
                </div>

                <h3 className="news-title">{news.title}</h3>
                <p className="news-excerpt">{news.excerpt}</p>

                <div className="news-actions">
                  <button className="link-btn">Читать полностью →</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {sortedNews.length === 0 && (
          <div className="empty-state">
            <p>Новостей в этой категории пока нет</p>
          </div>
        )}
      </div>
    </section>
  );
}
