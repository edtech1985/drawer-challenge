// contexts/mock-context.tsx

import { createContext, useContext, useState } from "react";

type MockResponse = {
  key: string;
  name: string;
};

type MockContextType = {
  selectedMock: string | null;
  setSelectedMock: (key: string | null) => void;
  selectedMockResponse: MockResponse | null;
  setSelectedMockResponse: (response: MockResponse | null) => void;
};

const MockContext = createContext<MockContextType>({
  selectedMock: null,
  setSelectedMock: () => {},
  selectedMockResponse: null,
  setSelectedMockResponse: () => {},
});

export function MockProvider({ children }: { children: React.ReactNode }) {
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

export const useMock = () => useContext(MockContext);
