import { useWineContext } from "@/pages/cellar/form-context";
import { Box, NumberInput, Textarea } from "@mantine/core";

export function Quantity() {
  const form = useWineContext();

  return (
    <Box>
      <NumberInput data-testid="quantity" label="Quantity" {...form.getInputProps("quantity")} />
      <NumberInput data-testid="price" label="Price" {...form.getInputProps("price")} />
      <Textarea
        data-testid="description"
        autosize
        minRows={4}
        maxRows={4}
        label="Description"
        {...form.getInputProps("description")}
      />
    </Box>
  );
}
