import { test as base, Browser, Page } from "@playwright/test";

type TestOption = {
  page: Page;
  browser?: Browser;
};

export function integrationTest(
  testName: string,
  testFunction: (testOptions: TestOption) => void | Promise<void>
) {
  base(testName, testFunction);
}
