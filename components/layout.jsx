import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import Cookie from "js-cookie";
import "react-image-lightbox/style.css";
import "react-toastify/dist/ReactToastify.min.css";
import "rc-tree/assets/index.css";
import "react-input-range/lib/css/index.css";
import "react-image-lightbox/style.css";

import ALink from "./common/ALink";
import StickyNavbar from "./common/partials/sticky-navbar";
import Header from "./common/header";
import Footer from "./common/footer";
import MobileMenu from "./common/partials/mobile-menu";
import QuickModal from "../components/features/modals/quickview";
import VideoModal from "../components/features/modals/video-modal";

import { actions } from "../store/modal";
import { stickyInit, scrollTopHandlder, scrollTopInit } from "../utils";

function Layout({ children, hideQuickView, hideVideo }) {
  const [showTopNotice, setShowTopNotice] = useState(
    !Cookie.get("closeTopNotice")
  );

  function closeTopNotice() {
    setShowTopNotice(false);
    Cookie.set("closeTopNotice", true, { expires: 7, path: router.basePath });
  }

  useEffect(() => {
    window.addEventListener("scroll", stickyInit, { passive: true });
    window.addEventListener("scroll", scrollTopInit, { passive: true });
    window.addEventListener("resize", stickyInit);
    hideQuickView();
    hideVideo();

    return () => {
      window.removeEventListener("scroll", stickyInit, { passive: true });
      window.removeEventListener("scroll", scrollTopInit, { passive: true });
      window.removeEventListener("resize", stickyInit);
    };
  }, []);

  return (
    <>
      <div className="page-wrapper">
        {showTopNotice ? (
          <div className="top-notice bg-dark text-white">
            <div className="container text-center pl-6 pr-6">
              <h5 className="d-inline-block mb-0 m-r-1">
                Get Up to <b>40% OFF</b> New-Season Styles
              </h5>
              <ALink href="/shop" className="category">
                MEN
              </ALink>
              <ALink href="/shop" className="category second">
                WOMEN
              </ALink>
              <small className="font1">* Limited time only.</small>
              <button
                title="Close (Esc)"
                type="button"
                onClick={closeTopNotice}
                className="mfp-close"
              >
                ×
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        <Header />

        {children}

        <Footer />

        <ToastContainer
          draggable={false}
          autoClose={3000}
          duration={300}
          newestOnTo={true}
          className="toast-container"
          position="bottom-right"
          closeButton={false}
          hideProgressBar={true}
          newestOnTop={true}
        />

        <QuickModal />
        <VideoModal />

        <div className="wishlist-popup">
          <div className="wishlist-popup-msg">Product added!</div>
        </div>
      </div>

      <MobileMenu />
      <StickyNavbar />

      <a
        id="scroll-top"
        href="#"
        title="Top"
        role="button"
        className="btn-scroll"
        onClick={scrollTopHandlder}
      >
        <i className="icon-angle-up"></i>
      </a>
    </>
  );
}

export default connect(null, actions)(Layout);
