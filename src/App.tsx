import { LoadingOverlay } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { type ReactNode, Suspense, lazy, useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { UserContext } from "@/context/user.context";
import { useAppDispatch, useAppSelector } from "@/data/hooks";
import { fetchPlans } from "@/api/plan";
import { fetchTastingsThunk } from "@/api/tasting";

const Layout = lazy(() => import("@/components/layout/layout.component"));

const SignInUp = lazy(() => import("@/pages/auth/SignInUp"));

const Home = lazy(() => import("@/pages/home/Home"));
const Account = lazy(() => import("@/pages/account/Account"));

const Tastings = lazy(() => import("@/pages/tastings/Tastings"));
const EditTasting = lazy(() => import("@/pages/tastings/EditTasting"));
const NewTasting = lazy(() => import("@/pages/tastings/NewTasting"));
const ViewTasting = lazy(() => import("@/pages/tastings/ViewTasting"));

const NotFound = lazy(() => import("@/pages/not-found/NotFound"));

function App() {
  const dispatch = useAppDispatch();
  const { account } = useAppSelector((state) => state.account);
  useEffect(() => {
    const onLoad = async () => {
      await dispatch(fetchPlans()).unwrap();
      if (account?.id) {
        try {
          await dispatch(fetchTastingsThunk())
        } catch (err) {
          console.error(err);
          notifications.show({
            color: "red",
            message: "An error occurred loading your tastings",
          });
        }
      }
    };
    onLoad();
  }, [dispatch, account]);

  const ProtectedRoute = ({ component }: { component: ReactNode }) => {
    const { currentUser, loading } = useContext(UserContext);

    if (loading) {
      return (
        <LoadingOverlay
          loaderProps={{ color: "red" }}
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
      );
    }
    if (!currentUser?.uid) {
      return <Navigate to="/login" replace />;
    }

    return component;
  };

  return (
    <Suspense
      fallback={
        <LoadingOverlay loaderProps={{ color: "red" }} visible zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<SignInUp />} />
          <Route index element={<ProtectedRoute component={<Home />} />} />

          <Route path="/tastings">
            <Route index element={<ProtectedRoute component={<Tastings />} />} />
            <Route path=":id" element={<ProtectedRoute component={<ViewTasting />} />} />
            <Route path="new" element={<ProtectedRoute component={<NewTasting />} />} />
            <Route path="edit" element={<ProtectedRoute component={<EditTasting />} />} />
          </Route>

          <Route path="/account">
            <Route index element={<ProtectedRoute component={<Account />} />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
