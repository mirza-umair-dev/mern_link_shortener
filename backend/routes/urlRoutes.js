import express from 'express'
import {geturl, getUrlHistory, shortenUrl} from '../controllers/urlController.js';
const router = express.Router();


router.post('/api/shorten',shortenUrl);
router.get('/:shortcode',geturl)
router.get('/api/urls',getUrlHistory);

export default router;