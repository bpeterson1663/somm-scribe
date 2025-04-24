
import { getDefaultWineImage } from "@/helpers";
import type { TastingT } from "@/schemas/tastings";
import { Badge, Rating, Text, Title } from "@mantine/core";
import { IconTag, IconWorldStar, IconCalendarWeek, IconCheck } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import "@/components/card/card.scss";

interface Props {
  wine: TastingT;
  url: "tastings";
}

export function Card({ wine, url }: Props) {
  const navigate = useNavigate();
  const { id, region, date, name, imageUrl, varietals, rating, wouldBuyAgain, tags } = wine;

  return (
    <div
      key={id}
      data-testid="card-container"
      className="card-container"
      onKeyDown={() => {
        navigate(`/${url}/${id}`);
      }}
      onClick={() => {
        navigate(`/${url}/${id}`);
      }}
    >
       
      <div className="row">
        <div className="column">
          <img className="card-image" src={imageUrl || getDefaultWineImage()} alt={name} />
        </div>

        <div className="column">
          <Title order={4}>{name}</Title>
          <Text className="date" size="s"><IconCalendarWeek size={16}/> {dayjs(date).format("MM/DD/YYYY")}</Text>
          <Rating className="rating" value={rating} readOnly />
          <div className="badge-container">
          {varietals.map((varietal, idx) => (
            <Badge 
              styles={{
                root: {
                  color: '#333', 
                  marginRight: '10px'
                },
              }} 
              size="md"  
              color="primary.1" 
              leftSection={<IconTag  size={14}  />} 
              key={`${varietal}+${idx}`}>
                {varietal}
              </Badge>
          ))}
          {tags.map((tag, idx) => (
            <Badge 
              styles={{
                root: {
                  color: '#333', 
                  marginRight: '10px'
                },
              }} 
              size="md"  
              color="primary.1" 
              leftSection={<IconTag  size={14}  />} 
              key={`${tag}+${idx}`}>
                {tag}
              </Badge>
          ))}
          <Badge 
            styles={{
              root: {
                color: '#333', 
                marginRight: '10px'
              },
            }} 
            size="md" 
            color="primary.1" 
            leftSection={<IconWorldStar size={14} />}>
              {region}
            </Badge>
            {wouldBuyAgain && 
            <Badge 
              styles={{
                root: {
                  color: '#333', // or any hex, rgb, theme-based value
                  marginRight: '10px'
                },
              }} 
              size="md" 
              leftSection={<IconCheck size={14} />}
              color="primary.1">

                Would Buy Again
              </Badge>
            }
          </div>
          
        </div>
      </div>
    </div>
  );
}
