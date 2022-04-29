import React from "react";
import useFetch from "../../../../hooks/useFetch";
import ProductThree from "../../../features/products/product-three";
import qs from "qs";
function ProductWidgetContainer(props) {
  const { adClass = "" } = props;
  const varibles = qs.stringify({
    featured: true,
    bestSelling: true,
    latest: true,
    topRated: true,
    limit: 3,
    demo: 12,
  });
  const { restData, loading, error } = useFetch(
    `/api/products/special?${varibles}`
  );
  const featured = restData && restData.specialProducts.featured;
  const bestSelling = restData && restData.specialProducts.bestSelling;
  const latest = restData && restData.specialProducts.latest;
  const topRated = restData && restData.specialProducts.topRated;

  if (error) {
    return <div>Sorry, can not fetch posts😢</div>;
  }
  if (loading) {
    return "loading.....";
  }
  return (
    <section
      className={`product-widgets-container pb-2 skeleton-body skel-shop-products ${
        loading ? "" : "loaded"
      } ${adClass}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-sm-6 pb-5 pb-lg-0">
            {loading ? (
              [0, 1, 2].map((item, index) => (
                <div
                  className="skel-product-col skel-pro mb-2"
                  key={`ProductThree-${index}`}
                ></div>
              ))
            ) : (
              <>
                <h4 className="section-sub-title">Featured Products</h4>
                {featured.slice(0, 3).map((product, index) => (
                  <ProductThree
                    product={product}
                    key={`ProductThree-${index}`}
                  />
                ))}
              </>
            )}
          </div>

          <div className="col-lg-3 col-sm-6 pb-5 pb-lg-0">
            {loading ? (
              [0, 1, 2].map((item, index) => (
                <div
                  className="skel-product-col skel-pro mb-2"
                  key={`ProductThree-${index}`}
                ></div>
              ))
            ) : (
              <>
                <h4 className="section-sub-title">Best Selling Products</h4>
                {bestSelling.slice(0, 3).map((product, index) => (
                  <ProductThree
                    product={product}
                    key={`ProductThree-${index}`}
                  />
                ))}
              </>
            )}
          </div>

          <div className="col-lg-3 col-sm-6 pb-5 pb-sm-0">
            {loading ? (
              [0, 1, 2].map((item, index) => (
                <div
                  className="skel-product-col skel-pro mb-2"
                  key={`ProductThree-${index}`}
                ></div>
              ))
            ) : (
              <>
                <h4 className="section-sub-title">Latest Products</h4>

                {latest.slice(0, 3).map((product, index) => (
                  <ProductThree
                    product={product}
                    key={`ProductThree-${index}`}
                  />
                ))}
              </>
            )}
          </div>

          <div className="col-lg-3 col-sm-6 pb-0">
            {loading ? (
              [0, 1, 2].map((item, index) => (
                <div
                  className="skel-product-col skel-pro mb-2"
                  key={"ProductThree" + index}
                ></div>
              ))
            ) : (
              <>
                <h4 className="section-sub-title">Top Rated Products</h4>

                {topRated.slice(0, 3).map((product, index) => (
                  <ProductThree
                    product={product}
                    key={`ProductThree-${index}`}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductWidgetContainer;
