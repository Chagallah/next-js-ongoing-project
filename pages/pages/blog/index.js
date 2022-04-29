import React, { useEffect, useState } from "react";
// Import Custom Component
import BlogTypeOne from "../../../components/features/blogs/blog-type-one";
import BlogSidebar from "../../../components/partials/blog/blog-sidebar";
import Pagination from "../../../components/features/pagination";
import ALink from "../../../components/common/ALink";
import absoluteUrl from "next-absolute-url";
import qs from "qs";
import Head from "next/head";

function Blog({ loading, data }) {
  const [perPage, setPerPage] = useState(6);
  console.log("R", data);
  const blogs = !loading && data.posts.data;

  const totalPage = !loading
    ? parseInt(data.posts.total / perPage) +
      (data.posts.total % perPage ? 1 : 0)
    : 1;

  useEffect(() => {
    if (!loading) {
      let offset =
        document.querySelector(".main").getBoundingClientRect().top +
        window.pageYOffset -
        68;
      setTimeout(() => {
        window.scrollTo({ top: offset, behavior: "smooth" });
      }, 200);
    }
  }, [loading]);

  if (loading) {
    return "Loading....";
  }

  return (
    <>
      <Head>
        <title>Porto React Ecommerce - Blog Page </title>
      </Head>

      <main className="main">
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <ALink href="/home">
                  <i className="icon-home"></i>
                </ALink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Blog
              </li>
            </ol>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div
                className={`blog-section row pt-0 pb-3 skeleton-body skel-shop-products ${
                  loading ? "" : "loaded"
                }`}
              >
                {loading ? (
                  new Array(parseInt(perPage)).fill(1).map((item, index) => (
                    <div
                      className="col-md-6 col-lg-4"
                      key={"Skeleton:" + index}
                    >
                      <div className="skel-pro skel-pro-grid"></div>
                    </div>
                  ))
                ) : blogs ? (
                  blogs.length ? (
                    blogs.slice(0, 6).map((blog, index) => (
                      <div
                        className="col-md-6 col-lg-4"
                        key={"BlogTypeOne" + index}
                      >
                        <BlogTypeOne blog={blog} />
                      </div>
                    ))
                  ) : (
                    <div className="info-box with-icon">
                      <p>No blogs were found matching your selection.</p>
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>

              <div className="d-flex justify-content-end mb-5">
                <Pagination totalPage={totalPage} />
              </div>
            </div>

            <BlogSidebar />
          </div>
        </div>
      </main>
    </>
  );
}

export default Blog;
export async function getServerSideProps(ctx) {
  const { origin } = absoluteUrl(ctx.req);
  const { category, page } = ctx.query;
  const perPage = 6;
  let pageCalc = page ? page : 1;

  const varibles = qs.stringify({
    category: category || null,
    from: perPage * (pageCalc - 1),
    to: perPage * pageCalc,
    demo: 12,
  });
  const req = await fetch(`${origin}/api/posts?${varibles}`);
  const res = await req.json();

  return {
    props: {
      loading: req.status === 200 ? false : true,
      data: res,
    },
  };
}
