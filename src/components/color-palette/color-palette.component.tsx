import { COLOR_INDEX } from "@/components/color-palette/color-palette.constant";
import styles from "@/components/color-palette/color-palette.module.css";
import type { ColorT, IntensityT, RedHueT, RoseHueT, WhiteHueT } from "@/schemas/tastings";
import { Box } from "@mantine/core";

export function ColorPalette({
  color,
  hue,
  intensity,
}: {
  color: ColorT;
  hue: RedHueT | WhiteHueT | RoseHueT;
  intensity: IntensityT;
}){
  const backgroundColor: keyof typeof COLOR_INDEX = `${color}-${intensity}-${hue}` as keyof typeof COLOR_INDEX;
  return (
    <Box
      className={styles["color-palette-container"]}
      bg={`radial-gradient(ellipse at bottom, ${COLOR_INDEX[backgroundColor]} 58%, #FFFFFF 71%)`}
      data-testid={`${color}-${intensity}-${hue}`}
    />
  );
};

export default ColorPalette;
