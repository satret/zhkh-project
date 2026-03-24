import React, { useState } from 'react';
import '../styles/pages.css';

export default function DocumentBuilder() {
  const [selectedDoc, setSelectedDoc] = useState('complaint');
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    apartment: '',
    phone: '',
    issue: '',
    dates: '',
    damages: '',
    witnesses: '',
    evidence: ''
  });

  const documents = [
    {
      id: 'complaint',
      name: 'Жалоба на управляющую компанию',
      description: 'Для подачи в ГЖИ, Роспотребнадзор или прокуратуру',
      icon: '📝'
    },
    {
      id: 'recalc',
      name: 'Заявление о перерасчете',
      description: 'При некачественном оказании услуг или неправильных начислениях',
      icon: '💰'
    },
    {
      id: 'defect',
      name: 'Акт о выявленных дефектах',
      description: 'Для фиксации проблем в квартире и доме',
      icon: '🔍'
    },
    {
      id: 'demand',
      name: 'Претензия об устранении нарушений',
      description: 'Обязательный этап перед судом',
      icon: '⚠️'
    },
    {
      id: 'refusal',
      name: 'Заявление об отказе от услуги',
      description: 'Отказ от коллективной антенны, радиоточки и т.д.',
      icon: '✋'
    },
    {
      id: 'petition',
      name: 'Ходатайство о переводе на спецсчет',
      description: 'Для перехода с счета регионального оператора на спецсчет дома',
      icon: '📋'
    }
  ];

  const documentTemplates = {
    complaint: {
      title: 'Жалоба на управляющую компанию',
      template: `ЖАЛОБА

Гражданин(ка): ${formData.fullName}
Адрес: ${formData.address}, кв. ${formData.apartment}
Телефон: ${formData.phone}

На: [Наименование ГЖИ / Роспотребнадзора]

СУТЬ ЖАЛОБЫ:
Я, ${formData.fullName}, обращаюсь с жалобой на ООО [Название УК], осуществляющую управление многоквартирным домом по адресу: ${formData.address}.

ОПИСАНИЕ ПРОБЛЕМЫ:
${formData.issue}

ПЕРИОД ПРОБЛЕМЫ:
${formData.dates}

ПОНЕСЁННЫЕ УБЫТКИ / ВРЕД:
${formData.damages}

ПРЕДЫДУЩИЕ ДЕЙСТВИЯ:
- [Опишите, когда и как вы обращались в УК]
- [Какие ответы вы получили]

СВИДЕТЕЛИ:
${formData.witnesses || 'Нет'}

ДОКАЗАТЕЛЬСТВА:
${formData.evidence}

Прошу провести проверку и принять меры в соответствии с законодательством РФ.

Дата: _________________
Подпись: _______________`
    },
    recalc: {
      title: 'Заявление о перерасчете',
      template: `ЗАЯВЛЕНИЕ О ПЕРЕРАСЧЕТЕ

Гражданин(ка): ${formData.fullName}
Адрес: ${formData.address}, кв. ${formData.apartment}
Телефон: ${formData.phone}

Руководителю ООО [Название УК]

Прошу произвести перерасчет платы за коммунальные услуги в связи со следующим:

ПРИЧИНА ПЕРЕРАСЧЕТА:
${formData.issue}

ПЕРИОД, ПОДЛЕЖАЩИЙ ПЕРЕРАСЧЕТУ:
${formData.dates}

ОБОСНОВАНИЕ:
- Согласно Постановлению Правительства РФ №354, перерасчет положен при ненадлежащем оказании услуг
- Температура в квартире составляла ${formData.damages} (ниже нормы)
- [Иные факты и ссылки на законодательство]

ДОКАЗАТЕЛЬСТВА:
${formData.evidence}

Прошу произвести перерасчет и перевести сумму переплаты на мой лицевой счет.

Дата: _________________
Подпись: _______________`
    },
    defect: {
      title: 'Акт о выявленных дефектах',
      template: `АКТ О ВЫЯВЛЕННЫХ ДЕФЕКТАХ

Дата составления: _________________
Место осмотра: ${formData.address}, кв. ${formData.apartment}
Собственник: ${formData.fullName}

ВЫЯВЛЕННЫЕ ДЕФЕКТЫ:
${formData.issue}

МЕСТО ДЕФЕКТА:
${formData.damages}

ДАТА ВОЗНИКНОВЕНИЯ:
${formData.dates}

ПОСЛЕДСТВИЯ:
${formData.evidence}

СВИДЕТЕЛИ:
${formData.witnesses}

ФОТОГРАФИЧЕСКОЕ ПОДТВЕРЖДЕНИЕ:
[Приложить фотографии]

Акт составлен в двух экземплярах:
1-й экземпляр - собственнику
2-й экземпляр - управляющей организации

Подпись собственника: _______________
Подпись представителя УК: _______________`
    },
    demand: {
      title: 'Претензия об устранении нарушений',
      template: `ПРЕТЕНЗИЯ

От: ${formData.fullName}
Адрес: ${formData.address}, кв. ${formData.apartment}
Телефон: ${formData.phone}

Кому: ООО [Название УК]

ТРЕБОВАНИЕ ОБ УСТРАНЕНИИ НАРУШЕНИЙ

На основании Жилищного кодекса РФ, Постановления Правительства РФ №354 и договора управления, требую в течение 7 дней устранить следующие нарушения:

ОПИСАНИЕ НАРУШЕНИЙ:
${formData.issue}

ПЕРИОД НАРУШЕНИЯ:
${formData.dates}

РАЗМЕР ТРЕБУЕМОЙ КОМПЕНСАЦИИ:
${formData.damages}

ДОКУМЕНТЫ И ДОКАЗАТЕЛЬСТВА:
${formData.evidence}

При неисполнении данной претензии в установленный срок я буду вынужден обратиться в суд с исковым заявлением.

В случае судебного разбирательства все судебные издержки будут возложены на Вашу организацию.

Дата: _________________
Подпись: _______________
Отправлено: _________________`
    },
    refusal: {
      title: 'Заявление об отказе от услуги',
      template: `ЗАЯВЛЕНИЕ ОБ ОТКАЗЕ

От: ${formData.fullName}
Адрес: ${formData.address}, кв. ${formData.apartment}
Телефон: ${formData.phone}

Руководителю ООО [Название УК]

Прошу снять с моей квартиры и демонтировать:
${formData.issue}

Требую исключить расходы на содержание данного оборудования из квитанции начиная со следующего месяца.

Демонтаж должен быть проведён за счет управляющей организации в течение 14 дней.

Подтверждение о выполнении прошу направить письменно.

Дата: _________________
Подпись: _______________`
    },
    petition: {
      title: 'Ходатайство о переводе на спецсчет',
      template: `ХОДАТАЙСТВО

На основании статьи 173 Жилищного кодекса РФ и решения собрания собственников от ${formData.dates}, ходатайствую о переводе средств на капитальный ремонт с регионального оператора на специальный счет дома.

ДЕТАЛИ:
Адрес дома: ${formData.address}
Регистр УУ: [Номер]
Региональный оператор: ${formData.issue}
Сумма средств к переводу: ${formData.damages}

${formData.evidence}

Дата: _________________
Подпись: _______________`
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const downloadPDF = () => {
    const template = documentTemplates[selectedDoc];
    const content = template.template;
    
    // Простой способ скачать как текст
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${template.title}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const currentDoc = documents.find(d => d.id === selectedDoc);
  const currentTemplate = documentTemplates[selectedDoc];

  return (
    <section className="page-section">
      <div className="section-inner">
        <div className="page-header">
          <h1>Формирование документов</h1>
          <p className="page-subtitle">Заполните шаблон — система создаст готовый документ, который можно распечатать или отправить</p>
        </div>

        <div className="doc-builder-container">
          <div className="doc-selector">
            <h3>Выберите тип документа</h3>
            <div className="doc-grid">
              {documents.map(doc => (
                <button
                  key={doc.id}
                  className={`doc-card ${selectedDoc === doc.id ? 'active' : ''}`}
                  onClick={() => setSelectedDoc(doc.id)}
                >
                  <div className="doc-icon">{doc.icon}</div>
                  <h4>{doc.name}</h4>
                  <p className="doc-desc">{doc.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="doc-form-section">
            <h3>{currentDoc?.name}</h3>
            
            <form className="doc-form">
              <div className="form-group">
                <label className="form-label">ФИО (как в паспорте)</label>
                <input 
                  className="form-input"
                  type="text"
                  name="fullName"
                  placeholder="Иван Иванович Иванов"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Адрес дома</label>
                <input 
                  className="form-input"
                  type="text"
                  name="address"
                  placeholder="ул. Ленина, д. 42"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Квартира</label>
                  <input 
                    className="form-input"
                    type="text"
                    name="apartment"
                    placeholder="108"
                    value={formData.apartment}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Телефон</label>
                  <input 
                    className="form-input"
                    type="tel"
                    name="phone"
                    placeholder="+7 (912) 345-67-89"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Суть проблемы / Описание</label>
                <textarea 
                  className="form-textarea"
                  name="issue"
                  placeholder="Опишите что произошло, какие услуги не оказывались..."
                  value={formData.issue}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Период / Даты</label>
                <input 
                  className="form-input"
                  type="text"
                  name="dates"
                  placeholder="с 01.01.2026 по 10.03.2026"
                  value={formData.dates}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Размер убытков / Ущерб</label>
                <input 
                  className="form-input"
                  type="text"
                  name="damages"
                  placeholder="25 000 рублей или +5 градусов"
                  value={formData.damages}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Свидетели (если есть)</label>
                <textarea 
                  className="form-textarea"
                  name="witnesses"
                  placeholder="ФИ и контакты свидетелей..."
                  value={formData.witnesses}
                  onChange={handleInputChange}
                  rows="2"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Приложенные доказательства</label>
                <textarea 
                  className="form-textarea"
                  name="evidence"
                  placeholder="Акт в присутствии соседей от 15.02.2026, фото дефектов, переписка с УК в мессенджере..."
                  value={formData.evidence}
                  onChange={handleInputChange}
                  rows="2"
                />
              </div>
            </form>
          </div>

          <div className="doc-preview-section">
            <div className="preview-header">
              <h3>Предпросмотр документа</h3>
              <button className="btn-primary" onClick={downloadPDF}>
                ⬇ Скачать документ
              </button>
            </div>
            
            <pre className="doc-preview">
              {currentTemplate?.template || ''}
            </pre>
          </div>
        </div>

        <div className="builder-help">
          <h4>💡 Советы при составлении документов:</h4>
          <ul>
            <li>Будьте конкретны и точны в деталях</li>
            <li>Указывайте точные даты и адреса</li>
            <li>Прилагайте всё доказательства (фото, акты, переписку)</li>
            <li>Отправляйте документы заказным письмом или лично с отметкой о получении</li>
            <li>Сохраняйте копии всех отправленных документов</li>
            <li>Дайте УК 7-14 дней на ответ перед обращением в контролирующие органы</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
