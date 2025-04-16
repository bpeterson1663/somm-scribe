import { useFileInput } from "@/hooks/useFileInput";
import { useTastingContext } from "@/pages/tastings/form-context";
import { Box, FileInput, Group, Image, Pill, PillsInput, TextInput, rem } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconUpload } from "@tabler/icons-react";
import { type ChangeEvent, type KeyboardEvent, useEffect, useState } from "react";

export function DetailsTasting() {
  const [varietals, setVarietals] = useState([""]);
  const [tags, setTags] = useState([""])
  const [currentVarietal, setCurrentVarietal] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const { file, blob, imgPreview, handleFileChange } = useFileInput();
  const form = useTastingContext();


  useEffect(() => {
    setVarietals(form.values.varietals);
    setTags(form.values.tags)
    form.setFieldValue("imageBlob", blob);
  }, [blob]);

  const handleRemove = (val: string) => {
    form.setFieldValue(
      "varietals",
      varietals.filter((varietal) => varietal !== val),
    );
    setVarietals(varietals.filter((varietal) => varietal !== val));
  };

  const handleTagRemove = (val: string) => {
    form.setFieldValue(
      "tags",
      tags.filter((tag) => tag !== val),
    );
    setTags(tags.filter((tag) => tag !== val));
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
      form.setFieldValue("varietals", [...varietals, currentVarietal]);
      setCurrentVarietal("");
    }
  };

  const onTagKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (currentTag === "") {
        return;
      }

      setTags([...tags, currentTag]);
      form.setFieldValue("tags", [...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const onVarietalBlur = () => {
    if (currentVarietal === "") {
      return;
    }

    setVarietals([...varietals, currentVarietal]);
    form.setFieldValue("varietals", [...varietals, currentVarietal]);
    setCurrentVarietal("");
  };

  const onTagBlur = () => {
    if (currentTag === "") {
      return;
    }

    setTags([...tags, currentTag]);
    form.setFieldValue("tags", [...tags, currentTag]);
    setCurrentTag("");
  };

  const onVarietalChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCurrentVarietal(event.currentTarget.value);
  };

  const onTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCurrentTag(event.currentTarget.value);
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
        data-testid="name"
        mt="xs"
        required
        label="Name"
        {...form.getInputProps("name")}
      />


      <TextInput
        data-testid="region"
        mt="xs"
        required
        label="Region"
        {...form.getInputProps("region")}
      />

      <TextInput
        data-testid="purchaseLocation"
        mt="xs"
        required
        label="Purchase Location"
        {...form.getInputProps("purchaseLocation")}
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

      <PillsInput data-testid="tags" mt="xs" label="Tag(s)" required {...form.getInputProps("tags")}>
        <Pill.Group>
          {tags.map((tag) => (
            <Pill
              key={tag}
              onRemove={() => {
                handleTagRemove(tag);
              }}
              withRemoveButton
            >
              {" "}
              {tag}
            </Pill>
          ))}
          <PillsInput.Field
            value={currentTag}
            onBlur={onTagBlur}
            onKeyDown={onTagKeyDown}
            onChange={onTagChange}
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
