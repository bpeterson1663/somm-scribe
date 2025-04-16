import styles from "@/components/card/card.module.css";
import { getDefaultWineImage } from "@/helpers";
import type { TastingT } from "@/schemas/tastings";
import { Badge, Text, Title } from "@mantine/core";
import { IconTag, IconWorldStar, IconCalendarWeek } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface Props {
  wine: TastingT;
  url: "tastings";
}

export function Card({ wine, url }: Props) {
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
       
      <div className={styles.row}>
        <div className={styles.column}>
          <img className={styles.cardImage} src={imageUrl || getDefaultWineImage()} alt={name} />
        </div>

        <div className={styles.column}>
          <Title order={4}>{name}</Title>
          <Text size="s"><IconCalendarWeek size={16}/>{dayjs(date).format("MM/DD/YYYY")}</Text>
          <div className="badge-container">
          {varietals.map((varietal, idx) => (
            <Badge 
              styles={{
                root: {
                  color: '#333', 
                },
              }} 
              size="md"  
              color="primary.2" 
              leftSection={<IconTag  size={14}  />} 
              key={`${varietal}+${idx}`}>
                {varietal}
              </Badge>
          ))}
          <Badge 
            styles={{
              root: {
                color: '#333', // or any hex, rgb, theme-based value
              },
            }} 
            size="md" 
            color="primary.2" 
            leftSection={<IconWorldStar size={14} />}>
              {region}
            </Badge>
          </div>
       
        </div>
      </div>
    </div>
  );
}
