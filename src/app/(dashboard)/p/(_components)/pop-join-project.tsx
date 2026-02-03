import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import * as React from "react";

export function PopJoinProject({ isOpen, setIsOpen, handleJoinProject }: { isOpen: boolean, setIsOpen: (open: boolean) => void, handleJoinProject: (code: string) => Promise<void> }) {
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async () => {
        if (!code || code.length !== 36) return;
        setIsLoading(true);
        try {
            await handleJoinProject(code);
            setCode(""); // Reset code on success
        } catch (error) {
            // Error handling is done in parent component
        } finally {
            setIsLoading(false);
        }
    };
    
    // Reset form when dialog closes
    React.useEffect(() => {
        if (!isOpen) {
            setCode("");
            setIsLoading(false);
        }
    }, [isOpen]);
    
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
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
                            maxLength={36} 
                            minLength={36} 
                            placeholder="#Code" 
                            value={code} 
                            onChange={(e) => setCode(e.target.value)}
                            disabled={isLoading}
                        /> 
                    </div>
                </div>
                <AlertDialogFooter className="mt-4 max-w-md">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsOpen(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="button" 
                        className="w-28" 
                        onClick={handleSubmit} 
                        disabled={isLoading || !code || code.length !== 36}
                    >
                        {isLoading ? "Joining..." : "Join"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}