"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { students } from '@/lib/mock-data';
import { Printer } from 'lucide-react';
import { Marksheet } from '@/components/dashboard/Marksheet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MarksheetPage() {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(students[0].id);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="no-print flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">Generate Marksheet</h1>
          <p className="text-muted-foreground">Select a student to view and print their marksheet.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select
            onValueChange={(value) => setSelectedStudentId(value)}
            defaultValue={selectedStudentId ?? undefined}
          >
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Select a student" />
            </SelectTrigger>
            <SelectContent>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name} ({student.studentId})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handlePrint} disabled={!selectedStudentId}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
        </div>
      </div>
      
      <div className="print-container">
        {selectedStudentId ? (
          <Marksheet studentId={selectedStudentId} />
        ) : (
          <Card className="flex items-center justify-center h-96">
            <CardContent className="text-center">
              <CardTitle>No Student Selected</CardTitle>
              <CardDescription>Please select a student from the dropdown to view their marksheet.</CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
