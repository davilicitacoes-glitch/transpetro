import { ProfessorAccessGate } from "@/components/app/ProfessorAccessGate";

export default function ProfessorLayout({ children }: { children: React.ReactNode }) {
  return <ProfessorAccessGate>{children}</ProfessorAccessGate>;
}
