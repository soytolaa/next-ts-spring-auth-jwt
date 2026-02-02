import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarInset, SidebarTrigger  } from "@/components/ui/sidebar";
import { Bell, Search } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DarkModeToggle } from "@/components/dark-mode";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (  
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          {/* Search and Search Button */}
          <div className="flex items-center gap-2 w-full justify-start">
            <Input type="text" placeholder="Search" className="w-full" />
            <Button>
              <Search />
              Search
            </Button>
          </div>
          {/* Notification and User */}
          <div className="flex items-center gap-2 w-full justify-end">
            <div className="flex items-center gap-2"> <Bell />  </div>
            <div className="flex items-center gap-2"> <DarkModeToggle /> </div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Mr.Bean" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium">Mr.Bean</p>
            </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 scrollbar-hide scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="flex flex-col gap-4">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}