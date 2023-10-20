import { Page, expect } from "@playwright/test";
import { selectors } from "../selectors/selectors";
import { HtmlElements } from "../utils/constants";

export class TestPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  public async goToPortal() {
    await this.page.goto(
      " https://testpages.herokuapp.com/styled/tag/dynamic-table.html"
    );
    await this.page.waitForSelector(selectors.table);
  }

  public async fillDataInInput(data: object[]) {
    await this.page.locator(HtmlElements.summary).click();
    await this.page.locator(selectors.input).fill(JSON.stringify(data));
    await this.page.locator(selectors.refresh).click();
  }

  public async verifySameDataInTable(data: DataSchema[]) {
    let tableData: DataSchema[] = [];
    const tableRows = await this.page.$$(HtmlElements.tableRow);
    tableRows.shift();
    for (const tableRow of tableRows) {
      const tblData = await tableRow.$$(HtmlElements.tableData);
      const obj: DataSchema = {
        name: String(await tblData[0].innerText()),
        age: Number(await tblData[1].innerText()),
      };
      tableData.push(obj);
    }
    expect(tableData.length === data.length).toBeTruthy();
    tableData = tableData.filter((d) =>
      data.forEach((da) => {
        if (d.name === da.name && d.age === da.age) return false;
        else return true;
      })
    );
    expect(tableData.length === 0).toBeTruthy();
  }
}

type DataSchema = {
  name: string;
  age: number;
};
