"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Sparkles } from 'lucide-react';

const sampleStudents = [
  { id: 'stu-1', name: 'Alice Johnson', originalScore: 78 },
  { id: 'stu-2', name: 'Bob Williams', originalScore: 65 },
  { id: 'stu-3', name: 'Charlie Brown', originalScore: 88 },
  { id: 'stu-4', name: 'Diana Miller', originalScore: 72 },
  { id: 'stu-5', name: 'Ethan Davis', originalScore: 59 },
];

type StudentScore = {
  id: string;
  name: string;
  originalScore: number;
  adjustedScore?: number;
};

export default function GradingPage() {
  const [students, setStudents] = useState<StudentScore[]>(sampleStudents);
  const [targetAverage, setTargetAverage] = useState<number>(80);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleApplyCurve = () => {
    setIsLoading(true);
    // Simulate AI/backend processing
    setTimeout(() => {
      const currentAverage = students.reduce((sum, s) => sum + s.originalScore, 0) / students.length;
      const difference = targetAverage - currentAverage;
      
      const newStudents = students.map(student => ({
        ...student,
        adjustedScore: Math.round(Math.min(100, student.originalScore + difference)),
      }));

      setStudents(newStudents);
      setIsLoading(false);
      toast({
        title: "Grade Curve Applied",
        description: "Student scores have been successfully adjusted.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">AI Grade Adjustment</h1>
        <p className="text-muted-foreground">Automatically curve exam results to a desired average.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Curve Calculator</CardTitle>
          <CardDescription>Input student scores and set a target average. The system will adjust the grades accordingly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <Label>Exam</Label>
              <Select defaultValue="mid-term-math">
                <SelectTrigger>
                  <SelectValue placeholder="Select an exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mid-term-math">Mid-Term - Mathematics</SelectItem>
                  <SelectItem value="final-science">Finals - Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="target-average">Target Average Score</Label>
              <Input 
                id="target-average" 
                type="number" 
                value={targetAverage}
                onChange={(e) => setTargetAverage(Number(e.target.value))}
                placeholder="e.g., 80"
              />
            </div>
            <Button onClick={handleApplyCurve} disabled={isLoading}>
              <Sparkles className="mr-2 h-4 w-4" />
              {isLoading ? 'Applying Curve...' : 'Apply Curve'}
            </Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead className="text-center">Original Score</TableHead>
                  <TableHead className="text-center text-primary">Adjusted Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-center">{student.originalScore}</TableCell>
                    <TableCell className="text-center font-bold text-primary">
                      {student.adjustedScore !== undefined ? (
                        <div className="flex items-center justify-center gap-2">
                          <span>{student.adjustedScore}</span>
                          {student.adjustedScore > student.originalScore && <span className="text-green-600">(+{student.adjustedScore - student.originalScore})</span>}
                          {student.adjustedScore < student.originalScore && <span className="text-red-600">(-{student.originalScore - student.adjustedScore})</span>}
                        </div>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Note: This tool applies a linear adjustment to all scores. Maximum score is capped at 100.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
