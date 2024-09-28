import { Card } from "@/components/card/card.component";
import { INITIAL_VALUES as WINE_VALUES, type WineT } from "@/schemas/cellar";
import { INITIAL_VALUES as TASTING_VALUES, type TastingT } from "@/schemas/tastings";

describe("<Card/>", () => {
  describe("cellar", () => {
    const defaultWine: WineT = {
      ...WINE_VALUES,
      id: "1",
    };

    beforeEach(() => {
      cy.mount(<Card wine={defaultWine} url="cellar" />);
    });

    it("should navigate to page", () => {
      cy.get('[data-testid="card-container"]').click();
      cy.url().should("include", `/cellar/${defaultWine.id}`);
    });
  });

  describe("tastings", () => {
    const defaultTasting: TastingT = {
      ...TASTING_VALUES,
      id: "1",
      date: new Date(2024, 0, 1),
    };

    beforeEach(() => {
      cy.mount(<Card wine={defaultTasting} url="tastings" showDate />);
    });

    it("should navigate to page", () => {
      cy.get('[data-testid="card-container"]').click();
      cy.url().should("include", `/tastings/${defaultTasting.id}`);
    });

    it("should include date", () => {
      cy.get('[data-testid="date"]').should("contain.text", "01/01/2024");
    });
  });
});
