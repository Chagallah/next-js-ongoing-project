import React from "react";

// Import Custom Component
import ALink from "../../common/ALink";

function BannerSection() {
  return (
    <section className="section-2 banner-section">
      <div className="banners-grid grid">
        <div className="banner banner-1 grid-item">
          <figure>
            <img src="/images/home/banners/banner-1.jpg" alt="banner" />
          </figure>

          <div className="banner-layer banner-layer-middle">
            <div className="banner-layer banner-layer-middle">
              <h4 className="text-transform-none text-white">
                Find the Boundaries. Push Through!
              </h4>
              <h2 className="text-transform-none mb-0 text-white">
                Sunglasses
              </h2>
              <h3 className="text-white">70% OFF</h3>
              <h5 className="d-inline-block mb-0">
                <span className="text-white">Starting At</span>
                <b className="coupon-sale-text text-white bg-secondary">
                  <sup>$</sup>199<sup>99</sup>
                </b>
              </h5>
              <ALink href="/shop" className="btn btn-dark btn-lg ls-10">
                Shop Now!
              </ALink>
            </div>
          </div>
        </div>

        <div className="banner banner-2 grid-item">
          <figure>
            <img src="/images/home/banners/banner-2.jpg" alt="banner" />
          </figure>

          <div className="banner-layer banner-layer-middle d-flex align-items-end flex-column">
            <h3 className="text-white text-right">
              ELECTRONIC
              <br />
              DEALS
            </h3>

            <div className="coupon-sale-content">
              <h4 className="coupon-sale-text bg-white d-block ext-transform-none mr-0 ls-0">
                Exclusive COUPON
              </h4>
              <h5 className="coupon-sale-text text-white ls-0 p-0">
                <i className="ls-0">UP TO</i>
                <b className="text-dark">$100</b>
                <sub>OFF</sub>
              </h5>
              <ALink
                href="/shop"
                className="btn btn-block btn-lg ls-10 text-white btn-dark"
              >
                Get Yours!
              </ALink>
            </div>
          </div>
        </div>

        <div className="banner banner-3 grid-item">
          <figure>
            <img src="/images/home/banners/banner-3.jpg" alt="banner" />
          </figure>

          <div className="banner-layer banner-layer-top text-center">
            <h4 className="heading-border">AMAZING</h4>
            <h3>COLLECTION</h3>
            <hr className="mb-1 mt-1" />
            <h4 className="sub-title">CHECK OUR DISCOUNTS</h4>
          </div>

          <div className="banner-layer banner-layer-bottom d-flex justify-content-center">
            <ALink href="/shop" className="btn btn-dark btn-lg ls-10">
              Shop Now!
            </ALink>
          </div>
        </div>

        <div className="banner banner-4 grid-item">
          <figure>
            <img src="/images/home/banners/banner-4.jpg" alt="banner" />
          </figure>

          <div className="banner-layer banner-layer-middle d-flex justify-content-between flex-wrap align-items-center">
            <div className="banner-layer-left">
              <h2 className="text-white">Outlet Selected Items</h2>
              <h4 className="text-white ls-0">
                <b>BIG SALE UP TO</b>
              </h4>
            </div>

            <div className="banner-layer-right">
              <h3 className="text-white mb-0">
                80%
                <small className="d-inline-block text-center">
                  <b>OFF</b>
                </small>
              </h3>
            </div>
          </div>
        </div>

        <div className="banner banner-5 grid-item">
          <figure>
            <img src="/images/home/banners/banner-5.jpg" alt="banner" />
          </figure>

          <div className="container">
            <div className="row banner-layer-middle align-items-center position-absolute w-100">
              <div className="mb-0 col-5">
                <h3 className="text-right mb-0">
                  TOP ELECTRONIC
                  <br />
                  DEALS
                </h3>
              </div>

              <div className="mb-0 col-3 text-center">
                <ALink
                  href="/shop"
                  className="btn btn-lg ls-10 text-white btn-dark mb-xl-4 mb-0"
                >
                  VIEW SALE
                </ALink>
              </div>

              <div className="col-auto col-4">
                <div className="coupon-sale-content d-inline-flex flex-column">
                  <h4 className="coupon-sale-text  ext-transform-none mr-0 ls-0 bg-dark text-white ml-0">
                    Exclusive COUPON
                  </h4>
                  <h5 className="coupon-sale-text text-bottom ls-0 mb-0 ml-0">
                    <i className="ls-0">UP TO</i>
                    <b className="bg-secondary text-white">$100</b>
                    <sub>OFF</sub>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="banner banner-6 grid-item">
          <figure>
            <img src="/images/home/banners/banner-6.jpg" alt="banner" />
          </figure>

          <div className="banner-layer banner-layer-middle text-right">
            <h2 className="m-b-2 text-secondary ls-n-20 font2">FLASH SALE</h2>
            <h3 className="m-b-2 ls-n-20">
              TOP BRANDS
              <br />
              SUMMER SUNGLASSES
            </h3>
            <h4 className="text-white ls-n-20 mb-3 pb-1">
              STARTING
              <br />
              AT <sup>$</sup>199<sup>99</sup>
            </h4>
            <ALink href="/shop" className="btn btn-light ls-10 btn-lg">
              VIEW SALE
            </ALink>
          </div>
        </div>

        <div className="banner banner-7 grid-item">
          <figure>
            <img src="/images/home/banners/banner-7.jpg" alt="banner" />
          </figure>

          <div className="banner-layer banner-layer-middle banner-layer-left">
            <h4 className="text-body">CHECK OUR DISCOUNTS</h4>
            <h3 className="text-nowrap">
              MORE THAN<span className="d-block">20 BRANDS</span>
            </h3>
            <hr className="mt-0 mb-2" />
            <h5 className="coupon-sale-text ls-10 p-0 mb-0 ml-3 font1 d-inline-flex align-items-center">
              <i className="ls-0">UP TO</i>
              <b className="bg-dark text-white">$100</b> <span>OFF</span>
            </h5>
          </div>

          <div className="banner-layer banner-layer-middle banner-layer-right text-center">
            <div className="row mb-lg-4 mb-2">
              <div className="col-4">
                <img src="/images/home/brands/brand-1.png" alt="brand" />
              </div>

              <div className="col-4">
                <img src="/images/home/brands/brand-2.png" alt="brand" />
              </div>

              <div className="col-4">
                <img src="/images/home/brands/brand-3.png" alt="brand" />
              </div>
            </div>

            <ALink href="/shop" className="btn btn-dark btn-black ls-10">
              Check The Sale
            </ALink>

            <div className="row mt-lg-4 mt-2">
              <div className="col-4">
                <img src="/images/home/brands/brand-4.png" alt="brand" />
              </div>

              <div className="col-4">
                <img src="/images/home/brands/brand-5.png" alt="brand" />
              </div>

              <div className="col-4">
                <img src="/images/home/brands/brand-6.png" alt="brand" />
              </div>
            </div>
          </div>
        </div>

        <div className="banner banner-8 grid-item">
          <figure>
            <img src="/images/home/banners/banner-8.jpg" alt="banner" />
          </figure>

          <h6 className="banner-label left-label">
            50
            <small>
              <sup>%</sup>
              <sub>OFF</sub>
            </small>
          </h6>
          <h6 className="banner-label right-label">
            70
            <small>
              <sup>%</sup>
              <sub>OFF</sub>
            </small>
          </h6>
          <h6 className="banner-label bottom-label mb-0">
            30
            <small>
              <sup>%</sup>
              <sub>OFF</sub>
            </small>
          </h6>

          <div className="banner-layer banner-layer-middle text-center">
            <h3 className="m-b-2 ls-10">DEAL PROMOS</h3>
            <h4 className="ls-10 text-body">STARTING AT $99</h4>
            <ALink href="/shop" className="btn btn-dark btn-black ls-10">
              SHOP NOW
            </ALink>
          </div>
        </div>

        <div className="grid-item service-grid-1 service-grid">
          <div className="feature-box mb-0 px-xl-5 feature-box-simple text-center d-flex flex-column">
            <div className="feature-content m-auto">
              <i className="icon-credit-card"></i>

              <div className="feature-box-content p-0">
                <h3>SECURED PAYMENT</h3>
                <h5>Safe &apos; Fast</h5>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  nec vestibulum magna, et dapibus lacus.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-item service-grid-2 service-grid">
          <div className="feature-box mb-0 px-xl-5  feature-box-simple text-center d-flex flex-column">
            <div className="feature-content m-auto">
              <i className="icon-action-undo"></i>

              <div className="feature-box-content p-0">
                <h3>FREE RETURNS</h3>
                <h5>Easy &apos; Free</h5>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  nec vestibulum magna, et dapibus lacus.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-item service-grid-3 service-grid">
          <div className="feature-box mb-0 px-xl-5 feature-box-simple text-center d-flex flex-column">
            <div className="feature-content m-auto">
              <i className="icon-shipping"></i>

              <div className="feature-box-content p-0">
                <h3>FREE SHIPPING</h3>
                <h5>Orders Over $99</h5>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  nec vestibulum magna, et dapibus lacus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(BannerSection);
