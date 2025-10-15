import { nanoid } from "nanoid";
import urlModel from "../models/urlModel.js"

async function handleGenerateURL(req,res){
    const body = req.body;

    if (!body || !body.url) {
        return res.status(400).json({error: "URL is required"})
    }
 
    const shortID = nanoid(10);
    await urlModel.create({
        shortID: shortID ,  
        redirectURL: body.url,
        visitHistory: [],
    }); 

    // return JSON so frontend can consume API
    return res.status(200).json({ id: shortID });

}


export default handleGenerateURL
