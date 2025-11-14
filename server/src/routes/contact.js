// server/src/routes/contact.js
import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

/**
 * POST /api/contact
 * Body: { artisanSlug?, name, email, subject, message }
 */
router.post("/", async (req, res) => {
  const { artisanSlug, name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "VALIDATION_ERROR" });
  }

  try {
    let artisanId = null;

    if (artisanSlug) {
      const [rows] = await pool.query(
        "SELECT id FROM artisans WHERE slug = ? LIMIT 1",
        [artisanSlug]
      );
      if (rows.length) {
        artisanId = rows[0].id;
      }
    }

    await pool.execute(
      `
      INSERT INTO contact_messages (artisan_id, name, email, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `,
      [artisanId, name, email, subject, message]
    );

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error("CONTACT ERROR", err);
    res.status(500).json({ error: "DB_ERROR" });
  }
});

// ✅ important : export par défaut
export default router;
