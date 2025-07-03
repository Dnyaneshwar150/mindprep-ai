// LoginModal.tsx
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserIfNotExist } from "@/app/actions/authActions";
import { signIn } from "next-auth/react";
// Import your new server actions

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

  const handleCredentialLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    // Step 1: Call server action to create user if not exist
    const result = await createUserIfNotExist(formData);

    if (result?.error) {
      setError(result.error);
      return;
    }

    // Step 2: Call signIn (must be done on the client)
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Login failed. Please check your credentials.");
    } else {
      onLoginModalCloseAction();
      router.push("/"); // redirect manually
      router.refresh();
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" }); // no await needed here
  };

  return (
    <Dialog
      open={open}
      onClose={onLoginModalCloseAction}
      maxWidth='xs'
      fullWidth
    >
      <DialogTitle>
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
          <Stack spacing={2}>
            {error && <Alert severity='error'>{error}</Alert>}

            <TextField
              label='Email'
              type='email'
              fullWidth
              required
              name='email' // IMPORTANT: Add name attribute for FormData
            />

            <TextField
              label='Password'
              type='password'
              fullWidth
              required
              name='password' // IMPORTANT: Add name attribute for FormData
            />

            <Button
              type='submit'
              variant='contained'
              fullWidth
            >
              Login
            </Button>

            <Button
              type='button'
              onClick={handleGoogleLogin}
              variant='outlined'
              fullWidth
            >
              Sign in with Google
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
