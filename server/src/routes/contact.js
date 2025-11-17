import { Router } from "express";

const router = Router();

/**
 * POST /api/contact
 * Body: { artisanSlug?, name, email, subject, message }
 */
router.post("/", (req, res) => {
  const { artisanSlug, name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "VALIDATION_ERROR" });
  }

  console.log("📩 Nouveau message (mock, sans DB) :", {
    artisanSlug: artisanSlug || "(non précisé)",
    name,
    email,
    subject,
    message,
  });

  res.status(201).json({ ok: true });
});

export default router;
