import { Schema, type SignUpFormT } from "@/components/sign-up-form/scehma";
import styles from "@/components/sign-up-form/sign-up-form.module.css";
import { createAccountThunk } from "@/features/account/accountSlice";
import { fetchSignUp } from "@/features/auth/authSlice";
import { fetchSignInWithGoogle } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { selectBeginnerPlan } from "@/features/plan/planSelector";
import { generateAuthErrorMessage } from "@/helpers";
import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import type { AuthError } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const plan = useAppSelector(selectBeginnerPlan());

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: zodResolver(Schema),
  });

  const onSubmitHandler = async (data: SignUpFormT) => {
    setLoading(true);
    const { password, email, firstName, lastName } = data;
    try {
      const { uid } = await dispatch(fetchSignUp({ email, password, firstName, lastName })).unwrap();
      await dispatch(
        createAccountThunk({
          firstName,
          lastName,
          authId: uid,
          email,
          displayName: "",
          avatar: "",
          id: "",
          planId: plan?.id ?? "2241b29e996448ee8acd0a3bd84ca27a",
          trialExpires: dayjs()
            .add(plan?.trialLength ?? 0, "days")
            .toDate(),
          isPaid: false,
        }),
      ).unwrap();
    } catch (err) {
      notifications.show({
        color: "red",
        message: generateAuthErrorMessage(err as AuthError),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      await dispatch(fetchSignInWithGoogle(null)).unwrap();
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
        <TextInput withAsterisk label="First Name" type="text" {...form.getInputProps("firstName")} />

        <TextInput withAsterisk label="Last Name" type="text" {...form.getInputProps("lastName")} />

        <TextInput withAsterisk label="Email" type="email" {...form.getInputProps("email")} />

        <TextInput withAsterisk label="Password" type="password" {...form.getInputProps("password")} />

        <TextInput withAsterisk label="Confirm Password" type="password" {...form.getInputProps("confirmPassword")} />
        <Group justify="center" mt="md">
          <Button loading={googleLoading} disabled={loading} onClick={handleSignUpWithGoogle}>
            Sign Up With Google
          </Button>
          <Button loading={loading} disabled={googleLoading} type="submit">
            Sign Up
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default SignUpForm;
