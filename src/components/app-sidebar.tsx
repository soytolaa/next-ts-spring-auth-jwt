import { Calendar, Home, Inbox, LogOutIcon, Menu, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    id: 1,
    title: "Dashboard",
    url: "/d", 
    icon: Home,
  },
  {
    id: 2,
    title: "Project",
    url: "/p",
    icon: Inbox,
  },
  {
    id: 3,
    title: "Task",
    url: "/t",
    icon: Calendar,
  },
  {
    id: 4,
    title: "User",
    url: "/u",
    icon: Search, 
  }
]

const general = [
  {
    id: 1,
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    id: 2,
    title: "Logout",
    url: "/logout",
    icon: LogOutIcon,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">{"Logo"}</SidebarGroupLabel>
          <SidebarGroupLabel>Menu Items</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {general.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}