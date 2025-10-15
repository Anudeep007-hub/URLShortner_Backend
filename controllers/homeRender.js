import URL from "../models/urlModel.js";


async function renderHomePage(req,res) {
    const allurls = await URL.find({});

    // Return JSON list instead of rendering EJS
    return res.status(200).json({ urls: allurls });
} 

export default renderHomePage;

