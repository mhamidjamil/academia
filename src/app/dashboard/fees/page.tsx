"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { fees as mockFees, students } from '@/lib/mock-data';
import type { Fee } from '@/lib/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function FeesPage() {
    const [fees, setFees] = useState<Fee[]>(mockFees);
    const { toast } = useToast();

    const handleMarkAsPaid = (feeId: string) => {
        setFees(fees.map(f => f.id === feeId ? { ...f, status: 'Paid', paidDate: new Date() } : f));
        toast({ title: "Fee Status Updated", description: "The fee has been marked as paid." });
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-headline tracking-tight">Fees Management</h1>
                    <p className="text-muted-foreground">Track and manage student fee payments.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Invoice
                </Button>
            </div>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Invoice #</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {fees.map((fee) => {
                            const student = students.find(s => s.id === fee.studentId);
                            return (
                                <TableRow key={fee.id}>
                                    <TableCell className="font-medium">{student?.name || 'N/A'}</TableCell>
                                    <TableCell>{fee.invoiceNumber}</TableCell>
                                    <TableCell>${fee.amount.toFixed(2)}</TableCell>
                                    <TableCell>{format(fee.dueDate, 'MMM d, yyyy')}</TableCell>
                                    <TableCell>
                                        <Badge variant={fee.status === 'Paid' ? 'secondary' : fee.status === 'Overdue' ? 'destructive' : 'default'}
                                            className={cn({
                                                'bg-green-100 text-green-800': fee.status === 'Paid',
                                                'bg-red-100 text-red-800': fee.status === 'Overdue',
                                                'bg-yellow-100 text-yellow-800': fee.status === 'Due',
                                            })}
                                        >
                                            {fee.status}
                                        </Badge>
                                    </TableCell>
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
                                                <DropdownMenuItem>View Invoice</DropdownMenuItem>
                                                {fee.status !== 'Paid' && <DropdownMenuItem onClick={() => handleMarkAsPaid(fee.id)}>Mark as Paid</DropdownMenuItem>}
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
