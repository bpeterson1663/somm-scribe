import { ColorPalette } from "@/components/color-palette/color-palette.component"
import { COLOR_INDEX } from "@/components/color-palette/color-palette.constant";

describe("<ColorPalette />", () => {
    it("should render", () => {
        cy.mount(<ColorPalette color="red" hue="purple" intensity="pale" />)
    })

    it("should render correct color", () => {
        const color = "white"
        const hue = "straw"
        const intensity = "pale"
        const backgroundColor: keyof typeof COLOR_INDEX = `${color}-${intensity}-${hue}` as keyof typeof COLOR_INDEX;
        
        cy.mount(<ColorPalette color={color} hue={hue} intensity={intensity} />)
        cy.get(`[data-testid="${backgroundColor}"]`).should('have.attr', 'style', `background: radial-gradient(at center bottom, rgb(250, 249, 229) 58%, rgb(255, 255, 255) 71%);`)
    })
})