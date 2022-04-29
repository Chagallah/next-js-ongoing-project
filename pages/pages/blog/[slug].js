import { useRouter } from "next/router";
// Import Custom Component
import ALink from "../../../components/common/ALink";
import OwlCarousel from "../../../components/features/owl-carousel";
import BlogSidebar from "../../../components/partials/blog/blog-sidebar";
import BlogTypeThree from "../../../components/features/blogs/blog-type-three";
import BlogSingle from "../../../components/features/blogs/blog-single";

//Import Settings
import { blogSlider } from "../../../utils/data/slider";
import absoluteUrl from "next-absolute-url";
import qs from "qs";

function Single({ data, loading, slug }) {
  if (!slug)
    return (
      <div className="loading-overlay">
        <div className="bounce-loader">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    );

  const blog = !loading && data.post.data;
  const related = !loading && data.post.related;

  if (data.length === 0) {
    return useRouter().push("/pages/404");
  }

  return (
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">
                <i className="icon-home"></i>
              </ALink>
            </li>
            <li className="breadcrumb-item">
              <ALink href="/pages/blog">Blog</ALink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {blog && blog.title}
            </li>
          </ol>
        </div>
      </nav>

      <div
        className={`container skeleton-body skel-shop-products ${
          loading ? "" : "loaded"
        }`}
      >
        <div className="row">
          <div className="col-lg-9">
            <BlogSingle blog={blog} loading={loading} />

            {!loading && !related.length ? (
              ""
            ) : (
              <>
                <hr className="mt-2 mb-1" />

                <div className="related-posts">
                  <h4>
                    Related <strong>Posts</strong>
                  </h4>

                  <OwlCarousel
                    adClass="related-posts-carousel"
                    options={blogSlider}
                  >
                    {loading
                      ? new Array(3)
                          .fill(1)
                          .map((item, index) => (
                            <div
                              className="skel-pro skel-pro-grid"
                              key={"Skeleton:" + index}
                            ></div>
                          ))
                      : related.map((blog, index) => (
                          <BlogTypeThree
                            blog={blog}
                            key={"BlogTypeThree" + index}
                          />
                        ))}
                  </OwlCarousel>
                </div>
              </>
            )}
          </div>

          <BlogSidebar />
        </div>
      </div>
    </main>
  );
}

export default Single;
export async function getServerSideProps(ctx) {
  const { slug } = ctx.query;
  const { origin } = absoluteUrl(ctx.req);
  const params = qs.stringify({
    demo: 12,
    slug: slug,
  });
  if (slug !== "favicon.png") {
    const products = await fetch(`${origin}/api/posts/get_post?${params}`);
    const data = await products.json();
    return {
      props: {
        data: data,
        loading: products.status === 200 ? false : true,
        slug: products.status === 200 ? slug : "",
      },
    };
  } else {
    return {
      props: {
        data: [],
        loading: true,
        slug: "",
      },
    };
  }
}
