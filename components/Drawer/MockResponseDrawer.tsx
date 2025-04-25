// components/Drawer/MockResponseDrawer.tsx
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
  Skeleton,
} from "@heroui/react";
import { ArrowLeftIcon, BookText, GitCommit } from "lucide-react";
import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@heroui/react";
import Image from "next/image";

import { useMock } from "@/contexts/mock-context";

type StepKey =
  | "session-management"
  | "rest-v2"
  | "session-management2"
  | "transformer-jolt";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const steps = [
  {
    key: "session-management",
    label: "Session Management",
    icon: "/pipeline-step-session-management.svg",
  },
  {
    key: "rest-v2",
    label: "Rest V2 (HTTP / APIs)",
    icon: "/pipeline-step-rest.svg",
  },
  {
    key: "transformer-jolt",
    label: "Transformer (JOLT)",
    icon: "/pipeline-step-jolt.svg",
  },
  {
    key: "select",
    label: "You can select the step by clicking on canvas",
    icon: "/ideia.png",
  },
];

const mockedResponses = {
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
  const {
    selectedMock,
    setSelectedMock,
    selectedMockResponse,
    setSelectedMockResponse,
  } = useMock();

  const [localSelectedMock, setLocalSelectedMock] = useState<string | null>(
    null
  );
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLocalSelectedMock(selectedMock);

      if (
        selectedMockResponse &&
        selectedMock &&
        mockedResponses[selectedMock as StepKey]?.some(
          (r) => r.name === selectedMockResponse.name
        )
      ) {
        setSelectedResponse(selectedMockResponse.name);
      } else {
        setSelectedResponse(null);
      }

      if (!selectedMock) {
        const stored = localStorage.getItem("mock-response-selected-step");

        if (stored) {
          setLocalSelectedMock(stored);
        }
      }
    }
  }, [isOpen, selectedMock, selectedMockResponse]);

  useEffect(() => {
    if (localSelectedMock) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 500);

      return () => clearTimeout(timer);
    }
  }, [localSelectedMock]);

  const handleChange = (key: string) => {
    setLocalSelectedMock(key);
    localStorage.setItem("mock-response-selected-step", key);
    setSelectedResponse(null);
  };

  return (
    <>
      <Drawer
        hideCloseButton
        isOpen={isOpen}
        placement="right"
        onOpenChange={onClose}
      >
        <DrawerContent className="bg-background shadow-xl w-[480px]">
          {() => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <div>
                    <Button
                      isIconOnly
                      aria-label="Back"
                      className="bg-transparent"
                      color="primary"
                      size="sm"
                      variant="flat"
                      onPress={onClose}
                    >
                      <ArrowLeftIcon />
                    </Button>
                  </div>
                  <div>
                    <Button
                      isIconOnly
                      aria-label="Back"
                      className="bg-transparent"
                      color="primary"
                      size="sm"
                      variant="flat"
                    >
                      <BookText />
                    </Button>
                  </div>
                </div>
                <h2 className="text-xl font-semibold">Mock Response</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  You can choose a connector to simulate the response.
                </p>
              </DrawerHeader>

              <DrawerBody>
                {/* SELECT DE GRUPOS */}
                <div className="rounded-lg mb-4 ">
                  <Select
                    className="w-full"
                    disabledKeys={["select"]}
                    placeholder="Choose a step to mock..."
                    radius="sm"
                    renderValue={(items) => {
                      const key = items[0]?.key as string;
                      const selected = steps.find((s) => s.key === key);

                      if (!selected) return null;

                      return (
                        <div className="flex items-center gap-2">
                          {selected.icon && (
                            <Image
                              alt="Selected step icon"
                              className="w-6 h-6 shrink-0"
                              height={40}
                              src={selected.icon}
                              width={40}
                            />
                          )}
                          <span>{selected.label}</span>
                        </div>
                      );
                    }}
                    selectedKeys={localSelectedMock ? [localSelectedMock] : []}
                    size="lg"
                    variant="bordered"
                    onSelectionChange={(keys) => {
                      const key = Array.from(keys)[0];

                      handleChange(key as string);
                    }}
                  >
                    {steps.map((step) => (
                      <SelectItem
                        key={step.key}
                        className="bg-background"
                        textValue={step.label}
                      >
                        <div className="flex items-center gap-2">
                          {step.icon && (
                            <Image
                              alt="Step icon"
                              className="w-4 h-4 shrink-0"
                              height={16}
                              src={step.icon}
                              width={16}
                            />
                          )}
                          <span>{step.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <Divider className="mb-4" />

                {/* SUB-OPÇÕES MOCKED */}
                <div className="rounded-lg mb-4 px-2">
                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(2)].map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 bg-gray-100  p-3 rounded-lg border border-gray-200 dark:border-neutral-700"
                        >
                          <div>
                            <Skeleton className="flex rounded-full w-10 h-10" />
                          </div>
                          <div className="w-full flex flex-col gap-2">
                            <Skeleton className="h-3 w-3/5 rounded-lg" />
                            <Skeleton className="h-3 w-4/5 rounded-lg" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    localSelectedMock &&
                    mockedResponses[localSelectedMock as StepKey] && (
                      <RadioGroup
                        className="space-y-4 w-full"
                        size="lg"
                        value={selectedResponse || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSelectedResponse(e.target.value)
                        }
                      >
                        {mockedResponses[localSelectedMock as StepKey].map(
                          (resp, index) => (
                            <div key={index} className="!w-full">
                              <Radio
                                className="flex-row-reverse gap-8 bg-background px-6 py-4 rounded-lg border border-gray-200  mb-2 max-w-[400px]"
                                size="lg"
                                value={resp.name}
                              >
                                <div className="flex items-center gap-2 !w-full">
                                  <Image
                                    alt="Step Icon"
                                    className="shrink-0"
                                    height={24}
                                    src="/tag-mock.svg"
                                    width={24}
                                  />
                                  <div className="flex flex-col ">
                                    <span className="font-medium ">
                                      {resp.name} <span>({index + 1})</span>
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      Created at {resp.createdAt}
                                    </span>
                                  </div>
                                </div>
                              </Radio>
                            </div>
                          )
                        )}
                      </RadioGroup>
                    )
                  )}
                </div>

                {!localSelectedMock && (
                  <div className="flex flex-col items-center justify-center text-center rounded-lg mb-4">
                    <GitCommit
                      className="text-gray-400 dark:text-gray-500"
                      size="64"
                    />
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                      Choose a step to see saved
                      <br />
                      mocked responses.
                    </p>
                  </div>
                )}
              </DrawerBody>

              <DrawerFooter className=" w-full px-10 py-6">
                <div className="flex justify-between w-full">
                  <Button
                    className="w-full py-2 px-4 border-1px radius-md"
                    color="primary"
                    isDisabled={!selectedResponse}
                    variant="bordered"
                    onPress={() => {
                      if (localSelectedMock) {
                        setSelectedMock(localSelectedMock);
                      }

                      const selectedResponseObj =
                        localSelectedMock && selectedResponse
                          ? mockedResponses[localSelectedMock as StepKey].find(
                              (r) => r.name === selectedResponse
                            )
                          : null;

                      if (selectedResponseObj) {
                        setSelectedMockResponse(selectedResponseObj);
                      }

                      onClose();
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
