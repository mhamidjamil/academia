import type { User, Student, SchoolClass, Subject, Exam, Grade, Notice, UserRole } from './types';

export const users: User[] = [
  { id: 'user-1', name: 'Admin User', email: 'admin@academia.edu', role: 'Admin', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'user-2', name: 'Teacher Thompson', email: 'teacher.t@academia.edu', role: 'Teacher', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'user-3', name: 'Student Sam', email: 'student.s@academia.edu', role: 'Student', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'user-4', name: 'Parent Pat', email: 'parent.p@academia.edu', role: 'Parent', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'user-5', name: 'Librarian Larry', email: 'librarian.l@academia.edu', role: 'Librarian', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'user-6', name: 'Accountant Ann', email: 'accountant.a@academia.edu', role: 'Accountant', avatarUrl: 'https://placehold.co/100x100' },
];

export const subjects: Subject[] = [
  { id: 'sub-1', name: 'Mathematics' },
  { id: 'sub-2', name: 'Science' },
  { id: 'sub-3', name: 'History' },
  { id: 'sub-4', name: 'English' },
  { id: 'sub-5', name: 'Physical Education' },
];

export const classes: SchoolClass[] = [
  { 
    id: 'class-1', 
    name: 'Grade 10', 
    teacherId: 'user-2',
    sections: [
      { id: 'sec-1a', name: 'A'},
      { id: 'sec-1b', name: 'B'},
    ]
  },
  { 
    id: 'class-2', 
    name: 'Grade 11',
    sections: [
      { id: 'sec-2a', name: 'A'},
      { id: 'sec-2b', name: 'B'},
    ]
  },
  { 
    id: 'class-3', 
    name: 'Grade 12',
    sections: [
      { id: 'sec-3a', name: 'A'},
    ]
  },
];

export const students: Student[] = [
  { id: 'stu-1', name: 'Alice Johnson', studentId: 'S001', classId: 'class-1', sectionId: 'sec-1a', avatarUrl: 'https://placehold.co/100x100', parentId: 'user-4' },
  { id: 'stu-2', name: 'Bob Williams', studentId: 'S002', classId: 'class-1', sectionId: 'sec-1a', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'stu-3', name: 'Charlie Brown', studentId: 'S003', classId: 'class-1', sectionId: 'sec-1b', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'stu-4', name: 'Diana Miller', studentId: 'S004', classId: 'class-2', sectionId: 'sec-2a', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'stu-5', name: 'Ethan Davis', studentId: 'S005', classId: 'class-2', sectionId: 'sec-2b', avatarUrl: 'https://placehold.co/100x100' },
  { id: 'stu-6', name: 'Fiona Wilson', studentId: 'S006', classId: 'class-3', sectionId: 'sec-3a', avatarUrl: 'https://placehold.co/100x100' },
];

export const exams: Exam[] = [
  { id: 'exam-1', name: 'Mid-Term Exams', classId: 'class-1', date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15) },
  { id: 'exam-2', name: 'Final Exams', classId: 'class-1', date: new Date(new Date().getFullYear(), new Date().getMonth() + 3, 20) },
  { id: 'exam-3', name: 'Unit Test 1', classId: 'class-2', date: new Date(new Date().getFullYear(), new Date().getMonth(), 25) },
];

export const grades: Grade[] = [
  // Grades for Alice (stu-1) in Mid-Terms (exam-1)
  { studentId: 'stu-1', examId: 'exam-1', subjectId: 'sub-1', marks: 85 },
  { studentId: 'stu-1', examId: 'exam-1', subjectId: 'sub-2', marks: 92 },
  { studentId: 'stu-1', examId: 'exam-1', subjectId: 'sub-3', marks: 78 },
  { studentId: 'stu-1', examId: 'exam-1', subjectId: 'sub-4', marks: 88 },
  // Grades for Bob (stu-2) in Mid-Terms (exam-1)
  { studentId: 'stu-2', examId: 'exam-1', subjectId: 'sub-1', marks: 76 },
  { studentId: 'stu-2', examId: 'exam-1', subjectId: 'sub-2', marks: 81 },
  { studentId: 'stu-2', examId: 'exam-1', subjectId: 'sub-3', marks: 65 },
  { studentId: 'stu-2', examId: 'exam-1', subjectId: 'sub-4', marks: 79 },
  // Grades for Charlie (stu-3) in Mid-Terms (exam-1)
  { studentId: 'stu-3', examId: 'exam-1', subjectId: 'sub-1', marks: 95 },
  { studentId: 'stu-3', examId: 'exam-1', subjectId: 'sub-2', marks: 90 },
  { studentId: 'stu-3', examId: 'exam-1', subjectId: 'sub-3', marks: 85 },
  { studentId: 'stu-3', examId: 'exam-1', subjectId: 'sub-4', marks: 92 },
];

export const notices: Notice[] = [
  { id: 'notice-1', title: 'Parent-Teacher Meeting', content: 'The quarterly parent-teacher meeting will be held next Saturday.', date: new Date(new Date().setDate(new Date().getDate() + 10)), author: 'Admin User' },
  { id: 'notice-2', title: 'Science Fair Announcement', content: 'Annual science fair submissions are open. Please register by the end of this month.', date: new Date(new Date().setDate(new Date().getDate() + 2)), author: 'Admin User' },
  { id: 'notice-3', title: 'School Holiday', content: 'The school will be closed on Monday for a public holiday.', date: new Date(new Date().setDate(new Date().getDate() - 5)), author: 'Admin User' },
];

export const ROLES: UserRole[] = ['Admin', 'Teacher', 'Student', 'Parent', 'Librarian', 'Accountant'];
