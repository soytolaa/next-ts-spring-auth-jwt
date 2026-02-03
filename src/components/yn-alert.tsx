import { AlertDialog, AlertDialogHeader, AlertDialogContent, AlertDialogTitle, AlertDialogCancel, AlertDialogAction, AlertDialogFooter, AlertDialogDescription } from "./ui/alert-dialog";

export default function YNAlert({ isOpen, setIsOpen, handleConfirm, title, description }: { isOpen: boolean, setIsOpen: (open: boolean) => void, handleConfirm: () => void, title: string, description: string }) {
    
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}