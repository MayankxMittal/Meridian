import { motion } from "framer-motion";
import { MoreHorizontal, Pencil, Trash2, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/DropdownMenu";
import type { Department } from "@/lib/types";

interface DepartmentCardProps {
  department: Department;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}

const MotionCard = motion.create(Card);

export function DepartmentCard({ department, index, onEdit, onDelete }: DepartmentCardProps) {
  return (
    <MotionCard
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      className="group relative p-5 transition-shadow duration-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-primary-tint font-mono text-[11px] font-medium text-primary">
            {department.code}
          </div>
          <div>
            <p className="font-display text-[15px] leading-tight text-ink">
              {department.name}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[11.5px] text-ink-muted">
              <Users size={11} /> {department.headCount} people
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-7 w-7 items-center justify-center rounded-[6px] text-ink-muted opacity-0 transition-all duration-150 hover:bg-bg hover:text-ink group-hover:opacity-100 data-[state=open]:opacity-100 data-[state=open]:bg-bg">
              <MoreHorizontal size={15} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={onEdit}>
              <Pencil size={14} /> Edit department
            </DropdownMenuItem>
            <DropdownMenuItem destructive onSelect={onDelete}>
              <Trash2 size={14} /> Delete department
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="mt-3.5 text-[12.5px] leading-relaxed text-ink-secondary">
        {department.description}
      </p>
    </MotionCard>
  );
}