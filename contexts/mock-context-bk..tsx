import { createContext, useContext, useState, ReactNode } from "react";

interface MockResponse {
  name: string;
  // outros campos, se houver
}

interface MockContextType {
  selectedMock: string;
  selectedMockResponse: MockResponse | null; // ou o tipo desejado para a resposta
  setSelectedMock: (mock: string) => void;
}

const MockContext = createContext<MockContextType | undefined>(undefined);

export const useMock = (): MockContextType => {
  const context = useContext(MockContext);

  if (!context) {
    throw new Error("useMock must be used within a MockProvider");
  }

  return context;
};

export const MockProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMock, setSelectedMock] = useState<string>("");
  const [selectedMockResponse, setSelectedMockResponse] =
    useState<MockResponse | null>(null);

  return (
    <MockContext.Provider
      value={{ selectedMock, selectedMockResponse, setSelectedMock }}
    >
      {children}
    </MockContext.Provider>
  );
};
