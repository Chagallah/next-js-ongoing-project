/**
 * @author: Paiman Rasoli
 * paiman.rasoli2000@gmail.com
 */
import resolvers from "../../../utils/resolvers";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // params => demo:<required> | limit<number> | featured<boolean> | bestSelling<boolean> | latest<boolean> | onSale<boolean> |

    const specialProducts = await resolvers.specialProducts(req.query);
    return res.json({ specialProducts: specialProducts });
  }
}
