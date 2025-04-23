import { Button, Group, Modal } from "@mantine/core";
import { useState, type ReactNode } from "react";

import "@/components/footer/footer.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  children?: ReactNode;
  showBack?: boolean;
  showCancel?: boolean;
  showWarning?: boolean;
  backRoute?: string
}

export function Footer({ children, backRoute, showBack = false, showCancel = false, showWarning = false }: Props) {
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);

  function handleNavigate() {
    if (backRoute) {
      navigate(backRoute)
      return
    }
    navigate(-1);
  }

  function handleOnBack() {
    if (showWarning) {
      setOpenConfirm(true);
      return;
    }
    handleNavigate();
  }

  function handleConfirm() {
    setOpenConfirm(false);
    handleNavigate();
  }
  return (
    <footer className="footer">
      <Modal opened={openConfirm} onClose={() => setOpenConfirm(false)} title="Unsaved Changes" centered>
        <Modal.Body>
          <p data-testid="warning-text">Are you sure you want to leave before saving your changes?</p>
        </Modal.Body>
        <Group justify="space-between">
          <Button onClick={() => setOpenConfirm(false)} data-testid="cancel">
            Cancel
          </Button>
          <Button variant="outline" onClick={handleConfirm} data-testid="leave">
            Leave
          </Button>
        </Group>
      </Modal>
      <Group justify="space-between">
        {(showBack || showCancel) && <Button onClick={handleOnBack}>{showCancel ? "Cancel" : "Back"}</Button>}
        {children}
      </Group>
    </footer>
  );
}
