import React, { useState } from 'react';
import '../styles/pages.css';

export default function Calculator() {
  const [squareMeters, setSquareMeters] = useState('50');
  const [hasCounters, setHasCounters] = useState(false);
  const [waterUsage, setWaterUsage] = useState('100');
  const [electricityUsage, setElectricityUsage] = useState('200');
  const [result, setResult] = useState(null);

  const calculatePayment = (e) => {
    e.preventDefault();
    
    const tariffs = regions[region].tariffs;
    const sq = parseFloat(squareMeters) || 0;
    
    const calculations = {
      heating: sq * tariffs.heating / 100,
      coldWater: hasCounters ? parseFloat(waterUsage) * tariffs.water : sq * 5 * tariffs.water,
      hotWater: hasCounters ? parseFloat(waterUsage) * tariffs.hotWater : sq * 3.5 * tariffs.hotWater,
      electricity: hasCounters ? parseFloat(electricityUsage) * tariffs.electricity : sq * 20 * tariffs.electricity,
      sewage: hasCounters ? parseFloat(waterUsage) * tariffs.sewage : sq * 5 * tariffs.sewage,
      gas: sq * tariffs.gas / 100,
      maintenance: sq * tariffs.maintenance / 100,
      odno: sq * 50 / 100
    };

    const total = Object.values(calculations).reduce((a, b) => a + b, 0);
    
    setResult({
      ...calculations,
      total,
      regionName: regions[region].name,
      tariffs,
      hasCounters
    });
  };

  return (
    <section className="page-section">
      <div className="section-inner">
        <div className="page-header">
          <h1>Калькулятор для проверки корректности начислений</h1>
          <p className="page-subtitle">Проверьте корректность начислений ЖКХ, сравнив с актуальными тарифами Республики Дагестан</p>
        </div>

        <div className="calculator-container">
          <form className="calculator-form" onSubmit={calculatePayment}>

            <div className="form-group">
              <label className="form-label">Площадь квартиры (кв.м)</label>
              <input 
                className="form-input"
                type="number"
                step="0.1"
                placeholder="50"
                value={squareMeters}
                onChange={(e) => setSquareMeters(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-checkbox">
                <input 
                  type="checkbox"
                  checked={hasCounters}
                  onChange={(e) => setHasCounters(e.target.checked)}
                />
                <span>У меня установлены счётчики</span>
              </label>
            </div>

            {hasCounters && (
              <>
                <div className="form-group">
                  <label className="form-label">Показания счётчика воды (куб.м)</label>
                  <input 
                    className="form-input"
                    type="number"
                    step="0.1"
                    placeholder="100"
                    value={waterUsage}
                    onChange={(e) => setWaterUsage(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Показания счётчика электричества (кВт)</label>
                  <input 
                    className="form-input"
                    type="number"
                    step="0.1"
                    placeholder="200"
                    value={electricityUsage}
                    onChange={(e) => setElectricityUsage(e.target.value)}
                  />
                </div>
              </>
            )}

            <button type="submit" className="btn-primary">Рассчитать платёж</button>
          </form>

          {result && (
            <div className="calculator-result">
              <h3>Расчет платежа</h3>
              <div className="result-info">
                <p><strong>Регион:</strong> {result.regionName}</p>
                <p><strong>Площадь:</strong> {squareMeters} кв.м</p>
              </div>

              <div className="calculation-breakdown">
                <h4>Детализация начислений</h4>
                
                <div className="calc-item">
                  <span className="calc-name">Отопление</span>
                  <span className="calc-value">{result.heating.toFixed(2)} ₽</span>
                </div>

                <div className="calc-item">
                  <span className="calc-name">Холодное водоснабжение</span>
                  <span className="calc-value">{result.coldWater.toFixed(2)} ₽</span>
                </div>

                <div className="calc-item">
                  <span className="calc-name">Горячее водоснабжение</span>
                  <span className="calc-value">{result.hotWater.toFixed(2)} ₽</span>
                </div>

                <div className="calc-item">
                  <span className="calc-name">Электроэнергия</span>
                  <span className="calc-value">{result.electricity.toFixed(2)} ₽</span>
                </div>

                <div className="calc-item">
                  <span className="calc-name">Водоотведение</span>
                  <span className="calc-value">{result.sewage.toFixed(2)} ₽</span>
                </div>

                <div className="calc-item">
                  <span className="calc-name">Газ</span>
                  <span className="calc-value">{result.gas.toFixed(2)} ₽</span>
                </div>

                <div className="calc-item">
                  <span className="calc-name">Содержание имущества</span>
                  <span className="calc-value">{result.maintenance.toFixed(2)} ₽</span>
                </div>

                <div className="calc-item">
                  <span className="calc-name">ОДН (общедомовые нужды)</span>
                  <span className="calc-value">{result.odno.toFixed(2)} ₽</span>
                </div>

                <div className="calc-total">
                  <span className="calc-name"><strong>Итого в месяц</strong></span>
                  <span className="calc-value"><strong>{result.total.toFixed(2)} ₽</strong></span>
                </div>
              </div>

              <div className="result-help">
                <p className="result-tip">
                  💡 <strong>Совет:</strong> Сравните эту сумму со своей квитанцией. Если разница больше 10%, обратитесь в УК с требованием перерасчета.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="calculator-footer">
          <div className="footer-section">
            <h4>Понимание расчётов</h4>
            <p>Все расчеты выполняются в соответствии с:</p>
            <ul>
              <li><a href="https://www.consultant.ru/document/cons_doc_LAW_114247/" className="link-btn">Постановлением Правительства РФ №354 о правилах содержания имущества →</a></li>
              <li><a href="#" className="link-btn">Методикой расчета платы за ЖКУ →</a></li>
              <li><a href="https://www.consultant.ru/document/cons_doc_LAW_51057/" className="link-btn">Жилищным кодексом РФ →</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Ознакомиться с формулой и тарифами</h4>
            <p>Для более подробного разбора ваших конкретных начислений:</p>
            <div className="cta-links">
              <a href="https://info-gkh.ru/regiontariff/dagestan-respublika" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Тарифы Республики Дагестан на коммунальные услуги →
              </a>
              <a href="#" className="btn-secondary">
                Посмотреть формулу расчёта →
              </a>
              {/* <a href="#" className="btn-secondary">
                Скачать справку об актуальных тарифах →
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
