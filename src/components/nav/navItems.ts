import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Home,
  Library,
  ListChecks,
  MessageCircle,
  MonitorPlay,
  MoreHorizontal,
  NotebookPen,
  PenSquare,
  PlayCircle,
  RotateCcw,
  Settings,
  Sparkles,
  TrendingUp,
  UserCircle,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const PRIMARY_NAV: NavItem[] = [
  { href: "/hoje", label: "Hoje", icon: Home },
  { href: "/meu-curso", label: "Meu Curso", icon: GraduationCap },
  { href: "/professor", label: "Professor", icon: MessageCircle },
  { href: "/curso", label: "Biblioteca de Aulas", icon: BookOpen },
  { href: "/videoaulas", label: "Videoaulas", icon: MonitorPlay },
];

export const SECONDARY_NAV: NavItem[] = [
  { href: "/questoes", label: "Questões", icon: ListChecks },
  { href: "/simulados", label: "Simulados", icon: ClipboardList },
  { href: "/redacao", label: "Redação", icon: PenSquare },
  { href: "/revisoes", label: "Revisões", icon: RotateCcw },
  { href: "/revisao-conteudos-estudados", label: "Revisão de Conteúdos Estudados", icon: PlayCircle },
  { href: "/erros", label: "Caderno de Erros", icon: NotebookPen },
  { href: "/biblioteca", label: "Biblioteca", icon: Library },
  { href: "/edital", label: "Edital", icon: ClipboardList },
  { href: "/desempenho", label: "Desempenho", icon: TrendingUp },
  { href: "/estudio", label: "Estúdio de Conteúdo", icon: Sparkles },
  { href: "/cronograma", label: "Cronograma (antigo)", icon: CalendarDays },
  { href: "/perfil", label: "Minha conta", icon: UserCircle },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
];

export const MOBILE_MORE_ITEM: NavItem = { href: "/mais", label: "Mais", icon: MoreHorizontal };
