export interface Counselor {
  name: string;
  gender: 'male' | 'female';
  center: string;
  region: string;
  email: string;
  call: string;
  profileImage: string;
  specialties: string[];
  career: Array<{ label: string; date: string }>;
  education: Array<{ label: string; date: string }>;
  certificate: Array<{ label: string; date: string }>;
  settings: CounselorSettings;
}

// counselor.settings
export interface DaySchedule {
  active: boolean;
  start: string;
  end: string;
}

export interface CounselorSettings { 
  matchingEnabled: boolean;
  notificationsEnabled: boolean;
  availableHours: {
    월: DaySchedule;
    화: DaySchedule;
    수: DaySchedule;
    목: DaySchedule;
    금: DaySchedule;
    토: DaySchedule;
    일: DaySchedule;
  };
}
