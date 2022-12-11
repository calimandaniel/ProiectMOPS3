const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    await driver.get('localhost:3000');
    await driver.get('localhost:3000/recordlist');
    await driver.wait(until.elementLocated(By.xpath('//*[@id="name3"]')),1000);
    const inputfield=await driver.findElement(By.xpath('//*[@id="name3"]'));
    inputfield.sendKeys("demo");
  
  } finally {
   
  }
})();

// import RecordList from "../../src/components/recordList.js";

// describe('recordlist.cy.ts', () => {
//   it('playground', () => {
//     cy.mount(RecordList)
//   })
// })
////*[@id="name"]