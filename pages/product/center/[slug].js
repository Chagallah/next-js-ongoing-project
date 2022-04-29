import React from "react";
// Import Custom Component
import ALink from "../../../components/common/ALink";
import ProductMediaSeven from "../../../components/partials/product/media/product-media-seven";
import ProductDetailFive from "../../../components/partials/product/details/product-detail-five";
import ProductWidgetContainer from "../../../components/partials/product/widgets/product-widget-container";
import RelatedProducts from "../../../components/partials/product/widgets/related-products";
import SingleTabFour from "../../../components/partials/product/tabs/single-tab-four";
import absoluteUrl from "next-absolute-url";
import qs from "qs";

function ProductCenter({ slug, data, loading }) {
  if (!slug || loading)
    return (
      <div className="loading-overlay">
        <div className="bounce-loader">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    );

  const product = !loading && data.product.data;
  const related = !loading && data.product.related;
  // if (error) {
  //   return useRouter().push("/pages/404");
  // }

  return (
    <main className="main">
      <div
        className={`container skeleton-body skel-shop-products ${
          loading ? "" : "loaded"
        }`}
      >
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">
                <i className="icon-home"></i>
              </ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="/shop">Shop</ALink>
            </li>
            <li className="breadcrumb-item">
              {product &&
                product.categories.map((item, index) => (
                  <React.Fragment key={`category-${index}`}>
                    <ALink
                      href={{
                        pathname: "/shop",
                        query: { category: item.slug },
                      }}
                    >
                      {item.name}
                    </ALink>
                    {index < product.categories.length - 1 ? "," : ""}
                  </React.Fragment>
                ))}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product && product.name}
            </li>
          </ol>
        </nav>

        <div
          className={`product-single-container product-single-default product-center-vertical`}
        >
          <div className="row">
            <ProductDetailFive
              adClassOne="order-1 order-lg-0"
              adClassTwo="order-2 order-lg-2"
              type="1"
              product={product}
              prev={product && data.product.prev}
              next={product && data.product.next}
            />

            <ProductMediaSeven
              adClass="col-lg-6 d-lg-flex order-0 order-lg-0"
              subClass="col-lg-12"
              product={product}
            />
          </div>
        </div>

        <SingleTabFour
          product={product}
          adClass="product-tabs-list pt-3 mb-0 mt-1"
        />
        <RelatedProducts products={related} loading={loading} />
      </div>
      <ProductWidgetContainer />
    </main>
  );
}

export default ProductCenter;
export async function getServerSideProps(ctx) {
  const { origin } = absoluteUrl(ctx.req);
  const { slug } = ctx.query;
  const params = qs.stringify({
    demo: 12,
    slug: slug,
    onlyData: false,
  });
  if (slug !== "favicon.png") {
    const products = await fetch(
      `${origin}/api/products/get_product?${params}`
    );
    const data = await products.json();
    return {
      props: {
        data: data,
        loading: products.status === 200 ? false : true,
        slug: products.status === 200 ? slug : "",
      },
    };
  } else {
    return {
      props: {
        data: [],
        loading: true,
        slug: "",
      },
    };
  }
}
