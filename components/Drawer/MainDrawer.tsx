// components/Drawer/MainDrawer.tsx

import {
  addToast,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Switch,
  Input,
  SelectItem,
  Select,
} from "@heroui/react";
import { useState } from "react";
import { ArrowLeftIcon, BookText, Plus } from "lucide-react";
import Image from "next/image";

import { useMock } from "../../contexts/mock-context";

import MockResponseDrawer from "./MockResponseDrawer";

export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

const mockOptions = [
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
];

export default function MainDrawer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMockDrawerOpen, setIsMockDrawerOpen] = useState(false);
  const { selectedMock, selectedMockResponse } = useMock();
  const [isSaving, setIsSaving] = useState(false);

  const selectedMockName =
    selectedMockResponse && typeof selectedMockResponse === "object"
      ? selectedMockResponse.name
      : "Mock Responses";

  return (
    <>
      <Button disableRipple color="warning" variant="flat" onPress={onOpen}>
        Open Drawer
      </Button>
      <Drawer hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-background shadow-xl w-[420px]">
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <Button
                    isIconOnly
                    aria-label="Back"
                    color="primary"
                    size="sm"
                    variant="ghost"
                    onPress={onClose}
                  >
                    <ArrowLeftIcon />
                  </Button>
                  <Button
                    isIconOnly
                    aria-label="Back"
                    color="primary"
                    size="sm"
                    variant="ghost"
                  >
                    <BookText />
                  </Button>
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  Create a test case
                </h2>
                <p className=" mb-6">
                  Define your coverage area and use tools to simulate the
                  desired paths.
                </p>
              </DrawerHeader>
              <DrawerBody>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium uppercase text-sm">
                      Define Path
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm mr-2">Full flow</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        (8 steps)
                      </span>
                      <Switch defaultSelected size="sm" />
                    </div>
                  </div>
                  <div className="border dark:border-gray-700 rounded-lg mb-4">
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Set the start and end</h4>
                        <p className="dark:text-gray-400 text-sm">
                          Choose the path to be tested
                        </p>
                      </div>
                      <button className="rounded-full p-1">
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium uppercase text-sm">
                      Define the conditions
                    </h3>
                  </div>

                  {/* Payload Section */}
                  <div className="border dark:border-gray-700 rounded-lg mb-4">
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Payload</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Create or use a saved payload
                        </p>
                      </div>
                      <button className="rounded-full p-1">
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Mock Section */}
                  <div className="border dark:border-gray-700 rounded-lg mb-4">
                    <div className="p-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {selectedMock ? (
                          <>
                            <Image
                              alt="mock icon"
                              className="w-5 h-5"
                              height={20}
                              src={
                                mockOptions.find((m) => m.key === selectedMock)
                                  ?.icon ?? "/fallback-icon.svg"
                              }
                              width={20}
                            />
                            <div>
                              <h4 className="font-medium">
                                {selectedMockName}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {mockOptions.find((m) => m.key === selectedMock)
                                  ?.label ?? selectedMock}
                              </p>
                            </div>
                          </>
                        ) : (
                          <div>
                            <h4 className="font-medium">Mock Responses</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              Create or use a saved mock
                            </p>
                          </div>
                        )}
                      </div>

                      <button
                        className="rounded-full p-1"
                        onClick={() => setIsMockDrawerOpen(true)}
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Expect Results Section */}
                  <div className="border dark:border-gray-700 rounded-lg mb-4">
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Expect Results</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Configure assertions
                        </p>
                      </div>
                      <button className="rounded-full p-1">
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Test Details */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium uppercase text-sm">
                      Organize your tests
                    </h3>
                  </div>
                  <div className="rounded-lg mb-4">
                    <Input
                      isRequired
                      className="w-full"
                      defaultValue="Enter the name of the test"
                      label="Name"
                      radius="sm"
                      size="lg"
                      type="text"
                      variant="bordered"
                    />
                  </div>
                  <div className="rounded-lg mb-4">
                    <Input
                      isRequired
                      className="w-full"
                      defaultValue="Add information about the test"
                      label="Description"
                      radius="sm"
                      size="lg"
                      type="text"
                      variant="bordered"
                    />
                  </div>
                  <div className="rounded-lg mb-4">
                    <Select
                      className="w-full"
                      disabledKeys={[
                        "zebra",
                        "tiger",
                        "lion",
                        "elephant",
                        "crocodile",
                        "whale",
                      ]}
                      label="Group"
                      placeholder="Add your test to a group"
                      radius="sm"
                      selectedKeys={selectedMock ? [selectedMock] : []}
                      size="lg"
                      variant="bordered"
                    >
                      {animals.map((animal) => (
                        <SelectItem key={animal.key}>{animal.label}</SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </DrawerBody>

              <DrawerFooter>
                <div className="flex justify-between px-6 py-10 w-full">
                  <Button
                    color="danger"
                    isDisabled={isSaving}
                    variant="flat"
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    isLoading={isSaving}
                    onPress={() => {
                      setIsSaving(true);
                      setTimeout(() => {
                        addToast({
                          description:
                            "Your test has been created successfully.",
                          color: "success",
                          radius: "sm",
                          variant: "bordered",
                        });
                        setIsSaving(false);
                        onClose();
                      }, 1000);
                    }}
                  >
                    Save
                  </Button>
                </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
        <MockResponseDrawer
          isOpen={isMockDrawerOpen}
          onClose={() => setIsMockDrawerOpen(false)}
        />
      </Drawer>
    </>
  );
}
