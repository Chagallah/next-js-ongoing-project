/**
 * @author: Paiman Rasoli
 * paiman.rasoli2000@gmail.com
 */
import {
  getMinMaxPrice,
  isSaleProduct,
  getFamilyTree,
  getCategoryTree,
} from "./helpers";

const resolvers = {
  products: async (args) => {
    const sizes = args?.sizes ? args.sizes.split(",") : [];
    const colors = args?.colors ? args.colors.split(",") : [];
    const demoData = await import(`../data/demo${args.demo}`);
    let products = demoData.products.map((product) => {
      return { ...product, price: getMinMaxPrice(product) };
    });
    let tree = [],
      parentTree = [];
    if (args.category) {
      const category = demoData.productCategories.find(
        (cat) => cat.slug === args.category
      );
      category &&
        (tree = getCategoryTree(demoData.productCategories, [category]));
      category &&
        (parentTree = getFamilyTree(demoData.productCategories, category));
    }
    if (!args?.index) {
      products = products.filter((item) => {
        let flag = true;

        if (args?.search) {
          flag = item.name.toLowerCase().includes(args.search.toLowerCase());
        }

        if (flag && args?.category) {
          flag = item.categories.find((cat) =>
            tree.find((findCat) => findCat.slug === cat.slug)
          );
        }

        if (flag && args?.tag) {
          flag = item.tags && item.tags.find((tag) => tag.slug === args.tag);
        }
        if (flag && (colors.length || sizes.length)) {
          flag = item.variants.find(
            (variant) =>
              (!colors.length ||
                (variant.color &&
                  colors.find((color) => color === variant.color.name))) &&
              (!sizes.length ||
                (variant.size &&
                  sizes.find((size) => size === variant.size.size)))
          );
        }

        if (flag && args?.brands?.length) {
          flag =
            item.brands &&
            item.brands.find((brand) =>
              args.brands.find((slug) => slug === brand.slug)
            );
        }

        if (flag && args?.min_price && args?.max_price) {
          flag =
            item.price[0] >= Number(args.min_price) &&
            item.price[0] <= Number(args.max_price);
        }

        if (flag && args?.ratings?.length) {
          flag =
            args.ratings &&
            args.ratings.find((rating) => rating === item.ratings);
        }

        return flag;
      });
    }
    switch (args.sortBy) {
      case "popularity":
        products = products.sort((a, b) => b.sale_count - a.sale_count);
        break;
      case "rating":
        products = products.sort((a, b) => b.ratings - a.ratings);
        break;
      case "price":
        products = products.sort((a, b) => a.price[0] - b.price[0]);
        break;
      case "price-desc":
        products = products.sort((a, b) => b.price[0] - a.price[0]);
        break;
      case "date":
      case "default":
      default:
        break;
    }
    return {
      data: products.slice(Number(args?.from || 0), Number(args?.to || 12)),
      total: products.length,
      categoryFamily: parentTree,
    };
  },
  product: async (args) => {
    const demoData = await import(`../data/demo${args.demo}`);
    const products = demoData.products.map((product) => {
      return { ...product, price: getMinMaxPrice(product) };
    });
    const product = products.find((product) => product.slug === args.slug);

    if (args?.onlyData === "true") {
      return { data: product };
    } else {
      const categoryTree = getCategoryTree(
        demoData.productCategories,
        product.categories
      );
      const relatedProducts = products.filter((item) => {
        return item.categories.find((cat) =>
          categoryTree.find((findCat) => findCat.slug === cat.slug)
        );
      });
      const index = relatedProducts.findIndex(
        (item) => item.slug === product.slug
      );
      return {
        data: product,
        prev: index > 0 ? relatedProducts[index - 1] : null,
        next:
          index < relatedProducts.length - 1
            ? relatedProducts[index + 1]
            : null,
        related: relatedProducts
          .filter((item) => item.slug !== product.slug)
          .slice(0, 3),
      };
    }
  },
  specialProducts: async (args) => {
    const demoData = await import(`../data/demo${args.demo}`);
    const products = demoData.products.map((product) => {
      return { ...product, price: getMinMaxPrice(product) };
    });
    const count =
      Number(args.limit) > 0 ? Number(args.limit) : demoData.products.length;
    let results = {};
    args.featured &&
      (results = {
        ...results,
        featured: products.filter((item) => item.is_hot).slice(0, count),
      });
    args.bestSelling &&
      (results = {
        ...results,
        bestSelling: products
          .sort((itemA, itemB) => itemB.sale_count - itemA.sale_count)
          .slice(0, count),
      });
    args.topRated &&
      (results = {
        ...results,
        topRated: products
          .sort((itemA, itemB) => itemA.ratings > itemB.ratings)
          .slice(0, count),
      });
    args.latest &&
      (results = {
        ...results,
        latest: products.filter((item) => item.is_new).slice(0, count),
      });
    args.onSale &&
      (results = {
        ...results,
        onSale: products.filter((item) => isSaleProduct(item)).slice(0, count),
      });
    // get products schema

    return results;
  },
  // shop
  shopSidebarData: async (args) => {
    const demoData = await import(`../data/demo${args.demo}`);
    const categories = demoData.productCategories.sort((a, b) =>
      a.name < b.name ? -1 : 1
    );
    const products = demoData.products.map((product) => {
      return { ...product, price: getMinMaxPrice(product) };
    });
    let results = {};
    results.categories = categories.map((category) => {
      let tree = getCategoryTree(categories, [category]);
      return {
        ...category,
        count: products.filter((product) =>
          product.categories.find((findCat) =>
            tree.find((cat) => cat.slug === findCat.slug)
          )
        ).length,
      };
    });
    if (args?.featured) {
      results.featured = products.filter((item) => item.is_hot).slice(0, 3);
    }
    return results;
  },
  // posts resolvers
  posts: async (args) => {
    const demoData = await import(`../data/demo${args.demo}`);
    let posts = demoData.posts;
    if (args.category) {
      posts = posts.filter((post) =>
        post.categories.find((cat) => cat.slug === args.category)
      );
    }
    return {
      data: posts.slice(args.from, args.to),
      total: posts.length,
    };
  },
  postSideBar: async (args) => {
    const postCategories = await require("../data/post-categories.json");
    const demoData = await import(`../data/demo${args.demo}`);
    const recentPosts = demoData.posts
      .sort((a, b) => new Date(a.date) > new Date(b.date))
      .slice(0, 2);

    return {
      categories: postCategories.cat,
      recent: recentPosts,
    };
  },
  post: async (args) => {
    const demoData = await import(`../data/demo${args.demo}`);
    let post = demoData.posts.find((post) => post.slug === args.slug);
    let related = demoData.posts.filter(
      (item) =>
        item.slug !== post.slug &&
        item.categories.find((cat) =>
          post.categories.find((findCat) => findCat.slug === cat.slug)
        )
    );
    return {
      data: post,
      related: related.slice(0, 4),
    };
  },
};

export default resolvers;
