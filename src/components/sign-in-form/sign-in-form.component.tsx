import { Schema, type SignInFormT } from "@/components/sign-in-form/scema";
import styles from "@/components/sign-in-form/sign-in-form.module.css";
import { fetchLogin, fetchSignInWithGoogle } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { generateAuthErrorMessage } from "@/helpers";
import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import type { AuthError } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: zodResolver(Schema),
  });

  const onSubmitHandler = async (data: SignInFormT) => {
    setLoading(true);
    const { password, email } = data;
    try {
      await dispatch(fetchLogin({ email, password })).unwrap();
    } catch (err) {
      console.error(err);
      notifications.show({
        color: "red",
        message: generateAuthErrorMessage(err as AuthError),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      await dispatch(fetchSignInWithGoogle(null));
    } catch (err) {
      console.error(err);
      notifications.show({
        message: generateAuthErrorMessage(err as AuthError),
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Box className={styles.container}>
      <form onSubmit={form.onSubmit(onSubmitHandler)}>
        <TextInput
          withAsterisk
          type="email"
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <TextInput withAsterisk label="Password" type="password" {...form.getInputProps("password")} />

        <Group justify="center" mt="md">
          <Button loading={googleLoading} disabled={loading} onClick={handleSignInWithGoogle}>
            Sign In With Google
          </Button>
          <Button loading={loading} disabled={googleLoading} type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default SignInForm;
