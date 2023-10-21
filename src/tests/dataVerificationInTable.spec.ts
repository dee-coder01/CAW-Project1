import test from "@playwright/test";
import { TestPage } from "../page/testPage.page";
import data from "../../data.json";

test("Validating data load in the table.", async ({ page }) => {
  let testPage: TestPage;
  await test.step("Launch the portal", async () => {
    testPage = new TestPage(page);
    await testPage.goToPortal();
  });

  await test.step("Inserting the data in the input field and clicking on the refresh button", async () => {
    await testPage.fillDataInInput(data);
  });

  await test.step("Verify that table also has same data without any repetaion.", async () => {
    await testPage.verifySameDataInTable(data);
  });
});
