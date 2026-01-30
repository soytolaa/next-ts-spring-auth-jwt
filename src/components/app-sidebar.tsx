

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"
import { SidebarNavItem } from "@/components/sidebar-nav-item"
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
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">{"Logo"}</SidebarGroupLabel>
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
      </SidebarContent>
    </Sidebar>
  )
}