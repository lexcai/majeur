// pages/api/search/index.js
import fetch from "node-fetch";
import { ConfigService } from "/services/config.service";

/**
 * @swagger
 * basePath: '/api/search'
 * schemes:
 *   - https
 * paths:
 *   /search:
 *     get:
 *       summary: Search in The Movie Database
 *       description: Perform searches across different categories in The Movie Database.
 *       parameters:
 *         - in: query
 *           name: query
 *           type: string
 *           required: true
 *           example: "Kung Fu Panda 2"
 *           description: Search query term.
 *         - in: query
 *           name: type
 *           type: string
 *           required: true
 *           example: "movie"
 *           description: Type of search, e.g., 'movie', 'tv', 'person', 'multi'.
 *       responses:
 *         '200':
 *           description: Successful search operation.
 *           schema:
 *             type: object
 *             required:
 *               - page
 *               - results
 *               - total_results
 *               - total_pages
 *             properties:
 *               page:
 *                 type: integer
 *                 description: Current page of the search results.
 *               results:
 *                 type: array
 *                 description: List of search results.
 *                 items:
 *                   type: object
 *                   required:
 *                     - id
 *                     - name
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID of the result item.
 *                     name:
 *                       type: string
 *                       description: Name of the result item.
 *               total_results:
 *                 type: integer
 *                 description: Total number of results.
 *               total_pages:
 *                 type: integer
 *                 description: Total number of pages.
 *         '400':
 *           description: Invalid search type specified.
 *         '500':
 *           description: Internal Server Error or API call failed.
 */

export default async function handler(req, res) {
  const { query, type } = req.query;

  if (!query || !type) {
    return res.status(400).json({ message: "Query and type parameters are required" });
  }

  const baseURL = ConfigService.themoviedb.urls.search; 
  const apiKey = ConfigService.themoviedb.keys.API_TOKEN;

  // Construct the URL for the external API call
  let url = `${baseURL}/search/${encodeURIComponent(type)}?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${apiKey}`, // Use if needed
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}