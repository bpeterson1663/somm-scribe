import { useAppSelector } from "@/data/hooks";
import { useFileInput } from "@/hooks/useFileInput";
import { useTastingContext } from "@/pages/tastings/form-context";
import { Box, Checkbox, FileInput, Group, Image, MultiSelect, NumberInput, Rating, TextInput, Textarea, rem } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { Select } from '@mantine/core';

import { IconUpload } from "@tabler/icons-react";
import { useEffect } from "react";

export function DetailsTasting() {
  const { file, blob, imgPreview, handleFileChange } = useFileInput();
  const form = useTastingContext();
  const { varietalList } = useAppSelector(state=> state.varietal)
  const { tagList } = useAppSelector(state => state.tag)
  const { regionList } = useAppSelector(state => state.region)

  useEffect(() => {
    form.setFieldValue("imageBlob", blob);
  }, [blob]);

  const onDateChange = (value: Date | null) => {
    if (value) {
      form.setFieldValue("date", value);
    }
  };

  return (
    <Box>

      <TextInput
        data-testid="name"
        mt="xs"
        required
        label="Name of Wine"
        {...form.getInputProps("name")}
      />

      <DatePickerInput
        {...form.getInputProps("date")}
        valueFormat="YYYY MMM DD"
        name="date"
        label="Date Tasted"
        onChange={onDateChange}
        data-testid="date"
        w={200}
      />
 
      <Rating
        data-testid="review"
        fractions={2}
        size="xl"
        {...form.getInputProps("rating")}
      />

      <Select
        data-testid="region"
        mt="xs"
        searchable
        required
        data={regionList.map(region => ({value: region.id, label: region.name}))}
        label="Region"
        {...form.getInputProps("region")}
      />

      <MultiSelect  
        searchable
        label="Varietal(s)"
        placeholder="Varietal(s)"
        data={varietalList.map(varietal => ({value: varietal.id, label: varietal.name}))}
        {...form.getInputProps("varietals")} 
      />

      <MultiSelect
        searchable
        label="Tag(s)"
        placeholder="Tag(s)"
         data={tagList.map(tag => ({value: tag.id, label: tag.name}))}
        {...form.getInputProps("tags")} 
        />

      <Group>
        <NumberInput w={200} label="Price" {...form.getInputProps("price")} />

        <TextInput
          w={200}
          data-testid="purchaseLocation"
          mt="xs"
          label="Purchase Location"
          {...form.getInputProps("purchaseLocation")}
        />
      </Group>

      <Checkbox label="Would Buy Again" {...form.getInputProps("wouldBuyAgain")} />

      <Textarea
        data-testid="notes"
        autosize
        minRows={4}
        maxRows={4}
        id="notes"
        label="Tasting Notes"
        {...form.getInputProps("notes")}
      />
     
     <FileInput
        mt="xs"
        leftSection={<IconUpload style={{ width: rem(18), height: rem(18) }} />}
        accept="image/png,image/jpeg,image/png"
        value={file}
        placeholder="Upload a picture of the wine"
        label="Picture"
        onChange={handleFileChange}
      />

      {(imgPreview || form.values.imageUrl) && (
        <Group justify="center" mt="md" align="center">
          <Image radius="md" height={300} src={imgPreview || form.values.imageUrl} alt="" />
        </Group>
      )}

    </Box>
  );
}
