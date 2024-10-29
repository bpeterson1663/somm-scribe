import { Card } from "@/components/card/card.component";
import { Footer } from "@/components/footer/footer.component";
import PageContainer from "@/components/page-container/page-container.component";
import { selectAllWines } from "@/features/cellar/cellarSelectors";
import { useAppSelector } from "@/features/hooks";
import { selectUserPlan } from "@/features/plan/planSelector";
import { selectAllTastings } from "@/features/tasting/tastingSelectors";
import styles from "@/pages/styles/pages.module.css";
import { Button, Group, Stack, Title } from "@mantine/core";
// import { driver } from "driver.js";
import { useNavigate } from "react-router-dom";
import "driver.js/dist/driver.css";

// const driverObj = driver({
//   showProgress: true,
//   steps: [
//     {
//       element: "#your-tastings",
//       popover: {
//         title: "View All Your Tastings",
//         description: "Here is the code example showing animated tour. Let's walk you through it.",
//         side: "left",
//         align: "start",
//       },
//     },
//     {
//       element: "#add-tastings",
//       popover: {
//         title: "Start by adding your first tasting",
//         side: "bottom",
//         align: "start",
//       },
//     },
//     {
//       element: "code .line:nth-child(2)",
//       popover: {
//         title: "Importing CSS",
//         description: "Import the CSS which gives you the default styling for popover and overlay.",
//         side: "bottom",
//         align: "start",
//       },
//     },
//     {
//       element: "code .line:nth-child(4) span:nth-child(7)",
//       popover: {
//         title: "Create Driver",
//         description: "Simply call the driver function to create a driver.js instance",
//         side: "left",
//         align: "start",
//       },
//     },
//     {
//       element: "code .line:nth-child(18)",
//       popover: {
//         title: "Start Tour",
//         description: "Call the drive method to start the tour and your tour will be started.",
//         side: "top",
//         align: "start",
//       },
//     },
//     {
//       element: 'a[href="/docs/configuration"]',
//       popover: {
//         title: "More Configuration",
//         description: "Look at this page for all the configuration options you can pass.",
//         side: "right",
//         align: "start",
//       },
//     },
//     {
//       popover: {
//         title: "Happy Coding",
//         description: "And that is all, go ahead and start adding tours to your applications.",
//       },
//     },
//   ],
// });

export default function Home() {
  const navigate = useNavigate();
  const tastingList = useAppSelector(selectAllTastings);
  const { publicTastingList } = useAppSelector((state) => state.tasting);
  const wineList = useAppSelector(selectAllWines);
  const currentPlan = useAppSelector(selectUserPlan);
  const sortedPublicList = [...publicTastingList].sort((a, b) =>
    b.date.toISOString().localeCompare(a.date.toISOString()),
  );

  // driverObj.drive();

  return (
    <PageContainer>
      <Stack>
        {sortedPublicList.length > 0 && (
          <Group>
            <Title order={4}>What people are tasting</Title>
            <section className={styles["preview-list"]}>
              {sortedPublicList.map((tasting) => (
                <Card key={tasting.id} wine={tasting} url="tastings" showDate />
              ))}
            </section>
          </Group>
        )}
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

        {currentPlan.maxWine !== 0 && (
          <Group pl={20} pr={20}>
            <Group justify="space-between" w="100%">
              <Title order={4}>Your cellar</Title>
              <Button variant="outline" size="xs" onClick={() => navigate("/cellar")}>
                View All
              </Button>
            </Group>
            <section className={styles["preview-list"]}>
              {wineList.slice(0, 10).map((wine) => (
                <Card key={wine.id} wine={wine} url="cellar" />
              ))}
            </section>
          </Group>
        )}
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
          {currentPlan.maxWine !== 0 && (
            <Button
              disabled={typeof currentPlan.maxWine === "number" && wineList.length >= currentPlan.maxWine}
              onClick={() => navigate("/cellar/new")}
            >
              Add Wine
            </Button>
          )}
        </Group>
      </Footer>
    </PageContainer>
  );
}
