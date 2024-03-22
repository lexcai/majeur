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
  // Get the search query term and type from the request query parameters
  const { query, type } = req.query;
  // Set the base URL for The Movie Database API
  // exemple : https://www.themoviedb.org/search/movie?query=Kung%20Fu%20Panda%202

  const baseURL = ConfigService.themoviedb.urls.search;
  const apiKey = ConfigService.themoviedb.keys.API_TOKEN;

  // Create the URL for the external API call based on the type of search
  let url;
  switch (type) {
    case "movie":
      url = `${baseURL}/movie?query=${type}`;
      break;
    case "tv":
      url = `${baseURL}/tv?query=${type}`;
      break;
    case "person":
      url = `${baseURL}/person?query=${type}`;
      break;
    case "multi":
      url = `${baseURL}/multi?query=${type}`;
      break;
    // Add other cases as needed
    default:
      return res.status(400).json({ message: "Invalid search type specified" });
  }
  //   switch (type) {
  //     case "movie":
  //       url = `${baseURL}/${type}?query=${query}`;
  //       break;
  //     case "tv":
  //       url = `${baseURL}/${type}?query=${query}`;
  //       break;
  //     case "person":
  //       url = `${baseURL}/${type}?query=${query}`;
  //       break;
  //     case "multi":
  //       url = `${baseURL}/${type}?query=${query}`;
  //       break;
  //     // Add other cases as needed
  //     default:
  //       return res.status(400).json({ message: "Invalid search type specified" });
  //   }

  try {
    // Make the external API call
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`, // If needed, use the Bearer token here
      },
    });

    if (!response.ok) {
      // If the response from the external API is not okay, throw an error
      throw new Error(`API call failed with status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();

    // Return the data from the external API
    res.status(200).json(data);
  } catch (error) {
    // If there's any error in the process, return a 500 status with the error message
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
