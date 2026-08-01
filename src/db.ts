// Gemba Assessment Platform Relational Local Database
// Implements a normalized relational structure linked by CompanyID (Foreign Key)

export interface Company {
  companyId: string; // UUID
  companyName: string;
  sector: string;
  location: string;
  consultant: string;
  visitDate: string;
  status: 'Draft' | 'Active' | 'Completed' | 'Archived';
  createdDate: string;
  updatedDate: string;
}

export interface Assessment {
  assessmentId: string;
  companyId: string;
  overallScore: number;
  potentialSaving: number;
  investmentNeed: number;
  paybackPeriod: number;
  notes: string;
  createdDate: string;
}

export interface OperationData {
  companyId: string;
  // Field values
  setupMachineCount: string;
  annualVolume: string;
  productionUnit: string;
  turnoverLira: string;
  plannedEfficiency: string;
  actualEfficiency: string;
  copqRate: string;
  scrapRate: string;
  reworkRate: string;
  overtimeRate: string;
  leadTime: string;
  oee: string;
  coveredArea: string;
  operatorsCount: string;
  setupFrequency: string;
  setupDuration: string;
  affectedOpsSetup: string;
  grossLaborCost: string;

  // Wizard state
  wizardGrossSalary: string;
  wizardSgkRate: number;
  wizardYemek: string;
  wizardServis: string;
  wizardSeveranceRate: number;
  wizardLeaveRate: number;
  wizardSideBenefits: string;

  // Cost proportions
  costPropMaterial: string;
  costPropLabor: string;
  costPropEnergy: string;
  costPropMaintenance: string;
  costPropOverhead: string;
  costPropProfit: string;

  // Additional company metadata
  urunGrubu?: string;
  calisanSayisi?: string;
  vardiya?: string;
  gorusulen?: string;
  talepEdilenHizmet?: string;

  // Scores Record
  scores: Record<number, number>;
  // Chat messages
  chatMessages: { role: 'user' | 'assistant'; content: string }[];
}

export interface Observation {
  observationId: string;
  companyId: string;
  category: string;
  finding: string;
  improvement: string;
  photo?: string;
  priority: string; // 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik'
  impact: string; // 'Düşük' | 'Orta' | 'Yüksek'
  createdDate: string;
}

export interface SavingResult {
  savingId: string;
  companyId: string;
  savingType: string;
  currentCost: number;
  futureCost: number;
  annualSaving: number;
  roi: number;
  payback: number;
  co2Reduction: number;
  createdDate: string;
}

// UUID Helper
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Memory-backed fallback for sandboxed environments (like sandboxed iframes) where localStorage is blocked
let memoryStorage: Record<string, string> = {};

// Helper to safely check if localStorage is available and functional
const isLocalStorageAvailable = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

const hasLocalStorage = isLocalStorageAvailable();

export const safeStorage = {
  getItem(key: string): string | null {
    if (hasLocalStorage) {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {
        return memoryStorage[key] || null;
      }
    }
    return memoryStorage[key] || null;
  },
  setItem(key: string, value: string): void {
    if (hasLocalStorage) {
      try {
        window.localStorage.setItem(key, value);
        return;
      } catch (e) {}
    }
    memoryStorage[key] = value;
  },
  removeItem(key: string): void {
    if (hasLocalStorage) {
      try {
        window.localStorage.removeItem(key);
        return;
      } catch (e) {}
    }
    delete memoryStorage[key];
  },
  clear(): void {
    if (hasLocalStorage) {
      try {
        window.localStorage.clear();
        return;
      } catch (e) {}
    }
    memoryStorage = {};
  }
};

const localStorage = safeStorage;

const KEYS = {
  COMPANIES: 'gp_tbl_companies',
  ASSESSMENTS: 'gp_tbl_assessments',
  OPERATIONS: 'gp_tbl_operations',
  OBSERVATIONS: 'gp_tbl_observations',
  SAVINGS: 'gp_tbl_savings',
};

// Seed initial data if database is empty
export function seedInitialDatabase() {
  const companies = localStorage.getItem(KEYS.COMPANIES);
  if (!companies || JSON.parse(companies).length === 0) {
    const demoCompanyId = 'demo-company-id-1234';
    const visitDate = new Date().toISOString().split('T')[0];
    const now = new Date().toISOString();

    const demoCompany: Company = {
      companyId: demoCompanyId,
      companyName: 'Örnek Plastik ve Ambalaj A.Ş.',
      sector: 'Plastik Enjeksiyon',
      location: 'Kocaeli OSB',
      consultant: 'Ahmet Yılmaz',
      visitDate: visitDate,
      status: 'Active',
      createdDate: now,
      updatedDate: now,
    };

    const demoAssessment: Assessment = {
      assessmentId: generateUUID(),
      companyId: demoCompanyId,
      overallScore: 42,
      potentialSaving: 15000000,
      investmentNeed: 1200000,
      paybackPeriod: 3,
      notes: 'Plastik enjeksiyon üretiminde OEE arttırma ve SMED çalışması öncelikli geliştirme alanıdır.',
      createdDate: now,
    };

    const defaultScores: Record<number, number> = {};
    for (let i = 1; i <= 17; i++) {
      defaultScores[i] = i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : i % 2 === 0 ? 1 : 0;
    }

    const demoOperation: OperationData = {
      companyId: demoCompanyId,
      setupMachineCount: '5',
      annualVolume: '500.000',
      productionUnit: 'Adet',
      turnoverLira: '150.000.000',
      plannedEfficiency: '85',
      actualEfficiency: '62',
      copqRate: '4.5',
      scrapRate: '1.8',
      reworkRate: '2.7',
      overtimeRate: '8.5',
      leadTime: '12',
      oee: '58',
      coveredArea: '4.500',
      operatorsCount: '120',
      setupFrequency: '5',
      setupDuration: '45',
      affectedOpsSetup: '3',
      grossLaborCost: '48.000',
      wizardGrossSalary: '30.000',
      wizardSgkRate: 17.5,
      wizardYemek: '4.500',
      wizardServis: '3.500',
      wizardSeveranceRate: 8.33,
      wizardLeaveRate: 5.0,
      wizardSideBenefits: '2.000',
      costPropMaterial: '50',
      costPropLabor: '20',
      costPropEnergy: '10',
      costPropMaintenance: '10',
      costPropOverhead: '10',
      costPropProfit: '10',
      scores: defaultScores,
      chatMessages: [
        {
          role: 'assistant',
          content: 'Merhaba! Ben Gemba Digital Yapay Zeka Baş Danışmanınızım. Sorularınızı bekliyorum!'
        }
      ],
    };

    const demoObservations: Observation[] = [
      {
        observationId: generateUUID(),
        companyId: demoCompanyId,
        category: 'SMED / Kalıp Kurulumu',
        finding: 'Model değişimlerinde kalıpların ön ısıtma yapılmadan makineye takıldığı ve bu yüzden ilk 5 baskının hurdaya çıktığı gözlemlendi.',
        improvement: 'Dış kurulum mantığıyla kalıpların ön ısıtma istasyonunda ısıtılması ve hızlı bağlantı elemanlarının (q-clamps) entegrasyonu.',
        priority: 'Yüksek',
        impact: 'Yüksek',
        createdDate: now,
      },
      {
        observationId: generateUUID(),
        companyId: demoCompanyId,
        category: '5S ve Görsel Yönetim',
        finding: 'Kalıp değişim el aletlerinin yerinde olmadığı, operatörlerin anahtar ararken zaman kaybettiği tespit edildi.',
        improvement: 'Gölge pano uygulaması ve el aletlerinin model değişim arabasına standart yerleşimi.',
        priority: 'Orta',
        impact: 'Orta',
        createdDate: now,
      }
    ];

    const demoSavings: SavingResult[] = [
      {
        savingId: generateUUID(),
        companyId: demoCompanyId,
        savingType: 'Downtime Setup Geri Kazanımı',
        currentCost: 1500000,
        futureCost: 750000,
        annualSaving: 750000,
        roi: 6.5,
        payback: 2,
        co2Reduction: 12,
        createdDate: now,
      }
    ];

    localStorage.setItem(KEYS.COMPANIES, JSON.stringify([demoCompany]));
    localStorage.setItem(KEYS.ASSESSMENTS, JSON.stringify([demoAssessment]));
    localStorage.setItem(KEYS.OPERATIONS, JSON.stringify([demoOperation]));
    localStorage.setItem(KEYS.OBSERVATIONS, JSON.stringify(demoObservations));
    localStorage.setItem(KEYS.SAVINGS, JSON.stringify(demoSavings));
  }
}

// Database Operations
export const GembaDB = {
  // Get all companies
  getCompanies(includeArchived: boolean = false): Company[] {
    seedInitialDatabase();
    try {
      const data = localStorage.getItem(KEYS.COMPANIES);
      if (!data) return [];
      const list: Company[] = JSON.parse(data);
      if (!includeArchived) {
        return list.filter(c => c.status !== 'Archived');
      }
      return list;
    } catch (e) {
      console.error('Error reading companies', e);
      return [];
    }
  },

  // Save/Update a company record only
  saveCompanyRecord(company: Company): void {
    try {
      const companies = this.getCompanies(true);
      const idx = companies.findIndex(c => c.companyId === company.companyId);
      if (idx > -1) {
        companies[idx] = { ...company, updatedDate: new Date().toISOString() };
      } else {
        companies.push(company);
      }
      localStorage.setItem(KEYS.COMPANIES, JSON.stringify(companies));
    } catch (e) {
      console.error('Error saving company', e);
    }
  },

  // Get single company full payload
  getCompanyDetails(companyId: string): {
    company: Company;
    assessment: Assessment | null;
    operation: OperationData | null;
    observations: Observation[];
    savings: SavingResult[];
  } | null {
    try {
      const companies = this.getCompanies(true);
      const company = companies.find(c => c.companyId === companyId);
      if (!company) return null;

      const assessments: Assessment[] = JSON.parse(localStorage.getItem(KEYS.ASSESSMENTS) || '[]');
      const operations: OperationData[] = JSON.parse(localStorage.getItem(KEYS.OPERATIONS) || '[]');
      const observations: Observation[] = JSON.parse(localStorage.getItem(KEYS.OBSERVATIONS) || '[]');
      const savings: SavingResult[] = JSON.parse(localStorage.getItem(KEYS.SAVINGS) || '[]');

      const assessment = assessments.find(a => a.companyId === companyId) || null;
      const operation = operations.find(o => o.companyId === companyId) || null;
      const compObservations = observations.filter(o => o.companyId === companyId);
      const compSavings = savings.filter(s => s.companyId === companyId);

      return {
        company,
        assessment,
        operation,
        observations: compObservations,
        savings: compSavings
      };
    } catch (e) {
      console.error('Error loading company details', e);
      return null;
    }
  },

  // Create new blank company
  createCompany(companyName: string, sector: string = 'Genel İmalat', location: string = '', consultant: string = ''): Company {
    const companyId = generateUUID();
    const now = new Date().toISOString();
    const visitDate = now.split('T')[0];

    const newCompany: Company = {
      companyId,
      companyName: companyName || 'Yeni Saha Çalışması',
      sector: sector || 'Genel İmalat',
      location: location || '',
      consultant: consultant || 'Saha Danışmanı',
      visitDate: visitDate,
      status: 'Active',
      createdDate: now,
      updatedDate: now,
    };

    const newAssessment: Assessment = {
      assessmentId: generateUUID(),
      companyId,
      overallScore: 0,
      potentialSaving: 0,
      investmentNeed: 0,
      paybackPeriod: 0,
      notes: '',
      createdDate: now,
    };

    const defaultScores: Record<number, number> = {};
    for (let i = 1; i <= 17; i++) {
      defaultScores[i] = 0;
    }

    const newOperation: OperationData = {
      companyId,
      setupMachineCount: '5',
      annualVolume: '500.000',
      productionUnit: 'Adet',
      turnoverLira: '150.000.000',
      plannedEfficiency: '85',
      actualEfficiency: '62',
      copqRate: '4.5',
      scrapRate: '1.8',
      reworkRate: '2.7',
      overtimeRate: '8.5',
      leadTime: '12',
      oee: '58',
      coveredArea: '4.500',
      operatorsCount: '120',
      setupFrequency: '5',
      setupDuration: '45',
      affectedOpsSetup: '3',
      grossLaborCost: '48.000',
      wizardGrossSalary: '30.000',
      wizardSgkRate: 17.5,
      wizardYemek: '4.500',
      wizardServis: '3.500',
      wizardSeveranceRate: 8.33,
      wizardLeaveRate: 5.0,
      wizardSideBenefits: '2.000',
      costPropMaterial: '50',
      costPropLabor: '20',
      costPropEnergy: '10',
      costPropMaintenance: '10',
      costPropOverhead: '10',
      costPropProfit: '10',
      urunGrubu: sector || 'Genel İmalat',
      calisanSayisi: '150',
      vardiya: '3 Vardiya (24 Saat)',
      gorusulen: '',
      talepEdilenHizmet: 'Yalın Dönüşüm Proje Danışmanlığı',
      scores: defaultScores,
      chatMessages: [
        {
          role: 'assistant',
          content: 'Merhaba! Ben Gemba Digital Yapay Zeka Baş Danışmanınızım. Sorularınızı bekliyorum!'
        }
      ],
    };

    // Save
    this.saveCompanyRecord(newCompany);

    const assessments: Assessment[] = JSON.parse(localStorage.getItem(KEYS.ASSESSMENTS) || '[]');
    assessments.push(newAssessment);
    localStorage.setItem(KEYS.ASSESSMENTS, JSON.stringify(assessments));

    const operations: OperationData[] = JSON.parse(localStorage.getItem(KEYS.OPERATIONS) || '[]');
    operations.push(newOperation);
    localStorage.setItem(KEYS.OPERATIONS, JSON.stringify(operations));

    return newCompany;
  },

  // Save full state of loaded company
  saveFullState(
    companyId: string,
    companyFields: Partial<Company>,
    operationFields: Partial<OperationData>,
    assessmentFields: Partial<Assessment>
  ) {
    try {
      const now = new Date().toISOString();

      // 1. Company
      const companies = this.getCompanies(true);
      const cIdx = companies.findIndex(c => c.companyId === companyId);
      if (cIdx > -1) {
        companies[cIdx] = {
          ...companies[cIdx],
          ...companyFields,
          updatedDate: now
        };
        localStorage.setItem(KEYS.COMPANIES, JSON.stringify(companies));
      }

      // 2. OperationData
      const operations: OperationData[] = JSON.parse(localStorage.getItem(KEYS.OPERATIONS) || '[]');
      const oIdx = operations.findIndex(o => o.companyId === companyId);
      const updatedOp: OperationData = {
        companyId,
        setupMachineCount: operationFields.setupMachineCount ?? '5',
        annualVolume: operationFields.annualVolume ?? '500.000',
        productionUnit: operationFields.productionUnit ?? 'Adet',
        turnoverLira: operationFields.turnoverLira ?? '150.000.000',
        plannedEfficiency: operationFields.plannedEfficiency ?? '85',
        actualEfficiency: operationFields.actualEfficiency ?? '62',
        copqRate: operationFields.copqRate ?? '4.5',
        scrapRate: operationFields.scrapRate ?? '1.8',
        reworkRate: operationFields.reworkRate ?? '2.7',
        overtimeRate: operationFields.overtimeRate ?? '8.5',
        leadTime: operationFields.leadTime ?? '12',
        oee: operationFields.oee ?? '58',
        coveredArea: operationFields.coveredArea ?? '4.500',
        operatorsCount: operationFields.operatorsCount ?? '120',
        setupFrequency: operationFields.setupFrequency ?? '5',
        setupDuration: operationFields.setupDuration ?? '45',
        affectedOpsSetup: operationFields.affectedOpsSetup ?? '3',
        grossLaborCost: operationFields.grossLaborCost ?? '48.000',
        wizardGrossSalary: operationFields.wizardGrossSalary ?? '30.000',
        wizardSgkRate: operationFields.wizardSgkRate ?? 17.5,
        wizardYemek: operationFields.wizardYemek ?? '4.500',
        wizardServis: operationFields.wizardServis ?? '3.500',
        wizardSeveranceRate: operationFields.wizardSeveranceRate ?? 8.33,
        wizardLeaveRate: operationFields.wizardLeaveRate ?? 5.0,
        wizardSideBenefits: operationFields.wizardSideBenefits ?? '2.000',
        costPropMaterial: operationFields.costPropMaterial ?? '50',
        costPropLabor: operationFields.costPropLabor ?? '20',
        costPropEnergy: operationFields.costPropEnergy ?? '10',
        costPropMaintenance: operationFields.costPropMaintenance ?? '10',
        costPropOverhead: operationFields.costPropOverhead ?? '10',
        costPropProfit: operationFields.costPropProfit ?? '10',
        urunGrubu: operationFields.urunGrubu ?? (oIdx > -1 ? operations[oIdx].urunGrubu : ''),
        calisanSayisi: operationFields.calisanSayisi ?? (oIdx > -1 ? operations[oIdx].calisanSayisi : ''),
        vardiya: operationFields.vardiya ?? (oIdx > -1 ? operations[oIdx].vardiya : ''),
        gorusulen: operationFields.gorusulen ?? (oIdx > -1 ? operations[oIdx].gorusulen : ''),
        talepEdilenHizmet: operationFields.talepEdilenHizmet ?? (oIdx > -1 ? operations[oIdx].talepEdilenHizmet : 'Yalın Dönüşüm Proje Danışmanlığı'),
        scores: operationFields.scores ?? (oIdx > -1 ? operations[oIdx].scores : {}),
        chatMessages: operationFields.chatMessages ?? (oIdx > -1 ? operations[oIdx].chatMessages : [])
      };

      if (oIdx > -1) {
        operations[oIdx] = updatedOp;
      } else {
        operations.push(updatedOp);
      }
      localStorage.setItem(KEYS.OPERATIONS, JSON.stringify(operations));

      // 3. Assessment
      const assessments: Assessment[] = JSON.parse(localStorage.getItem(KEYS.ASSESSMENTS) || '[]');
      const aIdx = assessments.findIndex(a => a.companyId === companyId);
      const updatedAs: Assessment = {
        assessmentId: aIdx > -1 ? assessments[aIdx].assessmentId : generateUUID(),
        companyId,
        overallScore: assessmentFields.overallScore ?? 0,
        potentialSaving: assessmentFields.potentialSaving ?? 0,
        investmentNeed: assessmentFields.investmentNeed ?? 0,
        paybackPeriod: assessmentFields.paybackPeriod ?? 0,
        notes: assessmentFields.notes ?? '',
        createdDate: aIdx > -1 ? assessments[aIdx].createdDate : now
      };

      if (aIdx > -1) {
        assessments[aIdx] = updatedAs;
      } else {
        assessments.push(updatedAs);
      }
      localStorage.setItem(KEYS.ASSESSMENTS, JSON.stringify(assessments));

    } catch (e) {
      console.error('Error saving full state', e);
    }
  },

  // Archive a company
  archiveCompany(companyId: string): void {
    const companies = this.getCompanies(true);
    const idx = companies.findIndex(c => c.companyId === companyId);
    if (idx > -1) {
      companies[idx].status = 'Archived';
      companies[idx].updatedDate = new Date().toISOString();
      localStorage.setItem(KEYS.COMPANIES, JSON.stringify(companies));
    }
  },

  // Restore archived company
  restoreCompany(companyId: string): void {
    const companies = this.getCompanies(true);
    const idx = companies.findIndex(c => c.companyId === companyId);
    if (idx > -1) {
      companies[idx].status = 'Active';
      companies[idx].updatedDate = new Date().toISOString();
      localStorage.setItem(KEYS.COMPANIES, JSON.stringify(companies));
    }
  },

  // Copy company as new
  copyCompanyAsNew(sourceCompanyId: string, newCompanyName?: string): Company | null {
    try {
      const sourceData = this.getCompanyDetails(sourceCompanyId);
      if (!sourceData) return null;

      const newId = generateUUID();
      const now = new Date().toISOString();
      const visitDate = now.split('T')[0];

      // 1. Copy Company
      const newCompany: Company = {
        ...sourceData.company,
        companyId: newId,
        companyName: newCompanyName || `${sourceData.company.companyName} (Kopya)`,
        status: 'Draft',
        visitDate: visitDate,
        createdDate: now,
        updatedDate: now,
      };

      // 2. Copy Assessment
      const newAssessment: Assessment = sourceData.assessment ? {
        ...sourceData.assessment,
        assessmentId: generateUUID(),
        companyId: newId,
        createdDate: now,
      } : {
        assessmentId: generateUUID(),
        companyId: newId,
        overallScore: 0,
        potentialSaving: 0,
        investmentNeed: 0,
        paybackPeriod: 0,
        notes: '',
        createdDate: now,
      };

      // 3. Copy OperationData
      const newOperation: OperationData = sourceData.operation ? {
        ...sourceData.operation,
        companyId: newId,
      } : {
        companyId: newId,
        setupMachineCount: '5',
        annualVolume: '500.000',
        productionUnit: 'Adet',
        turnoverLira: '150.000.000',
        plannedEfficiency: '85',
        actualEfficiency: '62',
        copqRate: '4.5',
        scrapRate: '1.8',
        reworkRate: '2.7',
        overtimeRate: '8.5',
        leadTime: '12',
        oee: '58',
        coveredArea: '4.500',
        operatorsCount: '120',
        setupFrequency: '5',
        setupDuration: '45',
        affectedOpsSetup: '3',
        grossLaborCost: '48.000',
        wizardGrossSalary: '30.000',
        wizardSgkRate: 17.5,
        wizardYemek: '4.500',
        wizardServis: '3.500',
        wizardSeveranceRate: 8.33,
        wizardLeaveRate: 5.0,
        wizardSideBenefits: '2.000',
        costPropMaterial: '50',
        costPropLabor: '20',
        costPropEnergy: '10',
        costPropMaintenance: '10',
        costPropOverhead: '10',
        costPropProfit: '10',
        scores: {},
        chatMessages: [],
      };

      // 4. Copy Observations
      const allObservations: Observation[] = JSON.parse(localStorage.getItem(KEYS.OBSERVATIONS) || '[]');
      const newObservations = sourceData.observations.map(obs => ({
        ...obs,
        observationId: generateUUID(),
        companyId: newId,
        createdDate: now,
      }));

      // 5. Copy Savings
      const allSavings: SavingResult[] = JSON.parse(localStorage.getItem(KEYS.SAVINGS) || '[]');
      const newSavings = sourceData.savings.map(sav => ({
        ...sav,
        savingId: generateUUID(),
        companyId: newId,
        createdDate: now,
      }));

      // Save all back to localStorage
      const companies = this.getCompanies(true);
      companies.push(newCompany);
      localStorage.setItem(KEYS.COMPANIES, JSON.stringify(companies));

      const assessments: Assessment[] = JSON.parse(localStorage.getItem(KEYS.ASSESSMENTS) || '[]');
      assessments.push(newAssessment);
      localStorage.setItem(KEYS.ASSESSMENTS, JSON.stringify(assessments));

      const operations: OperationData[] = JSON.parse(localStorage.getItem(KEYS.OPERATIONS) || '[]');
      operations.push(newOperation);
      localStorage.setItem(KEYS.OPERATIONS, JSON.stringify(operations));

      allObservations.push(...newObservations);
      localStorage.setItem(KEYS.OBSERVATIONS, JSON.stringify(allObservations));

      allSavings.push(...newSavings);
      localStorage.setItem(KEYS.SAVINGS, JSON.stringify(allSavings));

      return newCompany;
    } catch (e) {
      console.error('Error copying company', e);
      return null;
    }
  },

  // Observation CRUD operations
  getObservations(companyId: string): Observation[] {
    try {
      const observations: Observation[] = JSON.parse(localStorage.getItem(KEYS.OBSERVATIONS) || '[]');
      return observations.filter(o => o.companyId === companyId);
    } catch (e) {
      return [];
    }
  },

  addObservation(companyId: string, category: string, finding: string, improvement: string, priority: string, impact: string, photo?: string): Observation {
    const now = new Date().toISOString();
    const newObs: Observation = {
      observationId: generateUUID(),
      companyId,
      category,
      finding,
      improvement,
      priority,
      impact,
      photo,
      createdDate: now
    };

    const observations: Observation[] = JSON.parse(localStorage.getItem(KEYS.OBSERVATIONS) || '[]');
    observations.push(newObs);
    localStorage.setItem(KEYS.OBSERVATIONS, JSON.stringify(observations));
    return newObs;
  },

  updateObservation(observation: Observation): void {
    const observations: Observation[] = JSON.parse(localStorage.getItem(KEYS.OBSERVATIONS) || '[]');
    const idx = observations.findIndex(o => o.observationId === observation.observationId);
    if (idx > -1) {
      observations[idx] = observation;
      localStorage.setItem(KEYS.OBSERVATIONS, JSON.stringify(observations));
    }
  },

  deleteObservation(observationId: string): void {
    const observations: Observation[] = JSON.parse(localStorage.getItem(KEYS.OBSERVATIONS) || '[]');
    const filtered = observations.filter(o => o.observationId !== observationId);
    localStorage.setItem(KEYS.OBSERVATIONS, JSON.stringify(filtered));
  },

  // Savings CRUD operations
  getSavings(companyId: string): SavingResult[] {
    try {
      const savings: SavingResult[] = JSON.parse(localStorage.getItem(KEYS.SAVINGS) || '[]');
      return savings.filter(s => s.companyId === companyId);
    } catch (e) {
      return [];
    }
  },

  saveSavings(companyId: string, savingsList: SavingResult[]): void {
    const allSavings: SavingResult[] = JSON.parse(localStorage.getItem(KEYS.SAVINGS) || '[]');
    const filtered = allSavings.filter(s => s.companyId !== companyId);
    filtered.push(...savingsList);
    localStorage.setItem(KEYS.SAVINGS, JSON.stringify(filtered));
  },

  // Dashboard Stats Calculations
  getDashboardStats(): {
    totalCompanies: number;
    totalVisits: number;
    totalPotentialSaving: number;
    averageLeanScore: number;
    thisMonthVisits: number;
    recentCompanies: Company[];
  } {
    const companies = this.getCompanies(true);
    const assessments: Assessment[] = JSON.parse(localStorage.getItem(KEYS.ASSESSMENTS) || '[]');

    const activeCompanies = companies.filter(c => c.status !== 'Archived');
    
    // Total visits is count of active companies with non-empty visit dates
    const totalVisits = activeCompanies.filter(c => c.visitDate).length;

    // Total potential savings is sum of potentialSaving in active assessments
    let totalPotentialSaving = 0;
    let scoreSum = 0;
    let scoredCount = 0;

    activeCompanies.forEach(c => {
      const as = assessments.find(a => a.companyId === c.companyId);
      if (as) {
        totalPotentialSaving += as.potentialSaving || 0;
        if (as.overallScore > 0) {
          scoreSum += as.overallScore;
          scoredCount++;
        }
      }
    });

    const averageLeanScore = scoredCount > 0 ? Math.round(scoreSum / scoredCount) : 0;

    // This month visits
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const thisMonthStr = startOfMonth.toISOString().slice(0, 7); // YYYY-MM

    const thisMonthVisits = activeCompanies.filter(c => c.visitDate && c.visitDate.startsWith(thisMonthStr)).length;

    // Recent companies sorted by updatedDate
    const recentCompanies = [...companies]
      .sort((a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime())
      .slice(0, 5);

    return {
      totalCompanies: activeCompanies.length,
      totalVisits,
      totalPotentialSaving,
      averageLeanScore,
      thisMonthVisits,
      recentCompanies
    };
  }
};
