import { Router } from "express";

import handleGenerateURL from "../controllers/urlController.js";
import redirectURL from "../controllers/urlRedirect.js";

const router = Router(); 

router.post("/", handleGenerateURL) ;
router.get('/:shortID', redirectURL);
export default router;