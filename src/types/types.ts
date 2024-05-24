export type Education = {
  name: string;
  semesters: Semester[];
}

export type Semester = {
  name: string;
  modules: Module[];
}

export type Module = {
  name: string;
  grades: Grade[];
}

export type Grade = {
  name: string;
  grade: number;
  weight: number;
}