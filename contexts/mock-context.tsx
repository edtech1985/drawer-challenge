// contexts/mock-context.tsx
import { createContext, useState, useContext, ReactNode } from "react";

type MockResponse = {
  name: string;
  createdAt: string;
};

type MockContextType = {
  selectedMock: string | null;
  setSelectedMock: (mock: string) => void;
  selectedMockResponse: MockResponse | null;
  setSelectedMockResponse: (response: MockResponse | null) => void;
};

const MockContext = createContext<MockContextType | undefined>(undefined);

export function MockProvider({ children }: { children: ReactNode }) {
  const [selectedMock, setSelectedMock] = useState<string | null>(null);
  const [selectedMockResponse, setSelectedMockResponse] =
    useState<MockResponse | null>(null);

  return (
    <MockContext.Provider
      value={{
        selectedMock,
        setSelectedMock,
        selectedMockResponse,
        setSelectedMockResponse,
      }}
    >
      {children}
    </MockContext.Provider>
  );
}

export function useMock() {
  const context = useContext(MockContext);

  if (context === undefined) {
    throw new Error("useMock must be used within a MockProvider");
  }

  return context;
}
