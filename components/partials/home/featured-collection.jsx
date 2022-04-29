import Reveal from "react-awesome-reveal";

// Import Custom Component
import ProductOne from "../../features/products/product-one";
import OwlCarousel from "../../features/owl-carousel";

// Import Settings
import { productSlider } from "../../../utils/data/slider";
import { fadeInRightShorter } from "../../../utils/data/keyframes";

export default function FeaturedCollection(props) {
  const { product, loading, sale } = props;
  return (
    <section className="section-4 top-collection">
      <Reveal
        keyframes={fadeInRightShorter}
        delay={200}
        duration={1000}
        triggerOnce
      >
        <h2 className="section-title text-center">
          {!sale ? "TOP BRANDS COLLECTION" : "SUMMER SALE - UP TO 70%"}
        </h2>
        <div className="container">
          <OwlCarousel adClass="products-slider" options={productSlider}>
            {loading
              ? [0, 1, 2, 3, 4].map((item, index) => (
                  <div
                    className="skel-pro skel-pro-grid"
                    key={"product-one" + index}
                  ></div>
                ))
              : product.map((item, index) => (
                  <ProductOne product={item} key={"product-one" + index} />
                ))}
          </OwlCarousel>
        </div>
      </Reveal>
    </section>
  );
}
