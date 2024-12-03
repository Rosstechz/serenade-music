import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controller/admin.controller.js";

const router = Router();

router.use(protectRoute, requireAdmin); // by default called before other function to check if admin or not

router.get("/check", checkAdmin); // general check if user is admin or not

// create song
router.post("/songs", createSong);

// delete song
router.delete("/songs/:id", deleteSong);

// create album
router.post("/album", createAlbum);

// delete album
router.delete("/album/:id", deleteAlbum);

export default router;
