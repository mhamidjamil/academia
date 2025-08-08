"use client";

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { notices } from '@/lib/mock-data';
import type { Notice } from '@/lib/types';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from '../ui/scroll-area';

export function Noticeboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const noticesByDate = notices.reduce((acc, notice) => {
    const dateStr = format(notice.date, 'yyyy-MM-dd');
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(notice);
    return acc;
  }, {} as Record<string, Notice[]>);
  
  const sortedNotices = [...notices].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="font-headline">Noticeboard & Calendar</CardTitle>
          <CardDescription>Upcoming events and important announcements.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                events: notices.map(n => n.date)
              }}
              modifiersStyles={{
                events: {
                  color: 'hsl(var(--primary-foreground))',
                  backgroundColor: 'hsl(var(--primary))',
                }
              }}
              components={{
                DayContent: (props) => {
                   const dayNotices = noticesByDate[format(props.date, 'yyyy-MM-dd')];
                   if (dayNotices) {
                     return (
                       <Popover>
                         <PopoverTrigger asChild>
                           <div className="relative flex h-full w-full items-center justify-center">
                             {props.date.getDate()}
                             <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-accent"></span>
                           </div>
                         </PopoverTrigger>
                         <PopoverContent className="w-80">
                           <div className="grid gap-4">
                             <div className="space-y-2">
                               <h4 className="font-medium leading-none">Notices for {format(props.date, 'PPP')}</h4>
                             </div>
                             <div className="grid gap-2">
                               {dayNotices.map((notice) => (
                                 <div key={notice.id} className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                   <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                                   <div className="grid gap-1">
                                     <p className="text-sm font-medium">{notice.title}</p>
                                     <p className="text-sm text-muted-foreground">{notice.content}</p>
                                   </div>
                                 </div>
                               ))}
                             </div>
                           </div>
                         </PopoverContent>
                       </Popover>
                     );
                   }
                   return <div>{props.date.getDate()}</div>;
                }
              }}
            />
          </div>
          <div className="flex flex-col">
             <h3 className="text-lg font-medium mb-4">Recent Notices</h3>
             <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {sortedNotices.map((notice) => (
                  <div key={notice.id} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-col items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <span className="text-xs">{format(notice.date, 'MMM')}</span>
                      <span className="font-bold">{format(notice.date, 'dd')}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{notice.title}</p>
                      <p className="text-sm text-muted-foreground">{notice.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Quick Actions</CardTitle>
          <CardDescription>Your most frequent tasks, one click away.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
            <button className="text-primary hover:underline">View All Students</button>
            <button className="text-primary hover:underline">Enter New Grades</button>
            <button className="text-primary hover:underline">Post a Notice</button>
            <button className="text-primary hover:underline">Check Fee Status</button>
        </CardContent>
      </Card>
    </div>
  );
}
