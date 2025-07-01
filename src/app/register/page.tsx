"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.error || "Registration failed");
    }
  };

  return (
    <Container maxWidth='sm'>
      <Box sx={{ mt: 8, p: 4, boxShadow: 2, borderRadius: 2 }}>
        <Typography
          variant='h4'
          gutterBottom
        >
          Sign Up
        </Typography>

        {error && (
          <Alert
            severity='error'
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleRegister}>
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
            Register
          </Button>
        </form>
        <Button
          variant='text'
          color='primary'
          fullWidth
          onClick={() => router.push("/login")}
          sx={{ mt: 2 }}
        >
          Already have an account? Log in
        </Button>
      </Box>
    </Container>
  );
}
