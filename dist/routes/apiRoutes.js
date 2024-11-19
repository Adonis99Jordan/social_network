import { Router } from "express";
const router = Router();
router.get('/api/users', (req, res) => {
    console.log(req);
    res.json({});
});
export default router;
