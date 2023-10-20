import test from "@playwright/test";
import { TestPage } from "../page/testPage.page";
import { integrationTest } from "../utils/interationTest";
import data from "../../data.json";

test.describe("Validating data load in the table.", () => {
  let testPage: TestPage;
  test.beforeEach("Launch the portal", async ({ page }) => {
    testPage = new TestPage(page);
    await testPage.goToPortal();
  });

  integrationTest(
    "Validating there is no data duplication in the table after multiple insertion.",
    async () => {
      await test.step("Inserting the data in the input field and clicking on the refresh button", async () => {
        await testPage.fillDataInInput(data);
      });

      await test.step("Verify that table also has same data without any repetaion.", async () => {
        await testPage.verifySameDataInTable(data);
      });
    }
  );
});
