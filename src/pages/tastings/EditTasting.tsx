import { Footer } from "@/components/footer/footer.component";
import { DetailsTasting } from "@/components/form-steps";
import PageContainer from "@/components/page-container/page-container.component";
import { uploadImage } from "@/database";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { editTastingThunk } from "@/features/tasting/tastingSlice";
import styles from "@/pages/styles/pages.module.css";
import { TastingFormProvider, useTastingForm } from "@/pages/tastings/form-context";
import { INITIAL_VALUES, TastingSchema, type TastingT } from "@/schemas/tastings";
import { Box, Button, Group } from "@mantine/core";
import { zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditTasting = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tasting } = useAppSelector((state) => state.tasting);
  const [loading, setLoading] = useState(false);

  const form = useTastingForm({
    validateInputOnBlur: true,
    initialValues: {
      ...INITIAL_VALUES,
      ...tasting,
    },
    validate: zodResolver(TastingSchema),
  });

  useEffect(() => {
    if (!tasting) {
      navigate("/");
    }
  }, [tasting, navigate]);

  const onSubmitHandler = async (data: TastingT) => {
    setLoading(true);
    try {
      let labelUri = data.imageUrl;
      if (data.imageBlob) {
        const { error, photoUrl } = await uploadImage(data.imageBlob, "wine", data.id);
        if (!error) {
          labelUri = photoUrl;
        }
      }
      await dispatch(editTastingThunk({ ...data, imageUrl: labelUri })).unwrap();
      form.resetDirty();
      notifications.show({
        message: "Your tasting was updated.",
      });
    } catch (err) {
      console.error(err);
      notifications.show({
        color: "red",
        message: "Something went wrong updating your tasting.",
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
    <PageContainer>
      <TastingFormProvider form={form}>
        <Box className={styles.form} component="form" onSubmit={form.onSubmit(onSubmitHandler)}>
          <Box className={styles.section}>
            <DetailsTasting />
          </Box>
          <Footer showCancel showWarning={form.isDirty()}>
            <Group justify="flex-end">
              <Button loading={loading} disabled={disableSave()} type="submit">
                Save
              </Button>
            </Group>
          </Footer>
        </Box>
      </TastingFormProvider>
    </PageContainer>
  );
};

export default EditTasting;
