import { Quantity } from "@/components/form-steps/quantity/quantity.component";
import { WineFormProvider, useWineForm } from "@/pages/cellar/form-context";
import { INITIAL_VALUES } from "@/schemas/cellar";

describe("<Quantity />", () => {
  const TestComponent = () => {
    const form = useWineForm({
      initialValues: {
        ...INITIAL_VALUES,
      },
    });

    return (
      <WineFormProvider form={form}>
        <Quantity />
      </WineFormProvider>
    );
  };

  it("should render", () => {
    cy.mount(<TestComponent />);
  });

  it("should fill out form", () => {
    cy.mount(<TestComponent />);

    cy.get('[data-testid="quantity"]').type("1");
    cy.get('[data-testid="price"]').type("12.99");
    cy.get('[data-testid="description"]').type("got it at the store");
  });
});
