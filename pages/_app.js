import { useEffect } from "react";
import { Provider, useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import dynamic from "next/dynamic";
import { wrapper } from "../store/index.js";
import Layout from "../components/layout";
import { actions as DemoAction } from "../store/demo";
<link id="googleFonts" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800%7CPlayfair+Display:400,700,900&display=swap" rel="stylesheet" type="text/css"></link>

import "../styles/vendor/bootstrap.min.css";
import "../styles/vendor/fontawesome-free/css/all.min.css";
import "../styles/vendor/animate/animate.compat.css";
import "../styles/vendor/simple-line-icons/css/simple-line-icons.min.css";
import "../styles/vendor/owl.carousel/assets/owl.carousel.min.css";
import "../styles/vendor/owl.carousel/assets/owl.theme.default.min.css";
import "../styles/sass/style.scss";

import '../styles/css/theme.css'
import '../styles/css/theme-elements.css'
import '../styles/css/demos/demo-industry-factory.css'
import '../styles/css/skins/skin-industry-factory.css'

import "../styles/vendor/bootstrap/css/bootstrap.css";
import Head from "next/head";

const Wrapper = dynamic(() => import("../components/Wrapper.js"), {
  ssr: true,
});
const App = ({ Component, pageProps }) => {
  const store = useStore();
  useEffect(() => {
    if (store.getState().demo.current !== 12) {
      store.dispatch(DemoAction.refreshStore(12));
    }
  }, []);

  return (
    <Provider store={store}>
      <Wrapper>
        <PersistGate
          persistor={store.__persistor}
          loading={
            <div className="loading-overlay">
              <div className="bounce-loader">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
            </div>
          }
        >
          <>
            <Head>
              <meta charSet="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Open+Sans:200,300,400,500,600,700,800%7CPoppins:200,300,400,500,600,700,800%7COswald:300,400,600,700"
              />
              <link rel="icon" href="favicon.png" />
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </>
        </PersistGate>
      </Wrapper>
    </Provider>
  );
};

export default wrapper.withRedux(App);
