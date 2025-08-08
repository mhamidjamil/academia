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
import { classes, exams as mockExams, students, subjects, grades as mockGrades } from '@/lib/mock-data';
import type { Exam, Grade, SchoolClass } from '@/lib/types';
import { format } from 'date-fns';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const GradeEntryDialog = ({ exam }: { exam: Exam }) => {
  const studentsInClass = students.filter(s => s.classId === exam.classId);
  const [grades, setGrades] = useState<Partial<Grade>[]>(mockGrades.filter(g => g.examId === exam.id));
  const { toast } = useToast();

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

  const handleSaveGrades = () => {
    // Here you would typically save the grades to your backend.
    console.log("Saving grades:", grades);
    toast({
        title: "Grades Saved",
        description: "The grades have been successfully saved.",
    });
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
        <Button onClick={handleSaveGrades}>Save Grades</Button>
      </DialogFooter>
    </DialogContent>
  );
};

const ExamDialog = ({ exam, classes, onSave, onClose }: { exam?: Exam; classes: SchoolClass[]; onSave: (exam: Exam) => void; onClose: () => void; }) => {
    const [name, setName] = useState(exam?.name || '');
    const [date, setDate] = useState(exam ? format(exam.date, 'yyyy-MM-dd') : '');
    const [classId, setClassId] = useState(exam?.classId || '');

    const handleSubmit = () => {
        if (!name || !date || !classId) return; // Add validation feedback
        const newExam: Exam = {
            id: exam?.id || `exam-${Date.now()}`,
            name,
            date: new Date(date),
            classId,
        };
        onSave(newExam);
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{exam ? 'Edit' : 'Create'} Exam</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">Date</Label>
                    <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="class" className="text-right">Class</Label>
                    <Select value={classId} onValueChange={setClassId}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                        <SelectContent>
                            {classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogFooter>
        </DialogContent>
    );
};


export default function ExamsPage() {
  const [allExams, setAllExams] = useState<Exam[]>(mockExams);
  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | undefined>(undefined);
  const { toast } = useToast();

  const handleSaveExam = (exam: Exam) => {
    const isEditing = allExams.some(e => e.id === exam.id);
    if (isEditing) {
      setAllExams(allExams.map(e => e.id === exam.id ? exam : e));
      toast({ title: "Exam Updated", description: `${exam.name} has been updated.` });
    } else {
      setAllExams([...allExams, exam]);
      toast({ title: "Exam Created", description: `${exam.name} has been created.` });
    }
    closeExamDialog();
  };

  const handleDeleteExam = (examId: string) => {
    setAllExams(allExams.filter(e => e.id !== examId));
    toast({ title: "Exam Deleted", variant: 'destructive' });
  };

  const openExamDialog = (exam?: Exam) => {
    setEditingExam(exam);
    setIsExamDialogOpen(true);
  };

  const closeExamDialog = () => {
    setIsExamDialogOpen(false);
    setEditingExam(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Exam Management</h1>
          <p className="text-muted-foreground">Create exams and manage student grades.</p>
        </div>
        <Button onClick={() => openExamDialog()}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Exam
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exam Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allExams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell className="font-medium">{exam.name}</TableCell>
                <TableCell>{classes.find(c => c.id === exam.classId)?.name}</TableCell>
                <TableCell>{format(exam.date, 'MMMM d, yyyy')}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DialogTrigger asChild>
                           <DropdownMenuItem>Enter Grades</DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuItem onClick={() => openExamDialog(exam)}>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteExam(exam.id)} className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <GradeEntryDialog exam={exam} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      <Dialog open={isExamDialogOpen} onOpenChange={setIsExamDialogOpen}>
        <ExamDialog exam={editingExam} classes={classes} onSave={handleSaveExam} onClose={closeExamDialog} />
      </Dialog>
    </div>
  );
}
