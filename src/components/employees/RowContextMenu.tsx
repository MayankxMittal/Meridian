import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Mail, UserX, Trash2 } from "lucide-react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/ContextMenu";

interface EmployeeRowContextMenuProps {
  children: ReactNode;
  employeeId: string;
  employeeName: string;
}

export function EmployeeRowContextMenu({
  children,
  employeeId,
  employeeName,
}: EmployeeRowContextMenuProps) {
  const navigate = useNavigate();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => navigate(`/employees/${employeeId}`)}>
          <Eye size={14} /> View profile
        </ContextMenuItem>
        <ContextMenuItem>
          <Pencil size={14} /> Edit details
        </ContextMenuItem>
        <ContextMenuItem>
          <Mail size={14} /> Send email
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <UserX size={14} /> Deactivate
        </ContextMenuItem>
        <ContextMenuItem destructive>
          <Trash2 size={14} /> Remove {employeeName.split(" ")[0]}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}