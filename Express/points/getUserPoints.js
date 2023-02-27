import { connectDatabase } from "../pool.js";
const pool = connectDatabase();

export default async function getUserPoints(collector_id) {
  const result = await pool.query(
    `SELECT COALESCE(SUM(a.comment_points) + pl.like_points - COALESCE(uc.total_paid_points, 0)
                  , 0) AS points 
            FROM collector c
            LEFT JOIN (
            SELECT    LEAST(COUNT(comment_id) * 2, 10) AS comment_points
                      , collector_id
            FROM      comments 
            WHERE     collector_id = $1 
            GROUP BY  Date(created_at), collector_id
            ) a ON c.collector_id = a.collector_id
            LEFT JOIN (
            SELECT    COUNT(post_like_id) * 3 AS like_points
                , collector_id
            FROM      post_likes pl
            WHERE     collector_id = $1
            GROUP BY  collector_id
            ) pl ON pl.collector_id = pl.collector_id
            LEFT JOIN   (
            SELECT    COALESCE(SUM(paid_points), 0) AS total_paid_points, collector_id
            FROM      unlocked_collections
            WHERE     collector_id = $1
            GROUP BY  collector_id
            ) uc ON c.collector_id = uc.collector_id 
            WHERE       c.collector_id = $1
            GROUP BY    pl.like_points, uc.total_paid_points;`,
    [collector_id]
  );
  return Number(result.rows[0].points);
}
