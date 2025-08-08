"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LibraryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline tracking-tight">Library Management</h1>
                <p className="text-muted-foreground">This page is under construction.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                    <CardDescription>
                        The library management system will be available here. You will be able to manage books, track borrows, and handle fines.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Stay tuned for updates!</p>
                </CardContent>
            </Card>
        </div>
    );
}
