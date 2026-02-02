"use client";

import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState, FormEvent, useRef, useEffect } from "react";

export default function PopCreate({ 
  isOpen, 
  setIsOpen, 
  handleCreateProject 
}: { 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void; 
  handleCreateProject: (name: string, description: string) => Promise<void>; 
}) {   
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen && formRef.current) {
      formRef.current.reset();
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const name = (formData.get("name") as string)?.trim();
      const description = (formData.get("description") as string)?.trim() || "";

      if (!name) {
        throw new Error("Project name is required");
      }

      await handleCreateProject(name, description);
      setIsOpen(false);
    } catch (error) {
      // Error is handled by parent component
      console.error("Error creating project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-md">
        <form ref={formRef} onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>New Project</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new project to organize your tasks and collaborate with your team.
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
              />
            </div>
          </div>
          
          <AlertDialogFooter className="mt-6">
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
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}