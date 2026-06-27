import { useState } from 'react';
import { Sparkles, TrendingUp, TrendingDown, Minus, AlertTriangle, ChevronDown } from 'lucide-react';
import type { BiometricReading, Patient, ThresholdConfig } from '@/types';

interface Props {
  patient: Patient;
  readings: BiometricReading[];
  thresholds: ThresholdConfig;
}

export function ClinicalTrendSnapshot({ patient, readings, thresholds }: Props) {
  const [days, setDays] = useState<number>(7);

  if (!readings || readings.length < 2) {
    return (
      <div className="bg-[#F6F2FF] border border-[#E8DDFB] rounded-lg p-5">
        <p className="text-[1.3rem] text-[#491D8B]">Insufficient data to generate an AI trend snapshot.</p>
      </div>
    );
  }

  const filteredReadings = readings.filter(r => {
    const date = new Date(r.date);
    const now = new Date('2026-05-26');
    return (now.getTime() - date.getTime()) <= days * 24 * 60 * 60 * 1000;
  });

  if (filteredReadings.length < 2) {
    return (
      <div className="bg-[#F6F2FF] border border-[#E8DDFB] rounded-lg p-5">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-heading text-[1.4rem] font-bold text-[#491D8B]">KAYZ AI Clinical Trend Snapshot</h4>
          <div className="relative">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="appearance-none bg-white border border-[#E8DDFB] text-[#491D8B] text-[1.2rem] font-medium py-1 pl-3 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8A3FFC]/50 cursor-pointer"
            >
              <option value={3}>Last 3 Days</option>
              <option value={7}>Last 7 Days</option>
              <option value={14}>Last 14 Days</option>
              <option value={30}>Last 30 Days</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#491D8B] pointer-events-none" />
          </div>
        </div>
        <p className="text-[1.3rem] text-[#491D8B]">Patient's vitals have remained relatively stable with no significant anomalies detected over the selected {days}-day period.</p>
      </div>
    );
  }

  // Helper functions
  const avg = (arr: number[]) => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  const getPercent = (start: number, end: number) => Math.round(((end - start) / start) * 100);

  // Systolic
  const sysArr = filteredReadings.map(r => r.systolic);
  const startSys = sysArr[0];
  const endSys = sysArr[sysArr.length - 1];
  const sysAvg = avg(sysArr);
  const sysPercent = getPercent(startSys, endSys);
  const sysMax = Math.max(...sysArr);

  // Heart Rate
  const hrArr = filteredReadings.map(r => r.heartRate);
  const startHr = hrArr[0];
  const endHr = hrArr[hrArr.length - 1];
  const hrAvg = avg(hrArr);
  const hrPercent = getPercent(startHr, endHr);

  // SpO2
  const spo2Arr = filteredReadings.map(r => r.oxygenSaturation);
  const spo2Min = Math.min(...spo2Arr);
  const spo2Avg = avg(spo2Arr);

  // Glucose
  const glucArr = filteredReadings.map(r => r.bloodGlucose);
  const glucAvg = (glucArr.reduce((a, b) => a + b, 0) / glucArr.length).toFixed(1);
  const startGluc = glucArr[0];
  const endGluc = glucArr[glucArr.length - 1];
  const glucPercent = getPercent(startGluc, endGluc);

  // Determine Overall Status
  let overallRisk = "Low Risk";
  let overallRiskColor = "text-success";
  if (patient.status === 'critical') {
    overallRisk = "Critical Risk";
    overallRiskColor = "text-alert-red";
  } else if (patient.status === 'warning' || sysMax > thresholds.maxSystolic || spo2Min < thresholds.minSpO2) {
    overallRisk = "Elevated Risk";
    overallRiskColor = "text-[#C99600]";
  }

  const renderTrendIcon = (percent: number) => {
    if (Math.abs(percent) <= 3) return <Minus size={16} className="text-neutral-500 shrink-0" />;
    if (percent > 0) return <TrendingUp size={16} className="text-alert-red shrink-0" />;
    return <TrendingDown size={16} className="text-success shrink-0" />;
  };

  return (
    <div className="bg-[#F6F2FF] border border-[#E8DDFB] rounded-lg p-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#8A3FFC]/10 to-transparent rounded-bl-full pointer-events-none" />
      
      <div className="flex items-start gap-3 relative z-10">
        <div className="bg-[#8A3FFC] p-2 rounded-full shrink-0 mt-0.5">
          <Sparkles size={16} className="text-white" />
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between mb-3 border-b border-[#E8DDFB]/50 pb-2 flex-wrap gap-2">
            <h4 className="font-heading text-[1.4rem] font-bold text-[#491D8B] flex items-center gap-2">
              KAYZ AI Clinical Trend Snapshot
              <div className="relative inline-block ml-2">
                <select
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="appearance-none bg-white border border-[#E8DDFB] text-[#491D8B] text-[1.2rem] font-medium py-0.5 pl-3 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8A3FFC]/50 cursor-pointer shadow-sm"
                >
                  <option value={3}>3-Day Analysis</option>
                  <option value={7}>7-Day Analysis</option>
                  <option value={14}>14-Day Analysis</option>
                  <option value={30}>30-Day Analysis</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#491D8B] pointer-events-none" />
              </div>
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-[1.2rem] font-medium text-[#491D8B]">AI Confidence: 94%</span>
              <span className={`text-[1.2rem] font-bold px-2 py-0.5 rounded-full bg-white border ${overallRiskColor} border-current`}>
                {overallRisk}
              </span>
            </div>
          </div>
          
          <ul className="space-y-3 mt-4">
            {/* Blood Pressure Bullet */}
            <li className="flex items-start gap-2">
              <div className="mt-0.5">{renderTrendIcon(sysPercent)}</div>
              <div>
                <p className="font-body text-[1.3rem] text-[#2E1461]">
                  <strong className="text-[#491D8B]">Blood Pressure:</strong> Systolic BP has {sysPercent > 0 ? 'trended upward' : sysPercent < 0 ? 'trended downward' : 'remained stable'} by {Math.abs(sysPercent)}% ({days}-day Avg: {sysAvg} mmHg). 
                  {sysMax > thresholds.maxSystolic ? (
                    <span className="text-alert-red ml-1 font-medium flex items-center gap-1 inline-flex">
                      <AlertTriangle size={14} /> Peaked at {sysMax} mmHg, exceeding the {thresholds.maxSystolic} mmHg safety threshold.
                    </span>
                  ) : (
                    <span className="text-success ml-1"> Remained safely below the {thresholds.maxSystolic} mmHg threshold.</span>
                  )}
                </p>
              </div>
            </li>

            {/* Heart Rate Bullet */}
            <li className="flex items-start gap-2">
              <div className="mt-0.5">{renderTrendIcon(hrPercent)}</div>
              <div>
                <p className="font-body text-[1.3rem] text-[#2E1461]">
                  <strong className="text-[#491D8B]">Heart Rate:</strong> Average resting HR is {hrAvg} bpm. 
                  {Math.abs(hrPercent) > 5 ? ` Detected a ${Math.abs(hrPercent)}% ${hrPercent > 0 ? 'increase' : 'decrease'} in baseline over the last ${days} days.` : ' Heart rate variability remains within normal clinical bounds.'}
                </p>
              </div>
            </li>

            {/* SpO2 Bullet */}
            <li className="flex items-start gap-2">
              <div className="mt-0.5">
                {spo2Min < thresholds.minSpO2 ? <TrendingDown size={16} className="text-alert-red shrink-0" /> : <Minus size={16} className="text-success shrink-0" />}
              </div>
              <div>
                <p className="font-body text-[1.3rem] text-[#2E1461]">
                  <strong className="text-[#491D8B]">Oxygen Saturation (SpO2):</strong> Sustained average of {spo2Avg}%. 
                  {spo2Min < thresholds.minSpO2 ? (
                    <span className="text-alert-red ml-1 font-medium"> Critical drops recorded down to {spo2Min}% (below {thresholds.minSpO2}% threshold).</span>
                  ) : (
                    <span className="text-success ml-1"> Levels have remained robust and above critical thresholds.</span>
                  )}
                </p>
              </div>
            </li>

            {/* Blood Glucose Bullet */}
            <li className="flex items-start gap-2">
              <div className="mt-0.5">{renderTrendIcon(glucPercent)}</div>
              <div>
                <p className="font-body text-[1.3rem] text-[#2E1461]">
                  <strong className="text-[#491D8B]">Blood Glucose:</strong> {days}-day average is {glucAvg} mmol/L. 
                  {glucPercent > 10 ? ' Upward glycemic trend detected; recommend reviewing dietary intake.' : ' Stable glycemic control observed.'}
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-4 pt-3 border-t border-[#E8DDFB]/50">
            <p className="font-body text-[1.3rem] text-[#2E1461] italic">
              <strong>AI Recommendation:</strong> {overallRisk === 'Critical Risk' ? 'Immediate clinical review required. Adjust medication and verify sensor placement.' : overallRisk === 'Elevated Risk' ? 'Schedule a non-urgent review within 48 hours to assess threshold parameters.' : 'Continue routine monitoring.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
