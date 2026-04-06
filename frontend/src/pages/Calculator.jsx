import React, { useState } from 'react';
import '../styles/pages.css';
import '../styles/calculator.css';

export default function Calculator() {
  // Шаг калькулятора
  const [currentStep, setCurrentStep] = useState(1);
  
  // Основные параметры
  const [houseType, setHouseType] = useState(''); // 'private' или 'mkd'
  const [settlementType, setSettlementType] = useState(''); // 'city' или 'village'
  const [hasElectricStove, setHasElectricStove] = useState(false);
  const [hasElectricHeating, setHasElectricHeating] = useState(false);
  const [hasMeter, setHasMeter] = useState(false);
  
  // Параметры для расчёта по счётчику
  const [tariffType, setTariffType] = useState('single');
  const [consumption, setConsumption] = useState({
    total: '',
    day: '',
    night: '',
    peak: '',
    semiPeak: ''
  });
  
  // Параметры для расчёта по нормативу
  const [residentsCount, setResidentsCount] = useState('');
  const [roomsCount, setRoomsCount] = useState('');
  const [heatingSeason, setHeatingSeason] = useState(false);
  
  // Параметры ОДН
  const [includeODN, setIncludeODN] = useState(false);
  const [odnMethod, setOdnMethod] = useState('odpu');
  const [odpuTotal, setOdpuTotal] = useState('');
  const [ipuTotal, setIpuTotal] = useState('');
  const [area, setArea] = useState('');
  const [commonArea, setCommonArea] = useState('');
  const [normativeODN, setNormativeODN] = useState('');
  
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Тарифы (из документа electariff.docx)
  const tariffs = {
    before2026: {
      cityNoElectric: {
        single: { range1: 4.00, range2: 5.02, range3: 8.74 },
        twoZone: {
          day: { range1: 4.54, range2: 5.70, range3: 9.91 },
          night: { range1: 3.20, range2: 4.02, range3: 6.99 }
        },
        threeZone: {
          peak: { range1: 4.81, range2: 6.04, range3: 10.49 },
          semiPeak: { range1: 4.00, range2: 5.02, range3: 8.74 },
          night: { range1: 3.20, range2: 4.02, range3: 6.99 }
        }
      },
      cityWithElectric: {
        single: { range1: 2.80, range2: 3.51, range3: 8.74 },
        twoZone: {
          day: { range1: 3.18, range2: 3.99, range3: 9.91 },
          night: { range1: 2.24, range2: 2.81, range3: 6.99 }
        },
        threeZone: {
          peak: { range1: 3.37, range2: 4.23, range3: 10.49 },
          semiPeak: { range1: 2.80, range2: 3.51, range3: 8.74 },
          night: { range1: 2.24, range2: 2.81, range3: 6.99 }
        }
      }
    }
  };

  // Нормативы
  const norms = {
    city: {
      noStoveNoHeating: { norm: 50, description: 'Нет плиты, нет отопления' },
      hasStoveNoHeating: { norm: 80, description: 'Есть плита, нет отопления' },
      noStoveHasHeatingSeason: { norm: 70, description: 'Нет плиты, есть отопление (отопительный сезон)' },
      noStoveHasHeatingOffSeason: { norm: 50, description: 'Нет плиты, есть отопление (вне отопительного сезона)' },
      hasStoveHasHeating: { norm: 100, description: 'Есть плита и отопление' }
    },
    village: {
      noStoveNoHeating: { norm: 60, description: 'Нет плиты, нет отопления' },
      hasStoveNoHeating: { norm: 90, description: 'Есть плита, нет отопления' },
      noStoveHasHeatingSeason: { norm: 80, description: 'Нет плиты, есть отопление (отопительный сезон)' },
      noStoveHasHeatingOffSeason: { norm: 60, description: 'Нет плиты, есть отопление (вне отопительного сезона)' },
      hasStoveHasHeating: { norm: 110, description: 'Есть плита и отопление' }
    }
  };

  // Определение норматива
  const determineNormative = () => {
    const settlementNorms = settlementType === 'city' ? norms.city : norms.village;
    
    if (hasElectricStove && hasElectricHeating) {
      return settlementNorms.hasStoveHasHeating;
    } else if (hasElectricStove && !hasElectricHeating) {
      return settlementNorms.hasStoveNoHeating;
    } else if (!hasElectricStove && hasElectricHeating) {
      return heatingSeason ? settlementNorms.noStoveHasHeatingSeason : settlementNorms.noStoveHasHeatingOffSeason;
    } else {
      return settlementNorms.noStoveNoHeating;
    }
  };

  const getTariffRate = () => {
    if (houseType === 'private' && settlementType === 'city' && !hasElectricStove && !hasElectricHeating) {
      return 1;
    }
    return 0.7;
  };

  const getTariff = () => {
    const rate = getTariffRate();
    let tariffGroup;
    
    if (settlementType === 'village' || hasElectricStove || hasElectricHeating) {
      tariffGroup = tariffs.before2026.cityWithElectric;
    } else {
      tariffGroup = tariffs.before2026.cityNoElectric;
    }
    
    const applyRate = (tariff) => {
      if (typeof tariff === 'object') {
        const result = {};
        for (const key in tariff) {
          result[key] = applyRate(tariff[key]);
        }
        return result;
      }
      return tariff * rate;
    };
    
    return applyRate(tariffGroup);
  };

  const calculateByRanges = (amount, tariff) => {
    const range1 = 3900;
    const range2 = 6000;
    let total = 0;
    
    if (amount <= range1) {
      total = amount * tariff.range1;
    } else if (amount <= range2) {
      total = range1 * tariff.range1 + (amount - range1) * tariff.range2;
    } else {
      total = range1 * tariff.range1 + (range2 - range1) * tariff.range2 + (amount - range2) * tariff.range3;
    }
    
    return total;
  };

  const validateStep = () => {
    setError('');
    
    switch(currentStep) {
      case 1:
        if (!houseType) {
          setError('Выберите тип дома');
          return false;
        }
        break;
      case 2:
        if (!settlementType) {
          setError('Выберите тип населённого пункта');
          return false;
        }
        break;
      case 3:
        // Для села без счётчика проверяем оборудование
        if (settlementType === 'village' && !hasMeter && !hasElectricStove && !hasElectricHeating) {
          // Это нормально, просто нет оборудования
        }
        break;
      case 4:
        if (hasMeter === null || hasMeter === undefined) {
          setError('Выберите наличие счётчика');
          return false;
        }
        break;
      case 5:
        if (hasMeter) {
          if (!tariffType) {
            setError('Выберите тип тарифа');
            return false;
          }
          if (tariffType === 'single' && !consumption.total) {
            setError('Введите общее потребление');
            return false;
          }
          if (tariffType === 'two-zone' && (!consumption.day || !consumption.night)) {
            setError('Введите потребление по зонам');
            return false;
          }
          if (tariffType === 'three-zone' && (!consumption.peak || !consumption.semiPeak || !consumption.night)) {
            setError('Введите потребление по зонам');
            return false;
          }
        } else {
          if (!residentsCount || residentsCount <= 0) {
            setError('Введите количество проживающих');
            return false;
          }
          if (houseType === 'private' && (!roomsCount || roomsCount <= 0)) {
            setError('Введите количество комнат');
            return false;
          }
        }
        break;
      case 6:
        if (includeODN && houseType === 'mkd') {
          if (!area || area <= 0) {
            setError('Введите площадь квартиры');
            return false;
          }
          if (odnMethod === 'odpu' && (!odpuTotal || !ipuTotal || !commonArea)) {
            setError('Заполните все поля для расчёта ОДН');
            return false;
          }
          if (odnMethod === 'normative' && !normativeODN) {
            setError('Введите норматив ОДН');
            return false;
          }
        }
        break;
      default:
        break;
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setError('');
  };

  const calculateCost = () => {
    if (!validateStep()) return;
    
    const tariff = getTariff();
    let cost = 0;
    
    if (hasMeter) {
      if (tariffType === 'single') {
        const total = parseFloat(consumption.total) || 0;
        cost = calculateByRanges(total, tariff.single);
      } else if (tariffType === 'two-zone') {
        const day = parseFloat(consumption.day) || 0;
        const night = parseFloat(consumption.night) || 0;
        cost = calculateByRanges(day, tariff.twoZone.day) + 
               calculateByRanges(night, tariff.twoZone.night);
      } else if (tariffType === 'three-zone') {
        const peak = parseFloat(consumption.peak) || 0;
        const semiPeak = parseFloat(consumption.semiPeak) || 0;
        const night = parseFloat(consumption.night) || 0;
        cost = calculateByRanges(peak, tariff.threeZone.peak) + 
               calculateByRanges(semiPeak, tariff.threeZone.semiPeak) +
               calculateByRanges(night, tariff.threeZone.night);
      }
    } else {
      const residents = parseFloat(residentsCount) || 0;
      const rooms = parseFloat(roomsCount) || 1;
      const normative = determineNormative();
      const normValue = normative.norm;
      
      let totalConsumption = 0;
      
      if (houseType === 'private') {
        totalConsumption = normValue * residents * rooms;
        if (hasElectricHeating && heatingSeason) {
          totalConsumption *= 1.5;
        }
      } else {
        totalConsumption = normValue * residents;
      }
      
      cost = calculateByRanges(totalConsumption, tariff.single);
    }
    
    let odnCost = 0;
    if (includeODN && houseType === 'mkd') {
      if (odnMethod === 'odpu') {
        const totalOdpu = parseFloat(odpuTotal) || 0;
        const totalIpu = parseFloat(ipuTotal) || 0;
        const userArea = parseFloat(area) || 0;
        const totalArea = parseFloat(commonArea) || 0;
        
        const odnVolume = (totalOdpu - totalIpu) * (userArea / totalArea);
        odnCost = calculateByRanges(odnVolume, tariff.single);
      } else {
        const norm = parseFloat(normativeODN) || 0;
        const userArea = parseFloat(area) || 0;
        odnCost = norm * userArea;
      }
    }
    
    setResult({
      mainCost: cost,
      odnCost: odnCost,
      totalCost: cost + odnCost,
      normativeInfo: !hasMeter ? determineNormative() : null
    });
    
    setCurrentStep(prev => prev + 1);
  };

  const resetCalculator = () => {
    setCurrentStep(1);
    setHouseType('');
    setSettlementType('');
    setHasElectricStove(false);
    setHasElectricHeating(false);
    setHasMeter(false);
    setTariffType('single');
    setConsumption({ total: '', day: '', night: '', peak: '', semiPeak: '' });
    setResidentsCount('');
    setRoomsCount('');
    setHeatingSeason(false);
    setIncludeODN(false);
    setOdnMethod('odpu');
    setOdpuTotal('');
    setIpuTotal('');
    setArea('');
    setCommonArea('');
    setNormativeODN('');
    setResult(null);
    setError('');
  };

  // Определение максимального шага на основе предыдущих выборов
  const getMaxStep = () => {
    if (currentStep === 1) return 1;
    if (currentStep === 2) return 2;
    
    // Шаг 3: оборудование (только для города или села без счётчика)
    if (currentStep === 3) return 3;
    
    // Шаг 4: наличие счётчика
    if (currentStep === 4) return 4;
    
    // Шаг 5: данные (зависит от наличия счётчика)
    if (currentStep === 5) return 5;
    
    // Шаг 6: ОДН (только для МКД)
    if (houseType === 'mkd' && currentStep === 6) return 6;
    
    // Шаг 7: результат
    if (result) return 7;
    
    return 6;
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="calculator-step active">
            <div className="step-number">Шаг 1 из 6</div>
            <h3>Тип дома</h3>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="houseType"
                  value="private"
                  checked={houseType === 'private'}
                  onChange={(e) => setHouseType(e.target.value)}
                />
                <span>Частный дом</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="houseType"
                  value="mkd"
                  checked={houseType === 'mkd'}
                  onChange={(e) => setHouseType(e.target.value)}
                />
                <span>МКД (многоквартирный дом)</span>
              </label>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="calculator-step active">
            <div className="step-number">Шаг 2 из 6</div>
            <h3>Тип населённого пункта</h3>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="settlementType"
                  value="city"
                  checked={settlementType === 'city'}
                  onChange={(e) => setSettlementType(e.target.value)}
                />
                <span>Город</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="settlementType"
                  value="village"
                  checked={settlementType === 'village'}
                  onChange={(e) => setSettlementType(e.target.value)}
                />
                <span>Село</span>
              </label>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="calculator-step active">
            <div className="step-number">Шаг 3 из 6</div>
            <h3>Оборудование</h3>
            <p className="step-description">
              Укажите, какое оборудование установлено в доме
            </p>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={hasElectricStove}
                  onChange={(e) => setHasElectricStove(e.target.checked)}
                />
                <span>Есть электроплита</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={hasElectricHeating}
                  onChange={(e) => setHasElectricHeating(e.target.checked)}
                />
                <span>Есть электроотопление</span>
              </label>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="calculator-step active">
            <div className="step-number">Шаг 4 из 6</div>
            <h3>Наличие счётчика (ИПУ)</h3>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasMeter"
                  value="yes"
                  checked={hasMeter === true}
                  onChange={() => setHasMeter(true)}
                />
                <span>Есть счётчик</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasMeter"
                  value="no"
                  checked={hasMeter === false}
                  onChange={() => setHasMeter(false)}
                />
                <span>Нет счётчика (расчёт по нормативу)</span>
              </label>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="calculator-step active">
            <div className="step-number">Шаг 5 из 6</div>
            <h3>{hasMeter ? 'Параметры счётчика' : 'Данные для расчёта по нормативу'}</h3>
            
            {hasMeter ? (
              <>
                <h4>Тип тарифа</h4>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="tariffType"
                      value="single"
                      checked={tariffType === 'single'}
                      onChange={(e) => setTariffType(e.target.value)}
                    />
                    <span>Одноставочный</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="tariffType"
                      value="two-zone"
                      checked={tariffType === 'two-zone'}
                      onChange={(e) => setTariffType(e.target.value)}
                    />
                    <span>Двухзонный (день/ночь)</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="tariffType"
                      value="three-zone"
                      checked={tariffType === 'three-zone'}
                      onChange={(e) => setTariffType(e.target.value)}
                    />
                    <span>Трёхзонный (пик/полупик/ночь)</span>
                  </label>
                </div>
                
                <div className="input-group">
                  {tariffType === 'single' && (
                    <div className="input-field">
                      <label>Общее потребление (кВт·ч):</label>
                      <input
                        type="number"
                        value={consumption.total}
                        onChange={(e) => setConsumption({...consumption, total: e.target.value})}
                        placeholder="Введите общее потребление"
                      />
                    </div>
                  )}
                  
                  {tariffType === 'two-zone' && (
                    <>
                      <div className="input-field">
                        <label>Дневная зона (07:00-23:00), кВт·ч:</label>
                        <input
                          type="number"
                          value={consumption.day}
                          onChange={(e) => setConsumption({...consumption, day: e.target.value})}
                          placeholder="Введите потребление днём"
                        />
                      </div>
                      <div className="input-field">
                        <label>Ночная зона (23:00-07:00), кВт·ч:</label>
                        <input
                          type="number"
                          value={consumption.night}
                          onChange={(e) => setConsumption({...consumption, night: e.target.value})}
                          placeholder="Введите потребление ночью"
                        />
                      </div>
                    </>
                  )}
                  
                  {tariffType === 'three-zone' && (
                    <>
                      <div className="input-field">
                        <label>Пиковая зона, кВт·ч:</label>
                        <input
                          type="number"
                          value={consumption.peak}
                          onChange={(e) => setConsumption({...consumption, peak: e.target.value})}
                          placeholder="Введите потребление в пик"
                        />
                      </div>
                      <div className="input-field">
                        <label>Полупиковая зона, кВт·ч:</label>
                        <input
                          type="number"
                          value={consumption.semiPeak}
                          onChange={(e) => setConsumption({...consumption, semiPeak: e.target.value})}
                          placeholder="Введите потребление в полупик"
                        />
                      </div>
                      <div className="input-field">
                        <label>Ночная зона, кВт·ч:</label>
                        <input
                          type="number"
                          value={consumption.night}
                          onChange={(e) => setConsumption({...consumption, night: e.target.value})}
                          placeholder="Введите потребление ночью"
                        />
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                {settlementType && (
                  <div className="normative-info">
                    <strong>Применяемый норматив:</strong> {determineNormative().description}
                    <br />
                    <small>Норматив: {determineNormative().norm} кВт·ч на человека</small>
                  </div>
                )}
                
                <div className="input-group">
                  <div className="input-field">
                    <label>Количество проживающих (чел.):</label>
                    <input
                      type="number"
                      value={residentsCount}
                      onChange={(e) => setResidentsCount(e.target.value)}
                      placeholder="Введите количество человек"
                    />
                  </div>
                  {houseType === 'private' && (
                    <div className="input-field">
                      <label>Количество комнат:</label>
                      <input
                        type="number"
                        value={roomsCount}
                        onChange={(e) => setRoomsCount(e.target.value)}
                        placeholder="Введите количество комнат"
                      />
                    </div>
                  )}
                  {houseType === 'private' && hasElectricHeating && (
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={heatingSeason}
                          onChange={(e) => setHeatingSeason(e.target.checked)}
                        />
                        <span>Отопительный сезон</span>
                      </label>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        );
        
      case 6:
        return houseType === 'mkd' ? (
          <div className="calculator-step active">
            <div className="step-number">Шаг 6 из 6</div>
            <h3>Общедомовые нужды (ОДН)</h3>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={includeODN}
                  onChange={(e) => setIncludeODN(e.target.checked)}
                />
                <span>Включить расчёт ОДН</span>
              </label>
            </div>
            
            {includeODN && (
              <div className="odn-section">
                <h4>Способ расчёта ОДН</h4>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="odnMethod"
                      value="odpu"
                      checked={odnMethod === 'odpu'}
                      onChange={(e) => setOdnMethod(e.target.value)}
                    />
                    <span>По ОДПУ</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="odnMethod"
                      value="normative"
                      checked={odnMethod === 'normative'}
                      onChange={(e) => setOdnMethod(e.target.value)}
                    />
                    <span>По нормативу</span>
                  </label>
                </div>
                
                {odnMethod === 'odpu' ? (
                  <div className="input-group">
                    <div className="input-field">
                      <label>Показания ОДПУ (кВт·ч):</label>
                      <input
                        type="number"
                        value={odpuTotal}
                        onChange={(e) => setOdpuTotal(e.target.value)}
                        placeholder="Общее потребление дома"
                      />
                    </div>
                    <div className="input-field">
                      <label>Сумма показаний ИПУ (кВт·ч):</label>
                      <input
                        type="number"
                        value={ipuTotal}
                        onChange={(e) => setIpuTotal(e.target.value)}
                        placeholder="Сумма всех квартирных счётчиков"
                      />
                    </div>
                    <div className="input-field">
                      <label>Площадь вашей квартиры (м²):</label>
                      <input
                        type="number"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="Площадь квартиры"
                      />
                    </div>
                    <div className="input-field">
                      <label>Общая площадь дома (м²):</label>
                      <input
                        type="number"
                        value={commonArea}
                        onChange={(e) => setCommonArea(e.target.value)}
                        placeholder="Общая площадь всех помещений"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="input-group">
                    <div className="input-field">
                      <label>Норматив ОДН (кВт·ч/м²):</label>
                      <input
                        type="number"
                        step="0.01"
                        value={normativeODN}
                        onChange={(e) => setNormativeODN(e.target.value)}
                        placeholder="Введите норматив"
                      />
                    </div>
                    <div className="input-field">
                      <label>Площадь вашей квартиры (м²):</label>
                      <input
                        type="number"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="Площадь квартиры"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          // Если частный дом, пропускаем шаг с ОДН
          <div className="calculator-step active">
            <div className="step-number">Шаг 6 из 6</div>
            <h3>Готово к расчёту</h3>
            <p>Все данные введены. Нажмите "Рассчитать" для получения результата.</p>
          </div>
        );
        
      case 7:
        return (
          <div className="calculator-result">
            <h3>Результат расчёта</h3>
            {result.normativeInfo && (
              <div className="result-normative">
                <small>Расчёт произведён по нормативу: {result.normativeInfo.description}</small>
              </div>
            )}
            <div className="result-item">
              <span>Стоимость электроэнергии:</span>
              <strong>{result.mainCost.toFixed(2)} ₽</strong>
            </div>
            {includeODN && (
              <div className="result-item">
                <span>ОДН:</span>
                <strong>{result.odnCost.toFixed(2)} ₽</strong>
              </div>
            )}
            <div className="result-total">
              <span>Итого к оплате:</span>
              <strong>{result.totalCost.toFixed(2)} ₽</strong>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

    return (
    <section className="page-section">
      <div className="section-inner">
        <div className="page-header">
          <h1>Калькулятор начислений за электроэнергию</h1>
          <p className="page-subtitle">
            Ответьте на вопросы последовательно для расчёта стоимости
          </p>
        </div>

        <div className="calculator-wrapper">
          {/* Сообщение об ошибке */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {/* Контейнер для шагов */}
          <div className="steps-container">
            {renderStep()}
            
            {/* Кнопки навигации внутри контейнера шагов */}
            {currentStep < 7 && (
              <div className="calculator-navigation">
                {currentStep > 1 && (
                  <button className="btn btn-secondary" onClick={handleBack}>
                    ← Назад
                  </button>
                )}
                {currentStep < 6 || (currentStep === 6 && houseType === 'mkd') ? (
                  <button 
                    className="btn btn-primary" 
                    onClick={currentStep === 6 && houseType === 'mkd' ? calculateCost : handleNext}
                  >
                    {currentStep === 6 ? 'Рассчитать' : 'Далее →'}
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={calculateCost}>
                    Рассчитать
                  </button>
                )}
              </div>
            )}
            
            {/* Кнопка сброса на странице результата */}
            {currentStep === 7 && (
              <div className="calculator-navigation">
                <button className="btn btn-secondary" onClick={handleBack}>
                  ← Назад к данным
                </button>
                <button className="btn btn-primary" onClick={resetCalculator}>
                  Рассчитать заново
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}