import { useFileInput } from "@/hooks/useFileInput";
import { useTastingContext } from "@/pages/tastings/form-context";
import { Box, FileInput, Group, Image, Pill, PillsInput, TextInput, rem } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconUpload } from "@tabler/icons-react";
import { type ChangeEvent, type KeyboardEvent, useEffect, useState } from "react";

export function DetailsTasting() {
  const [varietals, setVarietals] = useState([""]);
  const [currentVarietal, setCurrentVarietal] = useState("");
  const { file, blob, imgPreview, handleFileChange } = useFileInput();
  const form = useTastingContext();


  useEffect(() => {
    setVarietals(form.values.varietals);
    form.setFieldValue("imageBlob", blob);
  }, [blob]);

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
        data-testid="Name"
        mt="xs"
        required
        label="Name"
        {...form.getInputProps("name")}
      />

      <PillsInput data-testid="varietal" mt="xs" label="Varietal(s)" required {...form.getInputProps("varietals")}>
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
