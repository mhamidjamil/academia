"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, BookOpen, ClipboardCheck, UserCheck } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { students, classes, exams } from "@/lib/mock-data";

export function AdminDashboard() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{students.length}</div>
                    <p className="text-xs text-muted-foreground">+5 from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{classes.length}</div>
                    <p className="text-xs text-muted-foreground">Across {classes.reduce((acc, c) => acc + c.sections.length, 0)} sections</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
                    <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{exams.filter(e => e.date > new Date()).length}</div>
                    <p className="text-xs text-muted-foreground">Next exam in 10 days</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">15</div>
                    <p className="text-xs text-muted-foreground">+2 new hires</p>
                </CardContent>
            </Card>
        </div>
    );
}

export function TeacherDashboard() {
     const myClasses = classes.filter(c => c.teacherId === 'user-2');
     const myStudentsCount = students.filter(s => myClasses.some(mc => mc.id === s.classId)).length;
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">My Classes</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{myClasses.length}</div>
                    <p className="text-xs text-muted-foreground">{myClasses.map(c => c.name).join(', ')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">My Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{myStudentsCount}</div>
                    <p className="text-xs text-muted-foreground">Across all sections</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
                    <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1</div>
                    <p className="text-xs text-muted-foreground">Mid-Term Exams</p>
                </CardContent>
            </Card>
        </div>
    )
}

export function StudentDashboard() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
                    <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{exams.filter(e => e.date > new Date()).length}</div>
                    <p className="text-xs text-muted-foreground">Next: Mid-Term Exams</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recent Grades</CardTitle>
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">B+</div>
                    <p className="text-xs text-muted-foreground">Overall Average</p>
                </CardContent>
            </Card>
        </div>
    )
}

export function GenericDashboard({ role }: { role: string }) {
     return (
        <div className="grid gap-6">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">{role} Dashboard</CardTitle>
                    <CardDescription>Key information and tasks for the {role} role.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Welcome! Your personalized dashboard is being configured. More features coming soon.</p>
                </CardContent>
            </Card>
        </div>
    )
}


export function DashboardCards() {
    const { role } = useRole();

    switch(role) {
        case 'Admin':
            return <AdminDashboard />;
        case 'Teacher':
            return <TeacherDashboard />;
        case 'Student':
            return <StudentDashboard />;
        default:
            return <GenericDashboard role={role} />;
    }
}
