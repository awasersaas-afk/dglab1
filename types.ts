
export type UserRole = 'PROJECT_MANAGER' | 'LAB_MANAGER' | 'YOUTH' | null;

export interface GPS {
  lat: number;
  lng: number;
}

// ========== Academy Types ==========
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  type: 'video' | 'article' | 'workshop';
  order: number;
  is_published: boolean;
}

export interface CourseLevel {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  lessons: Lesson[];
  status: 'locked' | 'available' | 'completed';
  category?: string;
  duration_hours?: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  is_earned: boolean;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration_weeks: number;
  courses_count: number;
  badge_id: string;
}

export interface UserProgress {
  user_id: string;
  completed_lessons: string[];
  current_level: number;
  points: number;
  earned_badges: string[];
}

// ========== Existing Types ==========
export interface CulturalAsset {
  id: string;
  category: "material" | "immaterial" | "natural" | "social";
  documentation: {
    name: string;
    localName: string;
    location: GPS;
    historicalContext: string;
    currentState: "endangered" | "preserved" | "thriving";
    images: string[];
  };
  culturalValue: {
    identitySignificance: "عالي" | "متوسط" | "منخفض";
    socialCohesion: string;
    storytellingPower: number;
  };
  valorisationPaths: {
    digital: string[];
    product: string[];
    experience: string[];
  };
}

export interface Project {
  id: string;
  labId: string;
  title: string;
  owner: string;
  category: 'فنون' | 'رقمنة' | 'اقتصاد اجتماعي' | 'بيئة';
  status: 'idea' | 'prototype' | 'launched' | 'pending' | 'approved' | 'rejected';
  submissionDate: string;
  canvas: any;
}

export interface Lab {
  id: string;
  code: string;
  name: string;
  province: string;
  gps: GPS;
  managerEmail: string;
  description: string;
  icon?: string;
  budget: {
    allocated: number;
    spent: number;
  };
}

export type MentorContext = 
  | 'general' | 'ideation' | 'canvas' | 'swot' | 'budget' | 'planning' | 'pitch' | 'validation' | 'cultural_asset' | 'education';

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface KPI {
  id: string;
  code: string;
  category: 'OG' | 'OS' | 'R1' | 'R2' | 'R3' | 'R4' | 'ESG';
  name_ar: string;
  target: number;
  unit: string;
  baseline: number;
  measurement_frequency: string;
  created_at: Date;
}

export interface KPIDashboardSummary {
  totalBeneficiaries: number;
  newBeneficiariesThisMonth: number;
  activeProjects: number;
  activitiesHeld: number;
  avgSatisfaction: number;
  kpisOnTrack: number;
  kpisAtRisk: number;
  kpisBehind: number;
}
