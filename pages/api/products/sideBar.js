/**
 * @author: Paiman Rasoli
 * paiman.rasoli2000@gmail.com
 */
import resolvers from "../../../utils/resolvers";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // params => demo:<required> |  featured<boolean> |
    const result = await resolvers.shopSidebarData(req.query);
    res.status(200).json({ shopSidebarData: result });
  }
}
