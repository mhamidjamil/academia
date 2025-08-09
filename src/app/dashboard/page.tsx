"use client";

import { DashboardCards } from "@/components/dashboard/DashboardCards";
import { Noticeboard } from "@/components/dashboard/Noticeboard";
import { useAuth } from "@/contexts/RoleContext";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null; // Or a loading spinner

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Welcome, {user.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's your overview for today.</p>
      </div>
      
      <DashboardCards />

      <Noticeboard />
    </div>
  );
}
