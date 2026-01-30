"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, LogOutIcon, Search, Settings } from "lucide-react"

interface SidebarNavItemProps {
  url: string
  title: string
  icon: string
}

const iconMap: Record<string, React.ComponentType> = {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  LogOutIcon,
}

export function SidebarNavItem({ url, title, icon }: SidebarNavItemProps) {
  const pathname = usePathname()
  const active = pathname === url || pathname.startsWith(url + "/")
  const Icon = iconMap[icon]
  
  if (!Icon) {
    return null
  }
  
  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        asChild 
        isActive={active}
        className={active ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
      >
        <Link href={url}>
          <Icon />
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

