import { Review } from "@/components/form-steps/review/review.component";
import { TastingFormProvider, useTastingForm } from "@/pages/tastings/form-context";
import { INITIAL_VALUES } from "@/schemas/tastings";

describe("<Review />", () => {
  const TestComponent = () => {
    const form = useTastingForm({
      initialValues: {
        ...INITIAL_VALUES,
      },
    });

    return (
      <TastingFormProvider form={form}>
        <Review />
      </TastingFormProvider>
    );
  };

  it("should render", () => {
    cy.mount(<TestComponent />);
  });

  it("should fill out form", () => {
    cy.mount(<TestComponent />);

    cy.get('[data-testid="remarks"]').type("reamrks about the wine");
  });
});
