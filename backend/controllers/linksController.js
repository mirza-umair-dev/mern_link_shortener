import { nanoid } from "nanoid";
import Url from "../models/Url.js";
const generateUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const baseUrl = process.env.BASE_URL;
  try {
    const existingUrl = await Url.findOne({ OriginalUrl: originalUrl });

    if (existingUrl) {
      return res.json({
        OriginalUrl: existingUrl.OriginalUrl,
        UrlId: existingUrl.UrlId,
        shortUrl: `${baseUrl}/${existingUrl.UrlId}`,
        Clicks: existingUrl.Clicks,
      });
    }

    try {
      const UrlId = nanoid(6);
      const newUrl = await Url.create({
        OriginalUrl: originalUrl,
        UrlId: UrlId,
        Clicks: 0,
      });
      return res.json({
        OriginalUrl: newUrl.OriginalUrl,
        shortUrl: `${process.env.BASE_URL}/${UrlId}`,
        UrlId: newUrl.UrlId,
        Clicks: newUrl.Clicks,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating Url" });
    }
  } catch (error) {
   return res.status(500).json({ message: "Internal server Error" });
  }
};

const getUrl = async (req, res) => {
  const { shortId } = req.params;

  try {
    const shortUrl = await Url.findOne({ UrlId: shortId });

    if (!shortUrl) {
      return res.status(400).json({ message: "UrlId Invalid" });
    }

    if (shortUrl) {
      res.status(200).json({
        OriginalUrl: shortUrl.OriginalUrl,
        shortId: shortUrl.UrlId,
        Clicks: shortUrl.Clicks,
      });
      shortUrl.Clicks++;
      await shortUrl.save();
      return res.redirect(shortUrl.OriginalUrl);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
};

export { generateUrl, getUrl };
