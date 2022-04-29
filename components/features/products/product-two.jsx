import { useRouter } from "next/router";
import React from "react";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Import Actions
import { actions as WishlistAction } from "../../../store/wishlist";
import { actions as CartAction } from "../../../store/cart";
import { actions as ModalAction } from "../../../store/modal";

// Import Custom Component
import ALink from "../../common/ALink";
import ProductCountdown from "../product-countdown";

function ProductTwo(props) {
  const router = useRouter();
  const { adClass = "", link = "default", product } = props;

  function isSale() {
    return product.price[0] !== product.price[1] &&
      product.variants.length === 0
      ? "-" +
          (
            (100 * (product.price[1] - product.price[0])) /
            product.price[1]
          ).toFixed(0) +
          "%"
      : product.variants.find((variant) => variant.sale_price)
      ? "Sale"
      : false;
  }

  function isInWishlist() {
    return (
      product &&
      props.wishlist.findIndex((item) => item.slug === product.slug) > -1
    );
  }

  function onWishlistClick(e) {
    e.preventDefault();
    if (!isInWishlist()) {
      let target = e.currentTarget;
      target.classList.add("load-more-overlay");
      target.classList.add("loading");

      setTimeout(() => {
        target.classList.remove("load-more-overlay");
        target.classList.remove("loading");
        props.addToWishList(product);
      }, 1000);
    } else {
      router.push("/pages/wishlist");
    }
  }

  function onAddCartClick(e) {
    e.preventDefault();
    props.addToCart(product);
  }

  function onQuickViewClick(e) {
    e.preventDefault();
    props.showQuickView(product.slug);
  }

  return (
    <div
      className={`product-default media-with-lazy left-details mb-2 product-list ${adClass}`}
    >
      <figure>
        <ALink href={`/product/${link}/${product.slug}`}>
          <div className="lazy-overlay"></div>

          <LazyLoadImage
            alt="product"
            src={process.env.NEXT_PUBLIC_ASSET_URI + product.pictures[0].url}
            threshold={500}
            effect="black and white"
            width="100%"
          />
          {product.pictures.length >= 2 ? (
            <LazyLoadImage
              alt="product"
              src={process.env.NEXT_PUBLIC_ASSET_URI + product.pictures[1].url}
              threshold={500}
              effect="black and white"
              wrapperClassName="product-image-hover"
            />
          ) : (
            ""
          )}
        </ALink>

        <div className="label-group">
          {product.is_hot ? (
            <div className="product-label label-hot">HOT</div>
          ) : (
            ""
          )}

          {isSale() ? (
            <div className="product-label label-sale">{isSale()}</div>
          ) : (
            ""
          )}
        </div>

        {product.until && product.until !== null && <ProductCountdown />}
      </figure>

      <div className="product-details">
        <div className="category-wrap">
          <div className="category-list">
            {product.categories
              ? product.categories.map((item, index) => (
                  <React.Fragment key={item.slug + "-" + index}>
                    <ALink
                      href={{
                        pathname: "/shop",
                        query: { category: item.slug },
                      }}
                    >
                      {item.name}
                    </ALink>
                    {index < product.categories.length - 1 ? ", " : ""}
                  </React.Fragment>
                ))
              : ""}
          </div>
        </div>

        <h3 className="product-title">
          <ALink href={`/product/default/${product.slug}`}>
            {product.name}
          </ALink>
        </h3>

        <div className="ratings-container">
          <div className="product-ratings">
            <span
              className="ratings"
              style={{ width: 20 * product.ratings + "%" }}
            ></span>
            <span className="tooltiptext tooltip-top">
              {product.ratings.toFixed(2)}
            </span>
          </div>
        </div>

        <p className="product-description">{product.short_description}</p>

        <div className="price-box">
          {product.price[0] == product.price[1] ? (
            <span className="product-price">
              {"$" + product.price[0].toFixed(2)}
            </span>
          ) : product.variants.length > 0 ? (
            <span className="product-price">
              {"$" + product.price[0].toFixed(2)} &ndash;{" "}
              {"$" + product.price[1].toFixed(2)}
            </span>
          ) : (
            <>
              <span className="old-price">
                {"$" + product.price[1].toFixed(2)}
              </span>
              <span className="product-price">
                {"$" + product.price[0].toFixed(2)}
              </span>
            </>
          )}
        </div>

        <div className="product-action">
          {product.variants.length > 0 ? (
            <ALink
              href={`/product/default/${product.slug}`}
              className="btn-icon btn-add-cart"
            >
              <i className="fa fa-arrow-right"></i>
              <span>SELECT OPTIONS</span>
            </ALink>
          ) : (
            <a
              href="#"
              className="btn-icon btn-add-cart product-type-simple"
              title="Add To Cart"
              onClick={onAddCartClick}
            >
              <i className="icon-shopping-cart"></i>
              <span>ADD TO CART</span>
            </a>
          )}
          <a
            href="#"
            className={`btn-icon-wish ${
              isInWishlist() ? "added-wishlist" : ""
            }`}
            onClick={onWishlistClick}
            title={`${
              isInWishlist() === true ? "Go to Wishlist" : "Add to Wishlist"
            }`}
          >
            <i className="icon-heart"></i>
          </a>
          <a
            href="#"
            className="btn-quickview"
            title="Quick View"
            onClick={onQuickViewClick}
          >
            <i className="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    wishlist: state.wishlist.list ? state.wishlist.list : [],
  };
};

export default connect(mapStateToProps, {
  ...WishlistAction,
  ...CartAction,
  ...ModalAction,
})(ProductTwo);
