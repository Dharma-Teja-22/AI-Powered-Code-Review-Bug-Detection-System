import Codereview from "../models/codereview.model.js";

export async function pingTest(req, res) {
  console.log("Ping Test is Called!");
  return res.status(200).send("Ping Test Calling...");
}

export async function fetchCodeReviewResponse(req, res) {
  try {
    const { lang, code } = req.body;    
    const response = await Codereview.fetchCodeReviewResponse(lang, code);
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Failed to get the response");
  }
}
