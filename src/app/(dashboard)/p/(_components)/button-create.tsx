"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PopCreate from "./pop-create";
import { useState } from "react";
export default function ButtonCreate() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <>  {/* Button Create Project */}
    <Button onClick={() => setIsOpen(true)}>
        <Plus />
        New Project
    </Button>
    <PopCreate isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}