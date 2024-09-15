import type { WineT } from "@/schemas/cellar";
import type { TastingT } from "@/schemas/tastings";
import { useEffect, useState } from "react";

const VIEW_INCREMENT = 20;

export function useViewMore(list: TastingT[] | WineT[]) {
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [viewable, setViewable] = useState<TastingT[] | WineT[]>([]);
  const [currentCount, setCurrentCount] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setViewable(list.slice(0, VIEW_INCREMENT));
    setCurrentCount(VIEW_INCREMENT);

    if (list.length <= VIEW_INCREMENT) {
      setMoreAvailable(false);
    } else {
      setMoreAvailable(true);
    }
  }, [list]);

  useEffect(() => {
    if (search !== "") {
      const searched = list.filter(
        (wine) =>
          wine.classification.toLowerCase().includes(search.toLowerCase()) ||
          wine.producer.toLowerCase().includes(search.toLowerCase()),
      );
      setViewable(searched);
    } else {
      setViewable(list.slice(0, currentCount));
    }
  }, [search, list, currentCount]);

  function handleShowMore(lastCount: number) {
    if (search !== "") {
      const currentList = list
        .slice(0, lastCount + VIEW_INCREMENT)
        .filter(
          (wine) =>
            wine.classification.toLowerCase().includes(search.toLowerCase()) ||
            wine.producer.toLowerCase().includes(search.toLowerCase()),
        );

      setViewable(currentList);
    } else {
      const currentList = list.slice(0, lastCount + VIEW_INCREMENT);
      setViewable(currentList);
    }

    setCurrentCount(lastCount + VIEW_INCREMENT);
    if (list.length < lastCount + VIEW_INCREMENT) {
      setMoreAvailable(false);
    }
  }

  return {
    viewable,
    handleShowMore,
    moreAvailable,
    setSearch,
    search,
  };
}
