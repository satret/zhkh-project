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

  // Сценарий: Большая платёжка
  problem_large_bill_start: {
    text: 'Вам пришла большая платёжка, хотя вы ждали сумму меньше.\n\nДавайте воспользуемся Калькулятором начислений, чтобы сравнить, какая сумма должна была придти.',
    options: [
      { label: 'Я получил ту же сумму, что и в квитанции.', value: 'problem_large_bill_ok' },
      { label: 'Я получил сумму меньше', value: 'problem_large_bill_recalc' },
    ],
    redirect: {
      page: 'calculator'
    }
  },
  
  problem_large_bill_ok: {
    text: 'Калькулятор посчитал ту же сумму, значит сумма в квитанции правильная. Просто всё дорожает, как и услуги ЖКХ.',
    options: [
      { label: 'В главное меню', value: 'start' },
    ]
  },
  
  problem_large_bill_recalc: {
    text: 'Давайте разберёмся с возможными причинами повышенной квитанции.\n\nВ вашей квартире установлены индивидуальные приборы учёта (счётчики) на газ, воду, электричество?',
    options: [
      { label: 'Да', value: 'problem_large_bill_readings' },
      { label: 'Нет', value: 'problem_large_bill_no_counter' },
    ]
  },

  problem_large_bill_no_counter: {
    text: 'Составлен ли акт о технической невозможности установки счётчиков? Такой акт выдают, если установка прибора невозможна.',
    options: [
      { label: 'Да', value: 'problem_large_bill_house' },
      { label: 'Нет', value: 'problem_large_bill_no_counter_bill' },
    ]
  },

  problem_large_bill_no_counter_bill: {
    text: 'Если счётчики отсутствуют, то применяется повышающий коэффициент 1,5 к нормативу потребления. Это законно, но сумма дейсвительно может быть высокой.\n\nСоответствует ли рост расходов указанной информации?',
    options: [
      { label: 'Да', value: 'problem_large_bill_final' },
      { label: 'Нет', value: 'problem_large_bill_appeal' },
    ]
  },
  
  problem_large_bill_readings: {
    text: 'Передавали ли вы показания счётчиков?',
    options: [
      { label: 'Да', value: 'problem_large_bill_house' },
      { label: 'Нет, менее 3 месяцев', value: 'problem_large_bill_less' },
      { label: 'Нет, более 3 месяцев', value: 'problem_large_bill_more' },
    ]
  },

  problem_large_bill_house: {
    text: 'Выросли ли расходы на общедомовые нужды?',
    options: [
      { label: 'Да', value: 'problem_large_bill_appeal1' },
      { label: 'Нет', value: 'problem_large_bill_appeal2' },
    ]
  },

  problem_large_bill_appeal1: {
    text: 'Возможно, УК распределила сверхнормативный ОДН. Это недопустимо без решения общего собрания собственников.\n\nСоветуем обратиться в УК с заявлением о проверке правильности начислений.\n\nЗаявление должно быть зарегестрировано в течение 3 рабочих дней, ответ УК обязана дать в течение 10 рабочих дней.\n\nЯ пересылаю вас в раздел Формирование документов, где можно заполнить шаблон обращения в УК.',
    options: [
      { label: 'Я заполнил документы. Что дальше?', value: 'problem_large_bill_checklists' },
    ],
    redirect: {
      page: 'documents'
    }
  },

  problem_large_bill_appeal2: {
    text: 'Причина повышенной платёжки не является одной из частых.\n\nСоветуем обратиться в УК с заявлением о проверке правильности начислений.\n\nЗаявление должно быть зарегестрировано в течение 3 рабочих дней, ответ УК обязана дать в течение 10 рабочих дней.\n\nЯ пересылаю вас в раздел Формирование документов, где можно заполнить шаблон обращения в УК.',
    options: [
      { label: 'Я заполнил документы. Что дальше?', value: 'problem_large_bill_checklists' },
    ],
    redirect: {
      page: 'documents'
    }
  },
  
  problem_large_bill_less: {
    text: 'Начисления должны были осуществляться по среднемесячному расходу. Поэтому плата действительно могла возрасти.\n\nСоответствует ли рост расходов указанной информации?',
    options: [
      { label: 'Да', value: 'problem_large_bill_final' },
      { label: 'Нет', value: 'problem_large_bill_appeal' },
    ]
  },

  problem_large_bill_more: {
    text: 'В течение 3 месяцев расчёт должен был производиться по среднемесячному расходу. С 3-го месяца - по нормативу. Поэтому плата действительно могла возрасти.\n\nСоответствует ли рост расходов указанной информации?',
    options: [
      { label: 'Да', value: 'problem_large_bill_final' },
      { label: 'Нет', value: 'problem_large_bill_appeal' },
    ]
  },
  
  problem_large_bill_appeal: {
    text: 'Советуем обратиться в УК с заявлением о проверке правильности начислений.\n\nЗаявление должно быть зарегестрировано в течение 3 рабочих дней, ответ УК обязана дать в течение 10 рабочих дней.\n\nЯ пересылаю вас в раздел Формирование документов, где можно заполнить шаблон обращения в УК.',
    options: [
      { label: 'Я заполнил документы. Что дальше?', value: 'problem_large_bill_checklists' },
    ],
    redirect: {
      page: 'documents'
    }
  },

  problem_large_bill_checklists: {
    text: 'Перенаправляю вас в раздел Самопроверка. В этом разделе расписаны пукнты, которые необходимы для подачи обращения в УК. Проверьте, что вы выполнили все пукнты.',
    options: [
      { label: 'Всё готово, что дальше?', value: 'problem_large_bill_complete' },
      { label: 'Мне нужно вернуться к документам', value: 'problem_large_bill_appeal' },
    ],
    redirect: {
      page: 'selfcheck'
    }
  },

  problem_large_bill_complete: {
    text: 'Отлично! Теперь вы можете обратиться в управляющую компанию с пакетом документов для обжалования квитанции.',
    redirect: {
      page: 'contacts',
      subsection: 'management-companies'
    }
  },
  
  problem_large_bill_final: {
    text: 'Спасибо за обращение. Если появятся новые вопросы, мы с радостью на них ответим!',
    options: [
      { label: 'В главное меню', value: 'start' },
    ]
  },
};