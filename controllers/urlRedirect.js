import URL from "../models/urlModel.js";

const redirectURL = async (req, res) => {
  try {
    const { shortID } = req.params;

    // Find the URL document
    const url = await URL.findOne({ shortID });

    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Record visit timestamp
    url.visitHistory.push({ timestamp: Date.now() });
    await url.save();

    // Redirect to the actual URL
    return res.redirect(url.redirectURL);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export default redirectURL;
