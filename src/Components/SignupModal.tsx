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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import CommonButton from "./ui/CommonButton";

interface SignupModalProps {
  open: boolean;
  onCloseAction: () => void;
}

export default function SignupModal({ open, onCloseAction }: SignupModalProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (loginRes?.ok) {
        onCloseAction();
        router.refresh();
      } else {
        setError("Signup successful but login failed.");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onCloseAction}
      maxWidth='xs'
      fullWidth
    >
      <DialogTitle>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h6'>Sign Up</Typography>
          <IconButton onClick={onCloseAction}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <form>
          <Stack spacing={2}>
            {error && <Alert severity='error'>{error}</Alert>}

            <TextField
              label='Email'
              type='email'
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label='Password'
              type='password'
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <CommonButton
              disabled={loading}
              onClick={handleSignup}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </CommonButton>

            <Button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              variant='outlined'
              fullWidth
              sx={{
                color: "black",
              }}
            >
              Sign up with Google
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
