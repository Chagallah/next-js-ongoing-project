/**
 * @author: Paiman Rasoli
 * paiman.rasoli2000@gmail.com
 */
import resolvers from "../../../utils/resolvers";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // params => demo:<required> | limit<number> | featured<boolean> | bestSelling<boolean> | latest<boolean> | onSale<boolean> |

    const specialProducts = await resolvers.specialProducts(req.query);
    const products = await resolvers.products({
      ...req.query,
      to: Number(req?.query?.limit || 5),
      index: true,
    });
    return res.json({ specialProducts: specialProducts, products: products });
  }
}
