import React, { useState, useEffect, useRef } from 'react';
import '../styles/pages.css';
import '../styles/contacts.css';

const SUBSECTION_TO_TAB = {
'management-companies': 'uk',
  'gji': 'gji',
  'resource-suppliers': 'operators',
};

export default function Contacts({ subsection }) {
  const [activeTab, setActiveTab] = useState('uk');
  const [selectedCity, setSelectedCity] = useState('makhachkala');
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);


  useEffect(() => {
    if (subsection && SUBSECTION_TO_TAB[subsection]) {
      setActiveTab(SUBSECTION_TO_TAB[subsection]);
      
      setTimeout(() => {
        const element = document.getElementById(`tab-${subsection}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [subsection]);

  // Контакты по городам Дагестана
  const cities = {
    makhachkala: { name: 'Махачкала', lat: 42.9849, lon: 47.5046 },
    kaspiysk: { name: 'Каспийск', lat: 42.8917, lon: 47.6367 },
    derbent: { name: 'Дербент', lat: 42.0579, lon: 48.2889 },
    kizlyar: { name: 'Кизляр', lat: 43.8484, lon: 46.7237 },
    izberbash: { name: 'Избербаш', lat: 42.5639, lon: 47.8604 },
    buynaksk: { name: 'Буйнакск', lat: 42.8219, lon: 47.1168 },
    khasavyurt: { name: 'Хасавюрт', lat: 43.2505, lon: 46.5867 }
  };

  // Данные для меток на карте с полной информацией
  const mapPoints = {
    makhachkala: [
      { 
        name: 'Госжилинспекция РД', 
        coords: [42.9849, 47.5046], 
        address: 'ул. Даниялова, 35', 
        phone: '+7 (8722) 67-09-52',
        email: 'gji_rd@e-dag.ru',
        workHours: 'Пн-Чт: 9:00-18:00, Пт: 9:00-17:00',
        color: '#1D9E75'
      },
      { 
        name: 'Фонд капремонта РД', 
        coords: [42.9823, 47.5123], 
        address: 'ул. Гагарина, 120', 
        phone: '+7 (8722) 55-55-30',
        email: 'info@fkr-rd.ru',
        workHours: 'Пн-Пт: 9:00-18:00',
        color: '#E8A020'
      },
      { 
        name: 'Дагестанская энергосбытовая компания', 
        coords: [42.9867, 47.5089], 
        address: 'ул. Даниялова, 85', 
        phone: '+7 (8722) 55-60-00',
        email: 'info@dagenergo.ru',
        workHours: 'Пн-Пт: 8:30-17:30',
        color: '#2563EB'
      },
      { 
        name: 'ГУП "Дагводоканал"', 
        coords: [42.9812, 47.4998], 
        address: 'ул. Аскерханова, 3', 
        phone: '+7 (8722) 56-37-94',
        email: 'dagvodokanal@mail.ru',
        workHours: 'Пн-Пт: 8:00-17:00',
        color: '#1D9E75'
      },
      { 
        name: 'Газпром межрегионгаз Махачкала', 
        coords: [42.9884, 47.5156], 
        address: 'ул. Ирчи Казака, 29', 
        phone: '+7 (8722) 68-85-05',
        email: 'dagestan@mezhregiongaz.ru',
        workHours: 'Пн-Пт: 9:00-18:00',
        color: '#D85A30'
      },
      { 
        name: 'Прокуратура РД', 
        coords: [42.9912, 47.5023], 
        address: 'пр. Р. Гамзатова, 70', 
        phone: '+7 (8722) 67-09-90',
        email: 'procrd@mail.ru',
        workHours: 'Пн-Пт: 9:00-18:00',
        color: '#2563EB'
      },
      { 
        name: 'Минстрой РД', 
        coords: [42.9834, 47.5067], 
        address: 'пр. И. Шамиля, 54', 
        phone: '+7 (8722) 67-07-27',
        email: 'minstroy@e-dag.ru',
        workHours: 'Пн-Пт: 9:00-18:00',
        color: '#E8A020'
      },
      { 
        name: 'ООО "УК ЖилКомСервис"', 
        coords: [42.9815, 47.5082], 
        address: 'пр. Имама Шамиля, 45', 
        phone: '+7 (8722) 67-89-01',
        email: 'info@zhilkom-rd.ru',
        workHours: 'Пн-Пт: 8:30-17:30',
        color: '#D85A30'
      },
      { 
        name: 'ООО "УК Центр"', 
        coords: [42.9843, 47.5117], 
        address: 'ул. Ярагского, 78', 
        phone: '+7 (8722) 93-45-67',
        email: 'uk.center@mail.ru',
        workHours: 'Пн-Пт: 9:00-18:00',
        color: '#D85A30'
      }
    ],
    kaspiysk: [
      { 
        name: 'Администрация Каспийска', 
        coords: [42.8917, 47.6367], 
        address: 'ул. Ленина, 42', 
        phone: '+7 (87246) 5-12-34',
        email: 'adm_kaspiysk@mail.ru',
        workHours: 'Пн-Пт: 9:00-18:00',
        color: '#1D9E75'
      },
      { 
        name: 'ООО "ЖилУправление"', 
        coords: [42.8893, 47.6331], 
        address: 'ул. Ленина, 23', 
        phone: '+7 (87246) 5-12-34',
        email: 'zhiluprav@yandex.ru',
        workHours: 'Пн-Пт: 8:00-17:00',
        color: '#D85A30'
      }
    ],
    derbent: [
      { 
        name: 'Администрация Дербента', 
        coords: [42.0579, 48.2889], 
        address: 'ул. 345-й Дагестанской дивизии, 12', 
        phone: '+7 (87240) 4-11-22',
        email: 'derbent@e-dag.ru',
        workHours: 'Пн-Пт: 9:00-18:00',
        color: '#1D9E75'
      },
      { 
        name: 'ООО "УК Дербент"', 
        coords: [42.0554, 48.2856], 
        address: 'ул. Буйнакского, 15', 
        phone: '+7 (87240) 4-11-22',
        email: 'uk-derbent@mail.ru',
        workHours: 'Пн-Пт: 9:00-18:00',
        color: '#D85A30'
      }
    ],
    kizlyar: [
      { 
        name: 'Администрация Кизляра', 
        coords: [43.8484, 46.7237], 
        address: 'ул. Советская, 28', 
        phone: '+7 (87239) 2-12-34',
        email: 'kizlyar@e-dag.ru',
        workHours: 'Пн-Пт: 9:00-18:00',
        color: '#1D9E75'
      }
    ],
    izberbash: [
      { 
        name: 'Администрация Избербаша', 
        coords: [42.5639, 47.8604], 
        address: 'ул. Буйнакского, 45', 
        phone: '+7 (87245) 2-12-34',
        email: 'izberbash@e-dag.ru',
        workHours: 'Пн-Пт: 9:00-18:00',
        color: '#1D9E75'
      }
    ],
    buynaksk: [
      { 
        name: 'Администрация Буйнакска', 
        coords: [42.8219, 47.1168], 
        address: 'ул. Ленина, 12', 
        phone: '+7 (87237) 2-12-34',
        email: 'buynaksk@e-dag.ru',
        workHours: 'Пн-Пт: 9:00-18:00',
        color: '#1D9E75'
      }
    ],
    khasavyurt: [
      { 
        name: 'Администрация Хасавюрта', 
        coords: [43.2505, 46.5867], 
        address: 'ул. Грозненская, 12', 
        phone: '+7 (87231) 2-12-34',
        email: 'khasavyurt@e-dag.ru',
        workHours: 'Пн-Пт: 9:00-18:00',
        color: '#1D9E75'
      }
    ]
  };

  // Функция для создания HTML-содержимого балуна
  const getBalloonContent = (point) => {
    return `
      <div class="custom-balloon">
        <div class="balloon-header" style="border-left-color: ${point.color}">
          <strong>${point.name}</strong>
        </div>
        <div class="balloon-content">
          <div class="balloon-row">
            <span class="balloon-icon"></span>
            <span>${point.address}</span>
          </div>
          <div class="balloon-row">
            <span class="balloon-icon"></span>
            <a href="tel:${point.phone}" style="color: ${point.color}">${point.phone}</a>
          </div>
          ${point.email ? `
          <div class="balloon-row">
            <span class="balloon-icon"></span>
            <a href="mailto:${point.email}" style="color: ${point.color}">${point.email}</a>
          </div>
          ` : ''}
          ${point.workHours ? `
          <div class="balloon-row">
            <span class="balloon-icon"></span>
            <span>${point.workHours}</span>
          </div>
          ` : ''}
        </div>
      </div>
    `;
  };

  // Функция для добавления меток на карту
  const addPlacemarks = (map, city) => {
    const points = mapPoints[city] || mapPoints.makhachkala;
    
    points.forEach(point => {
      const placemark = new window.ymaps.Placemark(
        point.coords,
        {
          hintContent: point.name,
          balloonContent: getBalloonContent(point)
        },
        {
          preset: 'islands#icon',
          iconColor: point.color,
          balloonMaxWidth: 300,
          balloonShadow: true,
          balloonPanelMaxMapArea: 0,
          hideIconOnBalloonOpen: false,
          openBalloonOnClick: true
        }
      );
      
      placemark.events.add('mouseenter', () => {
        placemark.options.set('iconColor', '#FFA500');
      });
      
      placemark.events.add('mouseleave', () => {
        placemark.options.set('iconColor', point.color);
      });
      
      map.geoObjects.add(placemark);
    });
  };

  // Инициализация карты
  useEffect(() => {
    // Загрузка API Яндекс.Карт
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.async = true;
    script.onload = () => {
      window.ymaps.ready(() => {
        setIsMapReady(true);
      });
    };
    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, []);

  // Создание карты после загрузки API
  useEffect(() => {
    if (!isMapReady || !mapRef.current) return;
    
    const city = cities[selectedCity];
    
    // Создание карты
    const map = new window.ymaps.Map(mapRef.current, {
      center: [city.lat, city.lon],
      zoom: 13,
      controls: ['zoomControl', 'fullscreenControl']
    });
    
    mapInstanceRef.current = map;
    
    // Добавление меток
    addPlacemarks(map, selectedCity);
    
  }, [isMapReady]);

  // Обновление карты при смене города
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapReady) return;
    
    const city = cities[selectedCity];
    
    // Очистка старых меток
    mapInstanceRef.current.geoObjects.removeAll();
    
    // Изменение центра карты
    mapInstanceRef.current.setCenter([city.lat, city.lon], 13);
    
    // Добавление новых меток
    addPlacemarks(mapInstanceRef.current, selectedCity);
    
  }, [selectedCity, isMapReady]);

  // Функция для получения списка адресов для выбранного города
  const getAddressesForCity = (city) => {
    return mapPoints[city] || mapPoints.makhachkala;
  };

  // Управляющие компании
  const ukList = [
    {
      id: 1,
      name: 'ООО "УК ЖилКомСервис"',
      address: 'г. Махачкала, пр. Имама Шамиля, 45',
      phone: '+7 (8722) 67-89-01',
      email: 'info@zhilkom-rd.ru',
      workHours: 'Пн-Пт: 8:30-17:30, обед: 12:00-13:00',
      director: 'Магомедов Р.А.',
      emergency: '+7 (8722) 67-89-02 (круглосуточно)'
    },
    {
      id: 2,
      name: 'ООО "УК Центр"',
      address: 'г. Махачкала, ул. Ярагского, 78',
      phone: '+7 (8722) 93-45-67',
      email: 'uk.center@mail.ru',
      workHours: 'Пн-Пт: 9:00-18:00',
      director: 'Алиева З.М.',
      emergency: '+7 (928) 578-12-34'
    },
    {
      id: 3,
      name: 'ООО "ЖилУправление"',
      address: 'г. Каспийск, ул. Ленина, 23',
      phone: '+7 (87246) 5-12-34',
      email: 'zhiluprav@yandex.ru',
      workHours: 'Пн-Пт: 8:00-17:00',
      director: 'Кадиев М.С.',
      emergency: '+7 (928) 045-67-89'
    },
    {
      id: 4,
      name: 'ООО "УК Дербент"',
      address: 'г. Дербент, ул. Буйнакского, 15',
      phone: '+7 (87240) 4-11-22',
      email: 'uk-derbent@mail.ru',
      workHours: 'Пн-Пт: 9:00-18:00',
      director: 'Гусейнов Р.Г.',
      emergency: '+7 (928) 876-54-32'
    }
  ];

  const gjiContacts = {
    name: 'Государственная жилищная инспекция Республики Дагестан',
    fullName: 'Государственная жилищная инспекция Республики Дагестан',
    address: 'г. Махачкала, ул. Даниялова, 35',
    phone: '+7 (8722) 67-09-52',
    hotline: '+7 (8722) 67-09-53',
    email: 'gji_rd@e-dag.ru',
    website: 'http://gji.e-dag.ru',
    workHours: 'Пн-Чт: 9:00-18:00, Пт: 9:00-17:00',
    lunch: '13:00-14:00',
    receptionHours: 'Вт: 14:00-17:00, Чт: 10:00-12:00'
  };

  const fundContacts = {
    name: 'Фонд капитального ремонта РД',
    fullName: 'Некоммерческая организация "Республиканский фонд капитального ремонта многоквартирных домов"',
    address: 'г. Махачкала, ул. Гагарина, 120',
    phone: '+7 (8722) 55-55-30',
    hotline: '8-800-200-55-30',
    email: 'info@fkr-rd.ru',
    website: 'http://www.fkr-rd.ru',
    workHours: 'Пн-Пт: 9:00-18:00'
  };

  const emergencyServices = [
    { name: 'Аварийно-диспетчерская служба Махачкалы', phone: '+7 (8722) 62-82-82', type: 'Единая диспетчерская' },
    { name: 'Горгаз (аварийная служба)', phone: '04, +7 (8722) 62-81-43', type: 'Газоснабжение' },
    { name: 'Дагэнерго (аварийная служба)', phone: '+7 (8722) 55-58-58', type: 'Электроснабжение' },
    { name: 'Водоканал (аварийная служба)', phone: '+7 (8722) 56-37-97', type: 'Водоснабжение' },
    { name: 'Единая дежурно-диспетчерская служба', phone: '112', type: 'Экстренные вызовы' }
  ];

  const resourceSuppliers = [
    { name: 'ООО "Газпром межрегионгаз Махачкала"', phone: '+7 (8722) 68-85-05', address: 'г. Махачкала, ул. Ирчи Казака, 29' },
    { name: 'АО "Дагестанская энергосбытовая компания"', phone: '+7 (8722) 55-60-00', address: 'г. Махачкала, ул. Даниялова, 85' },
    { name: 'ГУП "Дагводоканал"', phone: '+7 (8722) 56-37-94', address: 'г. Махачкала, ул. Аскерханова, 3' },
    { name: 'АО "Дагестанская сетевая компания"', phone: '+7 (8722) 55-03-03', address: 'г. Махачкала, ул. Пушкина, 24' }
  ];

  const supervisoryBodies = [
    { name: 'Прокуратура Республики Дагестан', phone: '+7 (8722) 67-09-90', address: 'г. Махачкала, пр. Р. Гамзатова, 70' },
    { name: 'Управление Роспотребнадзора по РД', phone: '+7 (8722) 67-19-84', address: 'г. Махачкала, ул. Дахадаева, 107' },
    { name: 'Минстрой РД', phone: '+7 (8722) 67-07-27', address: 'г. Махачкала, пр. И. Шамиля, 54' }
  ];

  return (
    <section className="page-section">
      <div className="section-inner">
        <div className="page-header">
          <h1>Контакты ЖКХ Дагестана</h1>
          <p className="page-subtitle">
            Актуальные контакты управляющих компаний, надзорных органов и аварийных служб Республики Дагестан
          </p>
        </div>

        <div>
              <div className="emergency-grid">
                {emergencyServices.map((service, idx) => (
                  <div key={idx} className="emergency-card">
                    <div className="emergency-info">
                      <h4>{service.name}</h4>
                      <p className="emergency-type">{service.type}</p>
                      <a href={`tel:${service.phone}`} className="emergency-phone">{service.phone}</a>
                    </div>
                  </div>
                ))}
              </div>
        </div>
          

        {/* Вкладки */}
        <div className="contacts-tabs">
          <button 
            id="tab-management-companies"
            className={`tab-btn ${activeTab === 'uk' ? 'active' : ''}`}
            onClick={() => setActiveTab('uk')}
          >
            Управляющие компании
          </button>
          <button 
            id="tab-gji"
            className={`tab-btn ${activeTab === 'gji' ? 'active' : ''}`}
            onClick={() => setActiveTab('gji')}
          >
            Госжилинспекция
          </button>
          <button 
            id="tab-resource-suppliers"
            className={`tab-btn ${activeTab === 'operators' ? 'active' : ''}`}
            onClick={() => setActiveTab('operators')}
          >
            Ресурсоснабжающие
          </button>
        </div>

        {/* Контент вкладок */}
        <div className="contacts-content">
          {activeTab === 'uk' && (
            <div className="contacts-grid">
              {ukList.map(uk => (
                <div key={uk.id} className="contact-card">
                  <div className="contact-header">
                    <div className="contact-icon"></div>
                    <h3>{uk.name}</h3>
                  </div>
                  <div className="contact-details">
                    <p><strong>Адрес:</strong> {uk.address}</p>
                    <p><strong>Телефон:</strong> <a href={`tel:${uk.phone}`}>{uk.phone}</a></p>
                    <p><strong>Email:</strong> <a href={`mailto:${uk.email}`}>{uk.email}</a></p>
                    <p><strong>Режим работы:</strong> {uk.workHours}</p>
                    <p><strong>Руководитель:</strong> {uk.director}</p>
                    <p><strong>Аварийная служба:</strong> {uk.emergency}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'gji' && (
            <div>
              <div className="contact-card large">
                <div className="contact-header">
                  <div className="contact-icon"></div>
                  <h3>{gjiContacts.name}</h3>
                </div>
                <div className="contact-details">
                  <p><strong>Адрес:</strong> {gjiContacts.address}</p>
                  <p><strong>Телефон:</strong> <a href={`tel:${gjiContacts.phone}`}>{gjiContacts.phone}</a></p>
                  <p><strong>Горячая линия:</strong> <a href={`tel:${gjiContacts.hotline}`}>{gjiContacts.hotline}</a></p>
                  <p><strong>Email:</strong> <a href={`mailto:${gjiContacts.email}`}>{gjiContacts.email}</a></p>
                  <p><strong>Сайт:</strong> <a href={gjiContacts.website} target="_blank" rel="noopener noreferrer">{gjiContacts.website}</a></p>
                  <p><strong>Режим работы:</strong> {gjiContacts.workHours}</p>
                  <p><strong>Обед:</strong> {gjiContacts.lunch}</p>
                  <p><strong>Прием граждан:</strong> {gjiContacts.receptionHours}</p>
                </div>
              </div>

              <h3 className="contacts-subtitle">Надзорные органы</h3>
              <div className="contacts-grid small">
                {supervisoryBodies.map((body, idx) => (
                  <div key={idx} className="contact-card">
                    <h4>{body.name}</h4>
                    <p><strong>Телефон:</strong> <a href={`tel:${body.phone}`}>{body.phone}</a></p>
                    <p><strong>Адрес:</strong> {body.address}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'operators' && (
            <div>
              <div className="contact-card highlight">
                <div className="contact-header">
                  <div className="contact-icon"></div>
                  <h3>{fundContacts.name}</h3>
                </div>
                <div className="contact-details">
                  <p><strong>Адрес:</strong> {fundContacts.address}</p>
                  <p><strong>Телефон:</strong> <a href={`tel:${fundContacts.phone}`}>{fundContacts.phone}</a></p>
                  <p><strong>Бесплатная линия:</strong> <a href={`tel:${fundContacts.hotline}`}>{fundContacts.hotline}</a></p>
                  <p><strong>Email:</strong> <a href={`mailto:${fundContacts.email}`}>{fundContacts.email}</a></p>
                  <p><strong>Сайт:</strong> <a href={fundContacts.website} target="_blank" rel="noopener noreferrer">{fundContacts.website}</a></p>
                </div>
              </div>

              <h3 className="contacts-subtitle">Ресурсоснабжающие организации</h3>
              <div className="contacts-grid">
                {resourceSuppliers.map((supplier, idx) => (
                  <div key={idx} className="contact-card">
                    <h4>{supplier.name}</h4>
                    <p><strong>Телефон:</strong> <a href={`tel:${supplier.phone}`}>{supplier.phone}</a></p>
                    <p><strong>Адрес:</strong> {supplier.address}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Карта с адресами и всплывающими окнами */}
        <div className="map-section">
          <h2>Организации на карте</h2>
          <div className="city-selector">
            {Object.entries(cities).map(([key, city]) => (
              <button
                key={key}
                className={`city-btn ${selectedCity === key ? 'active' : ''}`}
                onClick={() => setSelectedCity(key)}
              >
                {city.name}
              </button>
            ))}
          </div>

          <div 
            ref={mapRef} 
            className="map-container"
            style={{ width: '100%', height: '450px' }}
          ></div>
          
          <div className="map-addresses">
            <h4>Организации в {cities[selectedCity].name}:</h4>
            <div className="addresses-list">
              {getAddressesForCity(selectedCity).map((item, idx) => (
                <div key={idx} className="address-item">
                  <div className="address-info">
                    <strong>{item.name}</strong>
                    <p>{item.address}</p>
                    <a href={`tel:${item.phone}`} className="address-phone">{item.phone}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Блок помощи */}
        <div className="contacts-help">
          <h4>Не нашли нужный контакт?</h4>
          <p>Обратитесь к нашему ИИ-консультанту — он подскажет, куда позвонить или написать в вашей ситуации</p>
          <button className="btn-primary" onClick={() => document.querySelector('.chat-float-btn')?.click()}>
            Задать вопрос консультанту
          </button>
        </div>
      </div>
    </section>
  );
}