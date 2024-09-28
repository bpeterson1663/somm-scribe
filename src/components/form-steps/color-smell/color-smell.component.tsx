import ColorPalette from "@/components/color-palette/color-palette.component";
import { useTastingContext } from "@/pages/tastings/form-context";
import type { ColorT } from "@/schemas/tastings";
import { Flex, Group, Radio, Textarea } from "@mantine/core";

export const ColorSmell = () => {
  const form = useTastingContext();
  const color = form.values.color;
  const hue = form.values.hue;
  const intensity = form.values.intensity;

  return (
    <Flex direction="column" wrap="wrap" maw={600}>
      <Radio.Group
        name="color"
        label="Color"
        defaultValue="red"
        mt="sm"
        {...form.getInputProps("color")}
        onChange={(val) => {
          if (val === "red") form.setValues({ hue: "purple" });
          else if (val === "white") form.setValues({ hue: "straw" });
          else if (val === "rose") form.setValues({ hue: "pink" });
          form.setValues({ color: val as ColorT });
        }}
      >
        <Group mt="xs">
          <Radio data-testid="red" value="red" label="Red" />
          <Radio data-testid="white" value="white" label="White" />
          <Radio data-testid="rose" value="rose" label="Rosé" />
        </Group>
      </Radio.Group>

      {color === "red" && (
        <Radio.Group mt="sm" name="hue" label="Hue" defaultValue="purple" {...form.getInputProps("hue")}>
          <Group mt="xs">
            <Radio data-testid="purple" value="purple" label="Purple" />
            <Radio data-testid="ruby" value="ruby" label="Ruby" />
            <Radio data-testid="garnet" value="garnet" label="Garnet" />
            <Radio data-testid="tawny" value="tawny" label="Tawny" />
            <Radio data-testid="brown" value="brown" label="Brown" />
          </Group>
        </Radio.Group>
      )}
      {color === "white" && (
        <Radio.Group mt="sm" name="hue" label="Hue" defaultValue="straw" {...form.getInputProps("hue")}>
          <Group mt="xs">
            <Radio data-testid="straw" value="straw" label="Straw" />
            <Radio data-testid="yellow" value="yellow" label="Yellow" />
            <Radio data-testid="gold" value="gold" label="Gold" />
            <Radio data-testid="amber" value="amber" label="Amber" />
            <Radio data-testid="brown" value="brown" label="Brown" />
          </Group>
        </Radio.Group>
      )}
      {color === "rose" && (
        <Radio.Group mt="sm" name="hue" label="Hue" defaultValue="pink" {...form.getInputProps("hue")}>
          <Group mt="xs">
            <Radio data-testid="pink" value="pink" label="Pink" />
            <Radio data-testid="salmon" value="salmon" label="Salmon" />
            <Radio data-testid="copper" value="copper" label="Copper" />
          </Group>
        </Radio.Group>
      )}

      <Radio.Group mt="sm" name="intensity" label="Intensity" defaultValue="pale" {...form.getInputProps("intensity")}>
        <Group mt="xs">
          <Radio value="pale" label="Pale" />
          <Radio value="medium" label="Medium" />
          <Radio value="deep" label="Deep" />
        </Group>
      </Radio.Group>

      <ColorPalette color={color} hue={hue} intensity={intensity} />

      <Textarea
        data-testid="smell"
        autosize
        minRows={4}
        maxRows={4}
        name="smell"
        label="Smell"
        {...form.getInputProps("smell")}
      />
    </Flex>
  );
};
