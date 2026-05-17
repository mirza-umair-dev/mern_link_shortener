import express from 'express'
import {geturl, getUrlHistory, shortenUrl} from '../controllers/urlController.js';
import { generateUrl, getUrl } from '../controllers/linksController.js';
const router = express.Router();


router.post('/api/shorten',generateUrl);   //shortenUrl
router.get('/:shortcode',getUrl)                  //geturl
router.get('/api/urls',getUrlHistory);

export default router;