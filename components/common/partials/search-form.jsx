import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import qs from "qs";
import ALink from "../ALink";

function SearchForm() {
  const router = useRouter();
  const [cat, setCat] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(null);
  async function searchProducts(parametrs) {
    const req = await fetch(`/api/products/all_products?${parametrs}`);
    const res = await req.json();
    setData(res);
    setLoading(false);
  }
  useEffect(() => {
    document.querySelector("body").addEventListener("click", onBodyClick);

    return () => {
      document.querySelector("body").removeEventListener("click", onBodyClick);
    };
  }, []);

  useEffect(() => {
    setSearch("");
    setCat("");
  }, [router.query.slug]);

  useEffect(() => {
    if (search.length > 2) {
      if (timer) clearTimeout(timer);
      let timerId = setTimeout(() => {
        searchProducts(
          qs.stringify({
            search: search,
            category: cat,
            demo: 12,
            index: false,
          })
        );

        setTimer(null);
      }, 500);

      setTimer(timerId);
    }
  }, [search, cat]);

  useEffect(() => {
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
  }, [router.pathname]);

  function removeXSSAttacks(html) {
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    // Removing the <script> tags
    while (SCRIPT_REGEX.test(html)) {
      html = html.replace(SCRIPT_REGEX, "");
    }

    // Removing all events from tags...
    html = html.replace(/ on\w+="[^"]*"/g, "");

    return {
      __html: html,
    };
  }

  function matchEmphasize(name) {
    let regExp = new RegExp(search, "i");
    return name.replace(regExp, (match) => "<strong>" + match + "</strong>");
  }

  function onSearchClick(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.parentNode.classList.toggle("show");
  }

  function onBodyClick(e) {
    if (e.target.closest(".header-search"))
      return (
        e.target.closest(".header-search").classList.contains("show-results") ||
        e.target.closest(".header-search").classList.add("show-results")
      );

    document.querySelector(".header-search.show") &&
      document.querySelector(".header-search.show").classList.remove("show");
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
  }

  function onCatSelect(e) {
    setCat(e.target.value);
  }

  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    router.push({
      pathname: "/shop",
      query: {
        search: search,
        category: cat,
      },
    });
  }

  return (
    <div className="header-search header-search-popup header-search-category d-none d-sm-block">
      <a
        href="#"
        className="search-toggle header-icon"
        role="button"
        onClick={onSearchClick}
      >
        <i className="icon-search-3"></i>
      </a>
      <form action="#" method="get" onSubmit={(e) => onSubmitSearchForm(e)}>
        <div className="header-search-wrapper">
          <input
            type="search"
            className="form-control bg-white"
            placeholder="Search..."
            value={search}
            required
            onChange={(e) => onSearchChange(e)}
          />
          <div className="select-custom bg-white">
            <select value={cat} onChange={(e) => onCatSelect(e)}>
              <option value="">All Categories</option>
              <option value="fashion">Fashion</option>
              <option value="women">- Women</option>
              <option value="men">- Men</option>
              <option value="jewellery">- Jewellery</option>
              <option value="kids-fashion">- Kids Fashion</option>
              <option value="electronics">Electronics</option>
              <option value="smart-tvs">- Smart TVs</option>
              <option value="cameras">- Cameras</option>
              <option value="games">- Games</option>
              <option value="home-garden">Home &amp; Garden</option>
              <option value="motors">Motors</option>
              <option value="cars-and-trucks">- Cars and Trucks</option>
              <option value="motorcycles-powersports">
                - Motorcycles &amp; Powersports
              </option>
              <option value="parts-accessories">
                - Parts &amp; Accessories
              </option>
              <option value="boats">- Boats</option>
              <option value="auto-tools-supplies">
                - Auto Tools &amp; Supplies
              </option>
            </select>
          </div>

          <button
            className="btn icon-search-3 bg-white"
            title="search"
            type="submit"
          ></button>

          <div className="live-search-list bg-white">
            {search.length > 2 &&
              !loading &&
              data.products.data.map((product, index) => (
                <ALink
                  href={`/product/default/${product.slug}`}
                  className="autocomplete-suggestion"
                  key={`search-result-${index}`}
                >
                  <LazyLoadImage
                    src={
                      process.env.NEXT_PUBLIC_ASSET_URI +
                      product.small_pictures[0].url
                    }
                    width={40}
                    height={40}
                    alt="product"
                  />
                  <div
                    className="search-name"
                    dangerouslySetInnerHTML={removeXSSAttacks(
                      matchEmphasize(product.name)
                    )}
                  ></div>
                  <span className="search-price">
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
                  </span>
                </ALink>
              ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
