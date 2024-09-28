import { DetailsTasting } from "@/components/form-steps/details/details-tasting.component";
import { TastingFormProvider, useTastingForm,  } from "@/pages/tastings/form-context";
import { INITIAL_VALUES as TASTING_VALUES, TastingSchema } from "@/schemas/tastings";
import { zodResolver } from "@mantine/form";

describe("<DetailsTasting />", () => {
    const TestComponent = () => {
        const form = useTastingForm({
          initialValues: {
            ...TASTING_VALUES,
          },
          validate: zodResolver(TastingSchema),
        });
  
        return (
          <TastingFormProvider form={form}>
            <DetailsTasting />
          </TastingFormProvider>
        );
      };

    it("should render", () => {
        cy.mount(<TestComponent />)
    })

    it('should fill out form', () => {
        cy.mount(<TestComponent />)

        cy.get('[data-testid="producer"]').type("Producer").blur()
        cy.get('[data-testid="classification"]').type("Classification").blur()
        cy.get('[data-testid="varietal"]').type("Varietal{enter}")
        cy.get('[data-testid="vintage"]').type("2024")

        cy.get('[data-testid="country"]').type("United States")
        cy.get('[data-testid="region"]').type("Region").blur()
        cy.get('[data-testid="subregion"]').type("Subregion").blur()
    })
})