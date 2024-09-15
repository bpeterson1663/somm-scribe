import { useWineContext } from "@/pages/cellar/form-context";
import { Box, NumberInput, Textarea } from "@mantine/core";

export const Quantity = () => {
  const form = useWineContext();

  return (
    <Box>
      <NumberInput label="Quantity" {...form.getInputProps("quantity")} />
      <NumberInput label="Price" {...form.getInputProps("price")} />
      <Textarea autosize minRows={4} maxRows={4} label="Description" {...form.getInputProps("description")} />
    </Box>
  );
};
