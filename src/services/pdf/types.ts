import { Company, Assessment, OperationData, Observation, SavingResult } from '../../db';

export interface ReportData {
  company: Company;
  assessment: Assessment;
  operation: OperationData;
  observations: Observation[];
  savings: SavingResult[];
  aiAnalysis: {
    generalEvaluation: string;
    criticalRisks: string[];
    opportunities: string[];
    quickWins: string[];
    mediumTermProjects: string[];
    longTermProjects: string[];
    rawMarkdown?: string;
  };
  validationErrors: string[];
}
