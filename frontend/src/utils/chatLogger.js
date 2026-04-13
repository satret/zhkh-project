// Единая точка записи истории чата.
// Сейчас пишем в localStorage, позже можно заменить sendEvent на fetch к API.

const STORAGE_KEY = 'chat_history_v1';
const SESSION_KEY = 'chat_session_id';
const MAX_SESSIONS = 50; // чтобы не раздувать localStorage

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function writeAll(sessions) {
  try {
    // ограничиваем количество сессий
    const trimmed = sessions.slice(-MAX_SESSIONS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('[chatLogger] storage write failed', e);
  }
}

function getOrCreateSession() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = uid();
    sessionStorage.setItem(SESSION_KEY, id);
    const sessions = readAll();
    sessions.push({
      id,
      startedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      events: []
    });
    writeAll(sessions);
  }
  return id;
}

// Главная функция — записать событие
export function logEvent(type, payload = {}) {
  const sessionId = getOrCreateSession();
  const event = {
    type,                      // 'user_message' | 'user_option' | 'bot_message' | 'emergency' | 'problem' | 'redirect' | 'session_end'
    ts: new Date().toISOString(),
    ...payload
  };

  const sessions = readAll();
  const session = sessions.find(s => s.id === sessionId);
  if (session) {
    session.events.push(event);
    writeAll(sessions);
  }

  // Точка расширения для бэкенда:
  // sendToServer(sessionId, event);

  return event;
}

// Заглушка под будущий бэкенд
// async function sendToServer(sessionId, event) {
//   try {
//     await fetch('/api/chat-log', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ sessionId, event })
//     });
//   } catch (e) {
//     // офлайн — событие уже в localStorage, можно синкать позже
//   }
// }

// Получить всю историю (для админки/отладки)
export function getAllHistory() {
  return readAll();
}

// Получить текущую сессию
export function getCurrentSession() {
  const id = sessionStorage.getItem(SESSION_KEY);
  return readAll().find(s => s.id === id) || null;
}

// Экспорт в JSON-файл (удобно при разработке)
export function exportHistory() {
  const data = JSON.stringify(readAll(), null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chat-history-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Очистить всё
export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}