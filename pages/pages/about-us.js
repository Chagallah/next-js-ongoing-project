import React, {useState} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import LightBox from "react-image-lightbox";

import ALink from "../../components/common/ALink";
import Card from "../../components/features/accordion/card";
import Accordion from "../../components/features/accordion/accordion";
import OwlCarousel from "../../components/features/owl-carousel";

export default function AboutUs() {
  const [openLB, setOpenLB] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const images = [
    "/images/home/team/member-1.jpg",
    "/images/home/team/member-2.jpg",
    "/images/home/team/member-3.jpg",
    "/images/home/team/member-4.jpg",
  ];

  function moveNextPhoto() {
    setPhotoIndex((photoIndex + 1) % images.length);
  }

  function movePrevPhoto() {
    setPhotoIndex((photoIndex + images.length - 1) % images.length);
  }

  function openLightBox(e, index) {
    setOpenLB(true);
    setPhotoIndex(index);
  }

  function closeLightBox() {
    setOpenLB(false);
  }

  return (
    <main className="main about">
      <div
        className="page-header page-header-bg text-left"
        style={{
          background: "50%/cover #D4E1EA url(/images/home/page-header-bg.jpg)",
        }}
      >
        <div className="container">
          <h1>WHO WE ARE</h1>
        </div>
      </div>

      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <ALink href="/">Home</ALink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              About Us
            </li>
          </ol>
        </div>
      </nav>

      <div className="container">
        <div className="history-section mt-4 pb-2 mb-6">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <h2 className="about-title font4">ABOUT US</h2>
              <p className="text-bg">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. has been the industry’s standard dummy
              </p>
              <p>
                long established fact that a reader will be distracted by the
                readable content of a page when looking at its layout. The point
                of using Lorem Ipsum is that it has a more-or-less normal
                distribution of letters, as opposed to using ‘Content here,
                content here’, making it look like readable English. Many
                desktop publishing packages and web page.
              </p>
            </div>
            <div className="col-md-4">
              <figure>
                <img
                  className="m-auto"
                  src="/images/home/about/history.jpg"
                  width="307"
                  height="371"
                  alt="history image"
                />
              </figure>
            </div>
            <div className="col-md-4">
              <div className="accordion-section" id="accordion">
                <Accordion adClass="accordion-simple">
                  <Card
                    title="Company History"
                    adClass="card-accordion"
                    expanded={true}
                  >
                    <p>
                      leap into electronic typesetting, remaining essentially
                      unchanged. It was popularised in the 1960s with the
                      release of Letraset sheets containing Lorem Ipsum
                      passages, and more recently with desktop.
                    </p>
                  </Card>
                  <Card title="Our Vision" adClass="card-accordion">
                    <p>
                      leap into electronic typesetting, remaining essentially
                      unchanged. It was popularised in the 1960s with the
                      release of Letraset sheets containing Lorem Ipsum
                      passages, and more recently with desktop.
                    </p>
                  </Card>
                  <Card title="Our Mission" adClass="card-accordion">
                    <p>
                      leap into electronic typesetting, remaining essentially
                      unchanged. It was popularised in the 1960s with the
                      release of Letraset sheets containing Lorem Ipsum
                      passages, and more recently with desktop.
                    </p>
                  </Card>
                  <Card title="Funcfacts" adClass="card-accordion">
                    <p>
                      leap into electronic typesetting, remaining essentially
                      unchanged. It was popularised in the 1960s with the
                      release of Letraset sheets containing Lorem Ipsum
                      passages, and more recently with desktop.
                    </p>
                  </Card>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team-section">
        <div className="container text-center">
          <h2 className="about-title text-left font4">ABOUT US</h2>

          <div className="row justify-content-center">
            <div className="col-md-3 col-6">
              <div className="team-info mb-3">
                <figure>
                  <ALink href="#">
                    <LazyLoadImage
                      className="w-100"
                      src="/images/home/team/member-1.jpg"
                      alt="Team"
                      width={270}
                      height={319}
                    />
                  </ALink>

                  <span
                    className="prod-full-screen"
                    onClick={e => {
                      openLightBox(e, 0);
                    }}
                  >
                    <i className="fas fa-search"></i>
                  </span>
                </figure>

                <h5 className="team-name text-center mb-0">Jessica Doe</h5>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="team-info mb-3">
                <figure>
                  <ALink href="#">
                    <LazyLoadImage
                      className="w-100"
                      src="/images/home/team/member-2.jpg"
                      alt="Team"
                      width={270}
                      height={319}
                    />
                  </ALink>

                  <span
                    className="prod-full-screen"
                    onClick={e => {
                      openLightBox(e, 1);
                    }}
                  >
                    <i className="fas fa-search"></i>
                  </span>
                </figure>

                <h5 className="team-name text-center mb-0">John Doe</h5>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="team-info mb-3">
                <figure>
                  <ALink href="#">
                    <LazyLoadImage
                      className="w-100"
                      src="/images/home/team/member-3.jpg"
                      alt="Team"
                      width={270}
                      height={319}
                    />
                  </ALink>

                  <span
                    className="prod-full-screen"
                    onClick={e => {
                      openLightBox(e, 2);
                    }}
                  >
                    <i className="fas fa-search"></i>
                  </span>
                </figure>

                <h5 className="team-name text-center mb-0">Rick Edward Doe</h5>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="team-info mb-3">
                <figure>
                  <ALink href="#">
                    <LazyLoadImage
                      className="w-100"
                      src="/images/home/team/member-4.jpg"
                      alt="Team"
                      width={270}
                      height={319}
                    />
                  </ALink>

                  <span
                    className="prod-full-screen"
                    onClick={e => {
                      openLightBox(e, 3);
                    }}
                  >
                    <i className="fas fa-search"></i>
                  </span>
                </figure>

                <h5 className="team-name text-center mb-0">Melinda Wolosky</h5>
              </div>
            </div>
          </div>

          <ALink className="btn font4" href="#">
            JOIN OUR TEAM
          </ALink>
        </div>
      </div>

      <div className="testimonials-section">
        <div className="container">
          <h2 className="about-title font4 text-center">TESTIMONIALS</h2>

          <div className="row">
            <div className="col-md-12 offset-xl-3 col-xl-6 offset-lg-2 col-lg-8">
              <div className="testimonial">
                <blockquote style={{color: "#5e6065"}}>
                  <p>
                    Long established fact that a reader will be distracted by
                    the readable content of a page when looking at its layout.
                    The point of using Lorem Ipsum is that it has a more-or-less
                    normal distribution of letters, as opposed to using ‘Content
                    here, content here
                  </p>
                </blockquote>

                <div className="testimonial-owner justify-content-center text-center flex-column">
                  <figure>
                    <img src="/images/home/clients/client1.jpg" alt="client" />
                  </figure>

                  <div>
                    <h5 className="testimonial-title">John Doe</h5>
                    <span>Porto Founder</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openLB && (
        <LightBox
          mainSrc={`${images[photoIndex]}`}
          prevSrc={`${
            images[(photoIndex + images.length - 1) % images.length]
          }`}
          nextSrc={`${images[(photoIndex + 1) % images.length]}`}
          onCloseRequest={closeLightBox}
          onMoveNextRequest={moveNextPhoto}
          onMovePrevRequest={movePrevPhoto}
        />
      )}
    </main>
  );
}
