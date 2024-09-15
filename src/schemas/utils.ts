import type { WineT } from "@/schemas/cellar";
import type { TastingT } from "@/schemas/tastings";

export function isWineT(obj: WineT | TastingT): obj is WineT {
  return (obj as WineT).type === "wine";
}

export function isTastingT(obj: WineT | TastingT): obj is TastingT {
  return (obj as TastingT).type === "tasting";
}
