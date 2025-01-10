import { Router } from "express";
import * as resourceController from "../controllers/resource";

const router = Router();

router.get("/", resourceController.getResources);
router.get("/:id", resourceController.getResource);
router.post("/", resourceController.createResource);
router.put("/:id", resourceController.updateResource);
router.delete("/:id", resourceController.deleteResource);

export default router;
