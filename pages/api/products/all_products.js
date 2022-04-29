/**
 * @author: Paiman Rasoli
 * paiman.rasoli2000@gmail.com
 */
import resolvers from "../../../utils/resolvers";

export default async function handler(req, res) {
  if (req.method === "GET") {
    /**
     *  demo<numner><required>
     *  search: []
     *  colors:[],
     *  sizes: [],
     *  brands:[],
     *  min_price: Int
     *  max_price: Int,
     *  category: String,
     *  tag: String,
     *  sortBy: String, values => 'popularity' , 'rating' , 'price', 'price-desc'
     *  from: Int,
     *  to: Int,
     *  list: Boolean = false
     */
    const result = await resolvers.products(req.query);
    return res.json({products: result});
  }
}
