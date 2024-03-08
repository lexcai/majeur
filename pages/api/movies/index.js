// pages/api/movies/index.js
import clientPromise from "/lib/mongodb";
import { ConfigService } from "/services/config.service";

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Retrieve a list of trending movies.
 *     description: Endpoint that returns a paginated list of trending movies from The Movie Database.
 *     responses:
 *       200:
 *         description: A list of trending movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The movie database ID of the movie.
 *                         example: 550
 *                       title:
 *                         type: string
 *                         description: The title of the movie.
 *                         example: Fight Club
 *                       popularity:
 *                         type: number
 *                         description: The popularity score of the movie.
 *                         example: 22.4
 *                       overview:
 *                         type: string
 *                         description: A brief summary of the movie.
 *                         example: "A ticking-time-bomb insomniac..."
 *                       poster_path:
 *                         type: string
 *                         description: The path to the movie's poster image.
 *                         example: "/path/to/poster.jpg"
 *                       genre_ids:
 *                         type: array
 *                         description: An array of genre ids associated with the movie.
 *                         items:
 *                           type: integer
 *                         example: [18, 28]
 *       400:
 *         description: Invalid request parameters.
 *       404:
 *         description: Movies not found.
 */
export default async function handler(req, res) {
  const url = ConfigService.themoviedb.urls.trending; // Replace with the actual URL
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ConfigService.themoviedb.keys.API_TOKEN,
    },
  };

  try {
    const apiResponse = await fetch(url, options).then((r) => r.json());
    res.status(200).json({ status: 200, data: apiResponse.results });
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
}
