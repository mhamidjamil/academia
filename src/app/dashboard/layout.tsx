"use client";

import * as React from 'react';
import {
  Bell,
  BookUser,
  ClipboardList,
  FileText,
  Home,
  LineChart,
  Settings,
  Users,
  Percent,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { RoleProvider, useRole } from '@/contexts/RoleContext';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import type { UserRole } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RoleSwitcher } from '@/components/dashboard/RoleSwitcher';
import { Logo } from '@/components/icons';

const navItems: Record<UserRole, { href: string; icon: React.ReactNode; label: string }[]> = {
  Admin: [
    { href: '/dashboard', icon: <Home />, label: 'Dashboard' },
    { href: '/dashboard/students', icon: <Users />, label: 'Students & Classes' },
    { href: '/dashboard/exams', icon: <ClipboardList />, label: 'Exams' },
    { href: '/dashboard/grading', icon: <Percent />, label: 'Grade Adjustment' },
    { href: '/dashboard/marksheet', icon: <FileText />, label: 'Marksheets' },
  ],
  Teacher: [
    { href: '/dashboard', icon: <Home />, label: 'Dashboard' },
    { href: '/dashboard/students', icon: <Users />, label: 'My Students' },
    { href: '/dashboard/exams', icon: <ClipboardList />, label: 'Manage Exams' },
    { href: '/dashboard/grading', icon: <Percent />, label: 'Grade Adjustment' },
  ],
  Student: [
    { href: '/dashboard', icon: <Home />, label: 'Dashboard' },
    { href: '/dashboard/exams', icon: <ClipboardList />, label: 'My Exams' },
    { href: '/dashboard/marksheet', icon: <FileText />, label: 'My Marksheet' },
  ],
  Parent: [
    { href: '/dashboard', icon: <Home />, label: 'Dashboard' },
    { href: '/dashboard/marksheet', icon: <FileText />, label: "Child's Marksheet" },
  ],
  Librarian: [{ href: '/dashboard', icon: <Home />, label: 'Dashboard' }, { href: '#', icon: <BookUser />, label: 'Library' }],
  Accountant: [{ href: '/dashboard', icon: <Home />, label: 'Dashboard' }, { href: '#', icon: <LineChart />, label: 'Fees' }],
};

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role, user } = useRole();
  const currentNavItems = navItems[role];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {currentNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    href={item.href}
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="#" tooltip="Settings">
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="no-print sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
              <RoleSwitcher />
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleProvider>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </RoleProvider>
    )
}
