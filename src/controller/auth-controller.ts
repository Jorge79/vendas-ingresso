import { Router } from "express";

import { AuthService, InvalidCredentialsError } from "../services/auth-service";

export const authRoutes = Router();

authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const authService = new AuthService();

  try {
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (err) {
    console.error(err);

    if (err instanceof InvalidCredentialsError) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
});
