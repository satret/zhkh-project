import React, { useState, useEffect } from 'react';
import '../styles/document-builder.css';

// Предполагаем, что json данные импортируются так же
import complaintData from '../docs_templates/complaint.json';
import claimData from '../docs_templates/claim.json';
import penaltyStatementData from '../docs_templates/penalty_statement.json';
import pretenziyaData from '../docs_templates/pretenziya.json';
import gzhiComplaintData from '../docs_templates/gzhi_complaint.json';
import damageCompensationAgreementData from '../docs_templates/damage_compensation_agreement.json';
import moneyReceiptData from '../docs_templates/money_receipt.json';
import floodActData from '../docs_templates/flood_act.json';
import courtReminderPdf from '../reminders/Kak-opredelit-svoj-sud.pdf';
import courtOptions from '../data/courts.json';
import managementCompanies from '../data/management_companies.json';

export default function DocumentBuilder({ subsection, onPageChange }) {
  const documentGuides = {
    complaint: {
      whatIsIt:
        'Это досудебный способ решения проблем. Документ фиксирует факт нарушения управляющей компанией или ТСЖ своих обязательств по договору управления многоквартирным домом. Такая жалоба показывает, что вы пытались урегулировать спор мирно до обращения в суд или госорганы.',
      examples: [
        'Не убирают подъезд',
        'Нет отопления или воды',
        'Протекает крыша',
        'Хамство сотрудников',
        'Неверные начисления в квитанции'
      ],
      attachments: [
        'Копия договора управления МКД или выписка из него',
        'Фото- и видеофиксация нарушения',
        'Акты о нарушении, например акт залива',
        'Копии предыдущих обращений и ответов на них',
        'Квитанции об оплате коммунальных услуг'
      ]
    },
    claim: {
      whatIsIt:
        'Это основной процессуальный документ для защиты нарушенных прав в судебном порядке. Подается, когда досудебное урегулирование не дало результата или закон позволяет обратиться в суд напрямую.',
      examples: [
        'Взыскание ущерба от залива',
        'Оспаривание начислений',
        'Требование обязать УК сделать ремонт',
        'Выселение или вселение',
        'Раздел имущества'
      ],
      attachments: [
        'Квитанция об уплате госпошлины',
        'Доказательство направления копии иска ответчику',
        'Документы, подтверждающие обстоятельства дела',
        'Расчет взыскиваемой суммы по имущественным спорам',
        'Доказательства соблюдения досудебного порядка',
        'Копия паспорта истца',
        'Доверенность представителя, если иск подает не сам истец'
      ]
    },
    penalty_statement: {
      whatIsIt:
        'Такое заявление подают, когда УК неправильно рассчитала плату за коммунальные услуги. По статье 157 ЖК РФ и Правилам № 354 можно требовать не только перерасчет, но и штраф в размере 50% от суммы завышения.',
      examples: [
        'Завышенная плата в квитанции',
        'Неверный тариф',
        'Не сделали перерасчет',
        'Ошибка в показаниях счетчиков',
        'Неверно учли состав семьи или период отсутствия'
      ],
      attachments: [
        'Квитанции с неверными начислениями',
        'Расчет правильной суммы платежа',
        'Документы, подтверждающие ошибку УК',
        'Претензия в УК с требованием перерасчета',
        'Ответ УК или доказательство игнорирования'
      ]
    },
    pretenziya: {
      whatIsIt:
        'Это более формальный и юридически значимый документ, чем обычная жалоба. Претензия содержит четкие требования, срок их исполнения и часто является обязательным этапом досудебного урегулирования, особенно по имущественным спорам и требованиям о защите прав потребителей.',
      examples: [
        'Требование устранить недостаток',
        'Требование вернуть деньги',
        'Требование выплатить компенсацию',
        'Возмещение ущерба после залива',
        'Спор о качестве коммунальной услуги'
      ],
      attachments: [
        'Акты осмотра, экспертизы, чеки на ремонт и иные обосновывающие документы',
        'Копия договора с УК',
        'Доказательства направления претензии: отметка о приеме, опись вложения, квитанция'
      ]
    },
    gzhi_complaint: {
      whatIsIt:
        'Жалоба в ГЖИ подается в надзорный орган для привлечения УК к административной ответственности и выдачи предписания об устранении нарушений. ГЖИ не взыскивает деньги в вашу пользу, но может серьезно повлиять на УК через проверки, штрафы и предписания.',
      examples: [
        'УК не реагирует на обращения',
        'Нарушаются правила содержания общего имущества',
        'Незаконно собирают деньги',
        'Не исполняют обязательства по дому',
        'Есть систематические нарушения лицензионных требований'
      ],
      attachments: [
        'Копия обращения в УК и ответ на него или доказательство игнорирования',
        'Фото- и видеодоказательства нарушений',
        'Копии актов проверок, если они проводились',
        'Коллективная жалоба с листом подписей, если обращение подают несколько жильцов'
      ]
    },
    damage_compensation_agreement: {
      whatIsIt:
        'Это гражданско-правовой договор, по которому стороны добровольно фиксируют сумму ущерба, сроки выплаты и порядок расчетов, чтобы избежать суда. Если обязательства потом не исполнят, такое соглашение будет важным доказательством.',
      examples: [
        'Сосед или УК согласны возместить ущерб после залива',
        'Нужно зафиксировать сумму и график выплат',
        'Стороны хотят урегулировать спор без суда'
      ],
      attachments: [
        'Акт о причинении ущерба',
        'Отчет независимой оценочной компании, если сумма спорная или значительная',
        'Чеки и квитанции, подтверждающие расходы',
        'Копии паспортов сторон'
      ]
    },
    money_receipt: {
      whatIsIt:
        'Расписка подтверждает факт передачи денег от одного лица другому. Она особенно важна при исполнении соглашения о возмещении ущерба, возврате долга или передаче денег по иному основанию.',
      examples: [
        'Передача денег по соглашению о возмещении ущерба',
        'Возврат долга',
        'Расчет по договоренности между сторонами'
      ],
      attachments: [
        'Основание платежа: договор, соглашение, решение суда',
        'Копия паспорта получателя денег',
        'При крупной сумме иногда прикладывают документы о происхождении средств'
      ]
    },
    flood_act: {
      whatIsIt:
        'Акт о заливе фиксирует сам факт повреждения, его причину и последствия. Это один из ключевых документов для дальнейшей претензии, соглашения о возмещении ущерба или иска в суд.',
      examples: [
        'Затопление квартиры соседями',
        'Прорыв стояка',
        'Протечка крыши',
        'Повреждение отделки, мебели или техники'
      ],
      attachments: [
        'Фото- и видео повреждений',
        'Подписи участников осмотра или свидетелей',
        'Документы на поврежденное имущество, если они есть',
        'Предварительный расчет ущерба или перечень повреждений'
      ]
    }
  };
  const [selectedDoc, setSelectedDoc] = useState('complaint');
  const [documents, setDocuments] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [emptyFields, setEmptyFields] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // --- ЛОГИКА ВАЛИДАЦИИ ---
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(phone);
  const isFieldLocked = (field) => Boolean(field?.locked);

  const getFormatErrors = () => {
    const errors = {};
    if (!currentTemplate || !currentTemplate.fields) return errors;

    currentTemplate.fields.forEach(field => {
      if (isFieldLocked(field)) return;

      const value = formData[field.name];
      if (!value || value.trim() === '') return;

      const isEmail = field.type === 'email' || 
                      field.name.toLowerCase().includes('email') || 
                      field.label.toLowerCase().includes('почта');
      
      const isPhone = field.type === 'tel' || 
                      field.name.toLowerCase().includes('phone') || 
                      field.label.toLowerCase().includes('телефон');

      if (isEmail && !validateEmail(value)) {
        errors[field.name] = 'Некорректный формат почты, должно быть @ и . в домене';
      }
      if (isPhone && !validatePhone(value)) {
        errors[field.name] = 'Некорректный формат номера, введите начиная с +7 и должно быть 11 символов';
      }
    });
    return errors;
  };

  useEffect(() => {
    const templates = {
      complaint: complaintData,
      claim: claimData,
      penalty_statement: penaltyStatementData,
      pretenziya: pretenziyaData,
      gzhi_complaint: gzhiComplaintData,
      damage_compensation_agreement: damageCompensationAgreementData,
      money_receipt: moneyReceiptData,
      flood_act: floodActData
    };

    const loadedDocs = Object.keys(templates).map(id => ({
      id,
      name: templates[id].title,
      description: templates[id].description || ''
    }));

    setDocuments(loadedDocs);

    const current = templates[selectedDoc];
    setCurrentTemplate(current);

    const initialFormData = {};
    if (current && current.fields) {
      current.fields.forEach(field => {
        initialFormData[field.name] = '';
      });
    }
    setFormData(initialFormData);
    setEmptyFields([]);
    setValidationErrors({}); // Сброс ошибок при смене документа
    setLoading(false);
  }, [selectedDoc]);

  useEffect(() => {
    const allowedSubsections = new Set([
      'complaint',
      'claim',
      'penalty_statement',
      'pretenziya',
      'gzhi_complaint',
      'damage_compensation_agreement',
      'money_receipt'
    ]);

    if (allowedSubsections.has(subsection)) {
      setSelectedDoc(subsection);
    }
  }, [subsection]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибки при вводе
    if (emptyFields.length > 0) setEmptyFields([]);
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const clearForm = () => {
    const newFormData = {};
    currentTemplate.fields.forEach(field => {
      newFormData[field.name] = '';
    });
    setFormData(newFormData);
    setEmptyFields([]);
    setValidationErrors({});
    setShowConfirmModal(false);
  };

  const getEmptyRequiredFields = () => {
    if (!currentTemplate || !currentTemplate.fields) return [];
    return currentTemplate.fields.filter(field => {
      if (!field.required || isFieldLocked(field)) return false;
      return !formData[field.name] || formData[field.name].trim() === '';
    });
  };

  const isAllRequiredFieldsFilled = () => {
    return getEmptyRequiredFields().length === 0 && Object.keys(getFormatErrors()).length === 0;
  };

  const handleDownload = () => {
    const empty = getEmptyRequiredFields();
    const formats = getFormatErrors();
    
    setEmptyFields(empty);
    setValidationErrors(formats);

    if (empty.length > 0 || Object.keys(formats).length > 0) {
      setShowConfirmModal(true);
    } else {
      exportToWord();
    }
  };

  const confirmDownload = () => {
    setShowConfirmModal(false);
    exportToWord();
  };

  // --- ЛОГИКА ЗАПОЛНЕНИЯ ШАБЛОНА ---
  const getPlaceholderText = (fieldLabel) => `[ЗАПОЛНИТЬ: ${fieldLabel.toUpperCase()}]`;

  const fillTemplateForPreview = () => {
    if (!currentTemplate || !currentTemplate.blocks) return [];

    return currentTemplate.blocks.map((block, blockIndex) => {
      let content = block.content;
      const parts = [];
      let lastIndex = 0;
      const regex = /{{(.*?)}}/g;
      let match;

      while ((match = regex.exec(content)) !== null) {
        parts.push(content.substring(lastIndex, match.index));
        const fieldName = match[1];
        const value = formData[fieldName];
        const fieldConfig = currentTemplate.fields.find(f => f.name === fieldName);
        const fieldLabel = fieldConfig ? fieldConfig.label : fieldName;

        if (value && value.trim() !== '') {
          parts.push(<strong key={match.index}>{value}</strong>);
        } else {
          parts.push(
            <mark key={match.index} className="doc-param-highlight">
              {getPlaceholderText(fieldLabel)}
            </mark>
          );
        }
        lastIndex = regex.lastIndex;
      }
      parts.push(content.substring(lastIndex));
      return { type: block.type, content: parts };
    });
  };

  const fillTemplateForWord = () => {
    if (!currentTemplate || !currentTemplate.blocks) return '';
    const wordHighlightStyle = 'background-color: yellow; mso-highlight: yellow;';

    return currentTemplate.blocks.map(block => {
      let blockContent = block.content;
      const processedText = blockContent.replace(/{{(.*?)}}/g, (match, p1) => {
        const placeholderName = p1.trim();
        const fieldConfig = currentTemplate.fields.find(f => f.name === placeholderName || f.label === placeholderName);
        const internalName = fieldConfig ? fieldConfig.name : placeholderName;
        const value = formData[internalName];
        const displayLabel = fieldConfig ? fieldConfig.label : placeholderName;

        if (value && String(value).trim() !== '') {
          return `<b>${value}</b>`;
        } else {
          return `<span style="${wordHighlightStyle}">[ЗАПОЛНИТЬ: ${displayLabel.toUpperCase()}]</span>`;
        }
      });

      const styles = currentTemplate.styles || {};
      const blockStyle = styles[block.type] || styles.body || {};
      const styleString = Object.entries(blockStyle)
        .map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v}`)
        .join('; ');

      return processedText.split('\n').map(line => {
        return line.trim() === '' 
          ? '<p style="margin:0;">&nbsp;</p>' 
          : `<p style="${styleString}; margin:0;">${line}</p>`;
      }).join('');
    }).join('');
  };

  const exportToWord = () => {
    if (!currentTemplate) return;
    const formattedContent = fillTemplateForWord();
    const wordHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${currentTemplate.title}</title>
        <style>
          body { font-family: 'Times New Roman', Times, serif; font-size: 14pt; line-height: 1.5; }
          p { margin: 0; padding: 0; }
          b { font-weight: bold; }
        </style>
      </head>
      <body>${formattedContent}</body>
      </html>
    `;
    const blob = new Blob([wordHtml], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentTemplate.title}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const changeDocument = (docId) => setSelectedDoc(docId);
  const goToRepresentativeHelp = () => {
    if (onPageChange) {
      onPageChange('selfcheck', 'representative');
    }
  };
  const getSelectedCourtId = () => {
    const courtName = formData['Наименование суда'];
    const courtAddress = formData['Адрес суда'];
    const selectedCourt = courtOptions
      .flatMap(group => group.items)
      .find(court => court.name === courtName && court.address === courtAddress);

    return selectedCourt?.id || '';
  };
  const handleCourtSelectChange = (e) => {
    const selectedCourt = courtOptions
      .flatMap(group => group.items)
      .find(court => court.id === e.target.value);

    setFormData(prev => ({
      ...prev,
      'Наименование суда': selectedCourt?.name || '',
      'Адрес суда': selectedCourt?.address || ''
    }));

    if (emptyFields.length > 0) setEmptyFields([]);
    setValidationErrors(prev => {
      const newErrs = { ...prev };
      delete newErrs['Наименование суда'];
      delete newErrs['Адрес суда'];
      return newErrs;
    });
  };
  const getSelectedUkId = () => {
    const companyName = formData['Название УК'] || formData['Наименование УК'];
    const companyAddress = formData['Адрес УК'];
    const selectedCompany = managementCompanies.find(
      company => company.name === companyName && (!companyAddress || company.address === companyAddress)
    );

    return selectedCompany?.id?.toString() || '';
  };
  const handleUkSelectChange = (e) => {
    const selectedCompany = managementCompanies.find(
      company => company.id.toString() === e.target.value
    );

    setFormData(prev => ({
      ...prev,
      ...(Object.prototype.hasOwnProperty.call(prev, 'Название УК') ? { 'Название УК': selectedCompany?.name || '' } : {}),
      ...(Object.prototype.hasOwnProperty.call(prev, 'Наименование УК') ? { 'Наименование УК': selectedCompany?.name || '' } : {}),
      ...(Object.prototype.hasOwnProperty.call(prev, 'Адрес УК') ? { 'Адрес УК': selectedCompany?.address || '' } : {}),
      ...(Object.prototype.hasOwnProperty.call(prev, 'ФИО директора') ? { 'ФИО директора': selectedCompany?.directorDative || selectedCompany?.director || '' } : {})
    }));

    if (emptyFields.length > 0) setEmptyFields([]);
    setValidationErrors(prev => {
      const newErrs = { ...prev };
      delete newErrs['Название УК'];
      delete newErrs['Наименование УК'];
      delete newErrs['Адрес УК'];
      delete newErrs['ФИО директора'];
      return newErrs;
    });
  };
  const openCourtReminder = () => {
    window.open(courtReminderPdf, '_blank', 'noopener,noreferrer');
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Загрузка...</div>;
  if (!currentTemplate) return <div style={{ padding: '40px', textAlign: 'center' }}>Шаблон не найден</div>;

  const previewContent = fillTemplateForPreview();
  const styles = currentTemplate.styles || {};
  const allFieldsFilled = isAllRequiredFieldsFilled();
  const currentGuide = documentGuides[selectedDoc];

  return (
    <section className="page-section">
      <div className="section-inner">
        <div className="page-header">
          <h1>Формирование документов</h1>
          <p>Мы поможем подготовить документ для обращения в управляющую компанию, ГЖИ или суд.</p>
          <p>Внесите данные в форму, а система мгновенно составит текст документа в окне справа.</p>
          <div className="doc-builder-note">
            В целях вашей безопасности мы не запрашиваем персональные данные на сайте. В шаблонах оставлены пустые поля, которые Вам необходимо заполнить самостоятельно после загрузки файла.
          </div>
        </div>

        <div className="doc-builder-container">
          <div className="doc-selector">
            <h3>Выберите тип документа</h3>
            <div className="doc-grid">
              {documents.map(doc => (
                <button
                  key={doc.id}
                  className={`doc-card ${selectedDoc === doc.id ? 'active' : ''}`}
                  onClick={() => changeDocument(doc.id)}
                >
                  <h4>{doc.name}</h4>
                </button>
              ))}
            </div>
          </div>

          <div className="doc-form-section">
            <h3>Ввод данных</h3>
            {currentGuide && (
              <div className="doc-guide-stack">
                <details className="doc-guide-card" open>
                  <summary>Что это за документ</summary>
                  <p>{currentGuide.whatIsIt}</p>
                  {currentGuide.examples?.length > 0 && (
                    <>
                      <h4>Когда обычно нужен</h4>
                      <ul>
                        {currentGuide.examples.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </details>

                <details className="doc-guide-card">
                  <summary>Типовые приложения</summary>
                  <ul>
                    {currentGuide.attachments.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </details>
              </div>
            )}
            <div style={{ marginBottom: '16px', fontSize: '14px', fontWeight: '500' }}>
              Статус: {' '}
              <span style={{ color: allFieldsFilled ? '#10b981' : '#f59e0b' }}>
                {allFieldsFilled ? '● Готов к скачиванию' : '○ Требует внимания'}
              </span>
            </div>

            <form className="doc-form">
              {currentTemplate.fields.map(field => {
                const isError = emptyFields.some(f => f.name === field.name);
                const formatError = validationErrors[field.name];
                const isLocked = isFieldLocked(field);
                const isCourtNameField = field.name === 'Наименование суда';
                const isCourtAddressField = field.name === 'Адрес суда';
                const isUkNameField = field.name === 'Название УК' || field.name === 'Наименование УК';
                
                return (
                  <div key={field.name} className="form-group">
                    <label className="form-label">
                      {field.label} {field.required && <span style={{ color: '#ef4444' }}>*</span>}
                      {isLocked && <span className="field-lock-badge">Заполняется вручную</span>}
                    </label>
                    {isCourtNameField ? (
                      <select
                        className={`form-input ${isError || formatError ? 'input-error' : ''}`}
                        name={field.name}
                        value={getSelectedCourtId()}
                        onChange={handleCourtSelectChange}
                      >
                        <option value="">Выберите суд</option>
                        {courtOptions.map(group => (
                          <optgroup key={group.group} label={group.group}>
                            {group.items.map(court => (
                              <option key={court.id} value={court.id}>
                                {court.name}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    ) : isUkNameField ? (
                      <select
                        className={`form-input ${isError || formatError ? 'input-error' : ''}`}
                        name={field.name}
                        value={getSelectedUkId()}
                        onChange={handleUkSelectChange}
                      >
                        <option value="">Выберите управляющую компанию</option>
                        {managementCompanies.map(company => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </select>
                    ) : isCourtAddressField ? (
                      <input
                        className={`form-input ${isError || formatError ? 'input-error' : ''}`}
                        type="text"
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder="Адрес суда подставится автоматически"
                      />
                    ) : field.type === 'textarea' ? (
                      <textarea
                        className={`form-textarea ${isError || formatError ? 'input-error' : ''} ${isLocked ? 'input-locked' : ''}`}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={isLocked ? 'Поле заполняется вручную после скачивания' : `Введите ${field.label.toLowerCase()}`}
                        disabled={isLocked}
                      />
                    ) : (
                      <input
                        className={`form-input ${isError || formatError ? 'input-error' : ''} ${isLocked ? 'input-locked' : ''}`}
                        type={field.type || 'text'}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={isLocked ? 'Поле заполняется вручную после скачивания' : `Введите ${field.label.toLowerCase()}`}
                        disabled={isLocked}
                      />
                    )}
                    {formatError && (
                      <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{formatError}</div>
                    )}
                  </div>
                );
              })}
            </form>
            <button className="btn-clear" onClick={clearForm}>Очистить форму</button>
          </div>

          <div className="doc-preview-section">
            <div className="preview-header">
              <h3>Предпросмотр документа</h3>
              <button className="btn-primary" onClick={handleDownload}>
                Скачать Word (.doc)
              </button>
            </div>
            <div className="doc-preview">
              {previewContent.map((block, i) => (
                <div key={i} style={styles[block.type]}>
                  {block.content}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="doc-builder-footer">
          <div className="doc-builder-tip-card">
            <h4>Полезные ресурсы</h4>
            <div className="doc-builder-resource-item">
              <h5>Хотите действовать через представителя?</h5>
              <button type="button" className="doc-builder-tip-link" onClick={goToRepresentativeHelp}>
                Узнайте как это сделать в разделе "Алгоритм судебного сопровождения"
              </button>
            </div>
            <div className="doc-builder-resource-item">
              <h5>Памятка по выбору суда</h5>
              <button type="button" className="doc-builder-tip-link" onClick={openCourtReminder}>
                Открыть памятку
              </button>
            </div>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-container" style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', maxWidth: '500px', width: '90%', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
            <div className="modal-header">
              <h3 style={{ color: '#b91c1c', margin: 0 }}>⚠️ Внимание</h3>
            </div>
            <div className="modal-body" style={{ margin: '20px 0' }}>
              
              {emptyFields.length > 0 && (
                <>
                  <p>Вы не заполнили обязательные поля:</p>
                  <ul style={{ color: '#4b5563', fontSize: '14px', paddingLeft: '20px', marginBottom: '16px' }}>
                    {emptyFields.map(field => <li key={field.name}>{field.label}</li>)}
                  </ul>
                </>
              )}

              {Object.keys(validationErrors).length > 0 && (
                <>
                  <p>Обнаружены ошибки в формате данных:</p>
                  <ul style={{ color: '#ef4444', fontSize: '14px', paddingLeft: '20px', marginBottom: '16px' }}>
                    {Object.entries(validationErrors).map(([name, msg]) => {
                      const f = currentTemplate.fields.find(field => field.name === name);
                      return <li key={name}>{f?.label}: {msg}</li>;
                    })}
                  </ul>
                </>
              )}

              <p style={{ marginTop: '16px', fontWeight: '500', borderLeft: '4px solid #f59e0b', paddingLeft: '10px' }}>
                В скачанном Word-файле пустые места будут <span style={{backgroundColor: 'yellow'}}>выделены желтым</span>. Вы сможете дозаполнить их вручную.
              </p>
            </div>
            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button onClick={() => setShowConfirmModal(false)} style={{ padding: '10px 20px', borderRadius: '6px', border: '1px solid #d1d5db', cursor: 'pointer', backgroundColor: 'white' }}>
                Вернуться
              </button>
              <button onClick={confirmDownload} style={{ padding: '10px 20px', borderRadius: '6px', backgroundColor: '#2563eb', color: 'white', border: 'none', cursor: 'pointer', fontWeight: '500' }}>
                Всё равно скачать
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
