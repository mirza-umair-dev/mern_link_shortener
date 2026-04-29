import express from 'express'
import {geturl, shortenUrl} from '../controllers/urlController.js';
const router = express.Router();


router.post('/api/shorten',shortenUrl);
router.get('/:shortcode',geturl)

export default router;