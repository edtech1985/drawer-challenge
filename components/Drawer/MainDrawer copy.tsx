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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Alert,
} from "@heroui/react";
import { useState } from "react";
import { BookText, MoreVertical, Plus, X } from "lucide-react";
import Image from "next/image";

import { useMock } from "../../contexts/mock-context";

import MockResponseDrawer from "./MockResponseDrawer";

import InfoCard from "@/components/TestOptions/InfoCard";

export const groups = [
  { key: "frontend", label: "Front End" },
  { key: "backend", label: "Back End" },
  { key: "full", label: "FullStack" },
  { key: "support", label: "Support" },
  { key: "infra", label: "Infrastructure" },
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
  const { selectedMock, selectedMockResponse, setSelectedMock } = useMock(); // 👈 adicionado setSelectedMock
  const [isSaving, setIsSaving] = useState(false);

  const selectedMockName =
    selectedMockResponse && typeof selectedMockResponse === "object"
      ? selectedMockResponse.name
      : "Mock Responses";
  
  const selectedMockData = mockOptions.find((m) => m.key === selectedMock);

  return (
    <>
      <Button disableRipple color="secondary" variant="flat" onPress={onOpen}>
        Open Drawer
      </Button>
      <Drawer hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-background shadow-xl w-[480px]">
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <Button
                    isIconOnly
                    aria-label="Back"
                    className="bg-trtansparent"
                    color="primary"
                    size="sm"
                    variant="flat"
                    onPress={onClose}
                  >
                    <X />
                  </Button>
                  <Button
                    isIconOnly
                    aria-label="Documentation"
                    className="bg-transparent"
                    color="primary"
                    size="sm"
                    variant="flat"
                  >
                    <BookText />
                  </Button>
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  Create a test case
                </h2>
                <p className="text-sm mb-6">
                  Define your coverage area and use tools to simulate the
                  desired paths.
                </p>
              </DrawerHeader>
              <DrawerBody>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium uppercase text-sm">
                      Define Path
                    </h3>
                    <div className="flex items-center gap-1">
                      <span className="text-sm mr-2">Full flow</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        (8 steps)
                      </span>
                      <Switch className="ml-2" size="sm" />
                    </div>
                  </div>

                  <InfoCard
                    description="Choose the path to be tested"
                    title="Set the start and end"
                    onButtonClick={() => alert("Start and end")}
                  />
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium uppercase text-sm">
                      Define the conditions
                    </h3>
                  </div>

                  {/* Payload Section */}
                  <InfoCard
                    description="Create or use a saved payload"
                    title="Payload"
                    onButtonClick={() => alert("Payload!")}
                  />

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
                            <h4 className="font-medium text-[14px]">
                              Mock Responses
                            </h4>
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                              Create or use a saved mock
                            </p>
                          </div>
                        )}
                      </div>

                      {/* 🔽 Novo dropdown com Edit e Clear */}
                      {selectedMock ? (
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              isIconOnly
                              className="rounded-full"
                              variant="light"
                            >
                              <MoreVertical size={20} />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu
                            aria-label="Mock options"
                            onAction={(key) => {
                              if (key === "edit") {
                                setIsMockDrawerOpen(true);
                              }
                              if (key === "clear") {
                                setSelectedMock("");
                              }
                            }}
                          >
                            <DropdownItem key="edit">Edit</DropdownItem>
                            <DropdownItem key="clear" className="text-danger">
                              Clear
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      ) : (
                        <button
                          className="rounded-full p-1"
                          onClick={() => setIsMockDrawerOpen(true)}
                        >
                          <Plus size={20} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="border dark:border-gray-700 rounded-lg mb-4">
                    <div className="p-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {selectedMock ? (
                          <>
                            <Image
                              alt="mock icon"
                              className="w-5 h-5"
                              height={20}
                              width={20}
                              src={
                                selectedMockData?.icon ?? "/fallback-icon.svg"
                              } // 🛠️ aqui checa se existe icon
                            />
                            <div>
                              <h4 className="font-medium">
                                {selectedMockName}
                              </h4>
                              <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                {selectedMockData?.label ?? selectedMock}
                              </p>
                            </div>
                          </>
                        ) : (
                          <div>
                            <h4 className="font-medium text-[14px]">
                              Mock Responses
                            </h4>
                            <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                              Create or use a saved mock
                            </p>
                          </div>
                        )}
                      </div>

                      <div>
                        {selectedMock ? (
                          <Dropdown>
                            <DropdownTrigger>
                              <Button
                                isIconOnly
                                className="rounded-full"
                                variant="light"
                              >
                                <MoreVertical size={20} />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                              aria-label="Mock options"
                              onAction={(key) => {
                                if (key === "edit") {
                                  setIsMockDrawerOpen(true);
                                }
                                if (key === "clear") {
                                  setSelectedMock("");
                                }
                              }}
                            >
                              <DropdownItem key="edit">Edit</DropdownItem>
                              <DropdownItem key="clear" className="text-danger">
                                Clear
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        ) : (
                          <button
                            className="rounded-full p-1"
                            onClick={() => setIsMockDrawerOpen(true)}
                          >
                            <Plus size={20} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expect Results Section */}
                  <InfoCard
                    description="Configure assertions"
                    title="Expect Results"
                    onButtonClick={() => alert("Expect Results!")}
                  />
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
                      {groups.map((animal) => (
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
