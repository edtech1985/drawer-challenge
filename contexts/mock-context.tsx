// contexts/mock-context.tsx

"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type MockContextType = {
  selectedMock: string | null;
  setSelectedMock: (mock: string | null) => void;
};

const MockContext = createContext<MockContextType | undefined>(undefined);

export const MockProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMock, setSelectedMock] = useState<string | null>(null);

  return (
    <MockContext.Provider value={{ selectedMock, setSelectedMock }}>
      {children}
    </MockContext.Provider>
  );
};

export const useMock = () => {
  const context = useContext(MockContext);

  if (!context) {
    throw new Error("useMock must be used within a MockProvider");
  }

  return context;
};
