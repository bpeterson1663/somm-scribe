import { Footer } from "@/components/footer/footer.component";
import PageContainer from "@/components/page-container/page-container.component";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { selectTastingById } from "@/features/tasting/tastingSelectors";
import { deleteTastingThunk, tastingSetEdit } from "@/features/tasting/tastingSlice";
import { getDefaultWineImage } from "@/helpers";
import styles from "@/pages/styles/pages.module.css";
import type { TastingT } from "@/schemas/tastings";
import { ActionIcon, Button, Group, Image, Modal, Rating, Stack, Text, Title } from "@mantine/core";
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
    region,
    imageUrl,
    name,
    rating,
    varietals,
    price
  } = tasting;

  return (
    <PageContainer>
      <Group align="start">
        <Image
          w={150}
          radius="md"
          src={imageUrl || getDefaultWineImage()}
          alt={name}
          onClick={() => setImageEnlarged(true)}
        />
        <Modal fullScreen opened={imageEnlarged} onClose={() => setImageEnlarged(false)} size="xl">
          <Image
            src={imageUrl || getDefaultWineImage()}
            alt="Enlarged Image"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Modal>
        <Stack align="flex-start" justify="flex-start" gap="xs" mt={10} w={180}>
          <Title order={5}>Name: {name}</Title>
          <Text size="md">Varietal(s): {varietals.join(", ")}</Text>
          <Text size="md">Region: {region}</Text>
          <Text size="md">Price: {price}</Text>
        </Stack>
      </Group>
      <Group align="start">
        <Stack align="flex-start" justify="flex-start" gap="xs" w={160} mt={20}>
          <Rating value={rating} readOnly />
        </Stack>
      </Group>
      <Footer showBack>
        <Group justify="flex-end">
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
