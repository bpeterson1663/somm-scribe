import { Card } from "@/components/card/card.component";
import { Footer } from "@/components/footer/footer.component";
import PageContainer from "@/components/page-container/page-container.component";
import { useAppSelector } from "@/features/hooks";
import { selectUserPlan } from "@/features/plan/planSelector";
import { selectAllTastings } from "@/features/tasting/tastingSelectors";
import styles from "@/pages/styles/pages.module.css";
import { Button, Group, Stack, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const tastingList = useAppSelector(selectAllTastings);
  const currentPlan = useAppSelector(selectUserPlan);

  return (
    <PageContainer>
      <Stack>
        <Group pl={20} pr={20}>
          <Group justify="space-between" w="100%">
            <Title order={4}>Your tastings</Title>
            <Button id="your-tastings" variant="outline" size="xs" onClick={() => navigate("/tastings")}>
              View All
            </Button>
          </Group>

          <section className={styles["preview-list"]}>
            {tastingList.slice(0, 10).map((tasting) => (
              <Card key={tasting.id} wine={tasting} url="tastings" showDate />
            ))}
          </section>
        </Group>
      </Stack>
      <Footer>
        <Group justify="flex-end">
          <Button
            disabled={typeof currentPlan.maxTasting === "number" && tastingList.length >= currentPlan.maxTasting}
            onClick={() => navigate("/tastings/new")}
            id="add-tastings"
          >
            Add Tasting
          </Button>
        </Group>
      </Footer>
    </PageContainer>
  );
}
