import { Image, Title } from "@mantine/core";
import { useState } from "react";

import logo from "@/assets/images/logo/fulllogo_transparent_nobuffer.png";
import Footer from "@/components/footer/footer.component";
import SignInForm from "@/components/sign-in-form/sign-in-form.component";
import SignUpForm from "@/components/sign-up-form/sign-up-form.component";
import styles from "@/pages/styles/pages.module.css";

const SignInUp = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <main>
      <div
        style={{
          display: "flex",
          flexFlow: "wrap",
          justifyContent: "center",
          marginTop: 20,
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 500,
            padding: 20,
          }}
        >
          <Image height="300px" width="300px" src={logo} />
        </div>
        {showSignIn ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 500,
              marginTop: 20,
            }}
          >
            <Title order={3} style={{ fontSize: "1.3rem" }}>
              Sign In
            </Title>
            <SignInForm />
            <div className={styles["action-container"]}>
              Dont have an account yet?&nbsp;
              <span
                className={styles["click-here"]}
                onClick={() => {
                  setShowSignIn(false);
                }}
                onKeyDown={() => {
                  setShowSignIn(false);
                }}
              >
                {" "}
                Click Here
              </span>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 500,
              paddingBottom: 40,
            }}
          >
            <Title order={2} style={{ fontSize: "1.3rem" }}>
              Sign Up
            </Title>
            <SignUpForm />
            <div className={styles["action-container"]}>
              Already have an account?&nbsp;
              <span
                className={styles["click-here"]}
                onClick={() => {
                  setShowSignIn(true);
                }}
                onKeyDown={() => {
                  setShowSignIn(true);
                }}
              >
                {" "}
                Click Here
              </span>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default SignInUp;
