import styles from "@/components/nav-bar/nav-bar.module.css";
import { useAppSelector } from "@/data/hooks";
import { useMobile } from "@/hooks/useMobile";
import { Avatar, Burger, Button, Container, Group, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const { currentUser } = useAppSelector((state) => state.auth);
  const { account } = useAppSelector((state) => state.account);

  function getInitials() {
    return account?.name[0] ?? "";
  }

  function renderNavItems() {
    if (isMobile && currentUser) {
      return (
        <Group justify="flex-end">
          <Menu shadow="md" width={200} onClose={toggle}>
            <Menu.Target>
              <Burger
                size={30}
                className={styles["menu-icon"]}
                color="white"
                opened={opened}
                onClick={toggle}
                aria-label="Open Menu"
              />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={() => navigate("/")}>Home</Menu.Item>
              <Menu.Item onClick={() => navigate("/tastings")}>Tastings</Menu.Item>
              <Menu.Divider />
              <Menu.Item onClick={() => navigate("/account")}>Account</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      );
    }

    if (currentUser) {
      return (
        <Container className={styles.inner} fluid>
          <Group>
            <Button onClick={() => navigate("/")}>Home</Button>
            <Button onClick={() => navigate("/tastings")}>Tastings</Button>
          </Group>
          <Group justify="flex-end">
            <Avatar
              color="white"
              component={Link}
              to="/account"
              className={`${styles.icon} ${styles["nav-link"]}`}
              radius="xl"
            >
              {getInitials()}
            </Avatar>
          </Group>
        </Container>
      );
    }

    return null;
  }

  return <header className={styles["nav-bar"]}>{renderNavItems()}</header>;
};

export default NavBar;
