import { DetailsWine } from "@/components/form-steps/details/details-wine.component";
import { WineFormProvider, useWineForm,  } from "@/pages/cellar/form-context";
import { INITIAL_VALUES as TASTING_VALUES, TastingSchema } from "@/schemas/tastings";
import { zodResolver } from "@mantine/form";

describe("<DetailsWine />", () => {
    const TestComponent = () => {
        const form = useWineForm({
          initialValues: {
            ...TASTING_VALUES,
          },
          validate: zodResolver(TastingSchema),
        });
  
        return (
          <WineFormProvider form={form}>
            <DetailsWine />
          </WineFormProvider>
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