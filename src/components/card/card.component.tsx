import styles from "@/components/card/card.module.css";
import { getDefaultWineImage } from "@/helpers";
import type { TastingT } from "@/schemas/tastings";
import { Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface Props {
  wine: TastingT;
  url: "tastings";
  showDate?: boolean;
}

export function Card({ wine, url, showDate = false }: Props) {
  const navigate = useNavigate();
  const { id, region, date, name, imageUrl, varietals } = wine;

  return (
    <div
      key={id}
      data-testid="card-container"
      className={`${styles.glass} ${styles.container}`}
      onKeyDown={() => {
        navigate(`/${url}/${id}`);
      }}
      onClick={() => {
        navigate(`/${url}/${id}`);
      }}
    >
      {showDate && (
        <div data-testid="date" className={styles.row}>
          <Text size="xs">{dayjs(date).format("MM/DD/YYYY")}</Text>
        </div>
      )}
      <div className={styles.row}>
        <div className={styles.column}>
          <img className={styles.cardImage} src={imageUrl || getDefaultWineImage()} alt={name} />
        </div>
        <div className={styles.column}>
          <Title order={4}>{name}</Title>
          <Text size="md">{varietals.join(", ")}</Text>
          <Text size="sm">{region}</Text>
        </div>
      </div>
    </div>
  );
}
