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

import { steps, mockedResponses, StepKey } from "../../mocks/mock-data";

import { useMock } from "@/contexts/mock-context";

type Props = {
  isOpen: boolean;
  onClose: () => void;
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
    if (!isOpen) return;

    const stored = localStorage.getItem("mock-response-selected-step");

    setLocalSelectedMock(selectedMock || stored || null);

    if (selectedMock && selectedMockResponse) {
      setSelectedResponse(selectedMockResponse.name);
    } else {
      setSelectedResponse(null);
    }
  }, [isOpen, selectedMock, selectedMockResponse]);

  useEffect(() => {
    if (!localSelectedMock) return;
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timer);
  }, [localSelectedMock]);

  const handleStepChange = (key: string) => {
    setLocalSelectedMock(key);
    localStorage.setItem("mock-response-selected-step", key);
    setSelectedResponse(null);
  };

  const handleApply = () => {
    if (!localSelectedMock || !selectedResponse) return;

    setSelectedMock(localSelectedMock);
    const response = mockedResponses[localSelectedMock as StepKey].find(
      (r) => r.name === selectedResponse
    );

    if (response) setSelectedMockResponse(response);

    onClose();
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
              <DrawerHeader className="flex flex-col gap-2">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <Button
                      isIconOnly
                      aria-label="Back"
                      className="bg-transparent p-0 min-w-0 w-5 h-5"
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
                      className="bg-transparent p-0 min-w-0 w-5 h-5"
                      color="primary"
                      size="sm"
                      variant="flat"
                    >
                      <BookText />
                    </Button>
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">Mock Response</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  You can choose a connector to simulate the response.
                </p>
              </DrawerHeader>

              <DrawerBody>
                {/* SELECT DE GRUPOS */}
                <StepSelector
                  selected={localSelectedMock}
                  onChange={handleStepChange}
                />

                <div className="-mx-6">
                  <Divider className="w-full mb-4" />
                </div>
                {/* SUB-OPÇÕES MOCKED */}
                <div className="rounded-lg mb-4 px-0">
                  {loading ? (
                    <LoadingSkeleton />
                  ) : (
                    <MockedResponseList
                      selected={localSelectedMock}
                      selectedResponse={selectedResponse}
                      onSelect={setSelectedResponse}
                    />
                  )}
                </div>

                {!localSelectedMock && <EmptyState />}
              </DrawerBody>

              <DrawerFooter className=" w-full px-10 py-6">
                <div className="flex justify-between w-full">
                  <Button
                    className="w-full py-2 px-4 border-1px radius-md"
                    color="primary"
                    isDisabled={!selectedResponse}
                    variant="bordered"
                    onPress={handleApply}
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

function StepSelector({
  selected,
  onChange,
}: {
  selected: string | null;
  onChange: (key: string) => void;
}) {
  return (
    <div className="rounded-lg mb-4 text-[14px] font-semibold ">
      <Select
        className="w-full placeholder:text-[14px] placeholder:font-semibold"
        classNames={{
          label: "group-data-[filled=true]:-translate-y-5",
          trigger: "min-h-16",
          listboxWrapper: "max-h-[400px]",
        }}
        disabledKeys={["select"]}
        placeholder="Choose a step to mock..."
        radius="lg"
        renderValue={(items) => {
          const key = items[0]?.key as string;
          const selected = steps.find((s) => s.key === key);

          if (!selected) return null;

          return (
            <div className="flex items-center gap-2 pl-2">
              {selected.icon && (
                <Image
                  alt="Selected step icon"
                  className="w-6 h-6 shrink-0"
                  height={40}
                  src={selected.icon}
                  width={40}
                />
              )}
              <span className="pl-3  text-[14px]">{selected.label}</span>
            </div>
          );
        }}
        selectedKeys={selected ? [selected] : []}
        size="lg"
        variant="bordered"
        onSelectionChange={(keys) => onChange(Array.from(keys)[0] as string)}
      >
        {steps.map((step) => (
          <SelectItem
            key={step.key}
            className="bg-background p-2"
            textValue={step.label}
          >
            {step.key === "select" && (
              <div className="-mx-6">
                <Divider className="w-full mb-4" />
              </div>
            )}
            <div className="flex items-center gap-2">
              {step.icon && (
                <Image
                  alt={`${step.label} icon`}
                  className="w-4 h-4 shrink-0"
                  height={40}
                  src={step.icon}
                  width={40}
                />
              )}
              <span>{step.label}</span>
            </div>
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg border"
        >
          <Skeleton className="rounded-full w-10 h-10" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-3 w-3/5" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

function MockedResponseList({
  selected,
  selectedResponse,
  onSelect,
}: {
  selected: string | null;
  selectedResponse: string | null;
  onSelect: (val: string) => void;
}) {
  if (!selected || !mockedResponses[selected as StepKey]) return null;

  return (
    <RadioGroup
      className="space-y-4"
      value={selectedResponse || ""}
      onChange={(e) => onSelect(e.target.value)}
    >
      {mockedResponses[selected as StepKey].map((resp, index) => (
        <Radio
          key={index}
          className="flex-row-reverse gap-20 bg-background px-4 py-4 rounded-lg border border-gray-200 mb-2"
          classNames={{
            base: "m-0 p-0",
          }}
          size="md"
          value={resp.name}
        >
          <div className="flex items-center gap-4 w-full">
            <Image
              alt="Step Icon"
              className="shrink-0"
              height={24}
              src="/tag-mock.svg"
              width={24}
            />
            <div className="flex flex-col w-full pr-6">
              <span className="font-medium text-[14px] ">
                {resp.name} ({index + 1})
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Created at {resp.createdAt}
              </span>
            </div>
          </div>
        </Radio>
      ))}
    </RadioGroup>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center rounded-lg mb-4">
      <GitCommit className="text-gray-400 dark:text-gray-500 mb-6" size="64" />
      <p className="text-gray-500 dark:text-gray-400 text-base font-nomral mb-4">
        Choose a step to see saved
        <br />
        mocked responses.
      </p>
    </div>
  );
}
