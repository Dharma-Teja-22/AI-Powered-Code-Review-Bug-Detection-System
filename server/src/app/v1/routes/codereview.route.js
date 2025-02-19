import express from 'express'
import { fetchCodeReviewResponse, pingTest } from '../controllers/codereview.controller.js';
const router = express.Router();

router.route('/pingTest').get(pingTest)
router.route('/review').post(fetchCodeReviewResponse)

export default router;