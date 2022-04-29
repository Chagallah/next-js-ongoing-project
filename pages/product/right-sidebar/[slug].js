import React from "react";

// Import Custom Component
import ALink from "../../../components/common/ALink";
import ProductMediaOne from "../../../components/partials/product/media/product-media-one";
import ProductDetailOne from "../../../components/partials/product/details/product-detail-one";
import SingleTabOne from "../../../components/partials/product/tabs/single-tab-one";
import RelatedProducts from "../../../components/partials/product/widgets/related-products";
import ProductWidgetContainer from "../../../components/partials/product/widgets/product-widget-container";
import ProductSidebarTwo from "../../../components/partials/product/sidebars/sidebar-two";
import absoluteUrl from "next-absolute-url";
import qs from "qs";

function ProductRightSidebar({slug, data, loading}) {
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
                        query: {category: item.slug},
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

        <div className="row">
          <div className="col-lg-9 main-content pb-2">
            <div className={`product-single-container product-single-default`}>
              <div className="row">
                <ProductMediaOne product={product} />

                <ProductDetailOne
                  product={product}
                  prev={product && data.product.prev}
                  next={product && data.product.next}
                />
              </div>
            </div>

            <SingleTabOne product={product} />

            <RelatedProducts
              adClass="mb-1"
              loading={loading}
              products={related}
            />
          </div>

          <ProductSidebarTwo />
        </div>
      </div>

      <ProductWidgetContainer />
    </main>
  );
}

export default ProductRightSidebar;
export async function getServerSideProps(ctx) {
  const {origin} = absoluteUrl(ctx.req);
  const {slug} = ctx.query;
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
