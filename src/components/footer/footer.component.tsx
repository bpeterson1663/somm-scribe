import { Group } from "@mantine/core";
import type { ReactNode } from "react";

import styles from "@/components/footer/footer.module.css";

interface Props {
  children?: ReactNode;
}

export function Footer({ children }: Props) {
  return (
    <footer className={styles.footer}>
      <Group justify="flex-end">{children}</Group>
    </footer>
  );
}
