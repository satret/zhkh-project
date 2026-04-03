import React, { useState, useEffect } from 'react';
import '../styles/document-builder.css';

// Предполагаем, что json данные импортируются так же
import complaintData from '../docs_templates/complaint.json';
import claimData from '../docs_templates/claim.json';

export default function DocumentBuilder() {
  const [selectedDoc, setSelectedDoc] = useState('complaint');
  const [documents, setDocuments] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [emptyFields, setEmptyFields] = useState([]);
  const [validationErrors, setValidationErrors] = useState({}); // НОВОЕ: Ошибки формата
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // --- ЛОГИКА ВАЛИДАЦИИ ---
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(phone);

  const getFormatErrors = () => {
    const errors = {};
    if (!currentTemplate || !currentTemplate.fields) return errors;

    currentTemplate.fields.forEach(field => {
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
      claim: claimData
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
      if (!field.required) return false;
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

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Загрузка...</div>;
  if (!currentTemplate) return <div style={{ padding: '40px', textAlign: 'center' }}>Шаблон не найден</div>;

  const previewContent = fillTemplateForPreview();
  const styles = currentTemplate.styles || {};
  const allFieldsFilled = isAllRequiredFieldsFilled();

  return (
    <section className="page-section">
      <div className="section-inner">
        <div className="page-header">
          <h1>Формирование документов</h1>
          <p>Заполните поля слева. Пустые обязательные поля в документе будут выделены желтым.</p>
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
                
                return (
                  <div key={field.name} className="form-group">
                    <label className="form-label">
                      {field.label} {field.required && <span style={{ color: '#ef4444' }}>*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        className={`form-textarea ${isError || formatError ? 'input-error' : ''}`}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={`Введите ${field.label.toLowerCase()}`}
                      />
                    ) : (
                      <input
                        className={`form-input ${isError || formatError ? 'input-error' : ''}`}
                        type={field.type || 'text'}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={`Введите ${field.label.toLowerCase()}`}
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