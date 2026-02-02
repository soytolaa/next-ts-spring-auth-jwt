import { DarkModeToggle } from "@/components/dark-mode";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="absolute top-4 right-4 z-10">
        <DarkModeToggle />
      </div>
      {children}
    </div>
  );
}