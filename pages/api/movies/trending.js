// pages/api/discover.js
import fetch from "node-fetch";
import { ConfigService } from "/services/config.service";

/**
 * @swagger
 * /api/trending:
 *   get:
 *     description: OK Returns a list of trending movies
 *     responses:
 *       200:
 *         description: A JSON array of trending movie objects
 */

export default async function handler(req, res) {
  const url = ConfigService.themoviedb.urls.trending; //https://api.themoviedb.org/3/trending
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ConfigService.themoviedb.keys.API_TOKEN,
    },
  };
  const apiResponse = await fetch(url, options)
    .then((r) => r.json())
    .catch((err) => console.error("error:" + err));
  res.json({ status: 200, data: apiResponse.results });
}
