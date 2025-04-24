import {
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
import { Plus } from "lucide-react";

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

export default function MainDrawer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMockDrawerOpen, setIsMockDrawerOpen] = useState(false);
  const { selectedMock, setSelectedMock } = useMock();

  return (
    <>
      <Button color="warning" variant="flat" onPress={onOpen}>
        Open Drawer
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-black shadow-xl">
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold mb-2">
                  Create a test case
                </h2>
                <p className="text-gray-500 mb-6">
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
                      <span className="text-sm text-gray-500">(8 steps)</span>

                      <Switch defaultSelected size="sm" />
                    </div>
                  </div>
                  <div className="border rounded-lg mb-4">
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Set the start and end</h4>
                        <p className="text-gray-500 text-sm">
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
                  <div className="border rounded-lg mb-4">
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Payload</h4>
                        <p className="text-gray-500 text-sm">
                          Create or use a saved payload
                        </p>
                      </div>
                      <button className="rounded-full p-1">
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="border rounded-lg mb-4">
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Mock Responses</h4>
                        <p className="text-gray-500 text-sm">
                          {selectedMock
                            ? `${selectedMock}`
                            : "Create or use a saved mock"}
                        </p>
                      </div>
                      <button
                        className="rounded-full p-1"
                        onClick={() => setIsMockDrawerOpen(true)}
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="border rounded-lg mb-4">
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Expect Results</h4>
                        <p className="text-gray-500 text-sm">
                          Configure assertions
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
                      selectedKeys={selectedMock ? [selectedMock] : []} // agora refletindo o estado do contexto
                      size="lg"
                      variant="bordered"
                      onSelectionChange={(keys) => {
                        const key = String(Array.from(keys)[0]);

                        setSelectedMock(key);
                      }}
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
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={onClose}>
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
