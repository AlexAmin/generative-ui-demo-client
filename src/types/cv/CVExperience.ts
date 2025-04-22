export interface CVExperience {
    items: ExperienceBase[];
}

interface ExperienceBase {
    startDate: string | null;
    endDate: string | null;
    role: string | null;
    seniority: string | null;
    company: string | null;
    city: string | null;
    country: string | null;
    responsibilities: string | null;
}



