import { Footer } from '@/components/footer/footer.component'
import { Button } from '@mantine/core'

describe("<Footer />", () => {
    it("should render children", () => {
        cy.mount(
            <Footer>
                <Button data-testid="add-wine">Add wine</Button>
            </Footer>
        )

        cy.get('[data-testid="add-wine"]').should("exist")
    })
})