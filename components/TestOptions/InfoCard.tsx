"use client";

import { Plus } from "lucide-react";
import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  description: string;
  onButtonClick?: () => void;
  buttonIcon?: ReactNode;
}

export default function InfoCard({
  title,
  description,
  onButtonClick,
  buttonIcon = <Plus size={20} />,
}: InfoCardProps) {
  return (
    <div className="border dark:border-gray-700 rounded-lg mb-4">
      <div className="p-3 flex justify-between items-center">
        <div>
          <h4 className="font-medium text-[14px]">{title}</h4>{" "}
          <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
        <button className="rounded-full p-1 transition" onClick={onButtonClick}>
          {buttonIcon}
        </button>
      </div>
    </div>
  );
}
