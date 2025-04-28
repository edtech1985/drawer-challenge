// src/mocks/mock-data.ts
export type StepKey = "session-management" | "rest-v2" | "transformer-jolt";

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

export const mockedResponses: Record<
  StepKey,
  { name: string; createdAt: string }[]
> = {
  "session-management": [
    { name: "Mocked response name #1", createdAt: "10 Dec, 2024" },
    { name: "Mocked response name #2", createdAt: "5 Dec, 2024" },
  ],
  "rest-v2": [
    { name: "Mocked response name #3", createdAt: "12 Dec, 2024" },
    { name: "Mocked response name #4", createdAt: "7 Dec, 2024" },
  ],
  "transformer-jolt": [
    { name: "Mocked response name #7", createdAt: "20 Dec, 2024" },
    { name: "Mocked response name #8", createdAt: "10 Dec, 2024" },
  ],
};
