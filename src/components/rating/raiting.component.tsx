import { rem } from "@mantine/core";

import { IconMoodCrazyHappy, IconMoodCry, IconMoodHappy, IconMoodSad, IconMoodSmile } from "@tabler/icons-react";

const getIconStyle = (color?: string) => ({
  width: rem(24),
  height: rem(24),
  color: color ? `var(--mantine-color-${color}-7)` : undefined,
});

const RatingIcon = ({ rating }: { rating: number }) => {
  switch (rating * 1) {
    case 1:
      return <IconMoodCry style={getIconStyle("red")} />;
    case 2:
      return <IconMoodSad style={getIconStyle("orange")} />;
    case 3:
      return <IconMoodSmile style={getIconStyle("yellow")} />;
    case 4:
      return <IconMoodHappy style={getIconStyle("lime")} />;
    case 5:
      return <IconMoodCrazyHappy style={getIconStyle("green")} />;
    default:
      return <IconMoodSmile style={getIconStyle("yellow")} />;
  }
};

export default RatingIcon;
