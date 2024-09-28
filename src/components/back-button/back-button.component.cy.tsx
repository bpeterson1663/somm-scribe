import { BackButton } from "@/components/back-button/back-button.component";

describe("<BackButton />", () => {
  it("should render", () => {
    cy.mount(<BackButton />);
  });

  it("should show warning ", () => {
    cy.mount(<BackButton showWarning />);

    cy.get('[data-testid="back"]').click();
    cy.get('[data-testid="warning-text"]').should(
      "contain.text",
      "Are you sure you want to leave before saving your changes?",
    );
  });

  it("should cancel ", () => {
    cy.mount(<BackButton showWarning />);
    cy.get('[data-testid="back"]').click();

    cy.get('[data-testid="cancel"]').click();
    cy.get('[data-testid="back"]').should("be.visible");
  });
});
