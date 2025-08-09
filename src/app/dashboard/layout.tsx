
"use client";

import * as React from 'react';
import Link from 'next/link';
import {
  Bell,
  BookUser,
  ClipboardList,
  FileText,
  Home,
  LineChart,
  LogOut,
  Settings,
  Users,
  Percent,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/RoleContext';
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
import { Logo } from '@/components/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { RoleSwitcher } from '@/components/dashboard/RoleSwitcher';

const navItems: Record<UserRole, { href: string; icon: React.ReactNode; label: string }[]> = {
  Admin: [
    { href: '/dashboard', icon: <Home />, label: 'Dashboard' },
    { href: '/dashboard/students', icon: <Users />, label: 'Students & Classes' },
    { href: '/dashboard/exams', icon: <ClipboardList />, label: 'Exams' },
    { href: '/dashboard/grading', icon: <Percent />, label: 'Grade Adjustment' },
    { href: '/dashboard/marksheet', icon: <FileText />, label: 'Marksheets' },
    { href: '/dashboard/fees', icon: <LineChart />, label: 'Fees' },
    { href: '/dashboard/library', icon: <BookUser />, label: 'Library' },
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
  Librarian: [{ href: '/dashboard', icon: <Home />, label: 'Dashboard' }, { href: '/dashboard/library', icon: <BookUser />, label: 'Library' }],
  Accountant: [{ href: '/dashboard', icon: <Home />, label: 'Dashboard' }, { href: '/dashboard/fees', icon: <LineChart />, label: 'Fees' }],
};

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, originalUser, logout, isMounted } = useAuth();
  
  React.useEffect(() => {
    if (isMounted && !user) {
      router.push('/login');
    }
  }, [user, isMounted, router]);

  const currentNavItems = user ? navItems[user.role] : [];
  const isAuthorized = user && (currentNavItems.some(item => pathname === item.href) || pathname === '/dashboard');
  
  React.useEffect(() => {
    if (isMounted && user && !isAuthorized) {
        // Allow access to settings page for all roles
        if (pathname !== '/dashboard/settings') {
           // Redirect if not authorized, but check if the current path is a sub-path of an authorized route.
           // e.g. /dashboard/students/new should be allowed if /dashboard/students is.
           const isSubPathAuthorized = currentNavItems.some(item => pathname.startsWith(item.href + '/') && item.href !== '/dashboard');
           if (!isSubPathAuthorized) {
             router.push('/dashboard');
           }
        }
    }
  }, [user, isMounted, router, pathname, isAuthorized, currentNavItems]);

  if (!isMounted || !user || (!isAuthorized && pathname !== '/dashboard/settings' && !currentNavItems.some(item => pathname.startsWith(item.href + '/')))) {
    return (
        <div className="flex min-h-screen">
             <div className="hidden md:flex flex-col gap-4 w-64 p-2 border-r">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
             </div>
             <div className="flex-1">
                <header className="sticky top-0 z-10 flex h-16 items-center justify-end border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
                    <Skeleton className="h-10 w-10 rounded-full" />
                </header>
                <main className="p-4 sm:p-6">
                    <Skeleton className="h-64 w-full" />
                </main>
             </div>
        </div>
    )
  }

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
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings" isActive={pathname === '/dashboard/settings'}>
                    <Link href="/dashboard/settings">
                        <Settings />
                        <span>Settings</span>
                    </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="no-print sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
            <SidebarTrigger />
            <div className="flex items-center gap-4">
              {originalUser?.role === 'Admin' && <RoleSwitcher />}
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
                  <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
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
    return <DashboardLayoutContent>{children}</DashboardLayoutContent>;
}

    