"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Priority } from "@/types/enums/Status";
import { useEffect } from "react";

export default function PriorityComponent({ priority, isCreate, onPriorityChange }: { priority: Priority, isCreate: boolean, onPriorityChange?: (priority: Priority) => void }) {
    useEffect(() => {
        if (onPriorityChange) {
            onPriorityChange(priority);
        }
    }, [priority, onPriorityChange]);
    
    return (    
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-transparent font-normal border rounded-lg text-sm px-2 py-1 w-32 text-center justify-center items-center cursor-pointer">
                    {priority}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {Object.values(Priority).map((priorityValue) => (
                    <DropdownMenuItem 
                        key={priorityValue} 
                        className="cursor-pointer" 
                        onClick={() => onPriorityChange?.(priorityValue)}
                    >
                        {priorityValue}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}