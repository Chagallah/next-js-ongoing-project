// Import Custom Component
import NewsletterModal from "../components/features/modals/newsletter-modal";
import HomeSection from "../components/partials/home/home-banner-section";
import abslouteUrl from "next-absolute-url";
import qs from "qs";
import Head from "next/head";

export default function Index({ data, loading, seo }) {
  const featured = !loading && data.specialProducts.featured;
  const bestSelling = !loading && data.specialProducts.bestSelling;
  const latest = !loading && data.specialProducts.latest;
  const topRated = !loading && data.specialProducts.topRated;
  const onSale = !loading && data.specialProducts.onSale;
  const product = !loading && data.products.data;

  return (
    <>
      <Head>
        <title>{seo?.title}</title>
        <meta name="description" content={`${seo?.desc}`} />
        <meta property="og:title" content={seo?.title} />
        <meta property="og:type" content={seo?.type} />
        <meta property="og:url" content={`${seo?.url}`} />
        <meta property="og:image" content={`${seo?.img}`} />
        <script type="text/javascript" src="js/theme.js" />
      </Head>
      <main
        className={`home skeleton-body skel-shop-products ${loading ? "" : "loaded"
          }`}
      >
        <HomeSection />

      </main>

      <NewsletterModal />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { origin } = abslouteUrl(ctx.req);
  const SEO = {
    url: origin,
    img: origin + "/images/fs.jpg",
    type: "website",
    title: "Porto - React eCommerce Template",
    desc: "Get our Low Price Guarantee, online or in store, on a huge selection of electronics, appliances, furniture, fitness, travel, baby products and more!",
  };
  const params = qs.stringify({
    demo: 12,
    limit: 5,
    featured: true,
    onSale: true,
    bestSelling: true,
    topRated: true,
    latest: true,
  });
  const products = await fetch(`${origin}/api/products?${params}`);
  const data = await products.json();
  return {
    props: {
      data: data,
      loading: products.status === 200 ? false : true,
      seo: SEO,
    },
  };
}
