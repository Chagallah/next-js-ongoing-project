import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ALink from "../../../common/ALink";
import useFetch from "../../../../hooks/useFetch";
import { shopColors, shopSizes } from "../../../../utils/data/shop";

function ShopSidebarTwo() {
  const router = useRouter();
  const query = router.query;
  const [priceRange, setRange] = useState({ min: 0, max: 1000 });
  const { restData, loading, error } = useFetch(
    `/api/products/sideBar?demo=12&featured=true`
  );
  useEffect(() => {
    document.querySelector("body").addEventListener("click", onBodyClick);

    return () => {
      document.querySelector("body").removeEventListener("click", onBodyClick);
    };
  }, []);

  useEffect(() => {
    setRange({
      min: query.min_price ? query.min_price : 0,
      max: query.max_price ? query.max_price : 1000,
    });
  }, [query]);

  function containsAttrInUrl(type, value) {
    const currentQueries = query[type] ? query[type].split(",") : [];
    return currentQueries && currentQueries.includes(value);
  }

  function filterByPrice(e) {
    e.preventDefault();

    router.push({
      pathname: router.pathname,
      query: { ...query, min_price: priceRange.min, max_price: priceRange.max },
    });
  }

  function openList(e) {
    e.currentTarget.classList.toggle("opened");
  }

  function getUrlForAttrs(type, value) {
    let currentQueries = query[type] ? query[type].split(",") : [];
    currentQueries = containsAttrInUrl(type, value)
      ? currentQueries.filter((item) => item !== value)
      : [...currentQueries, value];
    return currentQueries.join(",");
  }

  function closeSidebar() {
    document.querySelector("body").classList.contains("sidebar-opened") &&
      document.querySelector("body").classList.remove("sidebar-opened");
  }

  function onBodyClick(e) {
    e.target.closest(".toolbox-sort.opened") ||
      (document.querySelector(".toolbox-sort.opened") &&
        document
          .querySelector(".toolbox-sort.opened")
          .classList.remove("opened"));
  }

  function minPriceChange(e) {
    setRange({ ...priceRange, min: e.target.value });
  }

  function maxPriceChange(e) {
    setRange({ ...priceRange, max: e.target.value });
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div className="sidebar-overlay" onClick={closeSidebar}></div>
      <aside className="toolbox-left sidebar-shop mobile-sidebar">
        <div
          className="toolbox-item toolbox-sort select-custom"
          onClick={openList}
        >
          <span className="sort-menu-trigger">Size</span>
          <ul className="sort-list">
            {shopSizes.map((item, index) => (
              <li
                className={
                  containsAttrInUrl("sizes", item.size) ? "active" : ""
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
                  {item.name}
                </ALink>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="toolbox-item toolbox-sort select-custom"
          onClick={openList}
        >
          <span className="sort-menu-trigger">Color</span>
          <ul className="sort-list">
            {shopColors.map((item, index) => (
              <li
                className={
                  containsAttrInUrl("colors", item.name) ? "active" : ""
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
                  scroll={false}
                >
                  {item.name}
                </ALink>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="toolbox-item toolbox-sort price-sort select-custom"
          onClick={openList}
        >
          <span className="sort-menu-trigger">Price</span>
          <div className="sort-list" onClick={(e) => e.stopPropagation()}>
            <form className="filter-price-form d-flex align-items-center m-0">
              <input
                type="number"
                className="input-price mr-2"
                name="min_price"
                placeholder="55"
                value={priceRange.min}
                onChange={minPriceChange}
              />{" "}
              -
              <input
                type="number"
                className="input-price mx-2"
                name="max_price"
                placeholder="111"
                value={priceRange.max}
                onChange={maxPriceChange}
              />
              <button
                type="submit"
                className="btn btn-primary ml-3"
                onClick={(e) => filterByPrice(e)}
              >
                Filter
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}

export default ShopSidebarTwo;
