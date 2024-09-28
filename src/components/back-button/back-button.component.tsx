import { Button, Group, Modal } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  label?: "Back" | "Cancel";
  showWarning?: boolean;
}

export function BackButton({ label = "Back", showWarning }: Props) {
  const navigate = useNavigate();
  const [openConfirm, setOpenConfirm] = useState(false);

  function handleNavigate() {
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
    <>
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
      <Button data-testid="back" p={5} mt={5} variant="subtle" onClick={handleOnBack}>
        <IconArrowLeft height={20} /> {label}
      </Button>
    </>
  );
}
