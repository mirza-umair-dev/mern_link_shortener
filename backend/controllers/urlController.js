import { nanoid } from "nanoid";
import Url from "../models/Url.js";

const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ success: false, error: "No url found!" });
  }

  const existingUrl = await Url.findOne({ OriginalUrl: originalUrl });

  if (existingUrl) {
    return res.status(200).json({
      OriginalUrl: existingUrl.OriginalUrl,
      shortUrl: `${process.env.BASE_URL}/${existingUrl.UrlId}`,
      UrlId: existingUrl.UrlId,
      Clicks: existingUrl.Clicks,
    });
  }
  //new
  try {
  
  const UrlId = nanoid(6);
  const newUrl = await Url.create({
    OriginalUrl: originalUrl,
    UrlId: UrlId,
    Clicks: 0,
  });

  res.json({
    OriginalUrl: newUrl.OriginalUrl,
    shortUrl: `${process.env.BASE_URL}/${UrlId}`,
    UrlId: newUrl.UrlId,
    Clicks: newUrl.Clicks,
  });
}
  catch (error) {
    return res.status(500).json({
      sucsess: false,
      error: "Server Error",
    });
  }
};

const geturl = async (req,res) => {
    const {shortcode} = req.params;

    try {

        const url = await Url.findOne({UrlId:shortcode});

         if (!url) {
      return res.status(404).send("URL not found");
    }

    url.Clicks++;
    await url.save();


    return res.redirect(url.OriginalUrl);
        
    } catch (error) {
        console.error(error)
    }
}

const getUrlHistory = async (req,res) => {
  try {
    const Urls = await Url.find();
    res.json(Urls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export {shortenUrl,geturl,getUrlHistory};