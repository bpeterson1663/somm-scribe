import Footer from "@/components/footer/footer.component";
import PageContainer from "@/components/page-container/page-container.component";
import { Box, Button, Group } from "@mantine/core";
import { zodResolver } from "@mantine/form";
import { useEffect, useState } from "react";

import { DetailsWine, Quantity } from "@/components/form-steps";
import { uploadImage } from "@/database";
import { editWineThunk } from "@/features/cellar/cellarSlice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { useCellarRedirect } from "@/hooks/useRedirect";
import { WineFormProvider, useWineForm } from "@/pages/cellar/form-context";
import styles from "@/pages/styles/pages.module.css";
import { INITIAL_VALUES, WineSchema, type WineT } from "@/schemas/cellar";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

export default function EditWine() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { wine } = useAppSelector((state) => state.cellar);
  const [loading, setLoading] = useState(false);

  useCellarRedirect();

  useEffect(() => {
    if (!wine) {
      navigate("/cellar");
    }
  }, [wine, navigate]);

  const form = useWineForm({
    initialValues: {
      ...INITIAL_VALUES,
      ...wine,
      date: wine ? wine.date : new Date(),
    },
    validate: zodResolver(WineSchema),
  });

  const onSubmitHandler = async (data: WineT) => {
    setLoading(true);
    try {
      let labelUri = data.labelUri;
      if (data.imageBlob) {
        const { error, photoUrl } = await uploadImage(data.imageBlob, "wine", data.id);
        if (!error) {
          labelUri = photoUrl;
        }
      }
      await dispatch(editWineThunk({ ...data, labelUri })).unwrap();
      form.resetDirty();
      notifications.show({
        message: "Edits were saved.",
      });
    } catch (err) {
      console.error(err);
      notifications.show({
        color: "red",
        message: "An error occurred trying to save your edits. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const disableSave = (): boolean => {
    if (Object.keys(form.errors).length > 0 || !form.isDirty()) {
      return true;
    }

    return false;
  };

  return (
    <PageContainer showCancel showWarning={form.isDirty()}>
      <WineFormProvider form={form}>
        <Box className={styles.form} component="form" onSubmit={form.onSubmit(onSubmitHandler)}>
          <Box>
            <DetailsWine />
          </Box>
          <Box style={{ marginBottom: "100px" }}>
            <Quantity />
          </Box>
          <Footer>
            <Group style={{ width: "100%" }} justify="flex-end">
              <Button loading={loading} disabled={disableSave()} type="submit">
                Save
              </Button>
            </Group>
          </Footer>
        </Box>
      </WineFormProvider>
    </PageContainer>
  );
}
