import { LayoutDashboard, Plus, ViewIcon } from "lucide-react";
import note from "./note.png";

export const assets = {
  note,
};

export const sidebarLinks = [
  { name: "Create Notes", path: "/", icon: <Plus /> },
  { name: "All Notes", path: "/notes", icon: <ViewIcon /> },
];
