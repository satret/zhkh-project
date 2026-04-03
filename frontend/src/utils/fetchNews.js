const CATEGORIES_MAP = {
  emergency:   ['авари', 'прорыв', 'отключен'],
  legal:       ['суд', 'иск', 'нарушен', 'штраф'],
  legislation: ['закон', 'постановлен'],
  tariffs:     ['тариф', 'плата'],
  capital:     ['капремонт', 'капитальн'],
  services:    ['управляющ', 'тсж'],
};

export async function fetchNews() {
  const res = await fetch('/api/news');
  if (!res.ok) throw new Error('Ошибка сервера');
  const data = await res.json();
  return data.items;
}