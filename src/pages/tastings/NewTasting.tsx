import { Footer } from "@/components/footer/footer.component";
import { DetailsTasting } from "@/components/form-steps";
import PageContainer from "@/components/page-container/page-container.component";
import { uploadImage } from "@/database";
import { useAppDispatch, useAppSelector } from "@/data/hooks";
import { createTastingThunk, editTastingThunk } from "@/api/tasting";
import styles from "@/pages/styles/pages.module.css";
import { TastingFormProvider, useTastingForm } from "@/pages/tastings/form-context";
import { INITIAL_VALUES, TastingSchema, type TastingT } from "@/schemas/tastings";
import { Box, Button } from "@mantine/core";
import { zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

const NewTasting = () => {
  const dispatch = useAppDispatch();
  const { account } = useAppSelector((state) => state.account);
  const [isLoading, setIsLoading] = useState(false);

  const form = useTastingForm({
    validateInputOnBlur: true,
    initialValues: {
      ...INITIAL_VALUES,
      accountId: account?.id ?? "",
    },
    validate: zodResolver(TastingSchema),
  });

  const onSubmitHandler = async (data: TastingT) => {
    setIsLoading(true);
    try {
      const { id } = await dispatch(createTastingThunk({ ...data, accountId: account?.id ?? "" })).unwrap();

      if (data.imageBlob) {
        const { error, photoUrl } = await uploadImage(data.imageBlob, "wine", id);
        if (!error) {
          await dispatch(editTastingThunk({ ...data, id, imageUrl: photoUrl })).unwrap();
        }
      }

      form.reset();

      notifications.show({
        message: "Your tasting notes were saved.",
      });
    } catch (err) {
      console.error(err);
      notifications.show({
        color: "red",
        message: "Something went wrong creating your tasting notes.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <TastingFormProvider form={form}>
        <Box className={styles.form} component="form" onSubmit={form.onSubmit(onSubmitHandler)}>
          <DetailsTasting />
          <Footer backRoute="/tastings" showBack showWarning={form.isTouched()}>
            <Button loading={isLoading} type="submit" style={{ mt: 1, mr: 1 }}>
              Save
            </Button>
          </Footer>
        </Box>
      </TastingFormProvider>
    </PageContainer>
  );
};

export default NewTasting;
