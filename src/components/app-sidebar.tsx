

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { SidebarNavItem } from "@/components/sidebar-nav-item"
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// Menu items.
const items = [
  {
    id: 1,
    title: "Dashboard",
    url: "/d", 
    icon: "Home",
  },
  {
    id: 2,
    title: "Project",
    url: "/p",
    icon: "Inbox",
  },
  {
    id: 3,
    title: "Task",
    url: "/t",
    icon: "Calendar",
  },
  {
    id: 4,
    title: "User",
    url: "/u",
    icon: "Search", 
  }
]

const general = [
  {
    id: 1,
    title: "Settings",
    url: "/settings",
    icon: "Settings",
  },
  {
    id: 2,
    title: "Logout",
    url: "/logout",
    icon: "LogOutIcon",
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex flex-col gap-4 h-full justify-between">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/assets/images/logo.svg" alt="Logo" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> {/* Logo */}
            </SidebarGroupLabel> {/* Logo */}
          <SidebarGroupLabel>Menu Items</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarNavItem
                  key={item.id}
                  url={item.url}
                  title={item.title}
                  icon={item.icon}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mb-20">
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {general.map((item) => (
                <SidebarNavItem
                  key={item.id}
                  url={item.url}
                  title={item.title}
                  icon={item.icon}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </div>
      </SidebarContent> 
    </Sidebar>
  )
}