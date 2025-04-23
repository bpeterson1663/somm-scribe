import { Footer } from "@/components/footer/footer.component";
import PageContainer from "@/components/page-container/page-container.component";
import { editAccountThunk } from "@/features/account/accountSlice";
import { fetchLogout } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import {

  Badge,
  Box,
  Button,
  Card,
  Group,
  List,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { selectUserPlan } from "@/features/plan/planSelector";
import { AccountSchema, type AccountT, defaultAccount } from "@/schemas/account";
import type { PlanT } from "@/schemas/plans";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { account } = useAppSelector((state) => state.account);
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

  const handleLogout = async () => {
    await dispatch(fetchLogout(null));
    if (!currentUser) {
      navigate("/");
    }
  };

  const onSubmitHandler = async (data: AccountT) => {
    setLoading(true);

    try {
      await dispatch(editAccountThunk({ ...data }));
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
    <PageContainer>
      <Group justify="space-between" pl={10}>
        <Title order={2}>Your Account</Title>
        <Box w={400}>
          <form onSubmit={form.onSubmit(onSubmitHandler)}>
            <TextInput required mt="xs" type="name" label="Name" {...form.getInputProps("name")} />
            <TextInput mt="xs" type="email" label="Email" disabled {...form.getInputProps("email")} />
            <Footer showBack>
              <Group justify="space-between">
                <Button onClick={handleLogout}>Sign Out</Button>
                <Button type="submit" disabled={disableSave()} loading={loading}>
                  Save
                </Button>
              </Group>
            </Footer>
          </form>
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
