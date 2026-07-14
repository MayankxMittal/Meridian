import { getInitials, cn } from "@/lib/utils";

// A small, muted palette — not rainbow, just enough to distinguish people at a glance
const PALETTE = [
  { bg: "#E8F0EC", text: "#0F4C3A" }, // bottle green tint
  { bg: "#F1EDE6", text: "#7A5B3A" }, // warm taupe
  { bg: "#EAEDF2", text: "#3F5170" }, // slate blue
  { bg: "#F3EAEA", text: "#8A4A45" }, // muted brick
  { bg: "#EEEDF5", text: "#5A4E80" }, // muted plum
];

function paletteFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

interface EmployeeAvatarProps {
  name: string;
  size?: "sm" | "md";
  className?: string;
}

export function EmployeeAvatar({ name, size = "sm", className }: EmployeeAvatarProps) {
  const colors = paletteFor(name);
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-medium",
        size === "sm" ? "h-8 w-8 text-[11.5px]" : "h-10 w-10 text-[13px]",
        className
      )}
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {getInitials(name)}
    </div>
  );
}