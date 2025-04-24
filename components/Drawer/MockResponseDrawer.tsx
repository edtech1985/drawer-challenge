"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Select,
  SelectItem,
  Divider,
  Radio,
  RadioGroup,
} from "@heroui/react";
import { GitCommit } from "lucide-react";
import { useEffect, useState } from "react";

import { useMock } from "@/contexts/mock-context";

// 🔧 Definindo tipo para os passos permitidos
type StepKey =
  | "session-management"
  | "rest-v2"
  | "session-management2"
  | "transformer-jolt";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const steps: { key: StepKey | "select"; label: string }[] = [
  { key: "session-management", label: "Session Management" },
  { key: "rest-v2", label: "Rest V2 (HTTP / APIs)" },
  { key: "session-management2", label: "Session Management" },
  { key: "transformer-jolt", label: "Transformer (JOLT)" },
  {
    key: "select",
    label: "You can select the step by clicking on canvas",
  },
];

// 🔧 Tipando o objeto mockedResponses com StepKey como chave
const mockedResponses: Record<StepKey, { name: string; createdAt: string }[]> =
  {
    "session-management": [
      { name: "Mocked response name #1", createdAt: "10 Dec, 2024" },
      { name: "Mocked response name #2", createdAt: "5 Dec, 2024" },
    ],
    "rest-v2": [
      { name: "Mocked response name #3", createdAt: "12 Dec, 2024" },
      { name: "Mocked response name #4", createdAt: "7 Dec, 2024" },
    ],
    "session-management2": [
      { name: "Mocked response name #5", createdAt: "15 Dec, 2024" },
      { name: "Mocked response name #6", createdAt: "8 Dec, 2024" },
    ],
    "transformer-jolt": [
      { name: "Mocked response name #7", createdAt: "20 Dec, 2024" },
      { name: "Mocked response name #8", createdAt: "10 Dec, 2024" },
    ],
  };

export default function MockResponseDrawer({ isOpen, onClose }: Props) {
  const { selectedMock, setSelectedMock } = useMock();
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !selectedMock) {
      const stored = localStorage.getItem("mock-response-selected-step");

      if (stored && steps.some((s) => s.key === stored)) {
        setSelectedMock(stored as StepKey); // ✅ garante que é uma chave válida
      }
    }
  }, [isOpen]);

  const handleChange = (key: string) => {
    if (key === "select") return; // ignora o placeholder
    setSelectedMock(key as StepKey); // ✅ garante a tipagem
    localStorage.setItem("mock-response-selected-step", key);
    setSelectedResponse(null);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onOpenChange={onClose}>
      <DrawerContent className="bg-black shadow-xl w-[420px]">
        {() => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">Mock Response</h2>
              <p className="text-gray-500 text-sm">
                You can choose a connector to simulate the response.
              </p>
            </DrawerHeader>
            <DrawerBody>
              {/* SELECT DE GRUPOS */}
              <div className="rounded-lg mb-4 bg-black">
                <Select
                  className="w-full"
                  disabledKeys={["select"]}
                  label="Group"
                  placeholder="Add your test to a group"
                  radius="sm"
                  selectedKeys={selectedMock ? [selectedMock] : []}
                  size="lg"
                  variant="bordered"
                  onSelectionChange={(keys) => {
                    const key = Array.from(keys)[0];

                    handleChange(key as string);
                  }}
                >
                  {steps.map((step) => (
                    <SelectItem key={step.key}>{step.label}</SelectItem>
                  ))}
                </Select>
              </div>

              {/* SUB-OPÇÕES MOCKED */}
              {selectedMock && (
                <div className="rounded-lg mb-6 px-2">
                  <RadioGroup
                    className="space-y-4"
                    value={selectedResponse || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSelectedResponse(e.target.value)
                    }
                  >
                    {mockedResponses[selectedMock as StepKey].map(
                      (resp, index) => (
                        <Radio
                          key={index}
                          className="bg-neutral-900 p-3 rounded-lg border border-neutral-700"
                          value={resp.name}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium text-white">
                              {resp.name}{" "}
                              <span className="text-gray-400">
                                ({index + 1})
                              </span>
                            </span>
                            <span className="text-xs text-gray-400">
                              Created at {resp.createdAt}
                            </span>
                          </div>
                        </Radio>
                      )
                    )}
                  </RadioGroup>
                </div>
              )}

              <Divider />
              <div className="rounded-lg mb-4">
                <GitCommit />
                <p className="text-gray-500 text-sm mb-2">
                  Choose a step to see saved mocked responses.
                </p>
              </div>
            </DrawerBody>

            <DrawerFooter>
              <div className="flex justify-between w-full px-6 py-4">
                <Button className="w-full" color="primary" onPress={onClose}>
                  Apply
                </Button>
              </div>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
