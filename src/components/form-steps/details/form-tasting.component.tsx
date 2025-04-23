import { useFileInput } from "@/hooks/useFileInput";
import { useTastingContext } from "@/pages/tastings/form-context";
import { Box, Checkbox, FileInput, Group, Image, NumberInput, Pill, PillsInput, Rating, TextInput, Textarea, rem } from "@mantine/core";
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

      <TextInput
        data-testid="region"
        mt="xs"
        required
        label="Region"
        {...form.getInputProps("region")}
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
