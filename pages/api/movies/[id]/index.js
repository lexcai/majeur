import fetch from "node-fetch";
import clientPromise from "/lib/mongodb";
import { ConfigService } from "/services/config.service";

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary : Endpoint which returns details for a specific movie by its ID.
 *     description: Endpoint which returns details for a specific movie by its ID. used case 1096197
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1096197
 *         description: The ID of the movie to fetch details for.
 *     responses:
 *       200:
 *         description: A list of details for the specified movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     details:
 *                       type: array
 *       400:
 *         description: Invalid request parameters.
 *       404:
 *         description: Movie not found.
 */

export default async function handler(req, res) {
  const id = parseInt(req.query.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ status: 400, error: "Invalid movie ID" });
  }

  const url = `${ConfigService.themoviedb.urls.movie}/${id}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ConfigService.themoviedb.keys.API_TOKEN,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json({ status: 200, data });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}
