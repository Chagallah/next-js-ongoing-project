import { useRouter } from "next/router";
import { connect } from "react-redux";

// Import Custom Component
import ALink from "./ALink";
import CartMenu from "./partials/cart-menu";
import MainMenu from "./partials/main-menu";
import SearchForm from "./partials/search-form";
import LoginModal from "../features/modals/login-modal";

function Header(props) {
  const router = useRouter();
  const { adClass = "", wishlistItems } = props;

  function openMobileMenu(e) {
    e.preventDefault();
    document.querySelector("body").classList.toggle("mmenu-active");
    e.currentTarget.classList.toggle("active");
  }

  return (
    <div className="header-wrapper position-relative">
      <header
        className={`header ${router.pathname === "/" ? "position-absolute" : "elements-header"
          } ${adClass}`}
      >
        <div className="header-top">
          <div className="container d-flex">
            <div className="header-left">
              <div className="header-dropdown">
                <ALink href="#" className="pl-0">
                  USD
                </ALink>
                <div className="header-menu">
                  <ul>
                    <li>
                      <ALink href="#">EUR</ALink>
                    </li>
                    <li>
                      <ALink href="#">USD</ALink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="header-dropdown">
                <ALink href="#" className="pl-0">
                  ENG
                </ALink>
                <div className="header-menu">
                  <ul>
                    <li>
                      <ALink href="#">
                        <i className="flag-us flag"></i>ENG
                      </ALink>
                    </li>
                    <li>
                      <ALink href="#">
                        <i className="flag-fr flag"></i>FRA
                      </ALink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="header-right header-dropdowns ml-0 ml-sm-auto">
              <div className="header-dropdown dropdown-expanded">
                <div className="header-menu">
                  <ul>
                    <li>
                      <ALink href="/pages/account">My Account</ALink>
                    </li>
                    <li>
                      <ALink href="#">Daily Deal</ALink>
                    </li>
                    <li>
                      <ALink href="/pages/blog">Blog</ALink>
                    </li>
                    <li>
                      <ALink href="/pages/wishlist">My Wishlist</ALink>
                    </li>
                    <LoginModal />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-middle sticky-header">
          <div className="container d-flex">
            <div className="header-left">
              <button
                className="mobile-menu-toggler"
                type="button"
                onClick={openMobileMenu}
              >
                <i className="fa fa-bars"></i>
              </button>

              <ALink href="/" className="logo">
                <img
                  src="/images/logo-black.png"
                  className="w-100"
                  width="101"
                  height="44"
                  alt="Porto Logo"
                />
              </ALink>

              <MainMenu />
            </div>

            <div className="header-right">
              <ALink
                href="/pages/login"
                className="header-icon header-icon-user"
                title="login"
              >
                <i className="icon-user-2"></i>
              </ALink>

              <ALink
                href="/pages/wishlist"
                className="header-icon position-relative header-wishlist"
                title="wishlist"
              >
                <i className="icon-wishlist-2"></i>
                <span className="cart-count badge-circle bg-secondary">
                  {wishlistItems.length}
                </span>
              </ALink>

              <SearchForm />

              <CartMenu />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    wishlistItems: state.wishlist.list ? state.wishlist.list : [],
  };
}

export default connect(mapStateToProps)(Header);
