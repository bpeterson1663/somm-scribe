import { ColorSmell } from "@/components/form-steps/color-smell/color-smell.component";
import { TastingFormProvider, useTastingForm } from "@/pages/tastings/form-context";
import { INITIAL_VALUES as TASTING_VALUES, TastingSchema } from "@/schemas/tastings";
import { zodResolver } from "@mantine/form";

describe("<ColorSmell />", () => {
  const TestComponent = () => {
    const form = useTastingForm({
      initialValues: {
        ...TASTING_VALUES,
      },
      validate: zodResolver(TastingSchema),
    });

    return (
      <TastingFormProvider form={form}>
        <ColorSmell />
      </TastingFormProvider>
    );
  };

  it("should render red color options", () => {
    cy.mount(<TestComponent />);
    cy.get('[data-testid="purple"]').should("be.checked");
    cy.get('[data-testid="ruby"]').should("be.visible");
    cy.get('[data-testid="garnet"]').should("be.visible");
    cy.get('[data-testid="tawny"]').should("be.visible");
    cy.get('[data-testid="brown"]').should("be.visible");
  });

  it("should render white color options", () => {
    cy.mount(<TestComponent />);

    cy.get('[data-testid="white"]').click();
    cy.get('[data-testid="straw"]').should("be.checked");
    cy.get('[data-testid="yellow"]').should("be.visible");
    cy.get('[data-testid="gold"]').should("be.visible");
    cy.get('[data-testid="amber"]').should("be.visible");
    cy.get('[data-testid="brown"]').should("be.visible");
  });

  it("should render rose color options", () => {
    cy.mount(<TestComponent />);

    cy.get('[data-testid="rose"]').click();
    cy.get('[data-testid="pink"]').should("be.checked");
    cy.get('[data-testid="salmon"]').should("be.visible");
    cy.get('[data-testid="copper"]').should("be.visible");
  });

  it("should render smell text area", () => {
    cy.mount(<TestComponent />);

    cy.get('[data-testid="smell"]').type("bright citrus and minerality");
    cy.get('[data-testid="smell"]').should("have.text", "bright citrus and minerality");
  });
});
