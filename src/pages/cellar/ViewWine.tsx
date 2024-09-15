import Footer from "@/components/footer/footer.component";
import PageContainer from "@/components/page-container/page-container.component";
import { selectWineById } from "@/features/cellar/cellarSelectors";
import { deleteWineThunk, wineSetEdit } from "@/features/cellar/cellarSlice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { tastingSetOpen } from "@/features/tasting/tastingSlice";
import { getWineImage } from "@/helpers";
import { useCellarRedirect } from "@/hooks/useRedirect";
import styles from "@/pages/styles/pages.module.css";
import type { WineT } from "@/schemas/cellar";
import { ActionIcon, Button, Group, Image, Modal, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewWine() {
  const [opened, { open, close }] = useDisclosure(false);
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = params.id ?? "";
  const wine = useAppSelector(selectWineById(id));
  const [itemToDelete, setItemToDelete] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageEnlarged, setImageEnlarged] = useState(false);

  useCellarRedirect();

  if (!wine) {
    navigate("/cellar");
    return null;
  }

  const handleConfirmDelete = (id: string) => {
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
      await dispatch(deleteWineThunk(itemToDelete)).unwrap();
      notifications.show({
        message: "Your wine was removed from cellar.",
      });
      navigate("/cellar");
    } catch (err) {
      console.error(err);
      notifications.show({
        color: "red",
        message: "Something went wrong removing your wine.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (wine: WineT) => {
    dispatch(wineSetEdit(wine));
    navigate("/cellar/edit");
  };

  const handleOpenBottleClick = (wine: WineT) => {
    dispatch(tastingSetOpen(wine));
    navigate("/tastings/new");
  };

  const ConfirmDeleteDialog = () => (
    <Modal opened={opened} onClose={close} title="Delete Wine" centered>
      <Text>Are you sure you want to delete this wine?</Text>
      <Group>
        <Button autoFocus onClick={handleConfirmDeleteClose}>
          Cancel
        </Button>
        <Button onClick={handleDelete} autoFocus>
          Delete
        </Button>
      </Group>
    </Modal>
  );

  const { producer, labelUri, varietal, vintage, region, country, subregion, classification, quantity, price } = wine;

  return (
    <PageContainer title={producer} showBack>
      <section className={styles.container}>
        <div className={styles.column}>
          <Image
            className={styles.wineImage}
            src={labelUri || getWineImage(wine)}
            alt={producer}
            onClick={() => setImageEnlarged(true)}
          />
          <Modal fullScreen opened={imageEnlarged} onClose={() => setImageEnlarged(false)} size="xl">
            <Image
              src={labelUri || getWineImage(wine)}
              alt="Enlarged Image"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Modal>
        </div>
        <div className={styles.column}>
          {producer && <Title order={6}>Winery: {producer}</Title>}
          {classification && <Title order={6}>Name: {classification}</Title>}
          <Text size="sm">Varietal(s): {varietal.join(", ")}</Text>
          <Text size="sm">Vintage: {vintage}</Text>
          <Text size="sm">Country: {country}</Text>

          <Text size="sm">Region: {region}</Text>
          {subregion && <Text size="sm">Subregion: {subregion}</Text>}
          <Text size="sm">Quantity: {quantity}</Text>
          <Text size="sm">Price: {price}</Text>
        </div>
      </section>
      <Footer>
        <Group style={{ width: "100%" }} justify="space-between">
          <Group>
            <ActionIcon
              variant="filled"
              size={36}
              loading={loading}
              onClick={() => {
                handleConfirmDelete(wine.id);
              }}
            >
              <IconTrash />
            </ActionIcon>
          </Group>
          <Group>
            <Button
              disabled={loading}
              onClick={() => {
                handleEditClick(wine);
              }}
            >
              Edit
            </Button>
            <Button
              disabled={loading}
              onClick={() => {
                handleOpenBottleClick(wine);
              }}
            >
              Open Bottle
            </Button>
          </Group>
        </Group>
      </Footer>
      <ConfirmDeleteDialog />
    </PageContainer>
  );
}
