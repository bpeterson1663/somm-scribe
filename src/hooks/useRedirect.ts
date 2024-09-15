import { useAppSelector } from "@/features/hooks";
import { selectUserPlan } from "@/features/plan/planSelector";
import { notifications } from "@mantine/notifications";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function useCellarRedirect() {
  const navigate = useNavigate();
  const hasRedirected = useRef(false);
  const currentPlan = useAppSelector(selectUserPlan);

  useEffect(() => {
    const onLoad = () => {
      if (!hasRedirected.current && currentPlan.maxWine === 0) {
        navigate("/");
        hasRedirected.current = true;
        notifications.show({
          color: "red",
          message: "Upgrade your plan to have access to store your wines.",
        });
      }
    };
    onLoad();
  }, [currentPlan.maxWine, navigate]);
}
