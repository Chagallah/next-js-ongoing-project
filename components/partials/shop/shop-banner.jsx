import ALink from "../../common/ALink";

export default function ShopBanner(props) {
  const hasgap = props;

  return (
    <div
      className={`shop-banner banner banner-5 ${props.hasgap ? "mb-2" : ""}`}
      style={{ backgroundImage: "url(/images/home/bg-category.jpg)" }}
    >
      <div className="container">
        <div className="row banner-layer-middle align-items-center position-absolute w-100 justify-content-sm-start justify-content-center">
          <div className="mb-0 col-lg-5 col-sm-4">
            <h3 className="text-sm-right mb-1 mb-md-0 text-center">
              TOP FASHION
              <br />
              DEALS
            </h3>
          </div>

          <div className="mb-md-0 mb-1 col-lg-3 col-sm-4 text-center">
            <ALink
              href="/shop"
              className="btn btn-lg ls-10 text-white btn-dark"
            >
              VIEW SALE
            </ALink>
          </div>

          <div className="col-auto col-sm-4">
            <div className="coupon-sale-content d-inline-flex flex-column">
              <h4 className="coupon-sale-text d-block ext-transform-none mr-0 ls-0 bg-dark text-white ml-0">
                Exclusive COUPON
              </h4>
              <h5 className="coupon-sale-text ls-0 p-0 mb-0 ml-0">
                <i className="ls-0">UP TO</i>
                <b className="bg-secondary text-white">$100</b>
                <sub>OFF</sub>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
