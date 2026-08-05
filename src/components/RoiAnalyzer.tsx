import React from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Printer, 
  Copy, 
  RotateCcw, 
  Briefcase,
  FileSpreadsheet,
  Maximize2,
  X,
  Gauge,
  FileDown,
  Sliders,
  RefreshCw
} from 'lucide-react';

export interface RoiAnalyzerProps {
  currency: string;
  currencySymbol: string;
  copqLossMin: number;
  setupLaborLoss: number;
  setupOpportunityLoss: number;
  inefficiencyLaborLoss: number;
  inefficiencyOverheadLoss: number;
  totalLossConservative: number;
  totalLossExpected: number;
  totalLossHigh: number;
  turnoverNum: number;
  copqRateNum: number;
  scrapRateNum: number;
  reworkRateNum: number;
  overtimeRateNum: number;
  setupFrequencyNum: number;
  setupMachineCountNum: number;
  annualSetupsCount: number;
  annualSetupHours: number;
  affectedOpsSetupNum: number;
  grossLaborCostNum: number;
  hourlyTurnoverRate: number;
  opsNum: number;
  plannedEffNum: number;
  actualEffNum: number;
  efficiencyGap: number;
  annualOperatorHoursPaid: number;
  totalOp1Lira: number;
  totalOp2Lira: number;
  dailyRateOp1?: number;
  dailyRateOp2?: number;
  baseUnitRate?: number;
  eurTry?: number;
  usdTry?: number;
  op1_min: number;
  op1_max: number;
  op2_min: number;
  op2_max: number;
  op3_min: number;
  op3_max: number;
  op4_min: number;
  op4_max: number;
  selectedOption: number;
  setSelectedOption?: (val: 1 | 2 | 3) => void;
  leadTimeNum: number;
  setupDurationNum?: number;
  oeeNum?: number;
  targetLeadTime: number;
  targetLeadTimeRatio: number;
  leadTimeSavingsPercent: number;
  laborProductivity: number;
  targetProductivity: number;
  targetProductivityRatio: number;
  prodImprovementPercent: number;
  totalLossAvg: number;
  targetLossCost: number;
  lossReductionPercent: number;
  targetLossRatio: number;
  netFinancialGain: number;
  tarih: string;
  firmaAdi: string;
  sektor: string;
  adres: string;
  urunGrubu: string;
  chatMessages: Array<{ role: 'user' | 'model'; content: string }>;
  isChatLoading: boolean;
  chatInput: string;
  setChatInput: (val: string) => void;
  handleSendChatMessage: (e: React.FormEvent) => void;
  handleClearChat: () => void;
  handlePrint: () => void;
  handleReset: () => void;
  getSectorBenchmark: (sektor: string, urunGrubu: string) => { title: string; problems: string; standards: string; gap: string };
  oppSetupR?: { minPct: number; maxPct: number };
  oppPdR?: { minPct: number; maxPct: number };
  oppOeeR?: { minPct: number; maxPct: number };
  oppOpvR?: { minPct: number; maxPct: number };
  oppLtR?: { minPct: number; maxPct: number };
  oppWipR?: { minPct: number; maxPct: number };
  oppSpR?: { minPct: number; maxPct: number };
  oppScR?: { minPct: number; maxPct: number };
  oppFmR?: { minPct: number; maxPct: number };
  oppMesR?: { minPct: number; maxPct: number };
  oppYiR?: { minPct: number; maxPct: number };
  oppOvR?: { minPct: number; maxPct: number };
  opp_setup_min?: number;
  opp_setup_max?: number;
  opp_pd_min?: number;
  opp_pd_max?: number;
  opp_oee_min?: number;
  opp_oee_max?: number;
  opp_opv_min?: number;
  opp_opv_max?: number;
  opp_lt_min?: number;
  opp_lt_max?: number;
  opp_wip_min?: number;
  opp_wip_max?: number;
  opp_sp_min?: number;
  opp_sp_max?: number;
  opp_sc_min?: number;
  opp_sc_max?: number;
  opp_fm_min?: number;
  opp_fm_max?: number;
  opp_mes_min?: number;
  opp_mes_max?: number;
  opp_yi_min?: number;
  opp_yi_max?: number;
  opp_ov_min?: number;
  opp_ov_max?: number;
  total_dma_min?: number;
  total_dma_max?: number;
  total_ky_min?: number;
  total_ky_max?: number;
  total_sok_min?: number;
  total_sok_max?: number;
  total_economic_min?: number;
  total_economic_max?: number;
  minEconomicLossPct?: number;
  maxEconomicLossPct?: number;
  loss_durus?: number;
  loss_kalite?: number;
  loss_mesai?: number;
  loss_hurda?: number;
  loss_iscilik?: number;
  loss_kapasite?: number;
  productionUnit?: string;
  urunGrubuEnCok?: string;
  urunGrubuAdet?: string;
  urunGrubuOran?: string;
  useProductFamilyCost?: boolean;
  setUseProductFamilyCost?: (val: boolean) => void;
  useProductFamilyRecovery?: boolean;
  setUseProductFamilyRecovery?: (val: boolean) => void;
}

interface MiniOptionChartProps {
  budget: number;
  minGain: number;
  maxGain: number;
  currencySymbol: string;
  themeColor: 'slate' | 'red' | 'blue' | 'purple';
  useProductFamilyRecovery?: boolean;
  productRatio?: number;
}

const MiniOptionChart: React.FC<MiniOptionChartProps> = ({ 
  budget, 
  minGain, 
  maxGain, 
  currencySymbol, 
  themeColor,
  useProductFamilyRecovery = false,
  productRatio = 0.35
}) => {
  const maxVal = Math.max(budget, maxGain) || 1;
  const budgetWidth = Math.max(8, Math.min(100, (budget / maxVal) * 100));
  const minGainWidth = Math.max(8, Math.min(100, (minGain / maxVal) * 100));
  const maxGainWidth = Math.max(8, Math.min(100, (maxGain / maxVal) * 100));

  const prodMinGain = minGain * productRatio;
  const prodMaxGain = maxGain * productRatio;
  const prodMinGainWidth = Math.max(8, Math.min(100, (prodMinGain / maxVal) * 100));
  const prodMaxGainWidth = Math.max(8, Math.min(100, (prodMaxGain / maxVal) * 100));

  const bgColors = {
    slate: { bar: 'bg-zinc-800', text: 'text-zinc-800', light: 'bg-zinc-50', border: 'border-zinc-200' },
    red: { bar: 'bg-zinc-950', text: 'text-zinc-900', light: 'bg-zinc-50', border: 'border-zinc-250' },
    blue: { bar: 'bg-zinc-800', text: 'text-zinc-800', light: 'bg-zinc-50', border: 'border-zinc-200' },
    purple: { bar: 'bg-zinc-800', text: 'text-zinc-900', light: 'bg-zinc-50', border: 'border-zinc-200' },
  };

  const currentTheme = bgColors[themeColor] || bgColors.slate;

  // Payback Month calculations
  const pMin = minGain > 0 ? Math.max(1, Math.round((budget / minGain) * 12 * 10) / 10) : 0;
  const pExp = minGain > 0 ? Math.max(1, Math.round((budget / ((minGain + maxGain) / 2)) * 12 * 10) / 10) : 0;
  const pMax = maxGain > 0 ? Math.max(1, Math.round((budget / maxGain) * 12 * 10) / 10) : 0;

  return (
    <div className="space-y-3 bg-stone-50/70 p-3.5 rounded-xl border border-slate-150/80 mt-1">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-black tracking-wider text-slate-500 uppercase">Yatırım &amp; Yıllık Geri Kazanım Grafiği</span>
        {useProductFamilyRecovery ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[8px] font-bold text-slate-500">Toplam</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              <span className="text-[8px] font-bold text-slate-500">Ürün Grubu</span>
            </div>
          </div>
        ) : (
          <span className="text-[9px] font-bold text-slate-400">Yatırımın Amorti Gücü</span>
        )}
      </div>
      
      <div className="space-y-2.5">
        {/* Project Budget Row */}
        <div className="space-y-0.5">
          <div className="flex justify-between text-[10px] font-bold text-slate-650">
            <span>Tek Seferlik Proje Bütçesi</span>
            <span className="font-mono text-slate-900">{currencySymbol}{Math.round(budget).toLocaleString('tr-TR')}</span>
          </div>
          <div className="w-full bg-slate-200/50 rounded-full h-2">
            <div className={`${currentTheme.bar} h-full rounded-full transition-all`} style={{ width: `${budgetWidth}%` }}></div>
          </div>
        </div>

        {/* Min return Row */}
        <div className="space-y-0.5">
          <div className="flex justify-between text-[10px] font-bold text-[#10B981]">
            <span>Min Yıllık Tasarruf Kontrolü</span>
            <span className="font-mono">{currencySymbol}{Math.round(minGain).toLocaleString('tr-TR')} / yıl</span>
          </div>
          <div className="w-full bg-slate-200/50 rounded-full h-2 relative overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full transition-all absolute left-0 top-0" style={{ width: `${minGainWidth}%`, zIndex: 1 }}></div>
            {useProductFamilyRecovery && (
              <div 
                className="bg-sky-400 h-full rounded-full transition-all absolute left-0 top-0" 
                style={{ width: `${prodMinGainWidth}%`, zIndex: 2 }}
                title={`Ürün Grubu Payı: ${currencySymbol}${Math.round(prodMinGain).toLocaleString('tr-TR')}`}
              ></div>
            )}
          </div>
          {useProductFamilyRecovery && (
            <div className="flex justify-between text-[9px] font-semibold text-sky-600 pl-1">
              <span>↳ Ürün Grubu Payı ({Math.round(productRatio * 100)}%)</span>
              <span className="font-mono">{currencySymbol}{Math.round(prodMinGain).toLocaleString('tr-TR')} / yıl</span>
            </div>
          )}
        </div>

        {/* Max return Row */}
        <div className="space-y-0.5">
          <div className="flex justify-between text-[10px] font-bold text-emerald-800">
            <span>Maks Potansiyel Yıllık Tasarruf</span>
            <span className="font-mono">{currencySymbol}{Math.round(maxGain).toLocaleString('tr-TR')} / yıl</span>
          </div>
          <div className="w-full bg-slate-200/50 rounded-full h-2 relative overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full transition-all absolute left-0 top-0" style={{ width: `${maxGainWidth}%`, zIndex: 1 }}></div>
            {useProductFamilyRecovery && (
              <div 
                className="bg-sky-550 h-full rounded-full transition-all absolute left-0 top-0" 
                style={{ width: `${prodMaxGainWidth}%`, zIndex: 2 }}
                title={`Ürün Grubu Payı: ${currencySymbol}${Math.round(prodMaxGain).toLocaleString('tr-TR')}`}
              ></div>
            )}
          </div>
          {useProductFamilyRecovery && (
            <div className="flex justify-between text-[9px] font-semibold text-sky-700 pl-1">
              <span>↳ Ürün Grubu Payı ({Math.round(productRatio * 100)}%)</span>
              <span className="font-mono">{currencySymbol}{Math.round(prodMaxGain).toLocaleString('tr-TR')} / yıl</span>
            </div>
          )}
        </div>
      </div>

      {/* Payback timeline slider */}
      {pExp > 0 && (
        <div className="pt-2 border-t border-slate-200/60">
          <div className="flex justify-between text-[8px] font-black uppercase tracking-wider text-slate-400 mb-0.5">
            <span>ZAMAN ÇİZGELGESİ: GERİ ÖDEME (AMORTİSMAN) HIZI</span>
            <span className="text-emerald-700">Beklenen: {pExp} Ay</span>
          </div>
          <div className="relative pt-1">
            <div className="flex justify-between text-[8px] font-bold text-slate-400">
              <span>0 Ay</span>
              <span>3 Ay</span>
              <span>6 Ay</span>
              <span>9 Ay</span>
              <span>12 Ay+</span>
            </div>
            <div className="w-full bg-slate-300/40 rounded-full h-1.5 mt-1 relative">
              {/* Highlight payback range from min to max */}
              <div 
                className="absolute bg-emerald-500/20 h-1.5 rounded-full"
                style={{
                  left: `${Math.max(0, Math.min(95, (pMax / 12) * 100))}%`,
                  width: `${Math.max(5, Math.min(100, ((pMin - pMax) / 12) * 100))}%`
                }}
              ></div>
              {/* Pinned milestone marker */}
              <div 
                className="absolute w-3 h-3 bg-emerald-600 border border-white rounded-full -top-0.5 shadow-md flex items-center justify-center transform -translate-x-1/2 cursor-pointer transition-transform hover:scale-125"
                style={{ left: `${Math.min(98, Math.max(2, (pExp / 12) * 100))}%` }}
                title={`Amortisman Süresi: ${pExp} Ay`}
              >
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const RoiAnalyzer: React.FC<RoiAnalyzerProps> = ({
  currency,
  currencySymbol,
  copqLossMin,
  setupLaborLoss,
  setupOpportunityLoss,
  inefficiencyLaborLoss,
  inefficiencyOverheadLoss,
  totalLossConservative,
  totalLossExpected,
  totalLossHigh,
  turnoverNum,
  copqRateNum,
  scrapRateNum,
  reworkRateNum,
  overtimeRateNum,
  setupFrequencyNum,
  setupMachineCountNum,
  annualSetupsCount,
  annualSetupHours,
  affectedOpsSetupNum,
  grossLaborCostNum,
  hourlyTurnoverRate,
  opsNum,
  plannedEffNum,
  actualEffNum,
  efficiencyGap,
  annualOperatorHoursPaid,
  totalOp1Lira,
  totalOp2Lira,
  dailyRateOp1,
  dailyRateOp2,
  baseUnitRate,
  eurTry,
  usdTry,
  op1_min,
  op1_max,
  op2_min,
  op2_max,
  op3_min,
  op3_max,
  op4_min,
  op4_max,
  selectedOption,
  setSelectedOption,
  leadTimeNum,
  setupDurationNum,
  oeeNum,
  targetLeadTime,
  targetLeadTimeRatio,
  leadTimeSavingsPercent,
  laborProductivity,
  targetProductivity,
  targetProductivityRatio,
  prodImprovementPercent,
  totalLossAvg,
  targetLossCost,
  lossReductionPercent,
  targetLossRatio,
  netFinancialGain,
  tarih,
  firmaAdi,
  sektor,
  adres,
  urunGrubu,
  chatMessages,
  isChatLoading,
  chatInput,
  setChatInput,
  handleSendChatMessage,
  handleClearChat,
  handlePrint,
  handleReset,
  productionUnit = 'Adet',
  getSectorBenchmark,
  oppSetupR = { minPct: 15, maxPct: 55 },
  oppPdR = { minPct: 10, maxPct: 45 },
  oppOeeR = { minPct: 15, maxPct: 55 },
  oppOpvR = { minPct: 12, maxPct: 50 },
  oppLtR = { minPct: 10, maxPct: 40 },
  oppWipR = { minPct: 10, maxPct: 40 },
  oppSpR = { minPct: 10, maxPct: 30 },
  oppScR = { minPct: 15, maxPct: 50 },
  oppFmR = { minPct: 12, maxPct: 45 },
  oppMesR = { minPct: 15, maxPct: 50 },
  oppYiR = { minPct: 10, maxPct: 40 },
  oppOvR = { minPct: 10, maxPct: 45 },
  opp_setup_min = 0,
  opp_setup_max = 0,
  opp_pd_min = 0,
  opp_pd_max = 0,
  opp_oee_min = 0,
  opp_oee_max = 0,
  opp_opv_min = 0,
  opp_opv_max = 0,
  opp_lt_min = 0,
  opp_lt_max = 0,
  opp_wip_min = 0,
  opp_wip_max = 0,
  opp_sp_min = 0,
  opp_sp_max = 0,
  opp_sc_min = 0,
  opp_sc_max = 0,
  opp_fm_min = 0,
  opp_fm_max = 0,
  opp_mes_min = 0,
  opp_mes_max = 0,
  opp_yi_min = 0,
  opp_yi_max = 0,
  opp_ov_min = 0,
  opp_ov_max = 0,
  total_dma_min = 0,
  total_dma_max = 0,
  total_ky_min = 0,
  total_ky_max = 0,
  total_sok_min = 0,
  total_sok_max = 0,
  total_economic_min = 0,
  total_economic_max = 0,
  minEconomicLossPct = 0,
  maxEconomicLossPct = 0,
  loss_durus = 0,
  loss_kalite = 0,
  loss_mesai = 0,
  loss_hurda = 0,
  loss_iscilik = 0,
  loss_kapasite = 0,
  urunGrubuEnCok = '95 kW Motor',
  urunGrubuAdet = '25.000',
  urunGrubuOran = '35',
  useProductFamilyCost = false,
  setUseProductFamilyCost,
  useProductFamilyRecovery = false,
  setUseProductFamilyRecovery
}) => {
  const getOptRate = (ag: number) => {
    let baseRate = baseUnitRate || 0;
    if (!baseRate) {
      // Fallback if not provided
      const estTry = eurTry || 37.65;
      if (currency === 'TRY') {
        const rawDailyRate = 650 * estTry;
        baseRate = Math.ceil(rawDailyRate / 500) * 500;
      } else if (currency === 'EUR') {
        baseRate = 650;
      } else {
        const rawDailyUsd = 650 * (estTry / (usdTry || (estTry / 1.09)));
        baseRate = Math.round(rawDailyUsd / 10) * 10;
      }
    }

    let discountPercent = 0;
    if (ag >= 105 && ag <= 156) {
      discountPercent = 10;
    } else if (ag >= 157) {
      discountPercent = 15;
    }

    if (discountPercent === 0) {
      return baseRate;
    }

    const rawDiscounted = baseRate * (1 - discountPercent / 100);
    const tryFloor = 30000;
    let currencyFloor = tryFloor;
    const activeEurTry = eurTry || 37.65;
    const activeUsdTry = usdTry || (activeEurTry / 1.09);

    if (currency === 'EUR') {
      currencyFloor = tryFloor / activeEurTry;
    } else if (currency === 'USD') {
      currencyFloor = tryFloor / activeUsdTry;
    }

    if (rawDiscounted < currencyFloor) {
      if (baseRate <= currencyFloor) {
        return baseRate;
      } else {
        return currency === 'TRY' ? tryFloor : currencyFloor;
      }
    }

    return currency === 'TRY' ? Math.round(rawDiscounted / 500) * 500 : Math.round(rawDiscounted);
  };

  const realOp1Rate = getOptRate(52);
  const realOp2Rate = getOptRate(104);
  const realOp3Rate = getOptRate(156);
  const realOp4Rate = getOptRate(208);

  const realOp1Budget = Math.round(52 * realOp1Rate);
  const realOp2Budget = Math.round(104 * realOp2Rate);
  const realOp3Budget = Math.round(156 * realOp3Rate);
  const realOp4Budget = Math.round(208 * realOp4Rate);

  const familyRatio = (Number(urunGrubuOran) || 35) / 100;

  const m_setup_min = useProductFamilyRecovery ? opp_setup_min * familyRatio : opp_setup_min;
  const m_setup_max = useProductFamilyRecovery ? opp_setup_max * familyRatio : opp_setup_max;
  const m_pd_min = useProductFamilyRecovery ? opp_pd_min * familyRatio : opp_pd_min;
  const m_pd_max = useProductFamilyRecovery ? opp_pd_max * familyRatio : opp_pd_max;
  const m_oee_min = useProductFamilyRecovery ? opp_oee_min * familyRatio : opp_oee_min;
  const m_oee_max = useProductFamilyRecovery ? opp_oee_max * familyRatio : opp_oee_max;
  const m_opv_min = useProductFamilyRecovery ? opp_opv_min * familyRatio : opp_opv_min;
  const m_opv_max = useProductFamilyRecovery ? opp_opv_max * familyRatio : opp_opv_max;

  const m_lt_min = useProductFamilyRecovery ? opp_lt_min * familyRatio : opp_lt_min;
  const m_lt_max = useProductFamilyRecovery ? opp_lt_max * familyRatio : opp_lt_max;
  const m_wip_min = useProductFamilyRecovery ? opp_wip_min * familyRatio : opp_wip_min;
  const m_wip_max = useProductFamilyRecovery ? opp_wip_max * familyRatio : opp_wip_max;
  const m_sp_min = useProductFamilyRecovery ? opp_sp_min * familyRatio : opp_sp_min;
  const m_sp_max = useProductFamilyRecovery ? opp_sp_max * familyRatio : opp_sp_max;

  const m_sc_min = useProductFamilyRecovery ? opp_sc_min * familyRatio : opp_sc_min;
  const m_sc_max = useProductFamilyRecovery ? opp_sc_max * familyRatio : opp_sc_max;
  const m_fm_min = useProductFamilyRecovery ? opp_fm_min * familyRatio : opp_fm_min;
  const m_fm_max = useProductFamilyRecovery ? opp_fm_max * familyRatio : opp_fm_max;
  const m_mes_min = useProductFamilyRecovery ? opp_mes_min * familyRatio : opp_mes_min;
  const m_mes_max = useProductFamilyRecovery ? opp_mes_max * familyRatio : opp_mes_max;
  const m_yi_min = useProductFamilyRecovery ? opp_yi_min * familyRatio : opp_yi_min;
  const m_yi_max = useProductFamilyRecovery ? opp_yi_max * familyRatio : opp_yi_max;
  const m_ov_min = useProductFamilyRecovery ? opp_ov_min * familyRatio : opp_ov_min;
  const m_ov_max = useProductFamilyRecovery ? opp_ov_max * familyRatio : opp_ov_max;

  const m_total_economic_min = useProductFamilyRecovery ? total_economic_min * familyRatio : total_economic_min;
  const m_total_economic_max = useProductFamilyRecovery ? total_economic_max * familyRatio : total_economic_max;

  const m_minEconomicLossPct = useProductFamilyRecovery ? Math.round(minEconomicLossPct * familyRatio * 10) / 10 : minEconomicLossPct;
  const m_maxEconomicLossPct = useProductFamilyRecovery ? Math.round(maxEconomicLossPct * familyRatio * 10) / 10 : maxEconomicLossPct;

  const [isDashboardExpanded, setIsDashboardExpanded] = React.useState(false);
  const [isFormulasExpanded, setIsFormulasExpanded] = React.useState(false);
  const [isMatrixExpanded, setIsMatrixExpanded] = React.useState(false);
  const [successRatePct, setSuccessRatePct] = React.useState<number>(100);
  const [isExecutivePitchOpen, setIsExecutivePitchOpen] = React.useState<boolean>(false);
  const [isEditingBenchmarks, setIsEditingBenchmarks] = React.useState<boolean>(false);

  // Editable Benchmark state (customizable directly by consultant)
  const [benchmarks, setBenchmarks] = React.useState({
    sc: { minPct: oppScR?.minPct ?? 15, maxPct: oppScR?.maxPct ?? 50 },
    fm: { minPct: oppFmR?.minPct ?? 12, maxPct: oppFmR?.maxPct ?? 45 },
    mes: { minPct: oppMesR?.minPct ?? 15, maxPct: oppMesR?.maxPct ?? 50 },
    yi: { minPct: oppYiR?.minPct ?? 10, maxPct: oppYiR?.maxPct ?? 40 },
    ov: { minPct: oppOvR?.minPct ?? 10, maxPct: oppOvR?.maxPct ?? 45 },
    setup: { minPct: oppSetupR?.minPct ?? 15, maxPct: oppSetupR?.maxPct ?? 55 },
    pd: { minPct: oppPdR?.minPct ?? 10, maxPct: oppPdR?.maxPct ?? 45 },
    oee: { minPct: oppOeeR?.minPct ?? 15, maxPct: oppOeeR?.maxPct ?? 55 },
    opv: { minPct: oppOpvR?.minPct ?? 12, maxPct: oppOpvR?.maxPct ?? 50 },
    lt: { minPct: oppLtR?.minPct ?? 10, maxPct: oppLtR?.maxPct ?? 40 },
    wip: { minPct: oppWipR?.minPct ?? 10, maxPct: oppWipR?.maxPct ?? 40 },
    sp: { minPct: oppSpR?.minPct ?? 10, maxPct: oppSpR?.maxPct ?? 30 }
  });

  const handleBenchmarkChange = (key: keyof typeof benchmarks, field: 'minPct' | 'maxPct', val: number) => {
    setBenchmarks(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: Math.max(0, Math.min(100, val))
      }
    }));
  };

  // Active Live Exchange Rate
  const activeRate = currency === 'EUR' ? (eurTry || 37.65) : currency === 'USD' ? (usdTry || 34.80) : 1;

  // Dynamic Opportunity Range calculations based on custom benchmarks & loss pools
  const d_sc_min = loss_kalite > 0 ? loss_kalite * (benchmarks.sc.minPct / 100) : 0;
  const d_sc_max = loss_kalite > 0 ? loss_kalite * (benchmarks.sc.maxPct / 100) : 0;
  const d_fm_min = loss_hurda > 0 ? loss_hurda * (benchmarks.fm.minPct / 100) : 0;
  const d_fm_max = loss_hurda > 0 ? loss_hurda * (benchmarks.fm.maxPct / 100) : 0;
  const d_mes_min = loss_mesai > 0 ? loss_mesai * (benchmarks.mes.minPct / 100) : 0;
  const d_mes_max = loss_mesai > 0 ? loss_mesai * (benchmarks.mes.maxPct / 100) : 0;
  const d_yi_min = loss_kalite > 0 ? loss_kalite * (benchmarks.yi.minPct / 100) : 0;
  const d_yi_max = loss_kalite > 0 ? loss_kalite * (benchmarks.yi.maxPct / 100) : 0;
  const d_ov_min = loss_iscilik > 0 ? loss_iscilik * (benchmarks.ov.minPct / 100) : 0;
  const d_ov_max = loss_iscilik > 0 ? loss_iscilik * (benchmarks.ov.maxPct / 100) : 0;

  const d_setup_min = loss_durus > 0 ? loss_durus * (benchmarks.setup.minPct / 100) : 0;
  const d_setup_max = loss_durus > 0 ? loss_durus * (benchmarks.setup.maxPct / 100) : 0;
  const d_pd_min = loss_kapasite > 0 ? loss_kapasite * (benchmarks.pd.minPct / 100) : 0;
  const d_pd_max = loss_kapasite > 0 ? loss_kapasite * (benchmarks.pd.maxPct / 100) : 0;
  const d_oee_min = loss_kapasite > 0 ? loss_kapasite * (benchmarks.oee.minPct / 100) : 0;
  const d_oee_max = loss_kapasite > 0 ? loss_kapasite * (benchmarks.oee.maxPct / 100) : 0;
  const d_opv_min = loss_iscilik > 0 ? loss_iscilik * (benchmarks.opv.minPct / 100) : 0;
  const d_opv_max = loss_iscilik > 0 ? loss_iscilik * (benchmarks.opv.maxPct / 100) : 0;

  const d_lt_min = loss_kapasite > 0 ? loss_kapasite * (benchmarks.lt.minPct / 100) : 0;
  const d_lt_max = loss_kapasite > 0 ? loss_kapasite * (benchmarks.lt.maxPct / 100) : 0;
  const d_wip_min = loss_kapasite > 0 ? loss_kapasite * (benchmarks.wip.minPct / 100) : 0;
  const d_wip_max = loss_kapasite > 0 ? loss_kapasite * (benchmarks.wip.maxPct / 100) : 0;
  const d_sp_min = loss_kapasite > 0 ? loss_kapasite * (benchmarks.sp.minPct / 100) : 0;
  const d_sp_max = loss_kapasite > 0 ? loss_kapasite * (benchmarks.sp.maxPct / 100) : 0;

  const f_ratio = useProductFamilyRecovery ? familyRatio : 1;

  const active_sc_min = d_sc_min * f_ratio;
  const active_sc_max = d_sc_max * f_ratio;
  const active_fm_min = d_fm_min * f_ratio;
  const active_fm_max = d_fm_max * f_ratio;
  const active_mes_min = d_mes_min * f_ratio;
  const active_mes_max = d_mes_max * f_ratio;
  const active_yi_min = d_yi_min * f_ratio;
  const active_yi_max = d_yi_max * f_ratio;
  const active_ov_min = d_ov_min * f_ratio;
  const active_ov_max = d_ov_max * f_ratio;

  const active_setup_min = d_setup_min * f_ratio;
  const active_setup_max = d_setup_max * f_ratio;
  const active_pd_min = d_pd_min * f_ratio;
  const active_pd_max = d_pd_max * f_ratio;
  const active_oee_min = d_oee_min * f_ratio;
  const active_oee_max = d_oee_max * f_ratio;
  const active_opv_min = d_opv_min * f_ratio;
  const active_opv_max = d_opv_max * f_ratio;

  const active_lt_min = d_lt_min * f_ratio;
  const active_lt_max = d_lt_max * f_ratio;
  const active_wip_min = d_wip_min * f_ratio;
  const active_wip_max = d_wip_max * f_ratio;
  const active_sp_min = d_sp_min * f_ratio;
  const active_sp_max = d_sp_max * f_ratio;

  const active_total_min = (active_sc_min + active_fm_min + active_mes_min + active_yi_min + active_ov_min + active_setup_min + active_pd_min + active_oee_min + active_opv_min + active_lt_min + active_wip_min + active_sp_min);
  const active_total_max = (active_sc_max + active_fm_max + active_mes_max + active_yi_max + active_ov_max + active_setup_max + active_pd_max + active_oee_max + active_opv_max + active_lt_max + active_wip_max + active_sp_max);

  // ESG Carbon Footprint Metric Calculation
  const scaledAnnualGain = netFinancialGain * (successRatePct / 100);
  const co2Tons = Math.max(8, Math.round((scaledAnnualGain / 100000) * 1.6 + (loss_hurda > 0 ? 14 : 0) + (loss_durus > 0 ? 10 : 0)));
  const treesSavedEquivalent = Math.round(co2Tons * 45);

  // Dynamic Break-Even & Cumulative Cash Flow Chart calculations
  const activeOptionBudget = selectedOption === 1 
    ? (totalOp1Lira || 1560000) 
    : selectedOption === 2 
    ? (totalOp2Lira || 2808000) 
    : selectedOption === 3 
    ? (totalOp1Lira * 1.5 || 4212000) 
    : (totalOp1Lira * 2.0 || 5616000);
    
  // Convert annual gain to TRY for Break-even calculation if primary currency is USD or EUR
  const scaledAnnualGainInTRY = scaledAnnualGain * activeRate;
  const activeMonthlyGainInTRY = scaledAnnualGainInTRY / 12;

  const breakEvenMonthsData: { month: number; cumSavings: number; cumCost: number; netFlow: number }[] = [];
  let cumSavingsAcc = 0;
  let detectedBreakEvenMonth = 0;
  for (let m = 1; m <= 12; m++) {
    const rampFactor = Math.min(1.0, m * 0.25);
    cumSavingsAcc += activeMonthlyGainInTRY * rampFactor;
    const cumCost = activeOptionBudget;
    const netFlow = cumSavingsAcc - cumCost;
    if (detectedBreakEvenMonth === 0 && netFlow >= 0) {
      detectedBreakEvenMonth = m;
    }
    breakEvenMonthsData.push({
      month: m,
      cumSavings: Math.round(cumSavingsAcc),
      cumCost: Math.round(cumCost),
      netFlow: Math.round(netFlow)
    });
  }

  const renderMatrixTable = (isLarge: boolean = false) => {
    const textDensityClass = isLarge ? "text-xs md:text-sm animate-fade-in" : "text-[11px]";
    const paddingClass = isLarge ? "p-3.5 md:p-4" : "p-2.5";
    
    const renderBenchmarkCell = (key: keyof typeof benchmarks) => {
      if (isEditingBenchmarks) {
        return (
          <div className="flex items-center justify-center gap-1 font-mono">
            <input
              type="number"
              min="0"
              max="100"
              className="w-11 bg-amber-50 border border-amber-400 text-amber-950 font-bold rounded text-center text-[10.5px] py-0.5"
              value={benchmarks[key].minPct}
              onChange={e => handleBenchmarkChange(key, 'minPct', Number(e.target.value))}
            />
            <span className="text-slate-400 text-[10px] font-bold">-%</span>
            <input
              type="number"
              min="0"
              max="100"
              className="w-11 bg-amber-50 border border-amber-400 text-amber-950 font-bold rounded text-center text-[10.5px] py-0.5"
              value={benchmarks[key].maxPct}
              onChange={e => handleBenchmarkChange(key, 'maxPct', Number(e.target.value))}
            />
            <span className="text-slate-400 text-[10px] font-bold">%</span>
          </div>
        );
      }
      return `%${benchmarks[key].minPct} - %${benchmarks[key].maxPct}`;
    };

    return (
      <div className="overflow-hidden border border-slate-200/80 rounded-2xl overflow-x-auto bg-white" id={isLarge ? "expanded-matrix-table-container" : "compact-matrix-table-container"}>
        <table className={`w-full text-left ${textDensityClass} border-collapse min-w-[550px]`}>
          <thead>
            <tr className="bg-slate-900 text-white border-b border-slate-800">
              <th className={`${paddingClass} font-extrabold uppercase tracking-wider text-[10px]`}>Fırsat Alanı</th>
              <th className={`${paddingClass} font-extrabold uppercase tracking-wider text-[10px]`}>Maliyet Konusu</th>
              <th className={`${paddingClass} font-extrabold uppercase tracking-wider text-[10px] text-center`}>
                Benchmark (%) {isEditingBenchmarks && <span className="text-amber-300 animate-pulse">(Düzenleme Modu)</span>}
              </th>
              <th className={`${paddingClass} font-extrabold uppercase tracking-wider text-[10px] text-right`}>Min Potansiyel ({currencySymbol})</th>
              <th className={`${paddingClass} font-extrabold uppercase tracking-wider text-[10px] text-right`}>Max Potansiyel ({currencySymbol})</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800 font-semibold">
            {/* DOĞRUDAN MALİYET AZALTMA */}
            <tr className="bg-rose-50/20">
              <td className={`${paddingClass} font-bold text-rose-950`} rowSpan={5}>Doğrudan Maliyet Azaltma</td>
              <td className={`${paddingClass} text-slate-900 font-bold`}>Hurda Maliyeti</td>
              <td className={`${paddingClass} text-center text-slate-600`}>{renderBenchmarkCell('sc')}</td>
              <td className={`${paddingClass} text-right text-rose-800 font-mono`}>{currencySymbol}{Math.round(active_sc_min).toLocaleString('tr-TR')}</td>
              <td className={`${paddingClass} text-right text-rose-800 font-black font-mono`}>{currencySymbol}{Math.round(active_sc_max).toLocaleString('tr-TR')}</td>
            </tr>
            <tr className="bg-rose-50/20">
              <td className={`${paddingClass} text-slate-900 font-bold`}>Fire &amp; Malzeme Kayıpları</td>
              <td className={`${paddingClass} text-center text-slate-600`}>{renderBenchmarkCell('fm')}</td>
              <td className={`${paddingClass} text-right text-rose-800 font-mono`}>{currencySymbol}{Math.round(active_fm_min).toLocaleString('tr-TR')}</td>
              <td className={`${paddingClass} text-right text-rose-800 font-black font-mono`}>{currencySymbol}{Math.round(active_fm_max).toLocaleString('tr-TR')}</td>
            </tr>
            <tr className="bg-rose-50/20">
              <td className={`${paddingClass} text-slate-900 font-bold`}>Fazla Mesai Azaltımı</td>
              <td className={`${paddingClass} text-center text-slate-600`}>{renderBenchmarkCell('mes')}</td>
              <td className={`${paddingClass} text-right text-rose-800 font-mono`}>{currencySymbol}{Math.round(active_mes_min).toLocaleString('tr-TR')}</td>
              <td className={`${paddingClass} text-right text-rose-800 font-black font-mono`}>{currencySymbol}{Math.round(active_mes_max).toLocaleString('tr-TR')}</td>
            </tr>
            <tr className="bg-rose-50/20">
              <td className={`${paddingClass} text-slate-900 font-bold`}>Yeniden İşleme (Rework)</td>
              <td className={`${paddingClass} text-center text-slate-600`}>{renderBenchmarkCell('yi')}</td>
              <td className={`${paddingClass} text-right text-rose-800 font-mono`}>{currencySymbol}{Math.round(active_yi_min).toLocaleString('tr-TR')}</td>
              <td className={`${paddingClass} text-right text-rose-800 font-black font-mono`}>{currencySymbol}{Math.round(active_yi_max).toLocaleString('tr-TR')}</td>
            </tr>
            <tr className="bg-rose-50/20">
              <td className={`${paddingClass} text-slate-900 font-bold`}>Operasyonel Verimsizlik</td>
              <td className={`${paddingClass} text-center text-slate-600`}>{renderBenchmarkCell('ov')}</td>
              <td className={`${paddingClass} text-right text-rose-800 font-mono`}>{currencySymbol}{Math.round(active_ov_min).toLocaleString('tr-TR')}</td>
              <td className={`${paddingClass} text-right text-rose-800 font-black font-mono`}>{currencySymbol}{Math.round(active_ov_max).toLocaleString('tr-TR')}</td>
            </tr>

            {/* KAPASİTE YARATMA */}
            <tr className="bg-indigo-50/20 border-t border-slate-150">
              <td className={`${paddingClass} font-bold text-indigo-950`} rowSpan={4}>Kapasite Yaratma</td>
              <td className={`${paddingClass} text-slate-900 font-bold`}>Setup Süreleri (SMED)</td>
              <td className={`${paddingClass} text-center text-slate-600`}>{renderBenchmarkCell('setup')}</td>
              <td className={`${paddingClass} text-right text-indigo-800 font-mono`}>{currencySymbol}{Math.round(active_setup_min).toLocaleString('tr-TR')}</td>
              <td className={`${paddingClass} text-right text-indigo-800 font-black font-mono`}>{currencySymbol}{Math.round(active_setup_max).toLocaleString('tr-TR')}</td>
            </tr>
            <tr className="bg-indigo-50/20">
              <td className={`${paddingClass} text-slate-900 font-bold`}>Plansız Duruşların Önlenmesi</td>
              <td className={`${paddingClass} text-center text-slate-600`}>{renderBenchmarkCell('pd')}</td>
              <td className={`${paddingClass} text-right text-indigo-800 font-mono`}>{currencySymbol}{Math.round(active_pd_min).toLocaleString('tr-TR')}</td>
              <td className={`${paddingClass} text-right text-indigo-800 font-black font-mono`}>{currencySymbol}{Math.round(active_pd_max).toLocaleString('tr-TR')}</td>
            </tr>
            <tr className="bg-indigo-50/20">
              <td className={`${paddingClass} text-slate-900 font-bold`}>OEE İyileştirmesi</td>
              <td className={`${paddingClass} text-center text-slate-600`}>{renderBenchmarkCell('oee')}</td>
              <td className={`${paddingClass} text-right text-indigo-800 font-mono`}>{currencySymbol}{Math.round(active_oee_min).toLocaleString('tr-TR')}</td>
              <td className={`${paddingClass} text-right text-indigo-800 font-black font-mono`}>{currencySymbol}{Math.round(active_oee_max).toLocaleString('tr-TR')}</td>
            </tr>
            <tr className="bg-indigo-50/20">
              <td className={`${paddingClass} text-slate-900 font-bold`}>Operatör Verimliliği</td>
              <td className={`${paddingClass} text-center text-slate-600`}>{renderBenchmarkCell('opv')}</td>
              <td className={`${paddingClass} text-right text-indigo-800 font-mono`}>{currencySymbol}{Math.round(active_opv_min).toLocaleString('tr-TR')}</td>
              <td className={`${paddingClass} text-right text-indigo-800 font-black font-mono`}>{currencySymbol}{Math.round(active_opv_max).toLocaleString('tr-TR')}</td>
            </tr>

            {/* STRATEJİK OPERASYONEL KAZANÇ */}
            <tr className="bg-emerald-50/20 border-t border-slate-150">
              <td className={`${paddingClass} font-bold text-emerald-950`} rowSpan={3}>Stratejik Operasyonel Kazanç</td>
              <td className={`${paddingClass} text-slate-900 font-bold`}>Lead Time (Sipariş Çevrimi)</td>
              <td className={`${paddingClass} text-center text-slate-600`}>{renderBenchmarkCell('lt')}</td>
              <td className={`${paddingClass} text-right text-emerald-850 font-mono`}>{currencySymbol}{Math.round(active_lt_min).toLocaleString('tr-TR')}</td>
              <td className={`${paddingClass} text-right text-emerald-850 font-black font-mono`}>{currencySymbol}{Math.round(active_lt_max).toLocaleString('tr-TR')}</td>
            </tr>
            <tr className="bg-emerald-50/20">
              <td className={`${paddingClass} text-slate-900 font-bold`}>WIP (Yarı Mamul) Azaltımı</td>
              <td className={`${paddingClass} text-center text-slate-600`}>{renderBenchmarkCell('wip')}</td>
              <td className={`${paddingClass} text-right text-emerald-850 font-mono`}>{currencySymbol}{Math.round(active_wip_min).toLocaleString('tr-TR')}</td>
              <td className={`${paddingClass} text-right text-emerald-850 font-black font-mono`}>{currencySymbol}{Math.round(active_wip_max).toLocaleString('tr-TR')}</td>
            </tr>
            <tr className="bg-emerald-50/20">
              <td className={`${paddingClass} text-slate-900 font-bold`}>Sevkiyat Performansı</td>
              <td className={`${paddingClass} text-center text-slate-600`}>{renderBenchmarkCell('sp')}</td>
              <td className={`${paddingClass} text-right text-emerald-850 font-mono`}>{currencySymbol}{Math.round(active_sp_min).toLocaleString('tr-TR')}</td>
              <td className={`${paddingClass} text-right text-emerald-850 font-black font-mono`}>{currencySymbol}{Math.round(active_sp_max).toLocaleString('tr-TR')}</td>
            </tr>

            {/* SUMMARIZED TOTALS */}
            <tr className="bg-slate-900 text-white font-bold border-t-2 border-slate-700">
              <td className={`${paddingClass} uppercase text-[9px] font-black`} colSpan={2}>Toplam Ekonomik Fırsat Potansiyeli</td>
              <td className={`${paddingClass} text-center text-[10px] text-slate-400 font-black`}>Ciroya Oran: %{m_minEconomicLossPct} - %{m_maxEconomicLossPct}</td>
              <td className={`${paddingClass} text-right text-amber-400 font-black font-mono`}>
                {currencySymbol}{Math.round(active_total_min).toLocaleString('tr-TR')}
                {currency !== 'TRY' && (
                  <span className="block text-[9px] font-mono text-emerald-300 font-bold">
                    ~₺{Math.round(active_total_min * activeRate).toLocaleString('tr-TR')} TL
                  </span>
                )}
              </td>
              <td className={`${paddingClass} text-right text-emerald-400 font-black font-mono ${isLarge ? "text-sm md:text-base" : "text-xs"}`}>
                {currencySymbol}{Math.round(active_total_max).toLocaleString('tr-TR')}
                {currency !== 'TRY' && (
                  <span className="block text-[9px] font-mono text-emerald-300 font-bold">
                    ~₺{Math.round(active_total_max * activeRate).toLocaleString('tr-TR')} TL (Kur)
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const renderFormulaList = (isLarge: boolean = false) => {
    const textDensityClass = isLarge ? "text-xs md:text-sm" : "text-[11px]";
    const headingClass = isLarge ? "text-sm md:text-base text-slate-800 font-extrabold flex items-center gap-1.5" : "text-slate-800 font-bold";
    const highlightTextClass = isLarge ? "text-slate-700 font-semibold" : "text-slate-600";
    return (
      <div className={`${textDensityClass} text-slate-600 leading-relaxed font-semibold space-y-4`} id={isLarge ? "expanded-formula-container" : "compact-formula-container"}>
        <div className="border-b border-slate-200/50 pb-3">
          <p className={headingClass}>• 1. Kalitesizlik / Hurda Maliyeti (COPQ):</p>
          <div className="text-slate-500 font-medium italic mt-1 ml-3 space-y-1">
            <p>- <strong>Hesaplama:</strong> Yıllık Ciro ({currencySymbol}{turnoverNum.toLocaleString('tr-TR')}) x COPQ Oranı (%{copqRateNum}) [Hurda: %{scrapRateNum} + Tamir: %{reworkRateNum}].</p>
            <p className={`mt-1 ${highlightTextClass}`}>
              - <strong>Muhafazakar (Fiziksel Hurda Kaybı):</strong> Yıllık Ciro x %{scrapRateNum} Hurda Oranı = {currencySymbol}{Math.round(turnoverNum * (scrapRateNum / 100)).toLocaleString('tr-TR')} / yıl.
            </p>
            <p className={highlightTextClass}>
              - <strong>Tamir / Yeniden İşleme Yükü:</strong> Yıllık Ciro x %{reworkRateNum} Tamir Oranı x 0.35 sönüm katsayısı = {currencySymbol}{Math.round(turnoverNum * (reworkRateNum / 100) * 0.35).toLocaleString('tr-TR')} / yıl.
            </p>
            <p className={`mt-1.5 font-bold text-red-700 ${isLarge ? 'text-xs md:text-sm bg-red-50 p-3 rounded-xl border border-red-100/50' : ''}`}>
              - <strong>Toplam COPQ Asgari Potansiyeli (Muhafazakar):</strong> {currencySymbol}{copqLossMin.toLocaleString('tr-TR')} / yıl. Yeniden işleme işçiliği, tamir sürelerindeki enerji, ek kalite kontrolör ve müşteri tazminatlarını içerecek şekilde Beklenen ve Üst senaryolarda sırasıyla <strong>1.25x</strong> ve <strong>1.45x</strong> çarpanıyla modellenmiştir.
            </p>
          </div>
        </div>

        <div className="border-b border-slate-200/50 pb-3">
          <p className={headingClass}>• 2. Model Değişim (Setup) Duruş Kaybı:</p>
          <div className="text-slate-500 font-medium italic mt-1 ml-3 space-y-1.5">
            <p>- <strong>Setup Sıklığı:</strong> {setupFrequencyNum} setup/hafta x 52 hafta x {setupMachineCountNum} makine = {annualSetupsCount.toLocaleString('tr-TR')} setup/yıl.</p>
            <p>- <strong>Toplam Setup Süresi:</strong> {annualSetupHours.toLocaleString('tr-TR')} saat / yıl.</p>
            <p>- <strong>Doğrudan İşçilik Kaybı (Muhafazakar):</strong> {annualSetupHours.toLocaleString('tr-TR')} sa x {affectedOpsSetupNum} op x Saatlik İşçilik ({currencySymbol}{Math.round(grossLaborCostNum / 180).toLocaleString('tr-TR')}/sa) = {currencySymbol}{setupLaborLoss.toLocaleString('tr-TR')} / yıl.</p>
            <p>- <strong>Kapasite Fırsat Maliyeti (Opportunity Loss):</strong> Duruşlardaki ciro fırsatı; Makine Başına düşen saatlik ciro ({currencySymbol}{Math.round(hourlyTurnoverRate).toLocaleString('tr-TR')}/sa) x Karlılık katsayısı (1.35) x Yıllık setup süreleri = {currencySymbol}{Math.round(setupOpportunityLoss).toLocaleString('tr-TR')} / yıl.</p>
            <p className={`${highlightTextClass} not-italic`}>
              - <strong>Senaryolama:</strong> Muhafazakar sadece işçilik kaybıdır. Beklenen senaryomuz kaybedilen cironun %60'ının satış fırsatı olarak geri kazanılabileceğini, Üst Potansiyel ise kaybedilen kapasitenin tamamının pazar talebine dönüştürülebileceğini varsayar.
            </p>
          </div>
        </div>

        <div>
          <p className={headingClass}>• 3. Verimsizlik ve Plansız Duruş Maliyeti:</p>
          <div className="text-slate-500 font-medium italic mt-1 ml-3 space-y-1.5">
            <p>- <strong>Verimlilik Açığı (Gap):</strong> %{plannedEffNum} (Planlanan) - %{actualEffNum} (Gerçek OEE) = %{efficiencyGap} verimlilik sapması.</p>
            <p>- <strong>Ödenen Operatör Saatleri:</strong> {opsNum} operatör x 12 ay x 180 sa = {annualOperatorHoursPaid.toLocaleString('tr-TR')} adam-saat / yıl.</p>
            <p>- <strong>Doğrudan Boşa Giden İşçilik (Muhafazakar):</strong> {annualOperatorHoursPaid.toLocaleString('tr-TR')} sa x %{efficiencyGap} gap x Saatlik İşçilik ({currencySymbol}{Math.round(grossLaborCostNum / 180).toLocaleString('tr-TR')}/sa) = {currencySymbol}{inefficiencyLaborLoss.toLocaleString('tr-TR')} / yıl.</p>
            <p>- <strong>Sabit ve Değişken Genel Gider Erimesi:</strong> Makineler çalışırken ama boş dönerken harcanan elektrik, sönümlenemeyen amortisman ve amortisör kat sayısı (1.65) = {currencySymbol}{Math.round(inefficiencyOverheadLoss).toLocaleString('tr-TR')} / yıl.</p>
            <p className={`${highlightTextClass} not-italic`}>
              - <strong>Senaryolama:</strong> Muhafazakar sadece verimsiz ödenen doğrudan işçiliği gösterir. Beklenen ve Üst senaryolarda sönümlenemeyen amortisman ve fabrika genel gider payları eklenir.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const exportMatrixToExcel = () => {
    const BOM = "\uFEFF";
    let content = "";

    // 1. Baslik ve Firma Bilgileri
    content += "IV. OPERASYONEL FIRSATLAR VE GERİ KAZANIM POTANSİYELİ MATRİSİ\n\n";
    content += `Firma Adı:\t${firmaAdi || "-"}\n`;
    content += `Sektör:\t${sektor || "-"}\n`;
    content += `Ürün Grubu:\t${urunGrubu || "-"}\n`;
    content += `Adres:\t${adres || "-"}\n`;
    content += `Yıllık Operasyonel Kayıp Havuzu (Beklenen):\t${currencySymbol}${totalLossExpected.toLocaleString('tr-TR')}\n`;
    content += `Seçilen Tahmini Kazanç:\t${currencySymbol}${netFinancialGain.toLocaleString('tr-TR')}\n\n`;

    // 2. Tablo Kolon Basliklari
    content += "Fırsat Sınıfı\tFırsat Alanı\tBenchmark (%)\tMin Potansiyel (" + currency + ")\tMax Potansiyel (" + currency + ")\n";

    // 3. Rows
    // Doğrudan Maliyet Azaltma
    content += `Doğrudan Maliyet Azaltma\tHurda Maliyeti\t%${oppScR?.minPct || 0} - %${oppScR?.maxPct || 0}\t${Math.round(opp_sc_min || 0)}\t${Math.round(opp_sc_max || 0)}\n`;
    content += `Doğrudan Maliyet Azaltma\tFire & Malzeme Kayıpları\t%${oppFmR?.minPct || 0} - %${oppFmR?.maxPct || 0}\t${Math.round(opp_fm_min || 0)}\t${Math.round(opp_fm_max || 0)}\n`;
    content += `Doğrudan Maliyet Azaltma\tFazla Mesai Azaltımı\t%${oppMesR?.minPct || 0} - %${oppMesR?.maxPct || 0}\t${Math.round(opp_mes_min || 0)}\t${Math.round(opp_mes_max || 0)}\n`;
    content += `Doğrudan Maliyet Azaltma\tYeniden İşleme (Rework)\t%${oppYiR?.minPct || 0} - %${oppYiR?.maxPct || 0}\t${Math.round(opp_yi_min || 0)}\t${Math.round(opp_yi_max || 0)}\n`;
    content += `Doğrudan Maliyet Azaltma\tOperasyonel Verimsizlik\t%${oppOvR?.minPct || 0} - %${oppOvR?.maxPct || 0}\t${Math.round(opp_ov_min || 0)}\t${Math.round(opp_ov_max || 0)}\n`;

    // Kapasite Yaratma
    content += `Kapasite Yaratma\tSetup Süreleri (SMED)\t%${oppSetupR?.minPct || 0} - %${oppSetupR?.maxPct || 0}\t${Math.round(opp_setup_min || 0)}\t${Math.round(opp_setup_max || 0)}\n`;
    content += `Kapasite Yaratma\tPlansız Duruşların Önlenmesi\t%${oppPdR?.minPct || 0} - %${oppPdR?.maxPct || 0}\t${Math.round(opp_pd_min || 0)}\t${Math.round(opp_pd_max || 0)}\n`;
    content += `Kapasite Yaratma\tOEE İyileştirmesi\t%${oppOeeR?.minPct || 0} - %${oppOeeR?.maxPct || 0}\t${Math.round(opp_oee_min || 0)}\t${Math.round(opp_oee_max || 0)}\n`;
    content += `Kapasite Yaratma\tOperatör Verimliliği\t%${oppOpvR?.minPct || 0} - %${oppOpvR?.maxPct || 0}\t${Math.round(opp_opv_min || 0)}\t${Math.round(opp_opv_max || 0)}\n`;

    // Stratejik Operasyonel Kazanç
    content += `Stratejik Operasyonel Kazanç\tLead Time (Sipariş Çevrimi)\t%${oppLtR?.minPct || 0} - %${oppLtR?.maxPct || 0}\t${Math.round(opp_lt_min || 0)}\t${Math.round(opp_lt_max || 0)}\n`;
    content += `Stratejik Operasyonel Kazanç\tWIP (Yarı Mamul) Azaltımı\t%${oppWipR?.minPct || 0} - %${oppWipR?.maxPct || 0}\t${Math.round(opp_wip_min || 0)}\t${Math.round(opp_wip_max || 0)}\n`;
    content += `Stratejik Operasyonel Kazanç\tSevkiyat Performansı\t%${oppSpR?.minPct || 0} - %${oppSpR?.maxPct || 0}\t${Math.round(opp_sp_min || 0)}\t${Math.round(opp_sp_max || 0)}\n`;

    // Toplam
    content += `Toplam\tToplam Ekonomik Fırsat Potansiyeli\tCiroya Oran: %${minEconomicLossPct} - %${maxEconomicLossPct}\t${Math.round(total_economic_min || 0)}\t${Math.round(total_economic_max || 0)}\n`;

    const blob = new Blob([BOM + content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${(firmaAdi || "Gemba").replace(/[^a-zA-Z0-9İıŞşĞğÇçÖöÜü\s]/g, "_")}_Geri_Kazanim_Matrisi.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Header profile block for Tab 3 showing current client meta */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden shadow-md flex flex-col justify-between items-start gap-4 no-print border border-slate-800">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-650/10 rounded-full filter blur-2xl pointer-events-none"></div>
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="bg-red-650 text-white text-[9px] font-black px-2.5 py-1 rounded uppercase tracking-widest block w-max mb-2">
              ROI YATIRIM DÖNÜŞ &amp; KARAR DESTEK DEKLARESİ
            </span>
            <h3 className="font-display font-black text-lg text-slate-100 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-red-500" />
              {firmaAdi || "Akar Otomotiv A.Ş."} - ROI Analizatörü
            </h3>
            <p className="text-xs text-slate-400 font-semibold mt-1">
              Sektör: <span className="text-slate-100">{sektor || "Otomotiv"}</span> | Ürün Grubu: <span className="text-slate-100">{urunGrubu || "Yedek Parça"}</span>
            </p>
          </div>
          <div className="bg-slate-850 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs font-semibold self-start md:self-auto shrink-0 flex items-center gap-3">
            <div className="text-right">
              <span className="text-slate-400 text-[10px] block uppercase">Yıllık Ekonomik Kayıp Havuzu</span>
              <strong className="text-sm font-black text-red-400">
                {currencySymbol}{totalLossExpected.toLocaleString('tr-TR')}
              </strong>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div>
              <span className="text-slate-400 text-[10px] block uppercase">Seçilen Tahmini Kazanç (%{successRatePct} Başarı)</span>
              <div className="flex flex-col">
                <strong className="text-sm font-black text-emerald-400">
                  {currencySymbol}{Math.round(scaledAnnualGain).toLocaleString('tr-TR')} / yıl
                </strong>
                <span className="text-[9.5px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/50 px-1.5 py-0.5 rounded mt-1 font-bold text-center">
                  %{selectedOption === 1 ? '18' : selectedOption === 2 ? '42' : '68'} İyileşme Hedefi
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsExecutivePitchOpen(true)}
              className="ml-2 flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-extrabold text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-md hover:scale-105 cursor-pointer shrink-0"
              title="Canlı Müşteri Sunum Modunu Başlat"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>CANLI SUNUM MODU</span>
            </button>
          </div>
        </div>

        {/* 🎛️ STRATEJİK HASSASİYET SİMLATÖRÜ VE ESG KARBON METRİĞİ BARİ */}
        <div className="w-full mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Slider Controls */}
          <div className="bg-slate-850 p-3 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-extrabold text-amber-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                🎛️ OpEx Başarı Oranı Simülatörü (Hassasiyet)
              </span>
              <span className="font-mono font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 text-[11px]">
                %{successRatePct} Başarı Hedefi
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              value={successRatePct}
              onChange={(e) => setSuccessRatePct(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[9.5px] text-slate-400 font-bold">
              <span>%50 (İhtiyatlı Senaryo)</span>
              <span>%75 (Dengeli)</span>
              <span>%100 (Hedeflenen Tam Kazanç)</span>
            </div>
          </div>

          {/* ESG Carbon Footprint Badge */}
          <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-900/60 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl text-xl">🌱</span>
              <div>
                <span className="font-extrabold text-emerald-400 text-[11px] uppercase tracking-wider block">
                  ESG &amp; KARBON AYAK İZİ DÜŞÜŞÜ (ÇEVRESEL ETKİ)
                </span>
                <p className="text-[11px] text-slate-300 font-semibold mt-0.5">
                  İsraf engelleme ve duruş azaltımı ile tahmini <strong className="text-emerald-300">~{co2Tons} Ton CO2 / Yıl</strong> azaltım (~{treesSavedEquivalent} Ağaç)
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bilgilendirme Altyazısı / Değerlendirme Teşhisi */}
        <div className="w-full mt-2 pt-3.5 border-t border-slate-800 text-[10.5px] text-slate-400 space-y-2 font-medium">
          <p className="text-[9.5px] uppercase font-black text-emerald-500 tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            KAZANÇ MODELLEME VE HEDEF NOKTA GÖSTERİMİ:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-1 text-[11px] leading-relaxed">
            <div>
              • <strong className="text-slate-200">Kazanım Kaynağı:</strong> Seçilen <strong className="text-slate-200">Paket 0{selectedOption}</strong> hedefleri uyarınca, fabrikanın toplam yıllık israf havuzundan (<strong className="text-slate-200">{currencySymbol}{totalLossExpected.toLocaleString('tr-TR')}</strong>) belirlenen iyileşme katsayısı oranında geri kazanım elde edilir.
            </div>
            <div>
              • <strong className="text-slate-200">İyileştirme Değeri:</strong> 
              {selectedOption === 1 && <span> <strong>%18 Net İyileşme (Kayıp azaltımı)</strong> ile israf havuzunun %82'si kalacak şekilde modellenir ve <strong>{currencySymbol}{netFinancialGain.toLocaleString('tr-TR')}/yıl</strong> tasarruf edilir.</span>}
              {selectedOption === 2 && <span> <strong>%42 Net İyileşme (Kayıp azaltımı)</strong> ile israf havuzunun %58'i kalacak şekilde modellenir ve <strong>{currencySymbol}{netFinancialGain.toLocaleString('tr-TR')}/yıl</strong> tasarruf edilir.</span>}
              {selectedOption === 3 && <span> <strong>%68 Net İyileşme (Kayıp azaltımı)</strong> ile israf havuzunun %32'si kalacak şekilde modellenir ve <strong>{currencySymbol}{netFinancialGain.toLocaleString('tr-TR')}/yıl</strong> tasarruf edilir.</span>}
            </div>
          </div>
          {selectedOption === 2 && (
            <div className="mt-2.5 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-300 leading-normal">
              💡 <strong>Model Uyumluluk Notu:</strong> Hızlandırılmış Program (%42 net iyileşme ve ₺{netFinancialGain.toLocaleString('tr-TR')}/yıl tasarruf) hedefimiz; doğrudan fiziksel/operasyonel israfların (Matris IV tabanındaki azami ₺{Math.round(total_economic_max).toLocaleString('tr-TR')} doğrudan fırsat) ötesinde, sistemik verimlilik artışı, koordinasyon sinerjisi, lead-time kısalmasından sağlanan işletme sermayesi kazanımı ve SMED ile açığa çıkan kapasitenin ciroya dönüştürülmesi gibi <strong>bütünsel sistemik kaldıraçları</strong> içerir. Bu sayede model, doğrudan tespit edilen fiziksel kayıp sınırının üzerinde bir ek finansal değer yaratmaktadır.
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Section 4 Operational Opportunities Matrix */}
        <div className="lg:col-span-12 xl:col-span-6 space-y-8">
          
          {/* 🎯 SECTION 3: OPERASYONEL KPI HEDEF DEĞİŞİMLERİ */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 space-y-6 animate-fade-in" id="roi-operational-kpis">
            <div className="border-b pb-4 border-stone-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-display font-black text-xs uppercase tracking-widest text-[#B45309] flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-red-650 animate-pulse" />
                  III. OPERASYONEL KPI HEDEF DEĞİŞİMLERİ (ÖNCESİ VS. SONRASI)
                </h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-1">
                  Yarın Yol Haritası çerçevesinde {selectedOption}. Paket uyarınca ulaşılacak temel operasyonel performans ve hızlanma hedefleri
                </p>
              </div>

              {/* Segment Selector for Scenarios */}
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto shrink-0 no-print">
                {([1, 2, 3] as const).map(optId => (
                  <button
                    key={optId}
                    type="button"
                    onClick={() => setSelectedOption && setSelectedOption(optId)}
                    className={`cursor-pointer px-3.5 py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                      selectedOption === optId
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-550 hover:text-slate-800'
                    }`}
                  >
                    Paket 0{optId}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* KPI 1: Setup Süresi */}
              {setupDurationNum && setupDurationNum > 0 ? (
                <div className="space-y-2 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between" id="roi-kpi-setup">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">⏱️ SETUP SÜRESİ (SMED)</span>
                      <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md border border-amber-200 whitespace-nowrap">
                        -{selectedOption === 1 ? '30%' : selectedOption === 2 ? '40%' : '50%'} Azalma
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium mt-1">Model değişim verimliliği, duruş azaltma çarpanı</p>
                  </div>
                  <div className="space-y-1.5 mt-2">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                      <span>Mevcut Durum</span>
                      <span className="text-slate-900 font-bold">{setupDurationNum} Dakika</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-650 pt-0.5">
                      <span>Hedeflenen Süre</span>
                      <span className="text-emerald-700 font-extrabold">
                        {Math.round(setupDurationNum * (selectedOption === 1 ? 0.70 : selectedOption === 2 ? 0.60 : 0.50))} Dakika
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${selectedOption === 1 ? 70 : selectedOption === 2 ? 60 : 50}%` }}></div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* KPI 2: Lead Time */}
              {leadTimeNum && leadTimeNum > 0 ? (
                <div className="space-y-2 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between" id="roi-kpi-leadtime">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">🚚 SEVK SÜRESİ (LEAD TIME)</span>
                      <span className="text-[9px] bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded-md border border-blue-200 whitespace-nowrap">
                        -{selectedOption === 1 ? '30%' : selectedOption === 2 ? '40%' : '50%'} Sıkıştırma
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium mt-1">Sipariş çevrim hızı ve nakit akış performansı</p>
                  </div>
                  <div className="space-y-1.5 mt-2">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                      <span>Mevcut Durum</span>
                      <span className="text-slate-900 font-bold">{leadTimeNum} Gün</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-650 pt-0.5">
                      <span>Hedeflenen Durum</span>
                      <span className="text-emerald-700 font-extrabold">
                        {Math.round(leadTimeNum * (selectedOption === 1 ? 0.70 : selectedOption === 2 ? 0.60 : 0.50))} Gün
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${selectedOption === 1 ? 70 : selectedOption === 2 ? 60 : 50}%` }}></div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* KPI 3: Hurda ve COPQ Oranı */}
              {copqRateNum && copqRateNum > 0 ? (
                <div className="space-y-2 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between" id="roi-kpi-copq">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">📉 KALİTESİZLİK (COPQ)</span>
                      <span className="text-[9px] bg-rose-100 text-rose-900 font-bold px-2 py-0.5 rounded-md border border-rose-200 whitespace-nowrap">
                        -{selectedOption === 1 ? '15%' : selectedOption === 2 ? '20%' : '30%'} Düşüş
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium mt-1">Hurda, fire ve hatalı parça azaltma başarısı</p>
                  </div>
                  <div className="space-y-1.5 mt-2">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                      <span>Mevcut Durum</span>
                      <span className="text-slate-900 font-bold">%{copqRateNum} COPQ</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-650 pt-0.5">
                      <span>Hedeflenen Oran</span>
                      <span className="text-emerald-700 font-extrabold">
                        %{Math.round(copqRateNum * (selectedOption === 1 ? 0.85 : selectedOption === 2 ? 0.80 : 0.70) * 10) / 10}
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${selectedOption === 1 ? 85 : selectedOption === 2 ? 80 : 70}%` }}></div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* KPI 4: Üretkenlik */}
              {laborProductivity && laborProductivity > 0 ? (
                <div className="space-y-2 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between" id="roi-kpi-productivity">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">⚙️ MAVİ YAKA ÜRETKENLİĞİ</span>
                      <span className="text-[9px] bg-indigo-100 text-indigo-900 font-bold px-2 py-0.5 rounded-md border border-indigo-200 whitespace-nowrap">
                        +{selectedOption === 1 ? '20%' : selectedOption === 2 ? '30%' : '35%'} Artış
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium mt-1">Standart iş ve gemba hat dengeleme çarpanı</p>
                  </div>
                  <div className="space-y-1.5 mt-2">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                      <span>Mevcut Durum</span>
                      <span className="text-slate-900 font-bold">{laborProductivity.toLocaleString('tr-TR')} {productionUnit}/Op/Yıl</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-500 rounded-full" style={{ width: `${(1 / 1.35) * 100}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-650 pt-0.5">
                      <span>Hedeflenen Üretkenlik</span>
                      <span className="text-emerald-700 font-extrabold">
                        {Math.round(laborProductivity * (selectedOption === 1 ? 1.20 : selectedOption === 2 ? 1.30 : 1.35)).toLocaleString('tr-TR')} {productionUnit}/Op
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${((selectedOption === 1 ? 1.20 : selectedOption === 2 ? 1.30 : 1.35) / 1.35) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* KPI 5: OEE */}
              {oeeNum && oeeNum > 0 ? (
                <div className="space-y-2 bg-slate-50/60 p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between md:col-span-2" id="roi-kpi-oee">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block">🔋 EKİPMAN ETKİNLİĞİ (OEE)</span>
                      <p className="text-[10px] text-slate-500 font-medium mt-1">Kullanılabilirlik, performans ve kalite çarpımıyla makine OEE oranı</p>
                    </div>
                    <span className="text-[9px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-md border border-emerald-200 whitespace-nowrap">
                      +{selectedOption === 1 ? '10%' : selectedOption === 2 ? '15%' : '18%'} Mutlak Artış
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                        <span>Mevcut OEE Oranı</span>
                        <span className="text-slate-900 font-bold">%{oeeNum} OEE</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-500 rounded-full" style={{ width: `${oeeNum}%` }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-650">
                        <span>Hedeflenen OEE Oranı (TPM)</span>
                        <span className="text-emerald-700 font-extrabold">
                          %{Math.min(98, Math.round(oeeNum + (selectedOption === 1 ? 10 : selectedOption === 2 ? 15 : 18)))} OEE
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${Math.min(98, Math.round(oeeNum + (selectedOption === 1 ? 10 : selectedOption === 2 ? 15 : 18)))}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* 📈 MODÜL 1: İNTERAKTİF AMORTİSMAN & KÜMÜLATİF NAKİT AKIŞI GRAFİĞİ (BREAK-EVEN CHART) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 space-y-4 no-print animate-fade-in" id="roi-break-even-chart-section">
            <div className="border-b pb-3 border-stone-200/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h4 className="font-display font-black text-xs uppercase tracking-widest text-indigo-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600 animate-pulse" />
                  III-B. KÜMÜLATİF NAKİT AKIŞI VE AMORTİSMAN (BREAK-EVEN) GRAFİĞİ
                </h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-1">
                  Seçilen Paket 0{selectedOption} Yatırımı ({currencySymbol}{activeOptionBudget.toLocaleString('tr-TR')}) ile 12 Aylık Birikimli Kâr Eğrisi
                </p>
              </div>
              <span className="text-[10.5px] font-mono font-black text-amber-900 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 shadow-xs self-start md:self-auto">
                🎯 Başa Baş Noktası: {detectedBreakEvenMonth > 0 ? `${detectedBreakEvenMonth}. Ay` : 'Yıl Sonunda Amorti'}
              </span>
            </div>

            {/* 12-Month Cumulative Cash Flow Visual */}
            <div className="pt-4 pb-2 bg-slate-50/50 rounded-2xl border border-slate-150 p-4">
              <div className="relative h-64 flex items-end gap-1.5 sm:gap-3 border-b border-slate-200 pb-2">
                <div className="w-full flex items-end justify-between gap-1.5 h-full px-2">
                  {breakEvenMonthsData.map((item) => {
                    const maxScale = Math.max(activeOptionBudget * 1.5, breakEvenMonthsData[11].cumSavings) || 100000;
                    const savingsHeight = (item.cumSavings / maxScale) * 100;
                    const costHeight = (item.cumCost / maxScale) * 100;
                    const isBreakEven = item.month === detectedBreakEvenMonth;

                    return (
                      <div key={item.month} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                        {/* Bars Container */}
                        <div className="w-full flex items-end justify-center gap-1 h-full relative">
                          {/* Investment Cost Line/Bar */}
                          <div 
                            className="w-1.5 bg-slate-300 rounded-t"
                            style={{ height: `${Math.max(4, costHeight)}%` }}
                            title={`Yatırım Bütçesi: ${currencySymbol}${item.cumCost.toLocaleString('tr-TR')}`}
                          ></div>
                          {/* Cumulative Savings Bar */}
                          <div 
                            className={`w-3.5 sm:w-5 rounded-t transition-all duration-300 relative ${
                              isBreakEven 
                                ? 'bg-amber-500 ring-2 ring-amber-400 ring-offset-1 z-10 scale-105' 
                                : item.netFlow >= 0 
                                ? 'bg-emerald-500 hover:bg-emerald-600' 
                                : 'bg-red-400 hover:bg-red-500'
                            }`}
                            style={{ height: `${Math.max(4, savingsHeight)}%` }}
                          >
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none font-bold">
                              {item.month}.Ay Tasarruf: {currencySymbol}{item.cumSavings.toLocaleString('tr-TR')}
                            </div>
                          </div>
                        </div>

                        {/* Month Label */}
                        <span className={`text-[10px] font-mono mt-2 font-bold ${isBreakEven ? 'text-amber-700 font-extrabold scale-110' : 'text-slate-500'}`}>
                          {item.month}.Ay
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Legend & Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-semibold pt-1">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 flex items-center justify-between">
                <span className="text-slate-500">Yatırım Tutarı:</span>
                <strong className="text-slate-900 font-mono">{currencySymbol}{activeOptionBudget.toLocaleString('tr-TR')}</strong>
              </div>
              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200/70 flex items-center justify-between">
                <span className="text-emerald-800">1. Yıl Sonu Kümülatif Tasarruf:</span>
                <strong className="text-emerald-700 font-mono">{currencySymbol}{breakEvenMonthsData[11].cumSavings.toLocaleString('tr-TR')}</strong>
              </div>
              <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200/70 flex items-center justify-between">
                <span className="text-amber-900">12. Ay Sonu Net Kazanç (Kâr):</span>
                <strong className="text-amber-950 font-mono">{currencySymbol}{Math.max(0, breakEvenMonthsData[11].netFlow).toLocaleString('tr-TR')}</strong>
              </div>
            </div>
          </div>

          {/* 📊 MALİYET AZALTIM POTANSİYELİ GÖRSEL DASHBOARD'U */}
          {(() => {
            const d_loss_durus = loss_durus || Math.round(totalLossExpected * 0.25);
            const d_loss_kalite = loss_kalite || Math.round(totalLossExpected * 0.20);
            const d_loss_mesai = loss_mesai || Math.round(totalLossExpected * 0.15);
            const d_loss_hurda = loss_hurda || Math.round(totalLossExpected * 0.15);
            const d_loss_iscilik = loss_iscilik || Math.round(totalLossExpected * 0.15);
            const d_loss_kapasite = loss_kapasite || Math.max(0, totalLossExpected - (d_loss_durus + d_loss_kalite + d_loss_mesai + d_loss_hurda + d_loss_iscilik));

            // Chart data array
            const chartData = [
              { label: 'Duruşlar', current: d_loss_durus, target: Math.round(d_loss_durus * 0.75), reduction: '-%25', tool: 'SMED & TPM', desc: 'Sürekli İyileştirme ile Arıza & Model Değişimi' },
              { label: 'Kalite', current: d_loss_kalite, target: Math.round(d_loss_kalite * 0.75), reduction: '-%25', tool: 'Poka-Yoke & Kalite Kaizen', desc: 'Tamir ve Hatalı Parça Üretim Yükü' },
              { label: 'Fazla Mesai', current: d_loss_mesai, target: Math.round(d_loss_mesai * 0.65), reduction: '-%35', tool: 'Hat Dengeleme & Standart İş', desc: 'Dengesiz Vardiya & Yoğun Mesai Yükü' },
              { label: 'Hurda', current: d_loss_hurda, target: Math.round(d_loss_hurda * 0.80), reduction: '-%20', tool: 'Süreç Kontrol & Standartizasyon', desc: 'Hatalı Malzeme ve Toz/Sıvı Fireleri' },
              { label: 'İşçilik', current: d_loss_iscilik, target: Math.round(d_loss_iscilik * 0.75), reduction: '-%25', tool: '5S & Standart İş', desc: 'Mavi Yaka Verimsizlik ve Hazırlık Kaybı' },
              { label: 'Kapasite', current: d_loss_kapasite, target: Math.round(d_loss_kapasite * 0.70), reduction: '-%30', tool: 'OEE Takip & Darboğaz Çözümü', desc: 'Ekipman Doyum & Kullanım Kaybı' }
            ];

            const maxLoss = Math.max(...chartData.map(c => c.current)) || 10000;
            const yTicks = [maxLoss, maxLoss * 0.75, maxLoss * 0.5, maxLoss * 0.25, 0];

            return (
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 space-y-4 no-print animate-fade-in">
                <div className="border-b pb-3 border-stone-200/60 flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h4 className="font-display font-black text-xs uppercase tracking-widest text-[#059669] flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                      IV-A. MALİYET AZALTIM POTANSİYELİ GÖRSEL DASHBOARD'U
                    </h4>
                    <p className="text-[11px] text-slate-500 font-semibold mt-1">
                      Yalın dönüşüm ve Opex (SMED, TPM, Poka-Yoke) entegrasyonu sonrası 6 ana maliyet başlığındaki düşüş senaryosu (Mevcut vs Hedef)
                    </p>
                  </div>
                  <div className="flex-shrink-0 self-end md:self-start">
                    <button
                      id="btn-expand-chart-dashboard"
                      type="button"
                      onClick={() => setIsDashboardExpanded(true)}
                      className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-black text-[10px] px-2.5 py-1.5 rounded-lg border border-emerald-200 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-sm group animate-pulse"
                      title="Grafiği Geniş Ekran Gör"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-emerald-650 group-hover:text-emerald-50 transition-colors" />
                      <span>Ekranı Genişlet</span>
                    </button>
                  </div>
                </div>

                {/* Legend & Summary Info */}
                <div className="grid grid-cols-2 gap-3 text-[11px] font-semibold bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4 justify-center">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00b4d8]"></span>
                      <span className="text-slate-600">Mevcut Kayıp</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2a9d8f]"></span>
                      <span className="text-slate-600">İyileşme Sonrası</span>
                    </div>
                  </div>
                  <div className="text-right border-l border-slate-200 pl-3 flex flex-col justify-center">
                    <span className="text-slate-400 text-[9px] block uppercase leading-none mb-1">YALIN KATKI ORANI</span>
                    <strong className="text-[#2a9d8f] font-black text-xs">
                      ~%26.5 Kayıp Reddi
                    </strong>
                  </div>
                </div>

                {/* Simple responsive CSS bar chart */}
                <div className="pt-4 pb-2">
                  <div className="relative h-64 flex items-end gap-1 sm:gap-4 md:gap-6 border-b border-slate-200 pl-14 pb-1">
                     {/* Y-Axis labels */}
                     <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-[9px] font-mono text-slate-400 select-none pb-4">
                       {yTicks.map((tick, idx) => (
                         <div key={idx} className="h-0 flex items-center justify-end pr-2 border-r border-slate-100 relative">
                           <span className="absolute right-3">{tick >= 1000000 ? `${currencySymbol}${(tick/1000000).toFixed(1)}M` : tick >= 1000 ? `${currencySymbol}${Math.round(tick/1000)}B` : `${currencySymbol}${Math.round(tick)}`}</span>
                         </div>
                       ))}
                     </div>

                     {/* Grid lines */}
                     <div className="absolute left-12 right-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none pb-4">
                       {[0, 1, 2, 3, 4].map(line => (
                         <div key={line} className="w-full border-t border-slate-100/70 h-0"></div>
                       ))}
                     </div>

                     {/* The Bars */}
                     <div className="flex-1 h-full flex items-end justify-between px-2 pt-4 relative z-10 w-full select-none">
                       {chartData.map((item, idx) => {
                         const curHeight = (item.current / maxLoss) * 100;
                         const tarHeight = (item.target / maxLoss) * 100;

                         return (
                           <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end max-w-[60px]">
                             
                             {/* Double Bars Container */}
                             <div className="w-full flex items-end justify-center gap-1 md:gap-1.5 h-full relative">
                               
                               {/* Current Loss Bar */}
                               <div 
                                 className="w-[12px] sm:w-[16px] bg-[#00b4d8] rounded-t transition-all duration-300 shadow-sm relative hover:brightness-110 cursor-pointer"
                                 style={{ height: `${Math.max(4, curHeight)}%` }}
                               >
                                 <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none font-bold">
                                   {currencySymbol}{item.current.toLocaleString('tr-TR')}
                                 </div>
                               </div>

                               {/* Target Loss Bar */}
                               <div 
                                 className="w-[12px] sm:w-[16px] bg-[#2a9d8f] rounded-t transition-all duration-300 shadow-sm relative hover:brightness-110 cursor-pointer"
                                 style={{ height: `${Math.max(4, tarHeight)}%` }}
                               >
                                 {/* Reduction badge */}
                                 <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-emerald-50 text-emerald-800 font-extrabold text-[8px] px-0.5 py-0.2 rounded-full border border-emerald-200/50 scale-90 whitespace-nowrap shadow-xs">
                                   {item.reduction}
                                 </div>

                                 <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none font-bold">
                                   {currencySymbol}{item.target.toLocaleString('tr-TR')}
                                 </div>
                               </div>

                             </div>

                             {/* X-Axis Label */}
                             <div className="text-[9px] font-extrabold text-slate-500 mt-2 truncate max-w-full text-center group-hover:text-slate-800 transition-colors">
                               {item.label}
                             </div>

                             {/* Modern tooltip on hover */}
                             <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-52 bg-slate-900/95 text-white p-3 rounded-2xl shadow-xl border border-slate-800 opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 z-50 text-[10px] space-y-1.5 font-semibold leading-snug">
                               <p className="font-bold border-b border-slate-800 pb-1 text-sky-400 text-[11px]">{item.label} Analizi</p>
                               <p className="text-slate-400 font-medium italic">{item.desc}</p>
                               <div className="flex justify-between pt-1 font-mono">
                                 <span>Mevcut:</span>
                                 <span className="text-red-400">{currencySymbol}{item.current.toLocaleString('tr-TR')}</span>
                               </div>
                               <div className="flex justify-between font-mono">
                                 <span>İyileşme Sonrası:</span>
                                 <span className="text-emerald-400">{currencySymbol}{item.target.toLocaleString('tr-TR')}</span>
                               </div>
                               <div className="flex justify-between font-bold text-yellow-400 font-mono border-t border-slate-800 pt-1">
                                 <span>Kazanım:</span>
                                 <span>{currencySymbol}{(item.current - item.target).toLocaleString('tr-TR')}</span>
                               </div>
                               <p className="text-[9px] text-[#2a9d8f] pt-1">🛠️ Yol Haritası: <strong>{item.tool}</strong></p>
                             </div>

                           </div>
                         );
                       })}
                     </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ─── NEW SECTION: OPERATIONAL OPPORTUNITIES & RECOVERY POTENTIAL MATRIX ─── */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-5 sm:p-6 space-y-4 no-print animate-fade-in w-full max-w-full overflow-hidden" id="roi-opportunities-matrix-section">
            <div className="border-b pb-3 border-stone-200/60 flex flex-col xl:flex-row xl:items-center justify-between gap-3.5 w-full max-w-full">
              <div className="min-w-0 flex-1">
                <h4 className="font-display font-black text-xs uppercase tracking-widest text-[#059669] flex items-center gap-2 truncate">
                  <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="truncate">IV. OPERASYONEL FIRSATLAR VE GERI KAZANIM POTANSIYELI MATRISI ({currency})</span>
                </h4>
                <p className="text-[11px] text-slate-500 font-semibold mt-1">
                  İyileştirme başlıklarının etkilediği maliyet tabanı ve asgari/azami yıllık potansiyel kazanım aralıkları
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 max-w-full justify-start xl:justify-end shrink">
                <button
                  type="button"
                  onClick={() => setIsEditingBenchmarks(!isEditingBenchmarks)}
                  className={`flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer shadow-sm whitespace-nowrap ${
                    isEditingBenchmarks 
                      ? 'bg-amber-500 text-white border-amber-600' 
                      : 'bg-amber-50 text-amber-900 border-amber-200/80 hover:bg-amber-100'
                  }`}
                  title="Benchmark oranlarını doğrudan elle düzenleme modunu açar/kapatır"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{isEditingBenchmarks ? 'Tamamla' : '⚡ Benchmark Düzenle'}</span>
                </button>

                {/* Ürün ailesine göre hesapla Checkbox */}
                <label className="flex items-center gap-1.5 cursor-pointer bg-emerald-50/40 border border-emerald-200/80 rounded-xl px-2.5 py-1.5 hover:bg-emerald-50 transition-colors shadow-sm whitespace-nowrap">
                  <input 
                    type="checkbox"
                    checked={useProductFamilyRecovery}
                    onChange={e => setUseProductFamilyRecovery?.(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-emerald-650 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-[10.5px] font-extrabold text-slate-750">Ürün Ailesi ({urunGrubuEnCok || 'Odak Ürün'})</span>
                </label>

                <button
                  type="button"
                  onClick={exportMatrixToExcel}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] px-3 py-1.5 rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap"
                  title="Çerçeveli ve Renkli Excel (.xls) Raporu İndir"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>XLS İndir (Matris)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsMatrixExpanded(true)}
                  className="flex items-center gap-1 text-[10px] font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2.5 py-1.5 rounded-xl transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                  title="Büyük Ekranda Gör"
                  id="expand-matrix-panel-btn"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Büyüt</span>
                </button>
              </div>
            </div>

            {renderMatrixTable(false)}
          </div>

          {/* ─── MATRIX MODAL OVERLAY ─── */}
          {isMatrixExpanded && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-hidden animate-fade-in" id="matrix-modal-overlay">
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col transition-all duration-300" id="matrix-modal-container">
                {/* Header */}
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-3xl">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800 uppercase tracking-tight">
                    <TrendingUp className="w-5 h-5 text-emerald-650" />
                    IV. OPERASYONEL FIRSATLAR VE GERI KAZANIM POTANSIYELI MATRISI ({currency})
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={exportMatrixToExcel}
                      className="flex items-center gap-1 bg-emerald-55 hover:bg-emerald-650 text-emerald-850 hover:text-white font-black text-[10px] px-2.5 py-1 rounded-md border border-emerald-200 transition-all cursor-pointer shadow-sm"
                      title="Geri Kazanım Matrisi Excel Raporu"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>XLS Raporu</span>
                    </button>
                    <button 
                      onClick={() => setIsMatrixExpanded(false)}
                      className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition-colors"
                      title="Kapat"
                      id="close-matrix-modal-btn"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {/* Scrollable Content */}
                <div className="p-6 md:p-8 overflow-y-auto">
                  <p className="text-xs text-slate-500 font-semibold mb-4 leading-relaxed">
                    Aşağıdaki matris, tesisinizdeki israfları ortadan kaldırmak üzere kurgulanan Yalın Dönüşüm metodolojilerinin asgari ve azami yıllık ekonomik tasarruf potansiyellerini seviyelendirmektedir. Değerler bilimsel benchmark formüllerine ve girdiğiniz operasyonel verilerinize dayanmaktadır.
                  </p>
                  {renderMatrixTable(true)}
                </div>
                {/* Footer */}
                <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-3xl flex justify-end">
                  <button
                    onClick={() => setIsMatrixExpanded(false)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-sm transition-all duration-200"
                    id="close-matrix-modal-bottom-btn"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─── HESAPLAMA MANTIĞI ─── */}
          <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 uppercase tracking-tight">
                <HelpCircle className="w-5 h-5 text-[#B45309]" />
                ŞEFFAF BİLİMSEL HESAPLAMA MANTIĞI &amp; FORMÜLLER
              </div>
              <button
                onClick={() => setIsFormulasExpanded(true)}
                className="flex items-center gap-1 text-[10px] font-bold text-amber-700 hover:text-amber-950 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-1 rounded-md transition-colors"
                title="Büyük Ekranda Aç"
                id="expand-formulas-panel-btn"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                Büyüt
              </button>
            </div>
            {renderFormulaList(false)}
          </div>
        </div>

        {/* ─── FORMULA MODAL OVERLAY ─── */}
        {isFormulasExpanded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-hidden animate-fade-in" id="formula-modal-overlay">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col transition-all duration-300" id="formula-modal-container">
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-3xl">
                <div className="flex items-center gap-2 text-sm font-extrabold text-slate-800 uppercase tracking-tight">
                  <HelpCircle className="w-5 h-5 text-[#B45309]" />
                  ŞEFFAF BİLİMSEL HESAPLAMA MANTIĞI &amp; FORMÜLLER
                </div>
                <button 
                  onClick={() => setIsFormulasExpanded(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 transition-colors"
                  title="Kapat"
                  id="close-formula-modal-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Scrollable Content */}
              <div className="p-6 md:p-8 overflow-y-auto">
                {renderFormulaList(true)}
              </div>
              {/* Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-3xl flex justify-end">
                <button
                  onClick={() => setIsFormulasExpanded(false)}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-all duration-200"
                  id="close-formula-modal-bottom-btn"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT COLUMN: Section 5 Budget Plan & Realistic ROI Scenarios */}
        <div className="lg:col-span-12 xl:col-span-6 space-y-8 animate-fade-in">
          {/* ─── SECTION 5: BUDGET PLAN & REALISTIC ROI SCENARIOS (ROADMAP) ─── */}
          <div className="space-y-4">
            <div className="border-b pb-2 border-stone-200/65 flex items-center justify-between">
              <h4 className="font-display font-black text-xs uppercase tracking-widest text-[#B45309] block">
                V. YOL HARİTASI VE REALİSTİK REKABETÇİ ROI MATRİSİ
              </h4>
              <span className="text-[10px] text-slate-400 font-bold">GERÇEKÇİ GERİ ÖDEME HESAPLARI</span>
            </div>

            {/* Option 1 Option */}
            <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.015)] p-6 space-y-5 relative overflow-hidden transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03),0_16px_32px_rgba(0,0,0,0.03)] hover:border-zinc-300/95 group">
              <div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-400 block uppercase mb-1">PROGRAM 01</span>
                <h5 className="font-sans font-bold text-[14px] text-zinc-900 tracking-tight flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                  Yatırım Opsiyonu 1: Standart Gelişim Programı
                </h5>
                <p className="text-[11.5px] text-zinc-500 leading-relaxed font-normal mt-2">
                  <strong>Uygulanacak Altyapı:</strong> Darboğaz alanlar üzerinde temel yalın tekniklerin uygulanması ile pilot projeler öncelikli olarak devre alınır. İsraf kaynaklarını kurutup ilk büyük verimlilik ve hız kazanımlarını sahada somutlaştırmaya odaklanır.
                </p>
                <div className="mt-3.5 bg-zinc-50/50 p-2.5 rounded-xl border border-zinc-150/70 flex items-center justify-between text-xs text-zinc-700">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-400">ZİYARET FREKANSI:</span>
                  <span className="font-bold text-zinc-800 font-mono text-[11px]">1 adam gün / hafta - 52 Adam gün / yıl</span>
                </div>
              </div>

              {/* Operational Gains Breakdown */}
              <div className="bg-zinc-50/50 p-3.5 rounded-xl border border-zinc-150/70 space-y-2">
                <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">ÖNGÖRÜLEN OPERASYONEL GERI KAZANIMLAR</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-white border border-zinc-150 text-zinc-800 text-[10px] px-2.5 py-1 rounded-md font-mono font-medium shadow-[0_1px_1px_rgba(0,0,0,0.01)]">5S &amp; Düzen: +%10 Zaman Tasarrufu</span>
                  <span className="bg-white border border-zinc-150 text-zinc-800 text-[10px] px-2.5 py-1 rounded-md font-mono font-medium shadow-[0_1px_1px_rgba(0,0,0,0.01)]">Metrik Hizalama: +%8 Verimlilik Artışı</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-100 py-4 text-xs">
                <div>
                  <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase tracking-widest mb-1">DANIŞMANLIK PROJE BÜTÇESİ (₺ TL)</span>
                  <strong className="text-[18px] text-zinc-900 font-bold tracking-tight font-sans font-mono">₺{realOp1Budget.toLocaleString('tr-TR')} TL</strong>
                  {currency !== 'TRY' && (
                    <span className="block text-[10px] font-bold text-slate-500 mt-0.5 font-mono">
                      (~{currencySymbol}{Math.round(realOp1Budget / activeRate).toLocaleString('tr-TR')} {currency} karşılığı)
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-emerald-600 block uppercase tracking-widest mb-1">YILLIK GERİ KAZANIM ORANI (TL)</span>
                  <strong className="text-[18px] text-emerald-600 font-bold tracking-tight font-sans font-mono">₺{Math.round(op1_min * activeRate).toLocaleString('tr-TR')} - ₺{Math.round(op1_max * activeRate).toLocaleString('tr-TR')} TL / yıl</strong>
                  {currency !== 'TRY' && (
                    <span className="block text-[10.5px] font-extrabold text-slate-600 mt-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 w-max font-mono">
                      Döviz Karşılığı: {currencySymbol}{op1_min.toLocaleString('tr-TR')} - {currencySymbol}{op1_max.toLocaleString('tr-TR')} {currency} / yıl
                    </span>
                  )}
                  {useProductFamilyRecovery && (
                    <span className="block text-[10.5px] font-extrabold text-sky-600 mt-1 bg-sky-50 px-2 py-0.5 rounded border border-sky-100/50 w-max">
                      Ürün Grubu: ₺{Math.round(op1_min * familyRatio * activeRate).toLocaleString('tr-TR')} - ₺{Math.round(op1_max * familyRatio * activeRate).toLocaleString('tr-TR')} TL
                    </span>
                  )}
                </div>
              </div>
              
              {/* Real Paybacks */}
              <div className="bg-zinc-50/50 p-3.5 rounded-xl border border-zinc-200/80 space-y-2 text-xs">
                <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">GERİ ÖDEME SENARYOLARI (ROI PAYBACK)</span>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="bg-white p-2.5 rounded-lg border border-zinc-150 flex flex-col items-center justify-center">
                    <span className="text-zinc-400 block text-[9px] uppercase tracking-wider font-mono mb-1">Yavaş</span>
                    <strong className="text-[13px] font-bold text-zinc-800 font-mono">
                      {op1_min > 0 ? Math.max(1, Math.round((realOp1Budget / (op1_min * activeRate)) * 12 * 10) / 10) : 0} Ay
                    </strong>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-900 text-white p-2.5 rounded-lg shadow-sm flex flex-col items-center justify-center">
                    <span className="text-zinc-350 block text-[9px] uppercase tracking-wider font-mono mb-1">Beklenen</span>
                    <strong className="text-[14px] font-black text-white font-mono">
                      {op1_min > 0 ? Math.max(1, Math.round((realOp1Budget / (((op1_min + op1_max) / 2) * activeRate)) * 12 * 10) / 10) : 0} Ay
                    </strong>
                  </div>
                  <div className="bg-emerald-500/5 p-2.5 rounded-lg border border-emerald-500/20 flex flex-col items-center justify-center">
                    <span className="text-emerald-700 block text-[9px] uppercase tracking-wider font-mono mb-1">Hızlı</span>
                    <strong className="text-[13px] font-black text-emerald-950 font-mono">
                      {op1_max > 0 ? Math.max(1, Math.round((realOp1Budget / (op1_max * activeRate)) * 12 * 10) / 10) : 0} Ay
                    </strong>
                  </div>
                </div>
              </div>

              {/* Graphical Payback & ROI comparison bar chart */}
              <MiniOptionChart
                budget={realOp1Budget}
                minGain={op1_min}
                maxGain={op1_max}
                currencySymbol={currencySymbol}
                themeColor="slate"
                useProductFamilyRecovery={useProductFamilyRecovery}
                productRatio={familyRatio}
              />
            </div>

            {/* Option 2 Option */}
            <div className="bg-white rounded-2xl border-2 border-zinc-950 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_30px_rgba(0,0,0,0.04)] p-6 space-y-5 relative overflow-hidden transition-all duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_24px_48px_rgba(0,0,0,0.06)] group">
              <div className="absolute top-0 right-0 bg-zinc-950 text-white text-[8px] font-mono font-bold tracking-widest px-3 py-1.5 rounded-bl-xl uppercase">
                 C-LEVEL TAVSİYESİ
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-red-500 block uppercase mb-1">PROGRAM 02 — TAVSİYE EDİLEN</span>
                <h5 className="font-sans font-bold text-[14px] text-zinc-900 tracking-tight flex items-center gap-2 pr-24">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                  Yatırım Opsiyonu 2: Hızlandırılmış Program
                </h5>
                <p className="text-[11.5px] text-zinc-500 leading-relaxed font-normal mt-2">
                  <strong>Uygulanacak Altyapı:</strong> Değer Akış Haritalama (VSM), SMED Hızlı Kalıp Değişim Metotları, Hücresel İmalat Akış Tasarımları, Hat Dengeleme Analizleri öncelikli olarak devreye alınır. Temel saha yönetim çalışmalarına ağırlık verilir. Akış hızını katlayarak teslim sürelerini ve israfları radikal seviyede aşağı çeker.
                </p>
                <div className="mt-3.5 bg-red-550/[0.03] p-2.5 rounded-xl border border-red-500/10 flex items-center justify-between text-xs text-red-950">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-red-800">ZİYARET FREKANSI:</span>
                  <span className="font-bold text-red-900 font-mono text-[11px]">2 adam gün / hafta - 104 Adam gün / yıl</span>
                </div>
              </div>

              {/* Operational Gains Breakdown */}
              <div className="bg-[#EF4444]/[0.015] p-3.5 rounded-xl border border-red-500/10 space-y-2">
                <span className="text-[9px] font-mono font-bold text-red-800 uppercase tracking-widest block">ÖNGÖRÜLEN OPERASYONEL GERI KAZANIMLAR</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-white border border-red-500/10 text-red-950 text-[10px] px-2.5 py-1 rounded-md font-mono font-medium shadow-[0_1px_1px_rgba(0,0,0,0.01)]">SMED Kalıp Değişim: +%15 Kapasite</span>
                  <span className="bg-white border border-red-500/10 text-red-950 text-[10px] px-2.5 py-1 rounded-md font-mono font-medium shadow-[0_1px_1px_rgba(0,0,0,0.01)]">Hücresel Tasarım: -%50 Lead Time</span>
                  <span className="bg-white border border-red-500/10 text-red-950 text-[10px] px-2.5 py-1 rounded-md font-mono font-medium shadow-[0_1px_1px_rgba(0,0,0,0.01)]">Hat Dengeleme: +%12 İşçilik Verimi</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-100 py-4 text-xs">
                <div>
                  <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase tracking-widest mb-1">DANIŞMANLIK PROJE BÜTÇESİ (₺ TL)</span>
                  <strong className="text-[18px] text-zinc-900 font-bold tracking-tight font-sans font-mono">₺{realOp2Budget.toLocaleString('tr-TR')} TL</strong>
                  {currency !== 'TRY' && (
                    <span className="block text-[10px] font-bold text-slate-500 mt-0.5 font-mono">
                      (~{currencySymbol}{Math.round(realOp2Budget / activeRate).toLocaleString('tr-TR')} {currency} karşılığı)
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-emerald-600 block uppercase tracking-widest mb-1">YILLIK GERİ KAZANIM ORANI (TL)</span>
                  <strong className="text-[18px] text-emerald-600 font-bold tracking-tight font-sans font-mono">₺{Math.round(op2_min * activeRate).toLocaleString('tr-TR')} - ₺{Math.round(op2_max * activeRate).toLocaleString('tr-TR')} TL / yıl</strong>
                  {currency !== 'TRY' && (
                    <span className="block text-[10.5px] font-extrabold text-slate-600 mt-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 w-max font-mono">
                      Döviz Karşılığı: {currencySymbol}{op2_min.toLocaleString('tr-TR')} - {currencySymbol}{op2_max.toLocaleString('tr-TR')} {currency} / yıl
                    </span>
                  )}
                  {useProductFamilyRecovery && (
                    <span className="block text-[10.5px] font-extrabold text-sky-650 mt-1 bg-sky-50 px-2 py-0.5 rounded border border-sky-100/50 w-max">
                      Ürün Grubu: ₺{Math.round(op2_min * familyRatio * activeRate).toLocaleString('tr-TR')} - ₺{Math.round(op2_max * familyRatio * activeRate).toLocaleString('tr-TR')} TL
                    </span>
                  )}
                </div>
              </div>
              
              {/* Real Paybacks */}
              <div className="bg-zinc-50/50 p-3.5 rounded-xl border border-zinc-200/80 space-y-2 text-xs">
                <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">GERİ ÖDEME SENARYOLARI (ROI PAYBACK)</span>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="bg-white p-2.5 rounded-lg border border-zinc-150 flex flex-col items-center justify-center">
                    <span className="text-zinc-400 block text-[9px] uppercase tracking-wider font-mono mb-1">Yavaş</span>
                    <strong className="text-[13px] font-bold text-zinc-800 font-mono">
                      {op2_min > 0 ? Math.max(1, Math.round((realOp2Budget / (op2_min * activeRate)) * 12 * 10) / 10) : 0} Ay
                    </strong>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-900 text-white p-2.5 rounded-lg shadow-sm flex flex-col items-center justify-center">
                    <span className="text-zinc-350 block text-[9px] uppercase tracking-wider font-mono mb-1">Beklenen</span>
                    <strong className="text-[14px] font-black text-white font-mono">
                      {op2_min > 0 ? Math.max(1, Math.round((realOp2Budget / (((op2_min + op2_max) / 2) * activeRate)) * 12 * 10) / 10) : 0} Ay
                    </strong>
                  </div>
                  <div className="bg-emerald-500/5 p-2.5 rounded-lg border border-emerald-500/20 flex flex-col items-center justify-center">
                    <span className="text-emerald-700 block text-[9px] uppercase tracking-wider font-mono mb-1">Hızlı</span>
                    <strong className="text-[13px] font-black text-emerald-950 font-mono">
                      {op2_max > 0 ? Math.max(1, Math.round((realOp2Budget / (op2_max * activeRate)) * 12 * 10) / 10) : 0} Ay
                    </strong>
                  </div>
                </div>
              </div>

              {/* Graphical Payback & ROI comparison bar chart */}
              <MiniOptionChart
                budget={realOp2Budget}
                minGain={op2_min}
                maxGain={op2_max}
                currencySymbol={currencySymbol}
                themeColor="red"
                useProductFamilyRecovery={useProductFamilyRecovery}
                productRatio={familyRatio}
              />

              {/* Dynamic Explanation Note for Option 2 */}
              <div className="mt-3 p-3 rounded-xl bg-orange-50/60 border border-orange-100 text-[10px] text-orange-900 leading-relaxed font-semibold">
                <span className="font-bold flex items-center gap-1.5 text-orange-850 uppercase text-[9px] tracking-wider mb-1">
                  ⚠️ MODEL UYUMLULUK VE SİSTEMİK ÇARPAN BİLGİLENDİRMESİ:
                </span>
                Hızlandırılmış Program (%42 net iyileşme ve ₺{netFinancialGain.toLocaleString('tr-TR')}/yıl tasarruf) hedefimiz, en muhafazakar düzeyde sınırlandırılmış doğrudan fiziksel ve operasyonel duruşların (Matris IV tabanındaki azami ₺{Math.round(total_economic_max).toLocaleString('tr-TR')} doğrudan fırsat) ötesindedir. 2 adam-gün/haftalık aktif danışmanlık rehberliğiyle hayata geçirilecek organizasyonel entegrasyonlar; <strong>lead-time kısaltmasının sağladığı işletme sermayesi/stok kazanımı, SMED ile açığa çıkan kapasitenin ciro ve rekabet fırsatlarına dönüştürülmesi ile mavi-yaka motivasyonel/koordinasyonel sinerjileri gibi daha geniş kapsamlı sistemik kaldıraçları</strong> harekete geçirir. Bu bilinçli çarpan etkisi, doğrudan tespit edilen fiziksel kayıp sınırlarının üzerinde bir ek finansal değer katmaktadır.
              </div>
            </div>

            {/* Option 3 Option */}
            <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.015)] p-6 space-y-5 relative overflow-hidden transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03),0_16px_32px_rgba(0,0,0,0.03)] hover:border-zinc-300/95 group">
              <div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-400 block uppercase mb-1">PROGRAM 03</span>
                <h5 className="font-sans font-bold text-[14px] text-zinc-900 tracking-tight flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                  Yatırım Opsiyonu 3: Dönüşüm Liderliği Programı
                </h5>
                <p className="text-[11.5px] text-zinc-500 leading-relaxed font-normal mt-2">
                  <strong>Uygulanacak Altyapı:</strong> Akış Çalışmaları ve Darboğaz yönetimi ile birlikte sürecin tüm alanlara yaygınlaştırılması sağlanır. Saha yöneticilerinin Liderliği Ön plana alınır. Kurumsal sahiplenmeyi geliştirerek kazanımların kalıcı ve sürdürülebilir bir kültüre dönüşmesini garanti altına alır.
                </p>
                <div className="mt-3.5 bg-zinc-50/50 p-2.5 rounded-xl border border-zinc-150/70 flex items-center justify-between text-xs text-zinc-700">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-400">ZİYARET FREKANSI:</span>
                  <span className="font-bold text-zinc-800 font-mono text-[11px]">3 adam gün / hafta - 156 Adam gün / yıl</span>
                </div>
              </div>

              {/* Operational Gains Breakdown */}
              <div className="bg-zinc-50/50 p-3.5 rounded-xl border border-zinc-150/70 space-y-2">
                <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">ÖNGÖRÜLEN OPERASYONEL GERI KAZANIMLAR</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-white border border-zinc-150 text-zinc-800 text-[10px] px-2.5 py-1 rounded-md font-mono font-medium shadow-[0_1px_1px_rgba(0,0,0,0.01)]">Otonom Bakım: +%25 Ekipman Ömrü</span>
                  <span className="bg-white border border-zinc-150 text-zinc-800 text-[10px] px-2.5 py-1 rounded-md font-mono font-medium shadow-[0_1px_1px_rgba(0,0,0,0.01)]">Dijital OEE: +%25 Reaksiyon Hızı</span>
                  <span className="bg-white border border-zinc-150 text-zinc-800 text-[10px] px-2.5 py-1 rounded-md font-mono font-medium shadow-[0_1px_1px_rgba(0,0,0,0.015)]">Poka-Yoke: +%18 Hurda İyileşmesi</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-100 py-4 text-xs">
                <div>
                  <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase tracking-widest mb-1">DANIŞMANLIK PROJE BÜTÇESİ (₺ TL)</span>
                  <strong className="text-[18px] text-zinc-900 font-bold tracking-tight font-sans font-mono">₺{realOp3Budget.toLocaleString('tr-TR')} TL</strong>
                  {currency !== 'TRY' && (
                    <span className="block text-[10px] font-bold text-slate-500 mt-0.5 font-mono">
                      (~{currencySymbol}{Math.round(realOp3Budget / activeRate).toLocaleString('tr-TR')} {currency} karşılığı)
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-emerald-600 block uppercase tracking-widest mb-1">YILLIK GERİ KAZANIM ORANI (TL)</span>
                  <strong className="text-[18px] text-emerald-600 font-bold tracking-tight font-sans font-mono">₺{Math.round(op3_min * activeRate).toLocaleString('tr-TR')} - ₺{Math.round(op3_max * activeRate).toLocaleString('tr-TR')} TL / yıl</strong>
                  {currency !== 'TRY' && (
                    <span className="block text-[10.5px] font-extrabold text-slate-600 mt-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 w-max font-mono">
                      Döviz Karşılığı: {currencySymbol}{op3_min.toLocaleString('tr-TR')} - {currencySymbol}{op3_max.toLocaleString('tr-TR')} {currency} / yıl
                    </span>
                  )}
                </div>
              </div>
              
              {/* Real Paybacks */}
              <div className="bg-zinc-50/50 p-3.5 rounded-xl border border-zinc-200/80 space-y-2 text-xs">
                <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">GERİ ÖDEME SENARYOLARI (ROI PAYBACK)</span>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="bg-white p-2.5 rounded-lg border border-zinc-150 flex flex-col items-center justify-center">
                    <span className="text-zinc-400 block text-[9px] uppercase tracking-wider font-mono mb-1">Yavaş</span>
                    <strong className="text-[13px] font-bold text-zinc-800 font-mono">
                      {op3_min > 0 ? Math.max(1, Math.round((realOp3Budget / (op3_min * activeRate)) * 12 * 10) / 10) : 0} Ay
                    </strong>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-900 text-white p-2.5 rounded-lg shadow-sm flex flex-col items-center justify-center">
                    <span className="text-zinc-350 block text-[9px] uppercase tracking-wider font-mono mb-1">Beklenen</span>
                    <strong className="text-[14px] font-black text-white font-mono">
                      {op3_min > 0 ? Math.max(1, Math.round((realOp3Budget / (((op3_min + op3_max) / 2) * activeRate)) * 12 * 10) / 10) : 0} Ay
                    </strong>
                  </div>
                  <div className="bg-emerald-500/5 p-2.5 rounded-lg border border-emerald-500/20 flex flex-col items-center justify-center">
                    <span className="text-emerald-700 block text-[9px] uppercase tracking-wider font-mono mb-1">Hızlı</span>
                    <strong className="text-[13px] font-black text-emerald-950 font-mono">
                      {op3_max > 0 ? Math.max(1, Math.round((realOp3Budget / (op3_max * activeRate)) * 12 * 10) / 10) : 0} Ay
                    </strong>
                  </div>
                </div>
              </div>

              {/* Graphical Payback & ROI comparison bar chart */}
              <MiniOptionChart
                budget={realOp3Budget}
                minGain={op3_min}
                maxGain={op3_max}
                currencySymbol={currencySymbol}
                themeColor="blue"
              />
            </div>

            {/* Option 4 Option */}
            <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.015)] p-6 space-y-5 relative overflow-hidden transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03),0_16px_32px_rgba(0,0,0,0.03)] hover:border-zinc-300/95 group">
              <div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-400 block uppercase mb-1">PROGRAM 04</span>
                <h5 className="font-sans font-bold text-[14px] text-zinc-900 tracking-tight flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                  Yatırım Opsiyonu 4: Operasyonel Mükemmellik Programı
                </h5>
                <p className="text-[11.5px] text-zinc-500 leading-relaxed font-normal mt-2">
                  <strong>Uygulanacak Altyapı:</strong> Operasyon sahası öncelikli olmak üzere, operasyona etki eden direk ve endirek süreçlerin tamamını kapsayan, üst yönetim ile birlikte mükemmel süreçler oluşturmaya odaklanılır. Uçtan uca tüm değer zincirini kusursuzlaştırarak küresel düzeyde yüksek rekabetçi standartlar kurar.
                </p>
                <div className="mt-3.5 bg-zinc-50/50 p-2.5 rounded-xl border border-zinc-150/70 flex items-center justify-between text-xs text-zinc-700">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-400">ZİYARET FREKANSI:</span>
                  <span className="font-bold text-zinc-800 font-mono text-[11px]">4 adam gün / hafta - 208 Adam gün / yıl</span>
                </div>
              </div>

              {/* Operational Gains Breakdown */}
              <div className="bg-zinc-50/50 p-3.5 rounded-xl border border-zinc-150/70 space-y-2">
                <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">ÖNGÖRÜLEN OPERASYONEL GERI KAZANIMLAR</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-white border border-zinc-150 text-zinc-800 text-[10px] px-2.5 py-1 rounded-md font-mono font-medium shadow-[0_1px_1px_rgba(0,0,0,0.01)]">Jidoka &amp; Kalite: +%30 Seviye Artışı</span>
                  <span className="bg-white border border-zinc-150 text-zinc-800 text-[10px] px-2.5 py-1 rounded-md font-mono font-medium shadow-[0_1px_1px_rgba(0,0,0,0.015)]">Akış Kararlılığı: -%65 Lead Time</span>
                  <span className="bg-white border border-zinc-150 text-zinc-800 text-[10px] px-2.5 py-1 rounded-md font-mono font-medium shadow-[0_1px_1px_rgba(0,0,0,0.01)]">Sıfır Hata: +%22 Hurda İyileşmesi</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-100 py-4 text-xs">
                <div>
                  <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase tracking-widest mb-1">DANIŞMANLIK PROJE BÜTÇESİ (₺ TL)</span>
                  <strong className="text-[18px] text-zinc-900 font-bold tracking-tight font-sans font-mono">₺{realOp4Budget.toLocaleString('tr-TR')} TL</strong>
                  {currency !== 'TRY' && (
                    <span className="block text-[10px] font-bold text-slate-500 mt-0.5 font-mono">
                      (~{currencySymbol}{Math.round(realOp4Budget / activeRate).toLocaleString('tr-TR')} {currency} karşılığı)
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-emerald-600 block uppercase tracking-widest mb-1">YILLIK GERİ KAZANIM ORANI (TL)</span>
                  <strong className="text-[18px] text-emerald-600 font-bold tracking-tight font-sans font-mono">₺{Math.round(op4_min * activeRate).toLocaleString('tr-TR')} - ₺{Math.round(op4_max * activeRate).toLocaleString('tr-TR')} TL / yıl</strong>
                  {currency !== 'TRY' && (
                    <span className="block text-[10.5px] font-extrabold text-slate-600 mt-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 w-max font-mono">
                      Döviz Karşılığı: {currencySymbol}{op4_min.toLocaleString('tr-TR')} - {currencySymbol}{op4_max.toLocaleString('tr-TR')} {currency} / yıl
                    </span>
                  )}
                </div>
              </div>
              
              {/* Real Paybacks */}
              <div className="bg-zinc-50/50 p-3.5 rounded-xl border border-zinc-200/80 space-y-2 text-xs">
                <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">GERİ ÖDEME SENARYOLARI (ROI PAYBACK)</span>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="bg-white p-2.5 rounded-lg border border-zinc-150 flex flex-col items-center justify-center">
                    <span className="text-zinc-400 block text-[9px] uppercase tracking-wider font-mono mb-1">Yavaş</span>
                    <strong className="text-[13px] font-bold text-zinc-800 font-mono">
                      {op4_min > 0 ? Math.max(1, Math.round((realOp4Budget / (op4_min * activeRate)) * 12 * 10) / 10) : 0} Ay
                    </strong>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-900 text-white p-2.5 rounded-lg shadow-sm flex flex-col items-center justify-center">
                    <span className="text-zinc-350 block text-[9px] uppercase tracking-wider font-mono mb-1">Beklenen</span>
                    <strong className="text-[14px] font-black text-white font-mono">
                      {op4_min > 0 ? Math.max(1, Math.round((realOp4Budget / (((op4_min + op4_max) / 2) * activeRate)) * 12 * 10) / 10) : 0} Ay
                    </strong>
                  </div>
                  <div className="bg-emerald-500/5 p-2.5 rounded-lg border border-emerald-500/20 flex flex-col items-center justify-center">
                    <span className="text-emerald-700 block text-[9px] uppercase tracking-wider font-mono mb-1">Hızlı</span>
                    <strong className="text-[13px] font-black text-emerald-950 font-mono">
                      {op4_max > 0 ? Math.max(1, Math.round((realOp4Budget / (op4_max * activeRate)) * 12 * 10) / 10) : 0} Ay
                    </strong>
                  </div>
                </div>
              </div>

              {/* Graphical Payback & ROI comparison bar chart */}
              <MiniOptionChart
                budget={realOp4Budget}
                minGain={op4_min}
                maxGain={op4_max}
                currencySymbol={currencySymbol}
                themeColor="purple"
              />
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Row - Full width: Section 6 Gemini AI & Quick actions */}
      <div className="space-y-8 animate-fade-in">
        {/* ─── SECTION 6: AI INTERACTIVE MODELLING ─── */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full filter blur-lg pointer-events-none"></div>
          
          <div className="flex items-center justify-between border-b pb-3 border-slate-250">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-red-650 animate-pulse" />
              <span className="text-xs font-black text-slate-800 tracking-wider uppercase block">VI. Gemba AI Sales Coach — Executive Dialogue &amp; Pitch Strategy</span>
            </div>
            <button
              type="button"
              onClick={handleClearChat}
              className="cursor-pointer text-[10px] text-slate-400 hover:text-red-600 transition-all font-bold uppercase no-print"
            >
              Geçmişi Temizle
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="font-display font-black text-xs text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                {getSectorBenchmark(sektor, urunGrubu).title}
              </h5>
              <div className="text-xs leading-relaxed space-y-2 text-slate-600 font-semibold mt-2.5">
                <p>• <strong>Sektörel Zorluklar:</strong> {getSectorBenchmark(sektor, urunGrubu).problems}</p>
                <p>• <strong>Dünya Standartları:</strong> {getSectorBenchmark(sektor, urunGrubu).standards}</p>
                <p>• <strong>Müşteri İçin Fırsat Penceresi (GAP):</strong> {getSectorBenchmark(sektor, urunGrubu).gap}</p>
                {leadTimeNum > 0 && (
                  <p>
                    • <strong>Gecikme (Lead Time) İyileşme Potansiyeli:</strong> Mevcut {leadTimeNum} günlük tedarik süreci, Yalın Akış tasarımı ile <strong>{Math.round(leadTimeNum * 0.4 * 10) / 10} - {Math.round(leadTimeNum * 0.6 * 10) / 10} güne</strong> (%40-60 kısalma) indirilebilir. Bu durum sipariş çevrim hızınızı katlayacaktır.
                  </p>
                )}
              </div>
            </div>

            {/* Gemini AI Interactive Q&A Chat Window */}
            <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-inner flex flex-col no-print">
              <div className="bg-slate-900 text-white px-3.5 py-2.5 text-[10.5px] font-extrabold flex justify-between items-center border-b border-slate-800">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  Gemba AI Sales Coach — Senior OPEX &amp; Cost Control Advisor
                </span>
                <span className="text-[9.5px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Aktif Bağlı
                </span>
              </div>

              {/* Chat Messages Log */}
              <div className="p-3.5 space-y-3 h-80 overflow-y-auto text-xs scroll-smooth bg-slate-50/50 font-sans">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col max-w-[92%] ${
                      msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <span className="text-[9px] text-slate-400 font-extrabold mb-1 uppercase tracking-wider">
                      {msg.role === 'user' ? 'Danışman / Satış Temsilcisi' : 'Gemba AI Sales Coach'}
                    </span>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl leading-relaxed whitespace-pre-wrap font-medium shadow-xs ${
                        msg.role === 'user'
                          ? 'bg-emerald-700 text-white rounded-br-none'
                          : msg.content.toLowerCase().includes('yorum yok')
                          ? 'bg-amber-100 text-amber-900 border border-amber-200 rounded-bl-none italic'
                          : 'bg-white text-slate-850 border border-slate-200 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex flex-col items-start max-w-[85%] mr-auto">
                    <span className="text-[9px] text-slate-400 font-bold mb-1 uppercase animate-pulse">Gemba AI Hazırlıyor...</span>
                    <div className="px-3.5 py-2.5 rounded-2xl bg-slate-100 text-slate-600 rounded-bl-none flex items-center gap-2 font-bold italic border border-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce delay-75" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce delay-150" />
                      Saha verilerinden C-Level Satış Stratejisi ve ROI hesaplanıyor...
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Helper Action Prompts */}
              <div className="px-3 py-2 bg-slate-100/70 border-t border-slate-200 flex gap-1.5 flex-wrap">
                {[
                  "📊 Kapanış & Satış Strateji Raporu Oluştur",
                  "Fabrika Olgunluk & Ürün Maliyet Yapısını Değerlendir",
                  "Fiyat/Bütçe İtirazını Finansal ROI ile İkna Et",
                  "Kaizen İç Yetkinlik & İnsan Kaynağı Kazanımını Vurgula"
                ].map((prompt, pi) => (
                  <button
                    key={pi}
                    type="button"
                    onClick={() => {
                      setChatInput(prompt);
                    }}
                    className="cursor-pointer text-[9.5px] font-extrabold bg-white hover:bg-emerald-700 hover:text-white border border-slate-250 rounded-lg px-2.5 py-1 text-slate-650 transition-all shadow-xs"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Entry Box */}
              <form onSubmit={handleSendChatMessage} className="p-2 border-t border-slate-200 bg-white flex gap-1.5">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder={`${sektor || 'Sektörünüz'} için bir soru sorun...`}
                  disabled={isChatLoading}
                  className="flex-1 bg-slate-100/60 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-650 text-slate-800"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="cursor-pointer px-4 py-2 bg-red-650 hover:bg-red-700 text-white rounded-xl text-xs font-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                >
                  Sorun
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS PANEL FINANCIAL (No print) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-5 space-y-3.5 no-print animate-fade-in">
          <span className="text-xs font-black text-slate-500 tracking-wider uppercase block">Analiz ve Rapor Aksiyonları</span>
          
          <div className="grid grid-cols-2 gap-3 pb-2">
            <button
              onClick={handlePrint}
              className="bg-white hover:bg-[#EF4444] hover:text-white border border-zinc-200 hover:border-[#EF4444] text-zinc-600 font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-sm group"
            >
              <FileDown className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              PDF Raporu İndir
            </button>

            <button
              onClick={() => {
                const getAsciiBarPath = (r: number) => {
                  const filled = Math.min(20, Math.max(0, Math.round(20 * r)));
                  return "█".repeat(filled) + "░".repeat(20 - filled);
                };

                const textObj = `
========================================================================
             GEMBA PARTNER — STRATEJİK OPERASYONEL HESAP & FINANSAL ANALİZİ
========================================================================
TARİH: ${tarih}
MÜŞTERİ FİRMA: ${firmaAdi || "Belirtilmedi"}
SEKTÖR / ŞEHİR: ${sektor || "-"} / ${adres || "-"}
ÜRÜN GRUBU: ${urunGrubu || "-"}

------------------------------------------------------------------------
1. STRATEJİK KIYASLAMA DASHBOARD'U (ÖNCEKİ VS. SONRAKİ DURUM)
------------------------------------------------------------------------
(Seçilen Simülasyon Senaryosu: Opsiyon ${selectedOption})

### ⏱️ TESLİM SÜRESİ (LEAD TIME) ANALİZİ
* Mevcut Lead Time: ${leadTimeNum} Gün 
  [Mevcut] ${getAsciiBarPath(1)} (${leadTimeNum} Gün)
* Hedeflenen Lead Time: ${targetLeadTime} Gün 
  [Hedef]  ${getAsciiBarPath(targetLeadTimeRatio)} (${targetLeadTime} Gün)
* Kazanım: Teslim süresinde %${leadTimeSavingsPercent} radikal kısalma ve nakit akışında hızlanma.

### ⚙️ TOPLAM ÜRETKENLİK (İŞÇİLİK VERİMLİLİĞİ)
* Mevcut Üretkenlik: ${laborProductivity.toLocaleString('tr-TR')} ${productionUnit}/Operatör
  [Mevcut] ${getAsciiBarPath(0.5)} (${laborProductivity.toLocaleString('tr-TR')} ${productionUnit}/Op)
* Hedeflenen Üretkenlik: ${targetProductivity.toLocaleString('tr-TR')} ${productionUnit}/Operatör
  [Hedef]  ${getAsciiBarPath(0.5 * targetProductivityRatio)} (${targetProductivity.toLocaleString('tr-TR')} ${productionUnit}/Op)
* Kazanım: İşçilik verimliliğinde %${prodImprovementPercent} net artış potansiyeli.

### 📉 TOPLAM MALİYET KAYIPLARI VE AZALMA POTANSİYELİ
* Mevcut Toplam Kayıp Maliyeti: ₺${Math.round(totalLossAvg).toLocaleString('tr-TR')} TL/Yıl
  [Mevcut] ${getAsciiBarPath(1)} (₺${Math.round(totalLossAvg).toLocaleString('tr-TR')} TL)
* Hedeflenen Maliyet Seviyesi: ₺${targetLossCost.toLocaleString('tr-TR')} TL/Yıl (Kayıpların %${lossReductionPercent} azaltılması ile)
  [Hedef]  ${getAsciiBarPath(targetLossRatio)} (₺${targetLossCost.toLocaleString('tr-TR')} TL)
* Yıllık Net Finansal Kazanç: ₺${netFinancialGain.toLocaleString('tr-TR')} TL işletmenizde kalacaktır.

------------------------------------------------------------------------
2. DETAYLI MALİYET KAYIP PARAMETRELERİ (Mevcut Durum)
------------------------------------------------------------------------
- Kalitesizlik & Hurda Kaybı (Beklenen): ₺${Math.round(copqLossMin * 1.25).toLocaleString('tr-TR')} / Yıl
- Model Değişimi Setup Duruş Kaybı (Beklenen): ₺${Math.round(setupLaborLoss + setupOpportunityLoss * 0.60).toLocaleString('tr-TR')} / Yıl
- Verimsizlik & Duruş Kaybı (Beklenen): ₺${Math.round(inefficiencyLaborLoss + inefficiencyOverheadLoss * 0.50).toLocaleString('tr-TR')} / Yıl
- MUHAFAZAKAR SENARYO TOPLAM KAYIP: ₺${totalLossConservative.toLocaleString('tr-TR')} / Yıl
- BEKLENEN SENARYO TOPLAM KAYIP:    ₺${totalLossExpected.toLocaleString('tr-TR')} / Yıl
- ÜST POTANSİYEL SENARYO TOPLAM KAYIP: ₺${totalLossHigh.toLocaleString('tr-TR')} / Yıl
- AYLIK NAKİT KAYIP ORTALAMASI: ₺${Math.round(totalLossExpected / 12).toLocaleString('tr-TR')} / Ay

------------------------------------------------------------------------
3. YALIN YOL HARİTASI ROI DÖNÜŞ ORANLARI
------------------------------------------------------------------------
[Opsiyon 1: Standart Gelişim Programı - 1 Adam-Gün/Hafta]
- Proje Yatırım Bütçesi: ₺${realOp1Budget.toLocaleString('tr-TR')}
- Yıllık İyileşme Kazanımı: ₺${Math.round(totalLossAvg * 0.18).toLocaleString('tr-TR')}
- ROI Ödeme Süresi: ${totalLossAvg > 0 ? Math.max(0.5, Math.round((realOp1Budget / (totalLossAvg * 0.18)) * 12 * 10) / 10) : 0} Ay

[Opsiyon 2: Hızlandırılmış Program - 2 Adam-Gün/Hafta]
- Proje İndirimli Bütçesi: ₺${realOp2Budget.toLocaleString('tr-TR')}
- Yıllık İyileşme Kazanımı: ₺${Math.round(totalLossAvg * 0.42).toLocaleString('tr-TR')}
- ROI Ödeme Süresi: ${totalLossAvg > 0 ? Math.max(0.5, Math.round((realOp2Budget / (totalLossAvg * 0.42)) * 12 * 10) / 10) : 0} Ay

[Opsiyon 3: Dönüşüm Liderliği Programı - 3 Adam-Gün/Hafta]
- Proje Yatırım Bütçesi: ₺${realOp3Budget.toLocaleString('tr-TR')}
- Yıllık İyileşme Kazanımı: ₺${Math.round(totalLossAvg * 0.68).toLocaleString('tr-TR')}
- ROI Ödeme Süresi: ${totalLossAvg > 0 ? Math.max(0.5, Math.round((realOp3Budget / (totalLossAvg * 0.68)) * 12 * 10) / 10) : 0} Ay

[Opsiyon 4: Operasyonel Mükemmellik Programı - 4 Adam-Gün/Hafta]
- Proje Prototip Bütçesi: ₺${realOp4Budget.toLocaleString('tr-TR')}
- Yıllık İyileşme Kazanımı: ₺${Math.round(totalLossAvg * 0.82).toLocaleString('tr-TR')}
- ROI Ödeme Süresi: ${totalLossAvg > 0 ? Math.max(0.5, Math.round((realOp4Budget / (totalLossAvg * 0.82)) * 12 * 10) / 10) : 0} Ay
========================================================================
                `;
                navigator.clipboard.writeText(textObj.trim()).then(() => {
                  alert('Finansal Analiz Raporu panoya kopyalandı!');
                });
              }}
              className="bg-zinc-950 hover:bg-zinc-100 text-white hover:text-zinc-950 font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-sm border border-transparent hover:border-zinc-200 group"
            >
              <Copy className="w-4 h-4 text-zinc-350 group-hover:text-zinc-950 transition-colors" />
              Raporu Kopyala
            </button>
          </div>

          <button
            onClick={handleReset}
            className="w-full bg-stone-50 border border-stone-200 hover:bg-stone-100 hover:text-red-700 text-slate-500 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Parametreleri Sıfırla
          </button>
        </div>
      </div>

      {/* ─── MODAL: IV-A. MALİYET AZALTIM POTANSİYELİ GÖRSEL DASHBOARD'U EKRAN GENİŞLETME ─── */}
      {isDashboardExpanded && (() => {
        const d_loss_durus = loss_durus || Math.round(totalLossExpected * 0.25);
        const d_loss_kalite = loss_kalite || Math.round(totalLossExpected * 0.20);
        const d_loss_mesai = loss_mesai || Math.round(totalLossExpected * 0.15);
        const d_loss_hurda = loss_hurda || Math.round(totalLossExpected * 0.15);
        const d_loss_iscilik = loss_iscilik || Math.round(totalLossExpected * 0.15);
        const d_loss_kapasite = loss_kapasite || Math.max(0, totalLossExpected - (d_loss_durus + d_loss_kalite + d_loss_mesai + d_loss_hurda + d_loss_iscilik));

        const chartData = [
          { label: 'Duruşlar', current: d_loss_durus, target: Math.round(d_loss_durus * 0.75), reduction: '-%25', tool: 'SMED & TPM', desc: 'Sürekli İyileştirme ile Arıza & Model Değişimi' },
          { label: 'Kalite', current: d_loss_kalite, target: Math.round(d_loss_kalite * 0.75), reduction: '-%25', tool: 'Poka-Yoke & Kalite Kaizen', desc: 'Tamir ve Hatalı Parça Üretim Yükü' },
          { label: 'Fazla Mesai', current: d_loss_mesai, target: Math.round(d_loss_mesai * 0.65), reduction: '-%35', tool: 'Hat Dengeleme & Standart İş', desc: 'Dengesiz Vardiya & Yoğun Mesai Yükü' },
          { label: 'Hurda', current: d_loss_hurda, target: Math.round(d_loss_hurda * 0.80), reduction: '-%20', tool: 'Süreç Kontrol & Standartizasyon', desc: 'Hatalı Malzeme ve Toz/Sıvı Fireleri' },
          { label: 'İşçilik', current: d_loss_iscilik, target: Math.round(d_loss_iscilik * 0.75), reduction: '-%25', tool: '5S & Standart İş', desc: 'Mavi Yaka Verimsizlik ve Hazırlık Kaybı' },
          { label: 'Kapasite', current: d_loss_kapasite, target: Math.round(d_loss_kapasite * 0.70), reduction: '-%30', tool: 'OEE Takip & Darboğaz Çözümü', desc: 'Ekipman Doyum & Kullanım Kaybı' }
        ];

        const maxLoss = Math.max(...chartData.map(c => c.current)) || 10000;
        const yTicks = [maxLoss, maxLoss * 0.75, maxLoss * 0.5, maxLoss * 0.25, 0];

        return (
          <div 
            id="chart-expansion-backdrop"
            className="fixed inset-0 z-[110] bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in"
            onClick={() => setIsDashboardExpanded(false)}
          >
            <div 
              id="chart-expansion-dialog"
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col p-6 sm:p-8 relative transition-all duration-300 scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Absolute Top-Right Close Button */}
              <button
                id="close-chart-modal-btn-top"
                onClick={() => setIsDashboardExpanded(false)}
                className="absolute top-5 right-5 p-2.5 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-full transition-all duration-150 cursor-pointer border border-slate-200 shadow-sm"
                title="Kapat"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Title */}
              <div className="border-b pb-4 mb-6 border-slate-100 flex flex-col md:flex-row md:items-start justify-between gap-2 pr-12">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                      <TrendingUp className="w-5 h-5" />
                    </span>
                    <h3 className="font-display font-black text-lg sm:text-xl text-slate-900 uppercase tracking-tight">
                      IV-A. MALİYET AZALTIM POTANSİYELİ GENİŞ GÖRSEL PORTAL
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold pl-1">
                    Yalın dönüşüm ve Opex (SMED, TPM, Poka-Yoke) entegrasyonu sonrası 6 ana maliyet başlığındaki düşüş senaryosu (Mevcut vs Hedef)
                  </p>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-thin">
                
                {/* Visual Legend / Helper information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold bg-slate-50 p-4 rounded-2xl border border-slate-150/90 shadow-xs">
                  <div className="flex items-center gap-5 justify-center sm:justify-start">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#00b4d8] shadow-xs"></span>
                      <span className="text-slate-700 font-bold">Mevcut Kayıp Seviyesi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#2a9d8f] shadow-xs"></span>
                      <span className="text-slate-700 font-bold font-display">İyileşme Sonrası Hedef</span>
                    </div>
                  </div>
                  <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-4 flex flex-col justify-center">
                    <span className="text-slate-400 text-[10px] block uppercase tracking-wider font-extrabold mb-1">PROJE GENELİ ORTALAMA KAYIP AZALTIMI</span>
                    <strong className="text-[#2a9d8f] font-black text-sm">
                      ~%26.5 Net Kayıp Reddi ve Finansal Koruma
                    </strong>
                  </div>
                </div>

                {/* Large responsive CSS bar chart */}
                <div className="pt-6 pb-4 bg-slate-50/40 rounded-2xl border border-slate-100 p-4">
                  <div className="relative h-96 flex items-end gap-2 sm:gap-6 md:gap-8 border-b border-slate-200 pl-16 pb-2">
                     
                     {/* Y-Axis lines & labels */}
                     <div className="absolute left-0 top-0 bottom-0 w-14 flex flex-col justify-between text-xs font-mono text-slate-400 select-none pb-6">
                       {yTicks.map((tick, idx) => (
                         <div key={idx} className="h-0 flex items-center justify-end pr-3 border-r border-slate-200 relative">
                           <span className="absolute right-4 font-bold">{tick >= 1000000 ? `${currencySymbol}${(tick/1000000).toFixed(1)}M` : tick >= 1000 ? `${currencySymbol}${Math.round(tick/1000)}B` : `${currencySymbol}${Math.round(tick)}`}</span>
                         </div>
                       ))}
                     </div>

                     {/* Grid lines */}
                     <div className="absolute left-14 right-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none pb-6">
                       {[0, 1, 2, 3, 4].map(line => (
                         <div key={line} className="w-full border-t border-slate-200/50 h-0"></div>
                       ))}
                     </div>

                     {/* Double Bars Container */}
                     <div className="flex-1 h-full flex items-end justify-between px-4 pt-6 relative z-10 w-full select-none">
                       {chartData.map((item, idx) => {
                         const curHeight = (item.current / maxLoss) * 100;
                         const tarHeight = (item.target / maxLoss) * 100;

                         return (
                           <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end max-w-[100px]">
                             
                             {/* Double Bars */}
                             <div className="w-full flex items-end justify-center gap-2 md:gap-3 h-full relative">
                               
                               {/* Current Loss Bar */}
                               <div 
                                 className="w-[18px] sm:w-[24px] bg-[#00b4d8] rounded-t transition-all duration-300 shadow-md relative hover:scale-x-110 cursor-pointer"
                                 style={{ height: `${Math.max(4, curHeight)}%` }}
                               >
                                 <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none font-bold">
                                   {currencySymbol}{item.current.toLocaleString('tr-TR')}
                                 </div>
                               </div>

                               {/* Target Loss Bar */}
                               <div 
                                 className="w-[18px] sm:w-[24px] bg-[#2a9d8f] rounded-t transition-all duration-300 shadow-md relative hover:scale-x-110 cursor-pointer"
                                 style={{ height: `${Math.max(4, tarHeight)}%` }}
                               >
                                 <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none font-bold">
                                   {currencySymbol}{item.target.toLocaleString('tr-TR')}
                                 </div>
                               </div>

                             </div>

                             {/* X-Axis labels inside group */}
                             <div className="text-center mt-3 select-none">
                               <span className="block font-display font-black text-xs sm:text-sm text-slate-800 tracking-tight">{item.label}</span>
                               <span className="inline-block mt-1 font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                 {item.reduction}
                               </span>
                             </div>

                           </div>
                         );
                       })}
                     </div>

                  </div>
                </div>

                {/* Additional Insight Table inside expanded view */}
                <div className="border border-slate-150 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-150 text-slate-500 font-bold uppercase tracking-wider text-[9.5px]">
                        <th className="p-3.5 pl-5">Maliyet Alanı</th>
                        <th className="p-3.5">Mevcut Senaryo</th>
                        <th className="p-3.5">İyileşme Hedefi</th>
                        <th className="p-3.5">Azalma Oranı</th>
                        <th className="p-3.5">Destekleyici Yalın Metot / Araç</th>
                        <th className="p-3.5 pr-5">Açıklama</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                      {chartData.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 pl-5 font-black text-slate-950">{item.label}</td>
                          <td className="p-3.5 font-mono text-cyan-700">{currencySymbol}{item.current.toLocaleString('tr-TR')}</td>
                          <td className="p-3.5 font-mono text-emerald-700">{currencySymbol}{item.target.toLocaleString('tr-TR')}</td>
                          <td className="p-3.5">
                            <span className="font-mono font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                              {item.reduction}
                            </span>
                          </td>
                          <td className="p-3.5 text-indigo-700 font-bold text-[11px]">{item.tool}</td>
                          <td className="p-3.5 pr-5 text-slate-500 font-medium text-[10.5px] leading-relaxed max-w-xs">{item.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

              {/* Bottom footer bar with close button */}
              <div className="border-t pt-4 mt-6 flex justify-end gap-3 border-slate-100">
                <button
                  id="close-chart-modal-btn-bottom"
                  onClick={() => setIsDashboardExpanded(false)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Kapat &amp; Analize Dön
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* ─── MODÜL 2: CANLI MÜŞTERİ SUNUM MODU (EXECUTIVE PITCH VIEW OVERLAY) ─── */}
      {isExecutivePitchOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-xl overflow-y-auto p-4 sm:p-8 animate-fade-in text-white font-sans" id="executive-pitch-overlay">
          <div className="max-w-7xl mx-auto space-y-8 pb-12">
            
            {/* Presentation Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-600/20 text-red-500 rounded-2xl border border-red-500/30">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-950/50 border border-red-800/60 px-2.5 py-0.5 rounded-full">
                    EXECUTIVE STRATEJİK SUNUM PORTALİ
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-100 tracking-tight mt-1">
                    {firmaAdi || "Müşteri Firma"} — OpEx ROI &amp; Dönüşüm Deklaresı
                  </h2>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">
                    Tarih: {tarih} | Sektör: {sektor} | Danışman: {tarih ? "Saha Ekibi" : "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-stretch md:self-auto justify-end">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-4 py-3 rounded-xl border border-slate-700 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Yazdır / Sunum PDF</span>
                </button>
                <button
                  onClick={() => setIsExecutivePitchOpen(false)}
                  className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer shadow-lg hover:scale-105"
                >
                  <X className="w-4.5 h-4.5" />
                  <span>SUNUMU KAPAT</span>
                </button>
              </div>
            </div>

            {/* Pitch Key Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Tespit Edilen Yıllık Kayıp Havuzu</span>
                <strong className="text-2xl font-black text-red-500 font-display block">
                  {currencySymbol}{totalLossExpected.toLocaleString('tr-TR')}
                </strong>
                <span className="text-[10px] text-slate-400 block font-medium">COPQ + Setup + Verimsizlik</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Hedeflenen Yıllık Net Kazanç</span>
                <strong className="text-2xl font-black text-emerald-400 font-display block">
                  {currencySymbol}{Math.round(scaledAnnualGain).toLocaleString('tr-TR')}
                </strong>
                <span className="text-[10px] text-emerald-400 block font-semibold">%{successRatePct} Başarı Oranı Simülasyonu</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Amortisman (Break-Even) Süresi</span>
                <strong className="text-2xl font-black text-amber-400 font-display block">
                  {detectedBreakEvenMonth > 0 ? `${detectedBreakEvenMonth}. Ay` : 'Hızlı Geri Dönüş'}
                </strong>
                <span className="text-[10px] text-slate-400 block font-medium">Seçilen Paket 0{selectedOption} Yatırımı</span>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Çevresel Karbon Azaltımı (ESG)</span>
                <strong className="text-2xl font-black text-sky-400 font-display block">
                  ~{co2Tons} Ton CO2/Yıl
                </strong>
                <span className="text-[10px] text-sky-400 block font-semibold">~{treesSavedEquivalent} Ağaç Eşdeğeri</span>
              </div>
            </div>

            {/* Pitch Interactive Sensitivity Slider */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h4 className="font-display font-black text-base text-amber-400 flex items-center gap-2">
                    🎛️ CANLI BAŞARI VE RİSK HASSASİYET SİMLATÖRÜ
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    Toplantı esnasında müşterinin ihtiyatlılık tercihine göre kazanç ve ROI sürelerini canlı güncelleyin.
                  </p>
                </div>
                <span className="text-sm font-mono font-black text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-xl border border-emerald-800">
                  %{successRatePct} Başarı Senaryosu
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                step="5"
                value={successRatePct}
                onChange={(e) => setSuccessRatePct(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-3 bg-slate-800 rounded-lg"
              />
            </div>

            {/* 12-Month Break-Even Chart in Pitch View */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-display font-black text-base text-slate-100">
                  📈 12 AYLIK KÜMÜLATİF NAKİT AKIŞI VE AMORTİSMAN DİYAGRAMI
                </h4>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950 px-3 py-1 rounded-xl border border-emerald-900">
                  Başa Baş Noktası: {detectedBreakEvenMonth > 0 ? `${detectedBreakEvenMonth}. Ay` : 'Yıl Sonunda Amorti'}
                </span>
              </div>

              <div className="pt-6 pb-2 bg-slate-950/60 rounded-2xl border border-slate-800 p-4">
                <div className="relative h-64 flex items-end gap-2 border-b border-slate-800 pb-2">
                  <div className="w-full flex items-end justify-between gap-2 h-full px-2">
                    {breakEvenMonthsData.map((item) => {
                      const maxScale = Math.max(activeOptionBudget * 1.5, breakEvenMonthsData[11].cumSavings) || 100000;
                      const savingsHeight = (item.cumSavings / maxScale) * 100;
                      const isBreakEven = item.month === detectedBreakEvenMonth;

                      return (
                        <div key={item.month} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                          <div 
                            className={`w-full max-w-[36px] rounded-t transition-all duration-300 relative ${
                              isBreakEven 
                                ? 'bg-amber-500 ring-2 ring-amber-400' 
                                : item.netFlow >= 0 
                                ? 'bg-emerald-500' 
                                : 'bg-red-500/70'
                            }`}
                            style={{ height: `${Math.max(6, savingsHeight)}%` }}
                          >
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none font-bold border border-slate-700">
                              {item.month}.Ay: {currencySymbol}{item.cumSavings.toLocaleString('tr-TR')}
                            </div>
                          </div>
                          <span className={`text-[10px] font-mono mt-2 font-bold ${isBreakEven ? 'text-amber-400 font-black' : 'text-slate-400'}`}>
                            {item.month}.Ay
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Proposal Options Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Option 1 */}
              <div className={`p-5 rounded-2xl border transition-all ${selectedOption === 1 ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/50' : 'bg-slate-900/60 border-slate-800'}`}>
                <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">OPSİYON 01</span>
                <h5 className="font-bold text-sm text-slate-100 mt-1">Standart Gelişim Programı</h5>
                <p className="text-xs text-slate-400 mt-2 font-medium">48 Adam-gün / yıl | Temel Yalın &amp; 5S</p>
                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Tahmini Kazanç:</span>
                  <strong className="text-emerald-400 font-bold">{currencySymbol}{Math.round(totalLossAvg * 0.18 * (successRatePct / 100)).toLocaleString('tr-TR')}</strong>
                </div>
              </div>

              {/* Option 2 */}
              <div className={`p-5 rounded-2xl border transition-all ${selectedOption === 2 ? 'bg-slate-900 border-red-500 ring-2 ring-red-500/50' : 'bg-slate-900/60 border-slate-800'}`}>
                <span className="text-[9px] font-mono font-bold text-red-400 block uppercase">OPSİYON 02 — ÖNERİLEN</span>
                <h5 className="font-bold text-sm text-slate-100 mt-1">Hızlandırılmış Program</h5>
                <p className="text-xs text-slate-400 mt-2 font-medium">104 Adam-gün / yıl | SMED &amp; VSM Akış</p>
                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Tahmini Kazanç:</span>
                  <strong className="text-emerald-400 font-bold">{currencySymbol}{Math.round(totalLossAvg * 0.42 * (successRatePct / 100)).toLocaleString('tr-TR')}</strong>
                </div>
              </div>

              {/* Option 3 */}
              <div className={`p-5 rounded-2xl border transition-all ${selectedOption === 3 ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/50' : 'bg-slate-900/60 border-slate-800'}`}>
                <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">OPSİYON 03</span>
                <h5 className="font-bold text-sm text-slate-100 mt-1">Dönüşüm Liderliği</h5>
                <p className="text-xs text-slate-400 mt-2 font-medium">156 Adam-gün / yıl | TPM &amp; Kültür</p>
                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Tahmini Kazanç:</span>
                  <strong className="text-emerald-400 font-bold">{currencySymbol}{Math.round(totalLossAvg * 0.68 * (successRatePct / 100)).toLocaleString('tr-TR')}</strong>
                </div>
              </div>

              {/* Option 4 */}
              <div className="p-5 rounded-2xl border bg-slate-900/60 border-slate-800">
                <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">OPSİYON 04</span>
                <h5 className="font-bold text-sm text-slate-100 mt-1">Operasyonel Mükemmellik</h5>
                <p className="text-xs text-slate-400 mt-2 font-medium">208 Adam-gün / yıl | Uçtan Uca WCM</p>
                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Tahmini Kazanç:</span>
                  <strong className="text-emerald-400 font-bold">{currencySymbol}{Math.round(totalLossAvg * 0.82 * (successRatePct / 100)).toLocaleString('tr-TR')}</strong>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setIsExecutivePitchOpen(false)}
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-8 py-3 rounded-xl cursor-pointer shadow-lg hover:scale-105 transition-all"
              >
                SUNUMU TAMAMLA &amp; DETAYLARA DÖN
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
