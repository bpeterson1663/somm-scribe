import type { ReactNode } from "react";
import { Container } from "@mantine/core";

import "@/components/page-container/page-container.scss";

interface Props {
  children?: ReactNode;
}

export default function PageContainer({
  children,
}: Props) {

  return (
    <main className="main">
      <Container p={0} mr={0} mt="md" maw="100%">
        {children}
      </Container>
    </main>
  );
}
