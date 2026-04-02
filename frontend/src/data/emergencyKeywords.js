
export const emergencyKeywords = {
  emergency: {
    keywords: ['авари', 'авария', 'несчастный случай', 'чрезвычайная ситуация', 'срочно', 'помогите'],
    title: 'Авария',
    priority: 'critical'
  },
  water: {
    keywords: ['течёт', 'течет', 'протечк', 'топит', 'залива', 'вода', 'труб', 'батаре', 'радиатор', 'кран', 'вентиль', 'потоп', 'водо'],
    title: 'Протечка воды',
    priority: 'critical'
  },
  gas: {
    keywords: ['газ', 'запах газа', 'газовый', 'газовщик', 'утечка газа', 'пахнет газом'],
    title: 'Утечка газа',
    priority: 'critical'
  },
  electricity: {
    keywords: ['нет света', 'электричество', 'свет отключ', 'розетк', 'провод', 'щиток', 'автомат', 'мигает свет'],
    title: 'Проблемы с электричеством',
    priority: 'high'
  },
  heating: {
    keywords: ['нет отопления', 'батареи холодные', 'холодно', 'тепло', 'отопление', 'радиатор холодный', 'греет'],
    title: 'Проблемы с отоплением',
    priority: 'high'
  },
  elevator: {
    keywords: ['лифт', 'лифт не работает', 'застрял', 'лифт застрял', 'кабина', 'подъёмник'],
    title: 'Проблема с лифтом',
    priority: 'high'
  },
  sewage: {
    keywords: ['канализация', 'засор', 'унитаз', 'туалет', 'вода не уходит', 'нечистот', 'затопило'],
    title: 'Засор канализации',
    priority: 'medium'
  },
};

export const detectEmergency = (text) => {
  const lowerText = text.toLowerCase();
  
  const specificTypes = ['water', 'gas', 'electricity', 'heating', 'elevator', 'sewage'];
  
  for (const type of specificTypes) {
    const data = emergencyKeywords[type];
    for (const keyword of data.keywords) {
      if (lowerText.includes(keyword)) {
        return {
          isEmergency: true,
          type,
          title: data.title,
          priority: data.priority
        };
      }
    }
  }
  
  // Если не нашли конкретный тип — проверяем общий 'emergency'
  const emergencyData = emergencyKeywords['emergency'];
  for (const keyword of emergencyData.keywords) {
    if (lowerText.includes(keyword)) {
      return {
        isEmergency: true,
        type: 'emergency',  // ← Общий тип
        title: emergencyData.title,
        priority: emergencyData.priority
      };
    }
  }
  
  return { isEmergency: false };
};