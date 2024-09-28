import { useFileInput } from "@/hooks/useFileInput";
import { useWineContext } from "@/pages/cellar/form-context";
import { Autocomplete, Box, FileInput, Group, Image, Pill, PillsInput, TextInput, rem } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconUpload } from "@tabler/icons-react";
import { countries } from "countries-list";
import { type ChangeEvent, type KeyboardEvent, useEffect, useState } from "react";

export const DetailsWine = () => {
  const [varietals, setVarietals] = useState([""]);
  const [currentVarietal, setCurrentVarietal] = useState("");
  const { file, blob, imgPreview, handleFileChange } = useFileInput();
  const countryList = Object.values(countries).map((country) => country.name);
  const form = useWineContext();

  useEffect(() => {
    setVarietals(form.values.varietal);
    form.setFieldValue("imageBlob", blob);
  }, [form, blob]);

  const handleRemove = (val: string) => {
    form.setFieldValue(
      "varietal",
      varietals.filter((varietal) => varietal !== val),
    );
    setVarietals(varietals.filter((varietal) => varietal !== val));
  };

  const onDateChange = (value: Date | null) => {
    if (value) {
      form.setFieldValue("date", value);
    }
  };

  const onVarietalKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (currentVarietal === "") {
        return;
      }

      setVarietals([...varietals, currentVarietal]);
      form.setFieldValue("varietal", [...varietals, currentVarietal]);
      setCurrentVarietal("");
    }
  };

  const onVarietalBlur = () => {
    if (currentVarietal === "") {
      return;
    }

    setVarietals([...varietals, currentVarietal]);
    form.setFieldValue("varietal", [...varietals, currentVarietal]);
    setCurrentVarietal("");
  };

  const onVarietalChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCurrentVarietal(event.currentTarget.value);
  };

  return (
    <Box>
      <DatePickerInput
        {...form.getInputProps("date")}
        valueFormat="YYYY MMM DD"
        name="date"
        label="Date"
        onChange={onDateChange}
        data-testid="date"
      />

      <TextInput
        data-testid="producer"
        mt="xs"
        label="Winery / Producer"
        required
        {...form.getInputProps("producer")}
      />

      <TextInput
        data-testid="classification"
        mt="xs"
        label="Name / Classification"
        {...form.getInputProps("classification")}
      />

      <PillsInput data-testid="varietal" mt="xs" label="Varietal(s)" required {...form.getInputProps("varietal")}>
        <Pill.Group>
          {varietals.map((varietal) => (
            <Pill
              key={varietal}
              onRemove={() => {
                handleRemove(varietal);
              }}
              withRemoveButton
            >
              {" "}
              {varietal}
            </Pill>
          ))}
          <PillsInput.Field
            value={currentVarietal}
            onBlur={onVarietalBlur}
            onKeyDown={onVarietalKeyDown}
            onChange={onVarietalChange}
          />
        </Pill.Group>
      </PillsInput>

      <TextInput data-testid="vintage" required mt="xs" label="Vintage" {...form.getInputProps("vintage")} />

      <Autocomplete
        data-testid="country"
        autoComplete="country"
        data={countryList}
        required
        mt="xs"
        label="Country"
        {...form.getInputProps("country")}
      />

      <TextInput data-testid="region" required mt="xs" label="Region" {...form.getInputProps("region")} />

      <TextInput data-testid="subregion" mt="xs" label="Subregion" {...form.getInputProps("subregion")} />

      <FileInput
        mt="xs"
        leftSection={<IconUpload style={{ width: rem(18), height: rem(18) }} />}
        accept="image/png,image/jpeg,image/png"
        value={file}
        placeholder="Upload a picture of the wine"
        label="Picture"
        onChange={handleFileChange}
      />

      {(imgPreview || form.values.labelUri) && (
        <Group justify="center" mt="md" align="center">
          <Image radius="md" height={300} src={imgPreview || form.values.labelUri} alt="" />
        </Group>
      )}
    </Box>
  );
};
