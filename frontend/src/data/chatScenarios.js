// src/data/chatScenarios.js

export const chatScenarios = {
  // Базовые сценарии
  start: {
    text: 'Привет! Я ИИ-консультант по вопросам ЖКХ. Чем могу помочь?',
    options: [
      { label: 'Проверить начисления', value: 'check' },
      { label: 'Подать жалобу', value: 'complaint' },
      { label: 'Задать вопрос', value: 'question' },
    ]
  },
  
  check: {
    text: 'Выберите тип услуги для проверки:',
    options: [
      { label: 'Отопление', value: 'heating' },
      { label: 'Вода', value: 'water' },
      { label: 'Электричество', value: 'electricity' },
      { label: 'Назад', value: 'start' },
    ]
  },
  
  complaint: {
    text: 'Что случилось? Опишите проблему:',
    options: [
      { label: 'Нет ремонта в подъезде', value: 'repair' },
      { label: 'Завышенные счета', value: 'bills' },
      { label: 'Назад', value: 'start' },
    ]
  },
  
  question: {
    text: 'Задайте ваш вопрос, я помогу!',
    options: [
      { label: 'Как передать показания?', value: 'meters' },
      { label: 'Как сделать перерасчёт?', value: 'recalc' },
      { label: 'Назад', value: 'start' },
    ]
  },
  
  default: {
    text: 'Спасибо за ваш вопрос. Я анализирую информацию и подготавливаю ответ...',
    options: [
      { label: 'В главное меню', value: 'start' },
    ]
  },

  // ========== СЦЕНАРИЙ ЗАТОПЛЕНИЯ ==========
  
  emergency_water_start: {
    text: 'Это аварийная ситуация! Срочные действия:\n\n1. Перекройте воду (кран в ванной/туалете или вводной кран в квартире)\n2. Вызовите аварийную службу УК\n3. Уведомите соседей снизу о возможном затоплении',
    options: [
      { label: 'Перейти к контактам аварийных служб', value: 'emergency_water_redirect_contacts' },
      { label: 'Я выполнил срочные действия', value: 'emergency_water_where' },
    ]
  },
  
  emergency_water_redirect_contacts: {
    text: 'Перенаправляю вас в раздел «Контакты» → «Аварийные службы». Найдите телефон вашей УК или городской аварийной службы и позвоните.',
    options: [
      { label: 'Я позвонил и сделал все необходимые действия, что мне делать дальше?', value: 'emergency_water_where' },
    ],
    redirect: {
      page: 'contacts',
      subsection: 'emergency'
    }
  },
  
  emergency_water_where: {
    text: 'Где произошла протечка?\n\nУточните: прорвало трубу внутри вашей квартиры или повреждены общедомовые инженерные системы (стояк, разводка в подвале, крыша)?',
    options: [
      { label: 'Внутри моей квартиры (мой кран, шланг, батарея)', value: 'emergency_water_owner_responsibility' },
      { label: 'Общедомовые системы (стояк, подвал, крыша)', value: 'emergency_water_uk_responsibility' },
      { label: 'Не уверен', value: 'emergency_water_where_help' },
    ]
  },
  
  emergency_water_where_help: {
    text: 'Как определить:\n\n• Если течёт ваш кран, шланг стиральной машины, ваша батарея — это ваша ответственность.\n• Если течёт стояк (вертикальная труба через все этажи), труба в подвале, крыша — это ответственность УК.\n\nГде была ваша протечка?',
    options: [
      { label: 'Внутри моей квартиры', value: 'emergency_water_owner_responsibility' },
      { label: 'Общедомовые системы', value: 'emergency_water_uk_responsibility' },
    ]
  },
  
  emergency_water_uk_responsibility: {
    text: 'Повреждение общедомовых инженерных систем — ответственность управляющей компании. УК обязана устранить аварию и возместить ущерб.',
    options: [
      { label: 'Как зафиксировать нарушения?', value: 'emergency_water_document' },
    ]
  },
  
  emergency_water_owner_responsibility: {
    text: 'Повреждение внутриквартирного оборудования — ответственность собственника. Вам нужно устранить протечку и возместить ущерб соседям, если он есть.',
    options: [
      { label: 'Как зафиксировать нарушения?', value: 'emergency_water_document' },
    ]
  },
  
  emergency_water_document: {
    text: 'Зафиксируйте последствия затопления:\n\n1. Составьте акт о заливе (с представителем УК)\n2. Сделайте фото и видео повреждений\n3. Сохраните чеки на ремонт и оценку ущерба\n4. Зафиксируйте дату и время аварии',
    options: [
      { label: 'Перейти к формированию документов', value: 'emergency_water_redirect_docs' },
    ],
    redirect: {
      page: 'documents'
    }
  },
  
  emergency_water_redirect_docs: {
    text: 'Перенаправляю вас в раздел «Формирование документов». Скачайте образец акта о заливе и заполните его.',
    options: [
      { label: 'Я сформировал документы, что мне делать дальше?', value: 'emergency_water_checklist' },
    ],
    redirect: {
      page: 'documents'
    }
  },
  
  emergency_water_checklist: {
    text: 'Перенаправляю вас в раздел Самопроверка. В этом разделе расписаны пукнты, которые необходимы для подачи обращения в УК. Проверьте, что вы выполнили все пукнты.',
    options: [
      { label: 'Всё готово, что дальше?', value: 'emergency_water_complete' },
      { label: 'Мне нужно вернуться к документам', value: 'emergency_water_redirect_docs' },
    ],
    redirect: {
      page: 'selfcheck'
    }
  },
  
  emergency_water_complete: {
    text: 'Отлично! Теперь вы можете обратиться в управляющую компанию с пакетом документов для возмещения ущерба или устранения аварии.',
    options: [
      
    ],
    redirect: {
      page: 'contacts',
      subsection: 'management-companies'
    }
  },
  
  emergency_water_end: {
    text: 'Сценарий завершён. Если у вас появятся новые вопросы — обращайтесь. Берегите себя!',
    options: [
      { label: 'В главное меню', value: 'start' },
    ]
  },
};