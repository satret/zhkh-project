// src/data/problemKeywords.js

export const problemKeywords = {
  // Большая платёжка / неправильные начисления
  large_bill: {
    keywords: [
      'большая платёж',
      'большая сумма',
      'много начислили',
      'переплата',
      'ошибка в квитанции',
      'неправильно посчитали',
      'завысили',
      'почему так дорого',
      'высокий счёт',
      'платёжка',
      'платежка',
      'большая',
      'квитанци'
    ],
    title: 'Большая платёжка',
    scenario: 'problem_large_bill_start'
  },
};

// Функция детекции проблемы
export const detectProblem = (text) => {
  const lowerText = text.toLowerCase();
  
  for (const [type, data] of Object.entries(problemKeywords)) {
    for (const keyword of data.keywords) {
      if (lowerText.includes(keyword)) {
        return {
          isProblem: true,
          type,
          title: data.title,
          scenario: data.scenario
        };
      }
    }
  }
  
  return { isProblem: false };
};