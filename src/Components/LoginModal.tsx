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

interface LoginModalProps {
  open: boolean;
  onLogonModalCloseAction: () => void;
  setShowLoginModalAction: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignupModalAction: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function LoginModal({
  open,
  onLogonModalCloseAction,
  setShowLoginModalAction,
  setShowSignupModalAction,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res?.ok) {
      setError("Invalid email or password");
    } else {
      onLogonModalCloseAction(); // ✅ Close modal
      router.refresh(); // ✅ Refresh session UI
    }
  };

  const goodlehandleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
    onLogonModalCloseAction();
  };

  return (
    <Dialog
      open={open}
      onClose={onLogonModalCloseAction}
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
          <IconButton onClick={onLogonModalCloseAction}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleLogin}>
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

            <CommonButton onClick={handleLogin}>Login</CommonButton>

            <CommonButton onClick={goodlehandleSignIn}>
              Sign in with Google
            </CommonButton>

            <Button
              variant='text'
              fullWidth
              onClick={() => {
                onLogonModalCloseAction(); // close login modal
                setShowLoginModalAction(false); // open signup modal
                setShowSignupModalAction(true);
              }}
            >
              Don&apos;t have an account? Sign up
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
