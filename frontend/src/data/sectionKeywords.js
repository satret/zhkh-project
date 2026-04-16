// src/data/sectionKeywords.js

export const sectionKeywords = {
  calculator: {
    keywords: [
      'калькулятор'
    ],
    title: 'Калькулятор начислений',
    redirect: { page: 'calculator' }
  },
  documents: {
    keywords: [
      'документ', 'жалоб', 'претензи', 'заявлен', 
      'составить', 'оформить', 'написать', 'скачать', 'шаблон',
      'формирование', 'генератор', 'создать документ'
    ],
    title: 'Формирование документов',
    redirect: { page: 'documents' }
  },
  legal: {
    keywords: [
      'юридический навигатор', 'навигатор', 'алгоритм действий'
    ],
    title: 'Юридический навигатор',
    redirect: { page: 'selfcheck' } 
  },
  regulations: {
    keywords: [
      'нормативные документы'
    ],
    title: 'Нормативные документы',
    redirect: { page: 'regulations' }
  },
  faq: {
    keywords: [
      'частые вопросы'
    ],
    title: 'Часто задаваемые вопросы',
    redirect: { page: 'faq' }
  }
};

export const detectSection = (text) => {
  const lowerText = text.toLowerCase();
  
  for (const [sectionId, data] of Object.entries(sectionKeywords)) {
    for (const keyword of data.keywords) {
      if (lowerText.includes(keyword)) {
        return {
          found: true,
          section: sectionId,
          title: data.title,
          redirect: data.redirect
        };
      }
    }
  }
  
  return { found: false };
};