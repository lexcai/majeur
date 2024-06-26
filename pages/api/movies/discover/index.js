// pages/api//movies/discover/index.js
import fetch from "node-fetch";
import { ConfigService } from "../../../../services/config.service";

/**
 * @swagger
 * /api/movies/discover:
 *   get:
 *     summary: "Endpoint which returns a list of discovered movies."
 *     description: OK Returns a list of discovered movies used case 1096197
 *     responses:
 *       200:
 *         description: A JSON array of discovered movie objects
 */

export default async function handler(req, res) {
  const url = ConfigService.themoviedb.urls.discover; //https://api.themoviedb.org/3/discover/movie
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ConfigService.themoviedb.keys.API_TOKEN,
    },
  };
  try {
    const apiResponse = await fetch(url, options).then((r) => r.json());
    res.json({ status: 200, data: apiResponse.results });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
}
