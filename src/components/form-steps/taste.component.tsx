import styles from "@/components/form-steps/form-steps.module.css";
import {
  ALCOHOL_MARKS,
  BODY_MARKS,
  SWEET_MARKS,
  TANNIN_ACIDITY_MARKS,
} from "@/components/form-tasting/form-tasting.constants";
import { getLabel } from "@/helpers";
import { useTastingContext } from "@/pages/tastings/form-context";
import { Box, Group, Modal, Slider, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";

type Tasting = "alcohol" | "body" | "tannin" | "acidity" | "sweetness";

export const Taste = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [description, setDescription] = useState("");
  const [tasting, setTasting] = useState<Tasting>();

  const form = useTastingContext();

  function openInfoModal(tasting: Tasting) {
    setTasting(tasting);
    switch (tasting) {
      case "acidity":
        setDescription(
          "The more acidic the wine, the more it makes you salivate. Higher acidic wines are usually crisp and tart while a low acid whine is softer and rounder.",
        );
        break;
      case "alcohol":
        setDescription(
          "Alcohol contributes to the overall weight and physical sensation of the wine. Higher alcohol wines are usually bolder while lower alcohol wines are lighter in body.",
        );
        break;
      case "body":
        setDescription("How the wine feels in your mouth. The heavier the feel, the fuller the body.");
        break;
      case "sweetness":
        setDescription("The amount of sugar in the wine. Sweetness contributes to the wines flavor profile.");
        break;
      case "tannin":
        setDescription(
          "The drying out feeling you get in your mouth. The more dry your mouth feels, the higher the tannin.",
        );
        break;
    }

    open();
  }

  return (
    <Box mt={10}>
      <Group>
        <Text className={styles["form-label"]}>Body</Text>
        <IconInfoCircle onClick={() => openInfoModal("body")} />
      </Group>
      <Slider
        classNames={{
          root: styles.slider,
          markLabel: styles["mark-label"],
        }}
        showLabelOnHover={false}
        max={5}
        min={1}
        step={1}
        marks={BODY_MARKS}
        label={getLabel("BODY", form.values.body)}
        {...form.getInputProps("body")}
      />
      <Group>
        <Text className={styles["form-label"]}>Tannin</Text>
        <IconInfoCircle onClick={() => openInfoModal("tannin")} />
      </Group>

      <Slider
        classNames={{
          root: styles.slider,
          markLabel: styles["mark-label"],
        }}
        showLabelOnHover={false}
        max={5}
        min={1}
        step={1}
        marks={TANNIN_ACIDITY_MARKS}
        label={getLabel("TANNIN", form.values.tannin)}
        {...form.getInputProps("tannin")}
      />
      <Group>
        <Text className={styles["form-label"]}>Acidity</Text>
        <IconInfoCircle onClick={() => openInfoModal("acidity")} />
      </Group>
      <Slider
        classNames={{
          root: styles.slider,
          markLabel: styles["mark-label"],
        }}
        showLabelOnHover={false}
        max={5}
        min={1}
        step={1}
        marks={TANNIN_ACIDITY_MARKS}
        label={getLabel("ACIDITY", form.values.acidity)}
        {...form.getInputProps("acidity")}
      />
      <Group>
        <Text className={styles["form-label"]}>Alcohol(%)</Text>
        <IconInfoCircle onClick={() => openInfoModal("alcohol")} />
      </Group>
      <Slider
        classNames={{
          root: styles.slider,
          markLabel: styles["mark-label"],
        }}
        showLabelOnHover={false}
        max={5}
        min={1}
        step={1}
        marks={ALCOHOL_MARKS}
        label={getLabel("ALCOHOL", form.values.alcohol)}
        {...form.getInputProps("alcohol")}
      />
      <Group>
        <Text className={styles["form-label"]}>Sweetness</Text>
        <IconInfoCircle onClick={() => openInfoModal("sweetness")} />
      </Group>
      <Slider
        classNames={{
          root: styles.slider,
          markLabel: styles["mark-label"],
        }}
        showLabelOnHover={false}
        max={5}
        min={1}
        step={1}
        marks={SWEET_MARKS}
        label={getLabel("SWEET", form.values.sweet)}
        {...form.getInputProps("sweet")}
      />

      <Modal centered opened={opened} title={tasting?.toLocaleUpperCase()} onClose={close}>
        <Modal.Body>{description}</Modal.Body>
      </Modal>
    </Box>
  );
};
