import React from "react";
import dynamic from "next/dynamic";
// Import Custom Component
import ALink from "../../common/ALink";
// Import Settings
import { ButtonSlider } from "../../../utils/data/slider";
const OwlCarousel = dynamic(() => import("../../features/owl-carousel"), {
  ssr: false,
});
function HomeSection() {
  return (
    <section className="section-1 home-section position-relative">
      <div
        className="home-banner banner bg-img"
        style={{ backgroundImage: "url(/images/home/bg-1.jpg)" }}
      >
        <div className="banner-layer banner-layer-middle">
          <h4 className="text-transform-none m-b-3">
            Find the Boundaries. Push Through!
          </h4>
          <h2 className="text-transform-none mb-0">Summer Sale</h2>
          <h3 className="m-b-3">70% Off</h3>
          <h5 className="d-inline-block mb-0">
            <span>Starting At</span>
            <b className="coupon-sale-text text-white bg-secondary align-middle">
              <sup>$</sup>199<sup>99</sup>
            </b>
          </h5>
          <ALink href="/shop" className="btn btn-dark btn-lg ls-10">
            Shop Now!
          </ALink>
        </div>
      </div>

      <div className="cat-section container position-absolute">
        <OwlCarousel options={ButtonSlider}>
          <ALink
            href={{ pathname: "/shop", query: { category: "accessories-1" } }}
            className="btn btn-dark btn-lg"
          >
            ACCESSORIES
          </ALink>
          <ALink
            href={{ pathname: "/shop", query: { category: "caps" } }}
            className="btn btn-dark btn-lg"
          >
            CAPS
          </ALink>
          <ALink
            href={{ pathname: "/shop", query: { category: "dress" } }}
            className="btn btn-dark btn-lg"
          >
            DRESS
          </ALink>
          <ALink
            href={{ pathname: "/shop", query: { category: "electronics" } }}
            className="btn btn-dark btn-lg"
          >
            ELECTRONICS
          </ALink>
          <ALink
            href={{ pathname: "/shop", query: { category: "fashion" } }}
            className="btn btn-dark btn-lg"
          >
            FASHION
          </ALink>
          <ALink
            href={{ pathname: "/shop", query: { category: "headphone-3" } }}
            className="btn btn-dark btn-lg"
          >
            HEADPHONE
          </ALink>
          <ALink
            href={{ pathname: "/shop", query: { category: "accessories-1" } }}
            className="btn btn-dark btn-lg"
          >
            ACCESSORIES
          </ALink>
        </OwlCarousel>
      </div>
    </section>
  );
}

export default React.memo(HomeSection);
