"use client";

import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (!res?.ok) {
      setError("Invalid email or password");
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <Container maxWidth='sm'>
      <Box sx={{ mt: 8, p: 4, boxShadow: 2, borderRadius: 2 }}>
        <Typography
          variant='h4'
          gutterBottom
        >
          Login
        </Typography>

        {error && (
          <Alert
            severity='error'
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            label='Email'
            type='email'
            fullWidth
            required
            margin='normal'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label='Password'
            type='password'
            fullWidth
            required
            margin='normal'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant='contained'
            color='primary'
            fullWidth
            type='submit'
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        <Button
          variant='text'
          color='primary'
          fullWidth
          onClick={() => router.push("/register")}
          sx={{ mt: 2 }}
        >
          Dont have Account? Create one
        </Button>
        <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
}
