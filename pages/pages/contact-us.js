import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () => <div></div>;

export default function ContactUs () {
    return (
        <main className="main contact-two">
            <div id="map">
                <GoogleMapReact
                    bootstrapURLKeys={ { key: 'your-api-key' } }
                    defaultCenter={ { lat: 59.95, lng: 30.33 } }
                    defaultZoom={ 11 }
                >
                    <AnyReactComponent
                        lat={ 59.955413 }
                        lng={ 30.337844 }
                    />
                </GoogleMapReact>
            </div>

            <div className="container">
                <div className="row ">
                    <div className="col-md-8">
                        <h2 className="contact-title">Leave a <strong>Message</strong></h2>

                        <form action="#">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group required-field">
                                        <label htmlFor="contact-name">Name</label>
                                        <input type="text" className="form-control" id="contact-name" name="contact-name"
                                            required />
                                    </div>

                                    <div className="form-group required-field">
                                        <label htmlFor="contact-email">Email</label>
                                        <input type="email" className="form-control" id="contact-email" name="contact-email"
                                            required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="contact-subject">Subject</label>
                                        <input type="text" className="form-control" id="contact-subject"
                                            name="contact-subject" />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group required-field mb-0">
                                        <label htmlFor="contact-message">Message</label>
                                        <textarea cols="30" rows="1" id="contact-message" className="form-control"
                                            name="contact-message" required></textarea>
                                    </div>

                                    <div className="form-footer">
                                        <button type="submit" className="btn btn-primary">Send Message</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-4">
                        <h2 className="contact-title">Contact <strong>Details</strong></h2>

                        <div className="contact-info">
                            <div className="porto-sicon-box d-flex align-items-center">
                                <div className="porto-icon">
                                    <i className="fa fa-phone"></i>
                                </div>
                                <div className="porto-sicon-description">
                                    0201 203 2032<br />
                                                0201 203 2032
                                </div>
                            </div>
                            <div className="porto-sicon-box  d-flex align-items-center">
                                <div className="porto-icon">
                                    <i className="fas fa-mobile-alt mobile-phone"></i>
                                </div>
                                <div className="porto-sicon-description">
                                    201-123-39223<br />
                                                    02-123-3928
                                </div>
                            </div>
                            <div className="porto-sicon-box  d-flex align-items-center">
                                <div className="porto-icon">
                                    <i className="fa fa-envelope"></i>
                                </div>
                                <div className="porto-sicon-description">
                                    porto@gmail.com<br />
                                                        porto@portotemplate.com
                                </div>
                            </div>
                            <div className="porto-sicon-box  d-flex align-items-center">
                                <div className="porto-icon">
                                    <i className="fab fa-skype"></i>
                                </div>
                                <div className="porto-sicon-description">
                                    porto_skype<br />
                                                            porto_templete
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}