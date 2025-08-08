import { students, classes, subjects, grades, exams } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { GraduationCap } from "lucide-react";
import { format } from "date-fns";

const getGradeLetter = (marks: number) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 50) return 'D';
    return 'F';
}

export function Marksheet({ studentId }: { studentId: string }) {
  const student = students.find((s) => s.id === studentId);
  if (!student) return <div>Student not found.</div>;

  const studentClass = classes.find((c) => c.id === student.classId);
  const studentGrades = grades.filter((g) => g.studentId === studentId);
  const exam = exams.find(e => e.id === studentGrades[0]?.examId);

  const totalMarks = studentGrades.reduce((acc, g) => acc + g.marks, 0);
  const percentage = (totalMarks / (studentGrades.length * 100)) * 100;

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg print:shadow-none print:border-none">
      <CardHeader className="bg-primary/5">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <GraduationCap className="h-10 w-10 text-primary" />
              <div>
                <CardTitle className="font-headline text-3xl">Academia Center</CardTitle>
                <CardDescription>Your Future Starts Here</CardDescription>
              </div>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-semibold font-headline">MARKSHEET</h2>
            <p className="text-muted-foreground">{exam?.name || "Term Report"}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-1">
            <Avatar className="h-32 w-32 border-4 border-white shadow-md">
              <AvatarImage src={student.avatarUrl} alt={student.name} />
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div><strong className="text-muted-foreground">Student Name:</strong> {student.name}</div>
            <div><strong className="text-muted-foreground">Student ID:</strong> {student.studentId}</div>
            <div><strong className="text-muted-foreground">Class:</strong> {studentClass?.name}</div>
            <div><strong className="text-muted-foreground">Date Issued:</strong> {format(new Date(), 'PPP')}</div>
          </div>
        </div>
        <Separator className="my-6" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead className="text-right">Marks (out of 100)</TableHead>
              <TableHead className="text-right">Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentGrades.map((grade) => {
              const subject = subjects.find((s) => s.id === grade.subjectId);
              return (
                <TableRow key={grade.subjectId}>
                  <TableCell className="font-medium">{subject?.name}</TableCell>
                  <TableCell className="text-right">{grade.marks}</TableCell>
                  <TableCell className="text-right font-bold">{getGradeLetter(grade.marks)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Separator className="my-6" />
        <div className="grid grid-cols-2 gap-6">
            <div>
                <h4 className="font-semibold mb-2">Remarks</h4>
                <p className="text-sm text-muted-foreground border p-4 rounded-md min-h-[100px]">
                    {student.name.split(' ')[0]} has shown consistent effort throughout the term. Excellent performance in Science. Needs to focus more on History. Keep up the good work!
                </p>
            </div>
            <div className="flex flex-col items-end">
                <div className="w-full max-w-xs space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="font-semibold">Total Marks:</span>
                        <span>{totalMarks} / {studentGrades.length * 100}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-primary">
                        <span>Percentage:</span>
                        <span>{percentage.toFixed(2)}%</span>
                    </div>
                     <div className="flex justify-between font-bold text-lg text-primary">
                        <span>Overall Grade:</span>
                        <span>{getGradeLetter(percentage)}</span>
                    </div>
                </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-end p-6 bg-primary/5">
        <p className="text-xs text-muted-foreground">This is a computer-generated marksheet and does not require a signature.</p>
        <div className="text-center">
            <div className="w-32 h-12"></div>
            <Separator className="bg-foreground" />
            <p className="text-sm font-semibold mt-1">Principal's Signature</p>
        </div>
      </CardFooter>
    </Card>
  );
}
