import type { WineT } from "@/schemas/cellar";
import { createFormContext } from "@mantine/form";

export const [WineFormProvider, useWineContext, useWineForm] = createFormContext<WineT>();
