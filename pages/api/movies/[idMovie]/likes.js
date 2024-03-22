// pages/api/movies/[idMovie]/likes.js

import clientPromise from "/lib/mongodb";

/**
 * @swagger
 * /api/movies/{idMovie}/likes:
 *   get:
 *     summary: "Endpoint which returns likes for a specific movie by its ID."
 *     description: "Endpoint which returns likes for a specific movie by its ID. used case 1096197"
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1096197
 *     responses:
 *       200:
 *         description: "A list of likes for the specified movie."
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
 *                     likes:
 *                       type: object
 *       400:
 *         description: "Invalid request parameters."
 *       404:
 *         description: "Movie not found."
 *   patch:
 *     summary: "Endpoint which increments the like counter for a specific movie by its ID."
 *     description: "Endpoint which increments the like counter for a specific movie by its ID. used case 1096197"
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1096197
 *     responses:
 *       201:
 *         description: "The like counter was incremented successfully."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     action:
 *                       type: string
 *                       example: "likeCounter incremented"
 *                     idMovie:
 *                       type: integer
 *                       example: 1096197
 *                     matchedCount:
 *                       type: integer
 *                       example: 1
 *                     modifiedCount:
 *                       type: integer
 *                       example: 1
 *       405:
 *         description: "Method Not Allowed"
 */

export default async function handler(req, res) {
  const idMovie = parseInt(req.query.idMovie, 10);
  const client = await clientPromise;
  const db = client.db("ynov-cloud");
  switch (req.method) {
    case "PATCH":
      const like = await db.collection("likes").findOne({ idTMDB: idMovie });
      let resMongo, data;
      if (like) {
        resMongo = await db
          .collection("likes")
          .updateOne({ idTMDB: idMovie }, { $inc: { likeCounter: 1 } });
        data = {
          action: "likeCounter incremented",
          idMovie: idMovie,
          matchedCount: resMongo.matchedCount,
          modifiedCount: resMongo.modifiedCount,
        };
        res.status(201).json({ status: 201, data: data });
      } else {
        resMongo = await db
          .collection("likes")
          .insertOne({ idTMDB: idMovie, likeCounter: 0 });
        data = {
          action: "likeCounter created",
          idMovie: idMovie,
          insertedId: resMongo.insertedId,
        };
        res.status(201).json({ status: 201, data: data });
      }
      break;
    case "GET":
      const likes = await db.collection("likes").findOne({ idTMDB: idMovie });
      res.json({ status: 200, data: { likes: likes } });
      break;
    default:
      res.status(405).json({ status: 405, error: "Method Not Allowed" });
  }
}
