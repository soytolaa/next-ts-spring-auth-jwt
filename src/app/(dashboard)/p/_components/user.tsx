"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { User } from "@/types/auth"

export default function UserComponent({
  users,
  selectedAssignTo,
  setSelectedAssignTo,
  isCreate,
}: {
  users: User[]
  selectedAssignTo: number[]
  setSelectedAssignTo: (assignTo: number[]) => void
  isCreate: boolean
}) {
  const [open, setOpen] = React.useState(false)

  const selectedUsers = React.useMemo(
    () => users.filter((u) => selectedAssignTo.includes(u.userId)),
    [users, selectedAssignTo]
  )

  const toggleUser = (userId: number) => {
    setSelectedAssignTo(
      selectedAssignTo.includes(userId)
        ? selectedAssignTo.filter((id) => id !== userId)
        : [...selectedAssignTo, userId]
    )
  }

  const removeUser = (userId: number) => {
    setSelectedAssignTo(selectedAssignTo.filter((id) => id !== userId))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger  asChild>
        <Button
          variant="outline"
          className="w-[310px] justify-between h-full bg-transparent font-normal cursor-pointer"
        >
          <span className="flex flex-wrap gap-1">
            {selectedUsers.length > 0 ? (
              selectedUsers.map((u) => (
                <Badge
                  key={u.userId}
                  variant="secondary"
                  className="gap-1 pr-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {u.userName}
                  <span
                    role="button"
                    tabIndex={0}
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer inline-flex items-center"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        removeUser(u.userId);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeUser(u.userId);
                    }}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </span>
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground text-sm font-normal">Select User</span>
            )}
          </span>

          <ChevronDown className="h-4 w-4 opacity-60" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[320px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search user..." />
          <CommandList>
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {users.map((u) => {
                const checked = selectedAssignTo.includes(u.userId)
                return (
                  <CommandItem
                    key={u.userId}
                    value={`${u.userName} ${u.email}`}
                    onSelect={() => toggleUser(u.userId)}
                  >
                    <Check className={`h-4 w-4 ${checked ? "opacity-100" : "opacity-0"}`} />
                    <div className="flex flex-col">
                      <span>{u.userName}</span>
                      <span className="text-xs text-muted-foreground">{u.email}</span>
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}