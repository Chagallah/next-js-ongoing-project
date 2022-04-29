import SlideToggle from "react-slide-toggle";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import StickyBox from "react-sticky-box";
import Tree from "rc-tree";
import InputRange from "react-input-range";

import ALink from "../../../common/ALink";
import OwlCarousel from "../../../features/owl-carousel";
import { widgetFeaturedProductSlider } from "../../../../utils/data/slider";
import { shopColors, shopSizes } from "../../../../utils/data/shop";
import ProductThree from "../../../features/products/product-three";
import useFetch from "../../../../hooks/useFetch";

const TreeNode = (props) => {
  return (
    <>
      {props.name}
      <span className="products-count">({props.count})</span>
    </>
  );
};

function ShopSidebarOne(props) {
  const router = useRouter();
  const query = router.query;
  const { restData, loading, error } = useFetch(
    `/api/products/sideBar?demo=12&featured=true`
  );
  const [priceRange, setRange] = useState({ min: 0, max: 1000 });
  const categories = useMemo(() => {
    let cats = restData ? restData.shopSidebarData.categories : [];
    let stack = [],
      result = [];
    result = cats.reduce((acc, cur) => {
      if (!cur.parent) {
        let newNode = {
          key: cur.slug,
          title: <TreeNode name={cur.name} count={cur.count} />,
          children: [],
        };
        acc.push(newNode);
        stack.push({
          name: cur.name,
          children: newNode.children,
        });
      }
      return acc;
    }, []);

    let temp, children, childNode;

    while (stack.length) {
      temp = stack[stack.length - 1];
      stack.pop();
      children = cats.filter((item) => item.parent === temp.name);
      children.forEach((child) => {
        childNode = {
          key: child.slug,
          title: <TreeNode name={child.name} count={child.count} />,
          children: [],
        };
        temp.children.push(childNode);
        stack.push({
          name: child.name,
          children: childNode.children,
        });
      });
    }

    return result;
  }, [restData]);

  useEffect(() => {
    return () => {
      closeSidebar();
    };
  }, []);

  useEffect(() => {
    if (query.min_price && query.max_price) {
      setRange({
        min: parseInt(query.min_price),
        max: parseInt(query.max_price),
      });
    } else {
      setRange({ min: 0, max: 1000 });
    }
  }, [query]);

  function filterByCategory(selected) {
    router.push(
      router.pathname.replace("[grid]", query.grid) +
        "?category=" +
        (selected.length ? selected[0] : "")
    );
  }

  function onChangePriceRange(value) {
    setRange(value);
  }

  function containsAttrInUrl(type, value) {
    const currentQueries = query[type] ? query[type].split(",") : [];
    return currentQueries && currentQueries.includes(value);
  }

  function getUrlForAttrs(type, value) {
    let currentQueries = query[type] ? query[type].split(",") : [];
    currentQueries = containsAttrInUrl(type, value)
      ? currentQueries.filter((item) => item !== value)
      : [...currentQueries, value];
    return currentQueries.join(",");
  }

  function filterByPrice(e) {
    e.preventDefault();
    let url = router.pathname.replace("[grid]", query.grid);
    let arr = [
      `min_price=${priceRange.min}`,
      `max_price=${priceRange.max}`,
      "page=1",
    ];
    for (let key in query) {
      if (
        key !== "min_price" &&
        key !== "max_price" &&
        key !== "page" &&
        key !== "grid"
      )
        arr.push(key + "=" + query[key]);
    }
    url = url + "?" + arr.join("&");
    router.push(url);
  }

  function closeSidebar() {
    document.querySelector("body").classList.contains("sidebar-opened") &&
      document.querySelector("body").classList.remove("sidebar-opened");
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div className="sidebar-overlay" onClick={closeSidebar}></div>
      <aside
        className={`sidebar-shop col-lg-3  mobile-sidebar skeleton-body skel-shop-products ${
          !loading ? "loaded" : ""
        } ${props.display === "none" ? "d-lg-none" : ""} ${
          props.right ? "" : "order-lg-first"
        }`}
      >
        <StickyBox className="sidebar-wrapper" offsetTop={70}>
          <div className="widget">
            <SlideToggle>
              {({ onToggle, setCollapsibleElement, toggleState }) => (
                <>
                  <h3 className="widget-title">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault(), onToggle();
                      }}
                      className={toggleState === "COLLAPSED" ? "collapsed" : ""}
                    >
                      Categories
                    </a>
                  </h3>
                  <div className="overflow-hidden" ref={setCollapsibleElement}>
                    <div className="widget-body">
                      <Tree
                        className="no-icon cat-list border-0"
                        selectable={true}
                        showIcon={false}
                        defaultExpandedKeys={
                          query.category ? [query.category] : []
                        }
                        switcherIcon={(props) => {
                          return !props.isLeaf ? (
                            <span className="toggle"></span>
                          ) : (
                            ""
                          );
                        }}
                        selectedKeys={query.category ? [query.category] : []}
                        treeData={categories}
                        onSelect={filterByCategory}
                      />
                    </div>
                  </div>
                </>
              )}
            </SlideToggle>
          </div>

          {(query.category ||
            query.sizes ||
            query.colors ||
            query.min_price ||
            query.max_price) && (
            <div className="widget">
              <ALink
                href={{ query: { grid: query.grid } }}
                scroll={false}
                className="btn btn-primary reset-filter"
              >
                Reset All Filters
              </ALink>
            </div>
          )}

          <div className="widget overflow-hidden">
            <SlideToggle>
              {({ onToggle, setCollapsibleElement, toggleState }) => (
                <>
                  <h3 className="widget-title">
                    <a
                      className={toggleState === "COLLAPSED" ? "collapsed" : ""}
                      href="#"
                      role="button"
                      onClick={(e) => {
                        e.preventDefault(), onToggle();
                      }}
                    >
                      Price
                    </a>
                  </h3>

                  <div ref={setCollapsibleElement}>
                    <div className="widget-body pb-0">
                      <form action="#">
                        <div className="price-slider-wrapper">
                          <InputRange
                            maxValue={1000}
                            minValue={0}
                            step={50}
                            value={priceRange}
                            onChange={onChangePriceRange}
                          />
                        </div>

                        <div className="filter-price-action d-flex align-items-center justify-content-between flex-wrap">
                          <div className="filter-price-text">
                            Price:{" "}
                            <span id="filter-price-range">
                              ${priceRange.min} &mdash; ${priceRange.max}
                            </span>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={(e) => filterByPrice(e)}
                          >
                            Filter
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </SlideToggle>
          </div>

          <div className="widget widget-color">
            {loading ? (
              <div className="skel-widget"></div>
            ) : (
              <SlideToggle>
                {({ onToggle, setCollapsibleElement, toggleState }) => (
                  <>
                    <h3 className="widget-title">
                      <a
                        className={
                          toggleState === "COLLAPSED" ? "collapsed" : ""
                        }
                        href="#"
                        onClick={(e) => {
                          e.preventDefault(), onToggle();
                        }}
                      >
                        Color
                      </a>
                    </h3>
                    <div
                      className="overflow-hidden"
                      ref={setCollapsibleElement}
                    >
                      <div className="widget-body pb-0">
                        <ul className="config-swatch-list">
                          {shopColors.map((item, index) => (
                            <li
                              className={
                                containsAttrInUrl("colors", item.name)
                                  ? "active"
                                  : ""
                              }
                              key={`color-${index}`}
                            >
                              <ALink
                                href={{
                                  query: {
                                    ...query,
                                    page: 1,
                                    colors: getUrlForAttrs("colors", item.name),
                                  },
                                }}
                                style={{ backgroundColor: item.color }}
                                scroll={false}
                              ></ALink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </SlideToggle>
            )}
          </div>

          <div className="widget widget-size">
            <SlideToggle>
              {({ onToggle, setCollapsibleElement, toggleState }) => (
                <>
                  <h3 className="widget-title">
                    <a
                      className={toggleState === "COLLAPSED" ? "collapsed" : ""}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault(), onToggle();
                      }}
                    >
                      Sizes
                    </a>
                  </h3>
                  <div className="overflow-hidden" ref={setCollapsibleElement}>
                    <div className="widget-body pb-0">
                      <ul className="config-size-list">
                        {shopSizes.map((item, index) => (
                          <li
                            className={
                              containsAttrInUrl("sizes", item.size)
                                ? "active"
                                : ""
                            }
                            key={`size-${index}`}
                          >
                            <ALink
                              href={{
                                query: {
                                  ...query,
                                  page: 1,
                                  sizes: getUrlForAttrs("sizes", item.size),
                                },
                              }}
                              scroll={false}
                            >
                              {item.size}
                            </ALink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </SlideToggle>
          </div>

          {!props.removeItems ? (
            <>
              <div className="widget widget-featured">
                <h3 className="widget-title">Featured</h3>

                <div className="widget-body">
                  <OwlCarousel
                    adClass="widget-featured-products"
                    options={widgetFeaturedProductSlider}
                  >
                    <div className="featured-col">
                      {loading
                        ? [0, 1, 2].map((item, index) => (
                            <div
                              className="skel-product-col skel-pro mb-2"
                              key={"product-one" + index}
                            ></div>
                          ))
                        : restData &&
                          restData.shopSidebarData.featured.map(
                            (item, index) => (
                              <ProductThree
                                product={item}
                                key={`featured-${index}`}
                              />
                            )
                          )}
                    </div>
                    <div className="featured-col">
                      {loading
                        ? [0, 1, 2].map((item, index) => (
                            <div
                              className="skel-product-col skel-pro mb-2"
                              key={"product-one" + index}
                            ></div>
                          ))
                        : restData &&
                          restData.shopSidebarData.featured.map(
                            (item, index) => (
                              <ProductThree
                                product={item}
                                key={`featured-${index}`}
                              />
                            )
                          )}
                    </div>
                  </OwlCarousel>
                </div>
              </div>

              <div className="widget widget-block">
                <h3 className="widget-title">Custom HTML Block</h3>
                <h5>This is a custom sub-title.</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  non placerat mi. Etiam non tellus{" "}
                </p>
              </div>
            </>
          ) : (
            ""
          )}
        </StickyBox>
      </aside>
    </>
  );
}

export default ShopSidebarOne;
