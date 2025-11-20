import express from "express";
import prisma from "../../prisma/prismaClient.js";

const router = express.Router();

// GET /sessions/validate?token=xxxxx
router.get("/validate", async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).json({ error: "token is required" });
  }

  const session = await prisma.session.findUnique({
    where: { id: token },
  });

  if (!session) {
    return res.status(401).json({ error: "Invalid session token" });
  }

  // 有効期限チェック
  if (session.expiresAt < new Date()) {
    return res.status(401).json({ error: "Session expired" });
  }

  return res.json({
    userId: session.userId,
  });
});

export default router;
