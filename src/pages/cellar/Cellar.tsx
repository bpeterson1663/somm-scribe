import { Card } from "@/components/card/card.component";
import { Footer } from "@/components/footer/footer.component";
import PageContainer from "@/components/page-container/page-container.component";
import { selectAllWines } from "@/features/cellar/cellarSelectors";
import { useAppSelector } from "@/features/hooks";
import { selectUserPlan } from "@/features/plan/planSelector";
import { useCellarRedirect } from "@/hooks/useRedirect";
import { useViewMore } from "@/hooks/useViewMore";
import styles from "@/pages/styles/pages.module.css";
import { Button, Group, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function Cellar() {
  const wineList = useAppSelector(selectAllWines);
  const { viewable, handleShowMore, moreAvailable, setSearch, search } = useViewMore(wineList);
  const navigate = useNavigate();
  const currentPlan = useAppSelector(selectUserPlan);

  useCellarRedirect();

  return (
    <PageContainer showBack title="Cellar">
      <Group justify="flex-end">
        <TextInput placeholder="Search" onChange={(e) => setSearch(e.target.value)} leftSection={<IconSearch />} />
      </Group>
      <section className={styles.list}>
        {viewable.map((wine) => (
          <Card key={wine.id} wine={wine} url="cellar" />
        ))}
      </section>
      {search === "" && (
        <div className={styles["load-more-container"]}>
          <Button disabled={!moreAvailable} variant="outline" onClick={() => handleShowMore(viewable.length)}>
            Show More
          </Button>
        </div>
      )}
      <Footer>
        <Group justify="flex-end">
          <Button
            disabled={typeof currentPlan.maxWine === "number" && wineList.length >= currentPlan.maxWine}
            onClick={() => {
              navigate("/cellar/new");
            }}
          >
            Add Wine
          </Button>
        </Group>
      </Footer>
    </PageContainer>
  );
}
