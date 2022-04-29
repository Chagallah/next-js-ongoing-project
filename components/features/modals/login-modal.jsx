import React, { useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";

// Import Custom Component

const customStyles = {
  content: {
    position: "relative",
    maxWidth: "525px",
    marginLeft: "1rem",
    marginRight: "1rem",
    outline: "none",
    backgroundColor: "#fff",
  },
};

export default function LoginModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function closeModal(e) {
    if (!document.querySelector(".open-modal")) return;
    e.preventDefault();
    document.querySelector(".open-modal").classList.add("close-modal");

    if (e.currentTarget.classList.contains("btn-regist")) {
      router.push("/pages/login");
    }

    if (e.currentTarget.classList.contains("forget-password")) {
      router.push("/pages/forgot-password");
    }

    setTimeout(() => {
      setOpen(false);
    }, 350);
  }

  function openModal(e) {
    e.preventDefault();
    setOpen(true);
  }

  return (
    <li>
      <a href="#" className="login-link" onClick={openModal}>
        Log In
      </a>

      {open ? (
        <Modal
          isOpen={open}
          style={customStyles}
          contentLabel="login Modal"
          className="login-popup"
          overlayClassName="ajax-overlay open-modal"
          shouldReturnFocusAfterClose={false}
          onRequestClose={closeModal}
          closeTimeoutMS={10}
        >
          <div className="modal-wrapper">
            <div className="container">
              <h2 className="title">Login</h2>

              <form action="#" className="mb-0">
                <label htmlFor="login-email">
                  Username or email address
                  <span className="required">*</span>
                </label>
                <input
                  type="email"
                  className="form-input form-wide mb-2"
                  id="login-email"
                  required
                />

                <label htmlFor="login-password">
                  Password<span className="required"> *</span>
                </label>

                <input
                  type="password"
                  className="form-input form-wide mb-2"
                  id="login-password"
                  required
                />

                <div className="form-footer">
                  <div className="custom-control custom-checkbox ml-0">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="lost-password"
                    />
                    <label
                      className="custom-control-label form-footer-right"
                      htmlFor="lost-password"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="form-footer-right">
                    <a
                      href="/pages/forgot-password"
                      className="forget-password text-dark"
                      onClick={closeModal}
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-dark btn-block btn-md"
                  >
                    LOGIN
                  </button>

                  <a
                    href="#"
                    className="btn btn-regist text-dark bg-transparent text-transform-none p-0"
                    onClick={closeModal}
                  >
                    Register Now!
                  </a>
                </div>
              </form>
            </div>

            <button
              title="Close (Esc)"
              type="button"
              className="mfp-close"
              onClick={closeModal}
            >
              ×
            </button>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </li>
  );
}
