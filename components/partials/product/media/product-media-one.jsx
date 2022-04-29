import LightBox from "react-image-lightbox";
import { useState, useEffect } from "react";
import { Magnifier } from "react-image-magnifiers";
import { LazyLoadImage } from "react-lazy-load-image-component";

//Import Custom Component
import OwlCarousel from "../../../features/owl-carousel";

//Import Utils
import {
  productSingleSlider,
  prodThumbSlider,
} from "../../../../utils/data/slider";

export default function ProductMediaOne(props) {
  const {
    adClass = "col-lg-5 col-md-6",
    product,
    parent = ".product-single-default",
  } = props;
  const [openLB, setOpenLB] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [mediaRef, setMediaRef] = useState(null);
  const [redraw, setRedraw] = useState(true);
  const events = {
    onTranslate: function (e) {
      document.querySelector(`${parent} .prod-thumbnail .owl-dot.active`) &&
        document
          .querySelector(`${parent} .prod-thumbnail .owl-dot.active`)
          .classList.remove("active");
      let thumbs = document.querySelectorAll(
        `${parent} .prod-thumbnail .owl-item`
      );
      thumbs[e.item.index].querySelector(".owl-dot").classList.add("active");
    },
    onTranslated: function (e) {
      setPhotoIndex(e.item.index);
    },
  };

  useEffect(() => {
    if (product) {
      setOpenLB(false);
      setPhotoIndex(0);
      setRedraw(true);
      mediaRef && mediaRef.current && mediaRef.current.goTo(0);
      document.querySelector(`${parent} .prod-thumbnail .owl-dot.active`) &&
        document.querySelector(`${parent} .prod-thumbnail .owl-dot.active`) &&
        document
          .querySelector(`${parent} .prod-thumbnail .owl-dot.active`)
          .classList.remove("active");
      document
        .querySelector(`${parent} .prod-thumbnail .owl-dot`)
        .classList.add("active");
    }
  }, [product]);

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

  function openLightBox() {
    setOpenLB(true);
    setRedraw(false);
  }

  function closeLightBox() {
    setOpenLB(false);
    setRedraw(false);
  }

  function moveNextPhoto() {
    setPhotoIndex((photoIndex + 1) % product.large_pictures.length);
  }

  function movePrevPhoto() {
    setPhotoIndex(
      (photoIndex + product.large_pictures.length - 1) %
        product.large_pictures.length
    );
  }

  function changeMediaIndex(index, e) {
    if (!e.currentTarget.classList.contains("active")) {
      let thumbs = e.currentTarget.closest(".prod-thumbnail");
      thumbs.querySelector(".owl-dot.active") &&
        thumbs.querySelector(".owl-dot.active").classList.remove("active");
      e.currentTarget.classList.add("active");
    }
    mediaRef.current.goTo(index);
  }

  return (
    <div className={`product-single-gallery ${adClass}`}>
      <div className="skel-pro skel-magnifier"></div>
      {product && (
        <>
          <div className="product-slider-container">
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

            <OwlCarousel
              adClass="product-single-carousel owl-carousel owl-theme show-nav-hover"
              options={productSingleSlider}
              events={events}
              onChangeRef={(ref) => setMediaRef(ref)}
              redraw={redraw}
            >
              {product.large_pictures.map((item, index) => (
                <div className="product-item" key={`product-item-${index}`}>
                  <Magnifier
                    style={{ paddingTop: "100%", position: "relative" }}
                    imageSrc={process.env.NEXT_PUBLIC_ASSET_URI + item.url}
                    imageAlt="product"
                    mouseActivation="hover"
                    cursorStyleActive="crosshair"
                    dragToMove={false}
                    className="product-single-image"
                  />
                </div>
              ))}
            </OwlCarousel>

            <span className="prod-full-screen" onClick={openLightBox}>
              <i className="icon-plus"></i>
            </span>
          </div>

          <OwlCarousel
            adClass="prod-thumbnail owl-theme owl-dots"
            options={prodThumbSlider}
          >
            {product.pictures.map((item, index) => (
              <div
                className="owl-dot media-with-lazy"
                key={`owl-dot-${index}`}
                onClick={(e) => changeMediaIndex(index, e)}
              >
                <figure className="mb-0">
                  <LazyLoadImage
                    src={process.env.NEXT_PUBLIC_ASSET_URI + item.url}
                    alt="Thumbnail"
                    width="100%"
                    height="auto"
                    className="d-block"
                  />
                </figure>
              </div>
            ))}
          </OwlCarousel>

          {openLB && (
            <LightBox
              mainSrc={
                process.env.NEXT_PUBLIC_ASSET_URI +
                product.large_pictures[photoIndex].url
              }
              prevSrc={
                process.env.NEXT_PUBLIC_ASSET_URI +
                product.large_pictures[
                  (photoIndex + product.large_pictures.length - 1) %
                    product.large_pictures.length
                ].url
              }
              nextSrc={
                process.env.NEXT_PUBLIC_ASSET_URI +
                product.large_pictures[
                  (photoIndex + 1) % product.large_pictures.length
                ].url
              }
              onCloseRequest={closeLightBox}
              onMoveNextRequest={moveNextPhoto}
              onMovePrevRequest={movePrevPhoto}
            />
          )}
        </>
      )}
    </div>
  );
}
