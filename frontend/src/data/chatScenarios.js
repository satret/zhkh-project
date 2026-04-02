// src/data/chatScenarios.js

export const chatScenarios = {
  // Базовые сценарии
  start: {
    text: 'Привет! Я ИИ-консультант по вопросам ЖКХ. Чем могу помочь?',
    options: [
      { label: 'Проверить начисления', value: 'check'},
      { label: 'Подать жалобу', value: 'complaint' },
      { label: 'Задать вопрос', value: 'question' },
    ]
  },
  
  check: {
    text: 'Перевожу вас в раздел Проверки начислений.',
    redirect: {
      page: 'calculator'
    }
  },
  
  complaint: {
    text: 'Что случилось? Опишите проблему:',
    options: [
      { label: 'Нет ремонта в подъезде', value: 'in_construction' },
      { label: 'Завышенные счета', value: 'in_construction' },
      { label: 'Назад', value: 'start' },
    ]
  },
  
  question: {
    text: 'Задайте ваш вопрос, я помогу!\n\nТакже можете посмотреть на частые вопросы пользователей и ответы на них. Кто знает, может быть на ваш вопрос уже ответили.',
    options: [
      { label: 'Как передать показания?', value: 'in_construction' },
      { label: 'Как сделать перерасчёт?', value: 'in_construction' },
      { label: 'Назад', value: 'start' },
    ],
    redirect: {
      page: 'faq'
    }
  },
  
  default: {
    text: 'Спасибо за ваш вопрос. Я анализирую информацию и подготавливаю ответ...',
    options: [
      { label: 'В главное меню', value: 'start' },
    ]
  },

  in_construction: {
    text: 'Данный раздел находится в разработке',
    options: [
      { label: 'В главное меню', value: 'start' },
    ]
  },

  // ========== АВАРИЙНЫЕ СЦЕНАРИИ ==========

  emergency_type_select: {
    text: 'Что случилось? Выберите тип аварии:',
    options: [
      { label: 'Протечка воды', value: 'emergency_water_start' },
      { label: 'Утечка газа', value: 'in_construction' },
      { label: 'Нет электричества', value: 'in_construction' },
      { label: 'Нет отопления', value: 'in_construction' },
      { label: 'Проблема с лифтом', value: 'in_construction' },
      { label: 'Проблема с канализацией', value: 'in_construction' },
    ]
  },
  
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
    ]
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