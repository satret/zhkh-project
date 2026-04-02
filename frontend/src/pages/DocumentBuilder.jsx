import React, { useState, useEffect } from 'react';
import '../styles/document-builder.css';

import complaintData from '../docs_templates/complaint.json';
import claimData from '../docs_templates/claim.json';

export default function DocumentBuilder() {
  const [selectedDoc, setSelectedDoc] = useState('complaint');
  const [documents, setDocuments] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [emptyFields, setEmptyFields] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // состояние для модального окна

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
    current.fields.forEach(field => {
      initialFormData[field.name] = '';
    });
    setFormData(initialFormData);

    setLoading(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // при изменении полей очищаем предупреждение о пустых полях
    setEmptyFields([]);
  };

  const clearForm = () => {
    const newFormData = {};
    currentTemplate.fields.forEach(field => {
      newFormData[field.name] = '';
    });
    setFormData(newFormData);
    setEmptyFields([]);
    setShowConfirmModal(false);
  };

  const getEmptyFields = () => {
    return currentTemplate.fields.filter(field => {
      if (!field.required) return false;
      return !formData[field.name] || formData[field.name].trim() === '';
    });
  };

  // Проверка на заполнение всех обязательных полей
  const isAllRequiredFieldsFilled = () => {
    const empty = getEmptyFields();
    return empty.length === 0;
  };

  const handleDownload = () => {
    const empty = getEmptyFields();
    setEmptyFields(empty);

    if (empty.length > 0) {
      // Показываем модальное окно подтверждения
      setShowConfirmModal(true);
    } else {
      // Все поля заполнены - скачиваем сразу
      exportToWord();
    }
  };

  // Подтверждение скачивания с незаполненными полями
  const confirmDownload = () => {
    setShowConfirmModal(false);
    exportToWord();
  };

  // Заполнение шаблона (blocks)
  const fillTemplate = () => {
    if (!currentTemplate || !currentTemplate.blocks) return [];

    return currentTemplate.blocks.map(block => {
      let text = block.content;

      Object.keys(formData).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        text = text.replace(regex, formData[key] || `[${key}]`);
      });

      return {
        type: block.type,
        content: text
      };
    });
  };

  // Экспорт в Word
  const exportToWord = () => {
    if (!currentTemplate) return;

    const contentBlocks = fillTemplate();
    const styles = currentTemplate.styles || {};

    const formatted = contentBlocks.map(block => {
      const lines = block.content.split('\n');
      const style = styles[block.type] || styles.body || {};

      const styleString = Object.entries(style)
        .map(([key, value]) => {
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          return `${cssKey}: ${value}`;
        })
        .join('; ');

      return lines.map(line => {
        if (line.trim() === '') {
          return '<p>&nbsp;</p>';
        }
        return `<p style="${styleString}">${line}</p>`;
      }).join('');
    }).join('');

    const wordHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${currentTemplate.title}</title>
        <style>
          body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 14pt;
          }
          p {
            margin: 0;
          }
        </style>
      </head>
      <body>
        ${formatted}
      </body>
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

  const changeDocument = (docId) => {
    setSelectedDoc(docId);

    const templates = {
      complaint: complaintData,
      claim: claimData
    };

    const newTemplate = templates[docId];
    setCurrentTemplate(newTemplate);

    const newFormData = {};
    newTemplate.fields.forEach(field => {
      newFormData[field.name] = '';
    });
    setFormData(newFormData);
    setEmptyFields([]);
    setShowConfirmModal(false);
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Загрузка...</div>;
  }

  if (!currentTemplate) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Нет шаблонов</div>;
  }

  const filledContent = fillTemplate();
  const styles = currentTemplate.styles || {};
  const allFieldsFilled = isAllRequiredFieldsFilled();

  return (
    <section className="page-section">
      <div className="section-inner">
        <div className="page-header">
          <h1>Формирование документов</h1>
          <p>Заполните шаблон - система создаст готовый документ, который можно будет сохранить и распечатать</p>
          <p>или скачайте шаблон документа и заполните его самостоятельно</p>
        </div>

        <div className="doc-builder-container">

          {/* выбор документа */}
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
                  <p>{doc.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* форма */}
          <div className="doc-form-section">
            <h3>Заполните данные</h3>

            {/* предупреждение о незаполненных полях */}
            {emptyFields.length > 0 && (
              <div className="form-warning">
                Заполните обязательные поля: {emptyFields.map(f => f.label).join(', ')}
              </div>
            )}

            {/* индикатор заполнения */}
            <div style={{ marginBottom: '16px', fontSize: '13px' }}>
              <span style={{ color: allFieldsFilled ? '#10b981' : '#f59e0b' }}>
                {allFieldsFilled ? 'Все обязательные поля заполнены' : 'Не все обязательные поля заполнены'}
              </span>
            </div>

            <form className="doc-form">
              {currentTemplate.fields.map(field => {
                const isEmpty = field.required && (!formData[field.name] || formData[field.name].trim() === '');

                return (
                  <div key={field.name} className="form-group">
                    <label className="form-label">
                      {field.label}
                      {field.required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
                    </label>

                    {field.type === 'textarea' ? (
                      <textarea
                        className={`form-textarea ${isEmpty ? 'input-error' : ''}`}
                        placeholder={field.placeholder || ''}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <input
                        className={`form-input ${isEmpty ? 'input-error' : ''}`}
                        type={field.type || 'text'}
                        placeholder={field.placeholder || ''}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                      />
                    )}
                    {isEmpty && (
                      <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                        Это поле обязательно для заполнения
                      </div>
                    )}
                  </div>
                );
              })}
            </form>

            <button className="btn-clear" onClick={clearForm}>Очистить</button>
          </div>

          {/* предпросмотр */}
          <div className="doc-preview-section">
            <div className="preview-header">
              <h3>Предпросмотр</h3>
              <button className="btn-primary" onClick={handleDownload}>
                Скачать Word
              </button>
            </div>

            <div className="doc-preview">
              {filledContent.map((block, i) => (
                <div key={i} style={styles[block.type]}>
                  {block.content.split('\n').map((line, j) => (
                    <div key={j}>{line}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Модальное окно подтверждения */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-icon"></span>
              <h3>Не все поля заполнены</h3>
            </div>
            <div className="modal-body">
              <p>Следующие обязательные поля не заполнены:</p>
              <ul className="modal-field-list">
                {emptyFields.map(field => (
                  <li key={field.name}>• {field.label}</li>
                ))}
              </ul>
              <p className="modal-warning-text">
                Документ будет сгенерирован с пустыми местами для этих полей.
                Вы уверены, что хотите продолжить?
              </p>
            </div>
            <div className="modal-footer">
              <button className="modal-btn-cancel" onClick={() => setShowConfirmModal(false)}>
                Отмена
              </button>
              <button className="modal-btn-confirm" onClick={confirmDownload}>
                Всё равно скачать
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}