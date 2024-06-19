import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const colors = [
  "#191970", // Midnight Blue
  "#36454F", // Charcoal
  "#2F4F4F", // Dark Slate Gray
  "#4B0082", // Indigo
  "#3B3B3B", // Dark Charcoal
];
export const AddBoard = () => {
  return (
    <div>
      <Input />
      <div className="flex gap-3 items-center mt-2">
        {colors?.map((color) => (
          <div className="w-6 h-6 rounded" style={{ background: color }}></div>
        ))}
      </div>
      <Button>Create Board</Button>
      <Button>Cancel</Button>
    </div>
  );
};
