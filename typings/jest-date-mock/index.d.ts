declare module "jest-date-mock" {
  export function advanceBy(ms: number): void;
  export function advanceTo(timestamp?: number): void;
  export function clear(): void;
}
