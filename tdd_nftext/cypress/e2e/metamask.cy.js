describe("User can load page", () => {
  // before(() => {
  //   cy.setupMetamask();
  //   cy.changeMetamaskNetwork("localhost");
  //   cy.visit("/add");
  // });

  it("is expected to display the local wallet address", () => {
    cy.visit("http://localhost:3000/add");
    cy.contains("button", "Connect to MetaMask");
  });

  it("show form after connect", () => {
    cy.visit("http://localhost:3000/add");
    cy.get("#metaButton").click();
    cy.wait(5000);
    cy.contains("Button","Create nft");
  });
});
