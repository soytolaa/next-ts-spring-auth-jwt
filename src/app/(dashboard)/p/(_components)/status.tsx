"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Status } from "@/types/enums/Status";
import { useEffect } from "react";

export default function StatusComponent({ status, isCreate, onStatusChange }: { status: Status, isCreate: boolean, onStatusChange?: (status: Status) => void }) {
    useEffect(() => {
        if (onStatusChange) {
            onStatusChange(status);
        }
    }, [status, onStatusChange]);
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-transparent font-normal border rounded-lg text-sm px-2 py-1 w-32 text-center justify-center items-center cursor-pointer">
                    {status} 
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {Object.values(Status).map((statusValue) => (
                    <DropdownMenuItem 
                        key={statusValue} 
                        className="cursor-pointer" 
                        onClick={() => onStatusChange?.(statusValue)}
                    >
                        {statusValue}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}