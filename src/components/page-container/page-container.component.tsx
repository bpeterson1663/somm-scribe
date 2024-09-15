import { Container, Title } from "@mantine/core";
import type { ReactNode } from "react";

import { BackButton } from "@/components/back-button/back-button.component";
import styles from "@/components/page-container/page-container.module.css";

interface Props {
  children?: ReactNode;
  title?: string;
  showBack?: boolean;
  showCancel?: boolean;
  showWarning?: boolean;
}

export default function PageContainer({
  children,
  title = "",
  showBack = false,
  showCancel = false,
  showWarning = false,
}: Props) {
  return (
    <main className={styles.main}>
      {(showBack || showCancel) && <BackButton showWarning={showWarning} label={showCancel ? "Cancel" : "Back"} />}
      <header className={styles["header-row"]}>{title && <Title order={2}> {title} </Title>}</header>

      <Container mx={0} px={0}>
        {children}
      </Container>
    </main>
  );
}
