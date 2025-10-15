import { Router } from "express";


import renderHomePage from "../controllers/homeRender.js";

const router = Router(); 

// returns JSON list of stored URLs
router.get('/', renderHomePage);
export default router;