"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Alert,
  Typography,
  Stack,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { useToast } from "@/app/providers/ToastProvider";

interface LoginModalProps {
  open: boolean;
  onLoginModalCloseAction: () => void;
}

export default function LoginModal({
  open,
  onLoginModalCloseAction,
}: LoginModalProps) {
  const [error, setError] = useState("");
  const router = useRouter();
  const showToast = useToast();

  const handleCredentialLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      showToast("Login failed. Please check your credentials.", "error");
    } else {
      onLoginModalCloseAction();
      router.push("/");
      showToast("Login successfully", "success");
      router.refresh();
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <Dialog
      open={open}
      onClose={onLoginModalCloseAction}
      maxWidth='xs'
      fullWidth
    >
      <DialogTitle sx={{ paddingBottom: "0.5rem" }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h6'>Login</Typography>
          <IconButton onClick={onLoginModalCloseAction}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleCredentialLogin}>
          <Stack
            spacing={2}
            sx={{ mt: "0.4rem" }}
          >
            {error && <Alert severity='error'>{error}</Alert>}

            <TextField
              label='Email'
              type='email'
              fullWidth
              required
              name='email'
            />

            <TextField
              label='Password'
              type='password'
              fullWidth
              required
              name='password'
            />
            <Grid
              container
              flexDirection={"column"}
              alignItems={"center"}
              sx={{
                backgroundColor: "var(--background-blue)",
                border: "1px solid var(--border-blue)",
                borderRadius: "1rem",
                padding: "0.5rem",
              }}
            >
              <Grid>Demo Credentials:</Grid>
              <Grid fontSize={"0.75rem"}>demo@gmail.com</Grid>
              <Grid fontSize={"0.75rem"}>pass123</Grid>
            </Grid>

            <Button
              type='submit'
              sx={{
                borderRadius: "1rem",
                textTransform: "none",
                fontWeight: "var(--weight-medium)",
                backgroundColor: "var(--button-background)",
                color: "var(--primary-black)",
                fontSize: "0.625rem",
              }}
            >
              Login
            </Button>

            <Button
              onClick={handleGoogleLogin}
              sx={{
                borderRadius: "1rem",
                textTransform: "none",
                fontWeight: "var(--weight-medium)",
                backgroundColor: "var(--button-background)",
                color: "var(--primary-black)",
                fontSize: "0.625rem",
              }}
              startIcon={<GoogleIcon style={{ fontSize: "1rem" }} />}
            >
              Sign in with Google
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
