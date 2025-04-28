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
} from "@heroui/react";
import { useState } from "react";
import { BookText, MoreVertical, X } from "lucide-react";
import Image from "next/image";

import { useMock } from "../../contexts/mock-context";
import { steps } from "../../mocks/mock-data";

import MockResponseDrawer from "./MockResponseDrawer";

import InfoCard from "@/components/TestOptions/InfoCard";

const groups = [
  { key: "frontend", label: "Front End" },
  { key: "backend", label: "Back End" },
  { key: "full", label: "FullStack" },
  { key: "support", label: "Support" },
  { key: "infra", label: "Infrastructure" },
];

export default function MainDrawer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMockDrawerOpen, setIsMockDrawerOpen] = useState(false);
  const { selectedMock, selectedMockResponse, setSelectedMock } = useMock();
  const [isSaving, setIsSaving] = useState(false);

  const selectedMockName =
    typeof selectedMockResponse === "object" && selectedMockResponse?.name
      ? selectedMockResponse.name
      : "Mock Responses";

  const selectedMockData = steps.find((m) => m.key === selectedMock);

  const handleSave = (onClose: () => void) => {
    setIsSaving(true);
    setTimeout(() => {
      addToast({
        description: "Your test has been created successfully.",
        classNames: {
          base: "bg-[#EBFFE8] max-w-[280px] h-20 mb-6",
          closeButton:
            "opacity-50 absolute right-4 top-1/2 -translate-y-1/2 text-[#0D0D0D]",
          description: "text-[#016F2F]",
        },
        closeIcon: (
          <svg
            fill="none"
            height="32"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="32"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ),
        icon: (
          <Image
            alt="Check Icon"
            className="w-6 h-6"
            height={24}
            src="/check-circle.svg"
            width={24}
          />
        ),
        radius: "lg",
        timeout: 3000,
        variant: "bordered",
      });
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  const handleMockAction = (key: string) => {
    if (key === "edit") setIsMockDrawerOpen(true);
    if (key === "clear") setSelectedMock("");
  };

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
                <div className="flex items-center justify-between mb-2">
                  <Button
                    isIconOnly
                    aria-label="Back"
                    className="bg-transparent p-0 min-w-0 w-5 h-5"
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
                    className="bg-transparent p-0 min-w-0 w-5 h-5"
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

              <DrawerBody className="overflow-y-scroll scrollbar-hide">
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
                  <div className="flex justify-between items-center mb-4">
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
                  {selectedMock ? (
                    <>
                      <div className="border dark:border-gray-700 rounded-lg mb-1">
                        <div className="pl-4 p-3 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Image
                              alt="mock icon"
                              className="w-5 h-5"
                              height={20}
                              src={
                                selectedMockData?.icon ?? "/fallback-icon.svg"
                              }
                              width={20}
                            />
                            <div>
                              <h4 className="font-medium">
                                {selectedMockName}
                              </h4>
                              <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                {selectedMockData?.label ?? selectedMock}
                              </p>
                            </div>
                          </div>

                          <Dropdown>
                            <DropdownTrigger>
                              <Button
                                isIconOnly
                                className="rounded-full pl-2"
                                variant="light"
                              >
                                <MoreVertical size={20} />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                              aria-label="Mock options"
                              onAction={(key) =>
                                handleMockAction(key.toString())
                              }
                            >
                              <DropdownItem key="edit">Edit</DropdownItem>
                              <DropdownItem key="clear" className="text-danger">
                                Clear
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </div>{" "}
                      <div className="px-3 mb-4 pt-0 flex justify-end">
                        <Button
                          className="text-xs font-medium p-0 h-auto"
                          variant="ghost"
                          onPress={() => {
                            /* ação para adicionar novo mock */
                          }}
                        >
                          Add a new mock
                        </Button>
                      </div>
                    </>
                  ) : (
                    <InfoCard
                      description="Create or use a saved mock"
                      title="Mock Responses"
                      onButtonClick={() => setIsMockDrawerOpen(true)}
                    />
                  )}

                  {/* Expect Results Section */}
                  <InfoCard
                    description="Configure assertions"
                    title="Expect Results"
                    onButtonClick={() => alert("Expect Results!")}
                  />
                </div>

                {/* Test Details */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-4">
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

              <DrawerFooter className="max-h-[88px] px-10 py-6">
                <div className="flex justify-between  w-full ">
                  <Button
                    className="bg-transparent border-0 font-semibold"
                    color="primary"
                    isDisabled={isSaving}
                    variant="faded"
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="font-semibold"
                    color="primary"
                    isLoading={isSaving}
                    variant="ghost"
                    onPress={() => handleSave(onClose)}
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
