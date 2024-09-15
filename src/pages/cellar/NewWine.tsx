import Footer from "@/components/footer/footer.component";
import { DetailsWine, Quantity } from "@/components/form-steps";
import PageContainer from "@/components/page-container/page-container.component";
import { uploadImage } from "@/database";
import { createWineThunk, editWineThunk } from "@/features/cellar/cellarSlice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { useCellarRedirect } from "@/hooks/useRedirect";
import { WineFormProvider, useWineForm } from "@/pages/cellar/form-context";
import styles from "@/pages/styles/pages.module.css";
import { INITIAL_VALUES, WineSchema, type WineT } from "@/schemas/cellar";
import { Box, Button, Group, Stepper } from "@mantine/core";
import { zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

const STEPS = [
  {
    label: "Details",
  },
  {
    label: "Quantity",
  },
];

export default function NewWine() {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();
  const { account } = useAppSelector((state) => state.account);
  const [loading, setLoading] = useState(false);

  useCellarRedirect();

  const form = useWineForm({
    validateInputOnBlur: true,
    initialValues: {
      ...INITIAL_VALUES,
      accountId: account?.id ?? "",
    },
    validate: zodResolver(WineSchema),
  });

  const onSubmitHandler = async (data: WineT) => {
    setLoading(true);
    try {
      const { id } = await dispatch(createWineThunk({ ...data, accountId: account?.id ?? "" })).unwrap();

      if (data.imageBlob) {
        const { error, photoUrl } = await uploadImage(data.imageBlob, "wine", id);
        if (!error) {
          await dispatch(editWineThunk({ ...data, id, labelUri: photoUrl })).unwrap();
        }
      }

      form.reset();
      setActiveStep(STEPS.length);
      notifications.show({
        message: "Wine was added to your cellar.",
      });
    } catch (err) {
      console.error(err);
      notifications.show({
        message: "Something went wrong adding your wine.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setActiveStep((current) => (current < 3 ? current + 1 : current));
  };
  const handlePrevious = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    setActiveStep((current) => (current > 0 ? current - 1 : current));
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (index: number) => {
    switch (index) {
      case 0:
        return <DetailsWine />;
      case 1:
        return <Quantity />;
      default:
        break;
    }
  };

  const disableContinue = (): boolean => {
    if (
      !form.isTouched("producer") ||
      !form.isTouched("country") ||
      !form.isTouched("region") ||
      !form.isTouched("vintage") ||
      !form.isTouched("varietal")
    ) {
      return true;
    }

    if (Object.keys(form.errors).length > 0) {
      return true;
    }
    return false;
  };

  return (
    <PageContainer showCancel showWarning={form.isDirty()}>
      <WineFormProvider form={form}>
        <Box className={styles.form} component="form" onSubmit={form.onSubmit(onSubmitHandler)}>
          <Stepper active={activeStep} onStepClick={setActiveStep} allowNextStepsSelect={false}>
            {STEPS.map((step, index) => (
              <Stepper.Step key={step.label} label={step.label}>
                {getStepContent(index)}
              </Stepper.Step>
            ))}
          </Stepper>
          <Footer>
            {activeStep !== STEPS.length && (
              <Group style={{ width: "100%" }} justify="space-between">
                <Button disabled={activeStep === 0} onClick={handlePrevious}>
                  Previous
                </Button>
                {activeStep === STEPS.length - 1 ? (
                  <Button loading={loading} type="submit">
                    Submit
                  </Button>
                ) : (
                  <Button disabled={disableContinue()} name="continue" onClick={handleNext}>
                    Continue
                  </Button>
                )}
              </Group>
            )}
            {activeStep === STEPS.length && (
              <Group justify="center">
                <Button onClick={handleReset}>Add Another Entry</Button>
              </Group>
            )}
          </Footer>
        </Box>
      </WineFormProvider>
    </PageContainer>
  );
}
