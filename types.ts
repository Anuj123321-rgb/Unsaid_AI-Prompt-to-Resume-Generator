export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
}

export interface Education {
  degree: string;
  school: string;
  graduationYear: string;
  cgpa: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export interface Project {
  name: string;
  techStack: string[];
  description: string[];
}

export interface Achievement {
  description: string;
}

export interface ResumeData {
  contactInfo: ContactInfo;
  professionalSummary: string;
  education: Education[];
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  achievements: Achievement[];
  atsKeywords: string[];
}

export interface AnalysisResultData {
  suggestedKeywords: string[];
  missingKeywords: string[];
  feedback: string;
}
