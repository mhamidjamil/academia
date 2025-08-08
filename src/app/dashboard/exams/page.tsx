"use client";

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { classes, exams, students, subjects, grades as mockGrades } from '@/lib/mock-data';
import type { Exam, Grade } from '@/lib/types';
import { format } from 'date-fns';
import { PlusCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const GradeEntryDialog = ({ exam }: { exam: Exam }) => {
  const studentsInClass = students.filter(s => s.classId === exam.classId);
  const [grades, setGrades] = useState<Partial<Grade>[]>(mockGrades.filter(g => g.examId === exam.id));

  const handleGradeChange = (studentId: string, subjectId: string, marks: string) => {
    const newGrades = [...grades];
    const gradeIndex = newGrades.findIndex(g => g.studentId === studentId && g.subjectId === subjectId);
    const markValue = parseInt(marks, 10);
    
    if (gradeIndex > -1) {
      newGrades[gradeIndex].marks = isNaN(markValue) ? 0 : markValue;
    } else {
      newGrades.push({ studentId, subjectId, examId: exam.id, marks: isNaN(markValue) ? 0 : markValue });
    }
    setGrades(newGrades);
  };
  
  const getGrade = (studentId: string, subjectId: string) => {
    return grades.find(g => g.studentId === studentId && g.subjectId === subjectId)?.marks || '';
  }

  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Enter Grades for {exam.name}</DialogTitle>
        <DialogDescription>
          For {classes.find(c => c.id === exam.classId)?.name}, held on {format(exam.date, 'PPP')}.
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="h-[60vh] pr-6">
        <Table>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead>Student</TableHead>
              {subjects.map(sub => (
                <TableHead key={sub.id} className="text-center">{sub.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentsInClass.map(student => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                {subjects.map(sub => (
                  <TableCell key={sub.id}>
                    <Input
                      type="number"
                      className="text-center"
                      placeholder="N/A"
                      defaultValue={getGrade(student.id, sub.id)}
                      onChange={(e) => handleGradeChange(student.id, sub.id, e.target.value)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Save Grades</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default function ExamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Exam Management</h1>
          <p className="text-muted-foreground">Create exams and manage student grades.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Exam
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Exam</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" defaultValue="Final Term" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exam Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell className="font-medium">{exam.name}</TableCell>
                <TableCell>{classes.find(c => c.id === exam.classId)?.name}</TableCell>
                <TableCell>{format(exam.date, 'MMMM d, yyyy')}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Enter Grades</Button>
                    </DialogTrigger>
                    <GradeEntryDialog exam={exam} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
