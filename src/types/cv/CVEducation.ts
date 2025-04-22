export interface CVEducation {
    items: EducationItem[];
}

interface EducationItem {
    startDate: string | null;
    endDate: string | null;
    degree: string | null;
    institution: string | null;
    city: string | null;
    country: string | null;
}



