import Footer from "@/components/footer/footer.component";
import PageContainer from "@/components/page-container/page-container.component";
import { removeImage, uploadImage } from "@/database";
import { editAccountThunk } from "@/features/account/accountSlice";
import { fetchLogout } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { useFileInput } from "@/hooks/useFileInput";
import { useMobile } from "@/hooks/useMobile";
import styles from "@/pages/styles/pages.module.css";
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  FileInput,
  Group,
  List,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconTrash, IconUpload } from "@tabler/icons-react";

import { selectUserPlan } from "@/features/plan/planSelector";
import { AccountSchema, type AccountT, defaultAccount } from "@/schemas/account";
import type { PlanT } from "@/schemas/plans";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { account } = useAppSelector((state) => state.account);
  const isMobile = useMobile();
  const { file, blob, handleFileChange, imgPreview } = useFileInput();
  const [loading, setLoading] = useState(false);
  const { planList } = useAppSelector((state) => state.plan);
  const currentPlan = useAppSelector(selectUserPlan);

  const form = useForm({
    initialValues: {
      ...defaultAccount,
      ...account,
      id: account?.id ?? "",
      authId: currentUser?.uid ?? "",
      email: currentUser?.email ?? "",
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: zodResolver(AccountSchema),
  });

  useEffect(() => {
    form.setFieldValue("imageBlob", blob);
  }, [form, blob]);

  const handleLogout = async () => {
    await dispatch(fetchLogout(null));
    if (!currentUser) {
      navigate("/");
    }
  };

  const handleDeleteAvatar = async () => {
    setLoading(true);
    try {
      await removeImage(form.values.avatar);
      await dispatch(editAccountThunk({ ...form.values, avatar: "" })).unwrap();
      notifications.show({
        message: "Your avatar image has been removed.",
      });
    } catch (err: any) {
      notifications.show({
        message: "An error occurred removing your avatar.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (data: AccountT) => {
    setLoading(true);

    try {
      let avatar = data.avatar;
      if (data.imageBlob) {
        const { error, photoUrl } = await uploadImage(data.imageBlob, "account", currentUser?.uid ?? "");
        if (!error) {
          avatar = photoUrl;
        }
      }

      await dispatch(editAccountThunk({ ...data, avatar }));
      notifications.show({
        message: "Your profile was saved.",
      });
    } catch (err) {
      notifications.show({
        color: "red",
        message: "An error occurred trying to save your profile. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  async function upgradePlan(planId: string) {
    setLoading(true);
    try {
      await dispatch(editAccountThunk({ ...account, planId })).unwrap();
      notifications.show({
        message: "Your plan has been updated.",
      });
    } catch (err) {
      notifications.show({
        color: "red",
        message: "An error occurred trying to upgrade your plan. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  function getActionLabel(plan: PlanT) {
    if (account.planId === plan.id) {
      return "Current Plan";
    }

    if (currentPlan.downgradablePlans.map((id) => id.replace(/-/g, "")).includes(plan.id)) {
      return "Downgrade Plan";
    }

    if (currentPlan.upgradablePlans.map((id) => id.replace(/-/g, "")).includes(plan.id)) {
      return "Upgrade Plan";
    }

    return "";
  }

  function disableSave() {
    if (Object.keys(form.errors).length > 0 || !form.isDirty()) {
      return true;
    }
    return false;
  }

  return (
    <PageContainer title="Your Account" showBack>
      <Group justify="space-between" pl={10}>
        <Box w={400}>
          <form onSubmit={form.onSubmit(onSubmitHandler)}>
            <TextInput required mt="xs" type="firstName" label="First Name" {...form.getInputProps("firstName")} />
            <TextInput required mt="xs" type="lastName" label="Last Name" {...form.getInputProps("lastName")} />
            <TextInput mt="xs" type="email" label="Email" disabled {...form.getInputProps("email")} />
            <TextInput mt="xs" type="displayName" label="Display Name" {...form.getInputProps("displayName")} />
            <FileInput
              {...form.getInputProps("imageBlob")}
              mt="xs"
              leftSection={<IconUpload style={{ width: rem(18), height: rem(18) }} />}
              label="Avatar"
              placeholder="Upload avatar"
              value={file}
              onChange={handleFileChange}
            />
            <Footer>
              <Group style={{ width: "100%" }} justify="space-between">
                <Button onClick={handleLogout}>Sign Out</Button>
                <Button type="submit" disabled={disableSave()} loading={loading}>
                  Save
                </Button>
              </Group>
            </Footer>
          </form>
        </Box>
        <Box mr="auto" ml="auto">
          <Avatar
            color="white"
            className={styles.avatar}
            radius="lg"
            size={isMobile ? 200 : 300}
            src={imgPreview || account?.avatar}
          />
          <ActionIcon
            variant="filled"
            mt={10}
            size={36}
            loading={loading}
            disabled={!form.values.avatar}
            onClick={handleDeleteAvatar}
          >
            <IconTrash />
          </ActionIcon>
        </Box>
      </Group>
      <Group mt="30">
        <Title order={3}>Plans</Title>
        <Group grow align="stretch" h="100%">
          {[...planList]
            .sort((a, b) => a.price - b.price)
            .map((plan) => (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                maw={300}
                key={plan.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{plan.name}</Text>
                  <Badge color="secondary">${plan.price}</Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  {plan.description}
                </Text>
                <List c="dimmed">
                  <List.Item>
                    {typeof plan.maxTasting === "number"
                      ? `Save up to ${plan.maxTasting} tastings`
                      : "Unlimited Tastings"}
                  </List.Item>
                  <List.Item>
                    {typeof plan.maxWine === "number"
                      ? `Save up to ${plan.maxWine} wines in your cellar`
                      : "Unlimited Wines"}
                  </List.Item>
                </List>

                <Button
                  loading={loading}
                  disabled={plan.id === account.planId}
                  color="secondary"
                  onClick={() => upgradePlan(plan.id)}
                  fullWidth
                  mt="md"
                  radius="md"
                >
                  {getActionLabel(plan)}
                </Button>
              </Card>
            ))}
        </Group>
      </Group>
    </PageContainer>
  );
}
