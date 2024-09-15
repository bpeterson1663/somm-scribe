import type { TastingT } from "@/schemas/tastings";
import { createFormContext } from "@mantine/form";

export const [TastingFormProvider, useTastingContext, useTastingForm] = createFormContext<TastingT>();
