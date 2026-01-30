import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

export default function PopCreate({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) {   
  const handleCreateProject = () => {
    console.log("Create Project");
    setIsOpen(false);
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>New Project</AlertDialogTitle>
          <AlertDialogDescription>
            Create a new project to organize your tasks and collaborate with your team.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2 flex flex-col gap-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input className="border-gray-300 focus-none" id="projectName" type="text" placeholder="Project Name" />
            <Label htmlFor="projectDescription">Project Description</Label>
            <Input className="border-gray-300 focus-none" id="projectDescription" placeholder="Project Description (Optional)" />
          </div>
        </div>
        <AlertDialogFooter>
         <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button type="submit" onClick={() => handleCreateProject()}>Create</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}