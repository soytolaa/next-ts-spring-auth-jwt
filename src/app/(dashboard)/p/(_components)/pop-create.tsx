"use client";

import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState, FormEvent, useRef, useEffect } from "react";
import { ProjectResponse } from "@/types/project";

export default function PopCreate({ 
  isOpen, 
  setIsOpen, 
  handleCreateProject,
  handleUpdateProject,
  isCreate,
  project
}: { 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void; 
  handleCreateProject?: (name: string, description: string) => Promise<void>; 
  handleUpdateProject?: (id: number, name: string, description: string) => Promise<void>;
  isCreate?: boolean;
  project?: ProjectResponse;
}) {   
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  // Populate form when project is provided (edit mode) or reset when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      if (project && !isCreate) {
        // Edit mode - populate with project data
        setName(project.name);
        setDescription(project.description || "");
      } else {
        // Create mode - reset to defaults
        setName("");
        setDescription("");
      }
    } else {
      // Reset when dialog closes
      setName("");
      setDescription("");
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [isOpen, project, isCreate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const nameValue = name.trim();
      const descriptionValue = description.trim() || "";

      if (!nameValue) {
        throw new Error("Project name is required");
      }

      if (isCreate && handleCreateProject) {
        await handleCreateProject(nameValue, descriptionValue);
      } else if (!isCreate && project && handleUpdateProject) {
        await handleUpdateProject(project.id, nameValue, descriptionValue);
      }
      
      setIsOpen(false);
    } catch (error) {
      // Error is handled by parent component
      console.error(`Error ${isCreate ? 'creating' : 'updating'} project:`, error);
      throw error; // Re-throw to let parent handle
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-md">
        <form ref={formRef} onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>{isCreate ? "New Project" : "Edit Project"}</AlertDialogTitle>
            <AlertDialogDescription>
              {isCreate ? "Create a new project to organize your tasks and collaborate with your team." : "Edit the project details and collaborate with your team."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input 
                id="name" 
                name="name" 
                type="text" 
                placeholder="Project Name" 
                required
                disabled={isLoading}
                className="border-gray-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Input 
                id="description" 
                name="description" 
                type="text" 
                placeholder="Project Description (Optional)" 
                disabled={isLoading}
                className="border-gray-300"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          
          <AlertDialogFooter className="mt-8">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isCreate ? "Creating..." : "Updating..."}
                </>
              ) : (
                isCreate ? "Create" : "Update"
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}