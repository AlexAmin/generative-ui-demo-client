import type {CVPersonalInfo} from "./CVPersonalInfo.ts";
import type {CVEducation} from "./CVEducation.ts";
import type {CVExperience} from "./CVExperience.ts";

export type CV = { [key: string]: CVPersonalInfo | CVEducation | CVExperience | string}



