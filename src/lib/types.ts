export type UserRole = 'Admin' | 'Teacher' | 'Student' | 'Parent' | 'Librarian' | 'Accountant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
}

export interface ClassSection {
  id: string;
  name: string; // e.g., 'A', 'B'
}
export interface SchoolClass {
  id: string;
  name: string; // e.g., 'Grade 10'
  sections: ClassSection[];
  teacherId?: string;
}

export interface Student {
  id: string;
  name: string;
  studentId: string;
  classId: string;
  sectionId: string;
  avatarUrl: string;
  parentId?: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface Exam {
  id: string;
  name: string;
  classId: string;
  date: Date;
}

export interface Grade {
  studentId: string;
  examId: string;
  subjectId: string;
  marks: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: Date;
  author: string;
}
