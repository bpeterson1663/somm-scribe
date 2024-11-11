import ColorPalette from "@/components/color-palette/color-palette.component";
import { Footer } from "@/components/footer/footer.component";
import PageContainer from "@/components/page-container/page-container.component";
import RatingIcon from "@/components/rating/raiting.component";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { selectTastingById } from "@/features/tasting/tastingSelectors";
import { deleteTastingThunk, tastingSetEdit } from "@/features/tasting/tastingSlice";
import { getLabel, getWineImage, uppercaseFirstLetter } from "@/helpers";
import styles from "@/pages/styles/pages.module.css";
import type { TastingT } from "@/schemas/tastings";
import { ActionIcon, Button, Group, Image, Modal, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TastingId() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = params.id ?? "";
  const tasting = useAppSelector(selectTastingById(id));
  const [itemToDelete, setItemToDelete] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [imageEnlarged, setImageEnlarged] = useState(false);

  if (!tasting) {
    navigate("/");
    return null;
  }

  const handleConfirmDeleteOpen = (id: string) => {
    setItemToDelete(id);
    open();
  };

  const handleConfirmDeleteClose = () => {
    setItemToDelete("");
    close();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await dispatch(deleteTastingThunk(itemToDelete)).unwrap();
      notifications.show({
        message: "Tasting was deleted.",
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      notifications.show({
        color: "red",
        message: "Soemthing went wrong trying to delete your tasting notes.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (wine: TastingT) => {
    dispatch(tastingSetEdit(wine));
    navigate("/tastings/edit");
  };

  const ConfirmDeleteDialog = () => (
    <Modal className={styles["delete-dialog"]} opened={opened} onClose={close} title="Delete Tasting" centered>
      <Text className={styles.content}>Are you sure you want to delete this tasting?</Text>
      <Group justify="flex-end">
        <Button variant="outline" onClick={handleConfirmDeleteClose}>
          Cancel
        </Button>
        <Button onClick={handleDelete} autoFocus>
          Delete
        </Button>
      </Group>
    </Modal>
  );

  const {
    producer,
    labelUri,
    varietal,
    vintage,
    region,
    country,
    subregion,
    classification,
    color,
    hue,
    intensity,
    smell,
    body,
    tannin,
    acidity,
    alcohol,
    sweet,
    rating,
    remarks,
  } = tasting;

  return (
    <PageContainer showBack title={producer}>
      <Group align="start">
        <Image
          w={150}
          radius="md"
          src={labelUri || getWineImage(tasting)}
          alt={producer}
          onClick={() => setImageEnlarged(true)}
        />
        <Modal fullScreen opened={imageEnlarged} onClose={() => setImageEnlarged(false)} size="xl">
          <Image
            src={labelUri || getWineImage(tasting)}
            alt="Enlarged Image"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Modal>
        <Stack align="flex-start" justify="flex-start" gap="xs" mt={10} w={180}>
          {classification && <Title order={5}>Name/Classification: {classification}</Title>}
          <Text size="md">Varietal(s): {varietal.join(", ")}</Text>
          <Text size="md">Vintage: {vintage}</Text>
          <Text size="md">Country: {country}</Text>
          <Text size="md">Region: {region}</Text>
          {subregion && <Text size="md">Subregion: {subregion}</Text>}
        </Stack>
      </Group>
      <Group align="start">
        <Stack align="flex-start" justify="flex-start" gap="xs" w={150} mt={20}>
          <ColorPalette color={color} hue={hue} intensity={intensity} />
          <Text size="md" style={{ mb: 1.5 }}>
            {uppercaseFirstLetter(color)} / {uppercaseFirstLetter(intensity)} / {uppercaseFirstLetter(hue)}
          </Text>
          <Text size="md" style={{ mb: 1.5 }}>
            {smell}
          </Text>
        </Stack>
        <Stack align="flex-start" justify="flex-start" gap="xs" w={160} mt={20}>
          <Text size="md" style={{ mb: 1.5 }}>
            Body: {getLabel("BODY", body)}
          </Text>
          <Text size="md" style={{ mb: 1.5 }} color="text.secondary">
            Tannin: {getLabel("TANNIN", tannin)}
          </Text>
          <Text size="md" style={{ mb: 1.5 }} color="text.secondary">
            Acidity: {getLabel("ACIDITY", acidity)}
          </Text>
          <Text size="md" style={{ mb: 1.5 }} color="text.secondary">
            Alcohol: {getLabel("ALCOHOL", alcohol)}%
          </Text>
          <Text size="md" style={{ mb: 1.5 }} color="text.secondary">
            Sweetness: {getLabel("SWEET", sweet)}
          </Text>
          <RatingIcon rating={rating} />
          <Text size="md" style={{ mb: 1.5 }} color="text.secondary">
            {remarks}
          </Text>
        </Stack>
      </Group>
      <Footer>
        <Group style={{ width: "100%" }} justify="space-between">
          <ActionIcon
            variant="filled"
            size={36}
            loading={loading}
            onClick={() => {
              handleConfirmDeleteOpen(tasting.id);
            }}
          >
            <IconTrash />
          </ActionIcon>

          <Button
            style={{ mt: 1, mr: 1 }}
            onClick={() => {
              handleEditClick(tasting);
            }}
          >
            Edit
          </Button>
        </Group>
      </Footer>
      <ConfirmDeleteDialog />
    </PageContainer>
  );
}
