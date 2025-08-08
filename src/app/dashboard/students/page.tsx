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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { students as mockStudents, classes as mockClasses } from '@/lib/mock-data';
import type { Student, SchoolClass } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const StudentDialog = ({ student, classes, onSave, onClose }: { student?: Student, classes: SchoolClass[], onSave: (student: Student) => void, onClose: () => void }) => {
  const [name, setName] = useState(student?.name || '');
  const [studentId, setStudentId] = useState(student?.studentId || '');
  const [classId, setClassId] = useState(student?.classId || '');

  const handleSubmit = () => {
    const newStudent: Student = {
      id: student?.id || `stu-${Date.now()}`,
      name,
      studentId,
      classId,
      sectionId: 'sec-1a', // Default for simplicity
      avatarUrl: student?.avatarUrl || 'https://placehold.co/100x100'
    };
    onSave(newStudent);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{student ? 'Edit' : 'Add'} Student</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Name</Label>
          <Input id="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="studentId" className="text-right">Student ID</Label>
          <Input id="studentId" value={studentId} onChange={e => setStudentId(e.target.value)} className="col-span-3" />
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

const ClassDialog = ({ schoolClass, onSave, onClose }: { schoolClass?: SchoolClass, onSave: (schoolClass: SchoolClass) => void, onClose: () => void }) => {
    const [name, setName] = useState(schoolClass?.name || '');
    const [sections, setSections] = useState(schoolClass?.sections.map(s => s.name).join(', ') || '');

    const handleSubmit = () => {
        const newClass: SchoolClass = {
            id: schoolClass?.id || `class-${Date.now()}`,
            name,
            sections: sections.split(',').map((s, i) => ({ id: `sec-${Date.now()}-${i}`, name: s.trim() }))
        };
        onSave(newClass);
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{schoolClass ? 'Edit' : 'Add'} Class</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Class Name</Label>
                    <Input id="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="sections" className="text-right">Sections</Label>
                    <Input id="sections" placeholder="A, B, C" value={sections} onChange={e => setSections(e.target.value)} className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogFooter>
        </DialogContent>
    );
}

export default function StudentsPage() {
  const [allStudents, setAllStudents] = useState<Student[]>(mockStudents);
  const [allClasses, setAllClasses] = useState<SchoolClass[]>(mockClasses);
  const [activeTab, setActiveTab] = useState('students');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | undefined>(undefined);
  const [editingClass, setEditingClass] = useState<SchoolClass | undefined>(undefined);
  const { toast } = useToast();

  const handleSaveStudent = (student: Student) => {
    const isEditing = allStudents.some(s => s.id === student.id);
    if (isEditing) {
      setAllStudents(allStudents.map(s => s.id === student.id ? student : s));
      toast({ title: "Student Updated", description: `${student.name} has been updated.` });
    } else {
      setAllStudents([...allStudents, student]);
      toast({ title: "Student Added", description: `${student.name} has been added.` });
    }
    closeDialog();
  };

  const handleDeleteStudent = (studentId: string) => {
    setAllStudents(allStudents.filter(s => s.id !== studentId));
    toast({ title: "Student Deleted", variant: 'destructive' });
  };
  
  const handleSaveClass = (schoolClass: SchoolClass) => {
    const isEditing = allClasses.some(c => c.id === schoolClass.id);
    if (isEditing) {
        setAllClasses(allClasses.map(c => c.id === schoolClass.id ? schoolClass : c));
        toast({ title: "Class Updated", description: `${schoolClass.name} has been updated.` });
    } else {
        setAllClasses([...allClasses, schoolClass]);
        toast({ title: "Class Added", description: `${schoolClass.name} has been added.` });
    }
    closeDialog();
  };

  const handleDeleteClass = (classId: string) => {
      setAllClasses(allClasses.filter(c => c.id !== classId));
      toast({ title: "Class Deleted", variant: 'destructive' });
  };

  const openDialog = (item?: Student | SchoolClass) => {
    if (activeTab === 'students') {
        setEditingStudent(item as Student | undefined);
    } else {
        setEditingClass(item as SchoolClass | undefined);
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingStudent(undefined);
    setEditingClass(undefined);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Student & Class Management</h1>
        <p className="text-muted-foreground">View, add, and manage students and classes.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
          </TabsList>
          <Button onClick={() => openDialog()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {activeTab === 'students' ? 'Add Student' : 'Add Class'}
          </Button>
        </div>
        <TabsContent value="students">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allStudents.map((student) => {
                  const studentClass = allClasses.find(c => c.id === student.classId);
                  const studentSection = studentClass?.sections.find(s => s.id === student.sectionId);
                  return (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatarUrl} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>{studentClass?.name || 'N/A'}</TableCell>
                      <TableCell>{studentSection?.name || 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => openDialog(student)}>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteStudent(student.id)} className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        <TabsContent value="classes">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Sections</TableHead>
                  <TableHead>Number of Students</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allClasses.map((sClass) => (
                  <TableRow key={sClass.id}>
                    <TableCell className="font-medium">{sClass.name}</TableCell>
                    <TableCell>{sClass.sections.map(s => s.name).join(', ')}</TableCell>
                    <TableCell>{allStudents.filter(s => s.classId === sClass.id).length}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openDialog(sClass)}>Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDeleteClass(sClass.id)} className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {activeTab === 'students' ? (
          <StudentDialog student={editingStudent} classes={allClasses} onSave={handleSaveStudent} onClose={closeDialog} />
        ) : (
          <ClassDialog schoolClass={editingClass} onSave={handleSaveClass} onClose={closeDialog} />
        )}
      </Dialog>
    </div>
  );
}
