/**
 * @author: Paiman Rasoli
 * paiman.rasoli2000@gmail.com
 */
import resolvers from "../../../utils/resolvers";

export default async function handler(req, res) {
  if (req.method === "GET") {
    /*  slug<string><required>
     *  demo<required>
     *  onlyData<boolean><default=false>
     */
    const result = await resolvers.product(req.query);
    return res.json({ product: result });
  }
}
