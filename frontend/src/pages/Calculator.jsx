import React, { useState } from 'react';
import '../styles/calculator.css';

// Нормативы из вашего Excel
const NORMATIVES = {
  1: { 1: [111, 69, 53, 43, 38], 2: [143, 89, 69, 56, 49], 3: [162, 100, 78, 63, 55], 4: [175, 109, 84, 68, 60] },
  2: { 1: [161, 100, 77, 63, 55], 2: [190, 118, 91, 74, 65], 3: [208, 129, 100, 81, 71], 4: [221, 137, 106, 86, 75] },
  3: { 1: [308, 191, 148, 120, 105], 2: [397, 246, 191, 155, 135], 3: [450, 279, 216, 175, 153], 4: [487, 302, 234, 190, 165] },
  4: { 1: [234, 145, 112, 91, 80], 2: [302, 187, 145, 118, 103], 3: [342, 212, 164, 133, 116], 4: [370, 229, 177, 144, 126] },
  5: { 1: [358, 222, 172, 140, 122], 2: [422, 262, 203, 165, 144], 3: [462, 286, 222, 180, 157], 4: [490, 304, 235, 191, 167] }
};

export default function ElectricityCalculator() {
  const [view, setView] = useState('menu'); // 'menu' | 'electricity'
  
  // Состояния калькулятора
  const [settlementType, setSettlementType] = useState('city');
  const [hasStove, setHasStove] = useState(false);
  const [hasHeating, setHasHeating] = useState(false);
  const [isHeatingMonth, setIsHeatingMonth] = useState(false);
  const [hasMeters, setHasMeters] = useState(false);
  const [tariffType, setTariffType] = useState('single');
  
  const [consumption, setConsumption] = useState('');
  const [consDay, setConsDay] = useState('');
  const [consNight, setConsNight] = useState('');
  const [consPeak, setConsPeak] = useState('');
  const [consSemiPeak, setConsSemiPeak] = useState('');
  const [consNight3, setConsNight3] = useState('');
  const [rooms, setRooms] = useState('');
  const [people, setPeople] = useState('');
  const [canInstallMeter, setCanInstallMeter] = useState(false);

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const getSpecialCase = () => settlementType === 'city' && !hasStove && !hasHeating;

  const validate = () => {
    setError('');
    if (hasMeters) {
      if (tariffType === 'single' && !consumption) return setError('Укажите общее потребление');
      if (tariffType === 'dual' && (!consDay || !consNight)) return setError('Заполните показания дня и ночи');
      if (tariffType === 'triple' && (!consPeak || !consSemiPeak || !consNight3)) return setError('Заполните все три зоны тарифа');
    } else {
      if (!rooms || !people) return setError('Укажите количество комнат и проживающих');
      if (Number(people) < 1) return setError('Количество проживающих должно быть не менее 1');
    }
    return true;
  };

  const calculate = () => {
    if (!validate()) return;

    let cost = 0;
    let formulaParts = [];
    let tariffRate = 0;
    const isSpecial = getSpecialCase();

    if (hasMeters) {
      if (tariffType === 'single') {
        tariffRate = isHeatingMonth ? (isSpecial ? 4.45 : 3.12) : (isSpecial ? 4.00 : 2.80);
        cost = Number(consumption) * tariffRate;
        formulaParts = [`${consumption} кВт·ч × ${tariffRate} ₽`];
      } 
      else if (tariffType === 'dual') {
        const rDay = isHeatingMonth ? (isSpecial ? 5.32 : 3.72) : (isSpecial ? 4.54 : 3.18);
        const rNight = isHeatingMonth ? (isSpecial ? 3.50 : 2.45) : (isSpecial ? 3.20 : 2.24);
        cost = Number(consDay) * rDay + Number(consNight) * rNight;
        formulaParts = [`${consDay} × ${rDay} + ${consNight} × ${rNight}`];
      } 
      else if (tariffType === 'triple') {
        const rPeak = isHeatingMonth ? (isSpecial ? 6.71 : 4.70) : (isSpecial ? 4.81 : 3.37);
        const rSemi = isHeatingMonth ? (isSpecial ? 4.45 : 3.12) : (isSpecial ? 4.00 : 2.80);
        const rNight = isHeatingMonth ? (isSpecial ? 3.50 : 2.45) : (isSpecial ? 3.20 : 2.24);
        cost = Number(consPeak) * rPeak + Number(consSemiPeak) * rSemi + Number(consNight3) * rNight;
        formulaParts = [`${consPeak} × ${rPeak} + ${consSemiPeak} × ${rSemi} + ${consNight3} × ${rNight}`];
      }
    } else {
      let cat;
      if (!hasStove && !hasHeating) cat = 1;
      else if (hasStove && !hasHeating) cat = 2;
      else if (!hasStove && hasHeating && isHeatingMonth) cat = 3;
      else if (!hasStove && hasHeating && !isHeatingMonth) cat = 4;
      else cat = 5;

      const roomsKey = rooms >= 4 ? 4 : Number(rooms);
      const peopleIdx = Math.min(Number(people), 5) - 1;
      const normative = NORMATIVES[cat]?.[roomsKey]?.[peopleIdx] || 0;

      if (!hasStove && !hasHeating) tariffRate = settlementType === 'city' ? 4.00 : 2.80;
      else if (hasStove && !hasHeating) tariffRate = 2.80;
      else tariffRate = isHeatingMonth ? 3.12 : 2.80;

      const multiplier = canInstallMeter ? 1.5 : 1;
      cost = multiplier * Number(people) * normative * tariffRate;
      formulaParts = [`${multiplier} × ${people} чел. × ${normative} кВт·ч × ${tariffRate} ₽`];
    }

    setResult({ 
      cost: cost.toFixed(2), 
      formula: formulaParts.join(' + ') + ` = ${cost.toFixed(2)} ₽`
    });
  };

  const reset = () => {
    setHasMeters(false); setTariffType('single');
    setConsumption(''); setConsDay(''); setConsNight('');
    setConsPeak(''); setConsSemiPeak(''); setConsNight3('');
    setRooms(''); setPeople(''); setCanInstallMeter(false);
    setResult(null); setError('');
  };

  // === VIEW: MENU ===
  if (view === 'menu') {
    return (
      <section className="calc-wrapper">
        <div className="calc-container">
          <header className="calc-header">
            <h1 className="calc-title">Калькуляторы <span className="accent">коммунальных услуг</span></h1>
            <p className="calc-subtitle">Выберите тип ресурса для расчёта стоимости потребления</p>
          </header>
          <div className="calc-menu-grid">
            <button className="calc-menu-card active">
              <span className="calc-card-title">Холодная вода</span>
            </button>
            <button className="calc-menu-card active">
              <span className="calc-card-title">Горячая вода</span>
            </button>
            <button className="calc-menu-card active">
              <span className="calc-card-title">Газ</span>
            </button>
            <button className="calc-menu-card active" onClick={() => setView('electricity')} aria-label="Перейти к расчёту электроэнергии">
              <span className="calc-card-title">Электроэнергия</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // === VIEW: CALCULATOR ===
  return (
    <section className="calc-wrapper">
      <div className="calc-container">
        <button className="calc-back-btn" onClick={() => setView('menu')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Назад к выбору услуг
        </button>

        <header className="calc-header">
          <h1 className="calc-title">Калькулятор <span className="accent">электроэнергии</span></h1>
          <p className="calc-subtitle">Точный расчёт стоимости по счётчику или нормативу с учётом тарифных зон</p>
        </header>

        <form className="calc-form" onSubmit={e => { e.preventDefault(); calculate(); }}>
          <div className="calc-section">
            <h3 className="calc-section-title">Параметры помещения</h3>
            <div className="calc-form-grid">
              <InputGroup label="Тип населённого пункта">
                <ToggleGroup options={[{v:'city', l:'Город'}, {v:'village', l:'Село'}]} value={settlementType} onChange={setSettlementType} />
              </InputGroup>
              <InputGroup label="Стационарная электроплита?">
                <ToggleGroup options={[{v:true, l:'Есть'}, {v:false, l:'Нет'}]} value={hasStove} onChange={setHasStove} />
              </InputGroup>
              <InputGroup label="Электроотопление?">
                <ToggleGroup options={[{v:true, l:'Есть'}, {v:false, l:'Нет'}]} value={hasHeating} onChange={setHasHeating} />
              </InputGroup>
              <InputGroup label="Отопительный месяц?">
                <ToggleGroup options={[{v:true, l:'Да'}, {v:false, l:'Нет'}]} value={isHeatingMonth} onChange={setIsHeatingMonth} />
              </InputGroup>
              <InputGroup label="Установлен счётчик?">
                <ToggleGroup options={[{v:true, l:'Да'}, {v:false, l:'Нет'}]} value={hasMeters} onChange={setHasMeters} />
              </InputGroup>
            </div>
          </div>

          {hasMeters && (
            <div className="calc-section">
              <h3 className="calc-section-title">Показания счётчика</h3>
              <div className="calc-form-grid">
                <InputGroup label="Тарифная зона">
                  <select className="calc-form-select" value={tariffType} onChange={e => setTariffType(e.target.value)}>
                    <option value="single">Одноставочный</option>
                    <option value="dual">Двухзонный (День/Ночь)</option>
                    <option value="triple">Трёхзонный (Пик/Полупик/Ночь)</option>
                  </select>
                </InputGroup>
                {tariffType === 'single' && (
                  <InputGroup label="Потребление (кВт·ч)">
                    <input type="number" className="form-input" value={consumption} onChange={e => setConsumption(e.target.value)} placeholder="0" />
                  </InputGroup>
                )}
                {tariffType === 'dual' && (
                  <>
                    <InputGroup label="День (Т1)"><input type="number" className="form-input" value={consDay} onChange={e => setConsDay(e.target.value)} placeholder="0" /></InputGroup>
                    <InputGroup label="Ночь (Т2)"><input type="number" className="form-input" value={consNight} onChange={e => setConsNight(e.target.value)} placeholder="0" /></InputGroup>
                  </>
                )}
                {tariffType === 'triple' && (
                  <>
                    <InputGroup label="Пик (Т1)"><input type="number" className="form-input" value={consPeak} onChange={e => setConsPeak(e.target.value)} placeholder="0" /></InputGroup>
                    <InputGroup label="Полупик (Т2)"><input type="number" className="form-input" value={consSemiPeak} onChange={e => setConsSemiPeak(e.target.value)} placeholder="0" /></InputGroup>
                    <InputGroup label="Ночь (Т3)"><input type="number" className="form-input" value={consNight3} onChange={e => setConsNight3(e.target.value)} placeholder="0" /></InputGroup>
                  </>
                )}
              </div>
            </div>
          )}

          {!hasMeters && (
            <div className="calc-section">
              <h3 className="calc-section-title">Расчёт по нормативу</h3>
              <div className="calc-form-grid">
                <InputGroup label="Количество комнат">
                  <select className="calc-form-select" value={rooms} onChange={e => setRooms(e.target.value)}>
                    <option value="">Выберите</option>
                    {[1,2,3,4].map(r => <option key={r} value={r}>{r === 4 ? '4 и более' : r}</option>)}
                  </select>
                </InputGroup>
                <InputGroup label="Проживающих (чел.)">
                  <input type="number" min="1" className="form-input" value={people} onChange={e => setPeople(e.target.value)} placeholder="1" />
                </InputGroup>
                <InputGroup label="Есть тех. возможность установки счётчика?">
                  <ToggleGroup options={[{v:true, l:'Да'}, {v:false, l:'Нет'}]} value={canInstallMeter} onChange={setCanInstallMeter} />
                </InputGroup>
              </div>
            </div>
          )}

          {error && <div className="error-msg">{error}</div>}

          <div className="calc-actions">
            <button type="submit" className="calc-btn btn-primary">Рассчитать стоимость</button>
            <button type="button" className="calc-btn btn-secondary" onClick={reset}>Сбросить</button>
          </div>
        </form>

        {result && (
          <div className="calc-result-box">
            <div className="calc-result-header">
              <span className="calc-result-title">Результат расчёта</span>
              <span className="calc-result-total">{Number(result.cost).toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="calc-formula-card">
              <span className="calc-formula-label">Формула расчёта</span>
              <span dangerouslySetInnerHTML={{ __html: result.formula.replace(/\d+/g, m => `<span class="formula-highlight">${m}</span>`) }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function InputGroup({ label, children }) {
  return <div className="calc-input-group"><label className="input-label">{label}</label>{children}</div>;
}

function ToggleGroup({ options, value, onChange }) {
  return (
    <div className="calc-toggle-group">
      {options.map(opt => (
        <button
          key={String(opt.v)}
          className={`calc-toggle-btn ${value === opt.v ? 'active' : ''}`}
          onClick={() => onChange(opt.v)}
          type="button"
        >
          {opt.l}
        </button>
      ))}
    </div>
  );
}