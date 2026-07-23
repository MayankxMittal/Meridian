import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Label, Input, Textarea } from "@/components/ui/FormField";
import type { Department } from "@/lib/types";

interface DepartmentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department?: Department | null;
  onSubmit: (values: { name: string; code: string; description: string }) => void;
}

export function DepartmentFormDialog({
  open,
  onOpenChange,
  department,
  onSubmit,
}: DepartmentFormDialogProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  const isEditing = Boolean(department);

  useEffect(() => {
    if (open) {
      setName(department?.name ?? "");
      setCode(department?.code ?? "");
      setDescription(department?.description ?? "");
    }
  }, [open, department]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;
    onSubmit({ name: name.trim(), code: code.trim().toUpperCase(), description: description.trim() });
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? "Edit department" : "Add department"}
      description={
        isEditing
          ? "Update this department's details."
          : "Create a new department for your organization."
      }
      footer={
        <>
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            {isEditing ? "Save changes" : "Add department"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="dept-name">Department name</Label>
          <Input
            id="dept-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Engineering"
            autoFocus
          />
        </div>
        <div>
          <Label htmlFor="dept-code">GL code</Label>
          <Input
            id="dept-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. ENG"
            maxLength={6}
            className="font-mono uppercase"
          />
        </div>
        <div>
          <Label htmlFor="dept-desc">Description</Label>
          <Textarea
            id="dept-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What does this department do?"
            rows={3}
          />
        </div>
      </form>
    </Dialog>
  );
}