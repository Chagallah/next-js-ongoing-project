import React from "react";
import StickyBox from "react-sticky-box";
// import Custom Component
import ALink from "../../../components/common/ALink";
import ProductMediaFive from "../../../components/partials/product/media/product-media-five";
import ProductDetailOne from "../../../components/partials/product/details/product-detail-one";
import SingleTabFive from "../../../components/partials/product/tabs/single-tab-five";
import RelatedProducts from "../../../components/partials/product/widgets/related-products";
import ProductWidgetContainer from "../../../components/partials/product/widgets/product-widget-container";

import absoluteUrl from "next-absolute-url";
import qs from "qs";

function ProductStickyInfo({ slug, data, loading }) {
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

  //   if (error) {
  //     return useRouter().push("/pages/404");
  //   }

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
          className={`product-single-container product-single-default product-single-info`}
        >
          <div className="row">
            <ProductMediaFive
              adClass="col-lg-5 col-md-6"
              subClass="col-md-12"
              product={product}
            />

            <div className="col-lg-7 col-md-6">
              <StickyBox
                className="sticky-wrapper sticky-sidebar"
                offsetTop={70}
              >
                <ProductDetailOne
                  adClass=""
                  product={product}
                  prev={product && data.product.prev}
                  next={product && data.product.next}
                />
              </StickyBox>
            </div>
          </div>

          <div className="row align-items-start">
            <div className="widget widget-info col-md-9 col-xl-6 pb-4 pb-md-0">
              <ul className="promote">
                <li>
                  <i className="icon-shipping"></i>
                  <h4>
                    FREE
                    <br />
                    SHIPPING
                  </h4>
                </li>
                <li>
                  <i className="icon-us-dollar"></i>
                  <h4>
                    100% MONEY
                    <br />
                    BACK GUARANTEE
                  </h4>
                </li>
                <li>
                  <i className="icon-online-support"></i>
                  <h4>
                    ONLINE
                    <br />
                    SUPPORT 24/7
                  </h4>
                </li>
              </ul>
            </div>

            <div className="product-single-share col-md-3 col-xl-6 align-items-start justify-content-md-end mt-0">
              <label className="sr-only">Share:</label>

              <div className="social-icons mt-0 pb-5 pb-md-0">
                <ALink
                  href="#"
                  className="social-icon social-facebook icon-facebook"
                  title="Facebook"
                ></ALink>
                <ALink
                  href="#"
                  className="social-icon social-twitter icon-twitter"
                  title="Twitter"
                ></ALink>
                <ALink
                  href="#"
                  className="social-icon social-linkedin fab fa-linkedin-in"
                  title="Linkedin"
                ></ALink>
                <ALink
                  href="#"
                  className="social-icon social-mail icon-mail-alt"
                  title="Mail"
                ></ALink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SingleTabFive
        adClass={`custom-product-single-tabs bg-gray mb-4 skeleton-body skel-shop-products ${
          loading ? "" : "loaded"
        }`}
        product={product}
      />

      <RelatedProducts
        adClass={`skeleton-body skel-shop-products ${loading ? "" : "loaded"}`}
        isContainer={true}
        loading={loading}
        products={related}
      />

      <div className="container"></div>

      <ProductWidgetContainer />
    </main>
  );
}

export default ProductStickyInfo;
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
