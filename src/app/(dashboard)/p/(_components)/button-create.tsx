"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PopCreate from "./pop-create";
import { useState } from "react";
import { createProjectAction } from "@/action/projectAction";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ButtonCreate() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleCreateProject = async (name: string, description: string) => {
        setIsLoading(true);
        try {
            await createProjectAction({ 
                name: name, 
                description: description 
            });
        
            toast.success("Project created successfully");
            setIsOpen(false);
            router.refresh(); // Refresh to show new project
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to create project");
            throw error; // Re-throw to let PopCreate handle loading state
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)} disabled={isLoading}>
                <Plus className="mr-2 h-4 w-4" />
                New Project
            </Button>
            <PopCreate 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                handleCreateProject={handleCreateProject} 
            />
        </>
    );
}