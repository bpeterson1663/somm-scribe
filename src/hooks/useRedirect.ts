import { notifications } from "@mantine/notifications";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function useCellarRedirect() {
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  useEffect(() => {
    const onLoad = () => {
      if (!hasRedirected.current) {
        navigate("/");
        hasRedirected.current = true;
        notifications.show({
          color: "red",
          message: "Upgrade your plan to have access to store your wines.",
        });
      }
    };
    onLoad();
  }, [navigate]);
}
