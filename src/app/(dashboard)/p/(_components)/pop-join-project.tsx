import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, FormEvent } from "react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

export function PopJoinProject({ isOpen, setIsOpen, handleJoinProject }: { isOpen: boolean, setIsOpen: (open: boolean) => void, handleJoinProject: (code: string) => Promise<void> }) {
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!code || code.length !== 36) return;
        setIsLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            const code = formData.get("code") as string;
            await handleJoinProject(code as string);
            toast.success("Project joined successfully");
            setIsOpen(false);
            setCode("");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to join project");
        } finally {
            setIsLoading(false);
        }
    };
    
    // Reset form when dialog closes
    useEffect(() => {
        if (!isOpen) {
            setCode("");
            setIsLoading(false);
        }
    }, [isOpen]);
    
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <form onSubmit={handleSubmit}>     
                <AlertDialogHeader>
                    <AlertDialogTitle>Join Project</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter the project code to join the project.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-4 mt-4 max-w-md">
                    <div className="space-y-2">
                        <Label htmlFor="code">Project Code</Label>
                        {/* UUID */}
                        <Input 
                            id="code" 
                            name="code" 
                            type="text"  
                            required
                            disabled={isLoading}
                            maxLength={36} 
                            minLength={36} 
                            placeholder="#Code" 
                            value={code} 
                            onChange={(e) => setCode(e.target.value)}
                        /> 
                    </div>
                </div>
                <AlertDialogFooter className="mt-4 max-w-md">
                    <Button 
                        type="reset" 
                        variant="outline" 
                        onClick={() => setIsOpen(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        className="w-28"
                        disabled={isLoading || !code || code.length !== 36}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Joining...
                            </>
                        ) : (
                            "Join"
                        )}
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}