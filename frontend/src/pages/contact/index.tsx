import Contactsvg from "components/icon/Contactsvg";
import { Contact, Div } from "components/styled/style";
import FrontLayout from "layout/FrontLayout";
import React, { Fragment } from "react";
import Head from "next/head";
import { Strapi_Meta } from "types/Applicant.types";
import { GetStaticProps, NextPage } from "next";
import { apolloStrapi } from "apollo";
import { GET_STRAPI_META } from "apollo/queries/strapiQuery";

interface IProps {
	meta: Strapi_Meta;
}

const ContactPage: NextPage<IProps> = ({ meta }: IProps): JSX.Element => {
	return (
		<Fragment>
			<Head>
				<title>Contact Us</title>
			</Head>
			<FrontLayout>
				<div>
					<Div className="d-flex container flex-column-reverse flex-sm-row py-3">
						<div className="left d-flex flex-column justify-content-end">
							<h1 className="text-secondary fw-bold">Contact Us</h1>
							<p className="fs-5">
								by influencing policy makers. So much to campaign about: Social
								policy, Government decisions, Environment, Empowerment etc.
							</p>
						</div>
						<div className="right d-flex align-items-end">
							<Contactsvg />
						</div>
					</Div>
					<section className="py-5">
						<Contact className="container py-4 px-2 d-flex flex-column align-items-md-center flex-md-row bg-white">
							<div className="left border-0 border-end px-3 border-3">
								<div className="d-flex flex-column align-items-center mb-3">
									<i className="fas mb-2 fa-map-marker-alt py-2 px-3 text-secondary fs-5 bg-success rounded-3"></i>
									<span className="d-block mb-1 fw-bold fs-5 text-secondary">
										Address
									</span>
									<p className="text-center">{meta?.address}</p>
								</div>
								<div className="d-flex flex-column align-items-center mb-3">
									<i className="fas mb-2 fa-envelope py-2 px-3 text-secondary fs-5 bg-success rounded-3"></i>
									<span className="d-block mb-1 fw-bold fs-5 text-secondary">
										Email Us
									</span>
									<b className="d-block ">{meta?.email}</b>
								</div>
								<div className="d-flex flex-column align-items-center mb-3">
									<i className="fas mb-2 fa-map-marker-alt py-2 px-3 text-secondary fs-5 bg-success rounded-3"></i>
									<span className="d-block mb-1 fw-bold fs-5 text-secondary">
										Call Us
									</span>
									<b className="text-center">{meta?.phone}</b>
									<b className="text-center">+234 9012624162</b>
								</div>
							</div>
							<div className="right d-flex justify-content-end ">
								<div className="right_">
									<p className="fw-bold text-secondary fs-1 m-0 mb-2">
										Send us a message
									</p>
									<p className="m-0 mb-2 p-0">
										If you have any work from me or any types of queries related
										to our forum you can send us a message now. Its our pleasure
										to help
									</p>
									<form>
										<div className="mb-3">
											<input
												type="text"
												className="form-control bg-light py-3"
											/>
										</div>
										<div className="mb-4">
											<input
												type="text"
												className="form-control bg-light py-3"
											/>
										</div>
										<textarea
											name=""
											id=""
											cols={30}
											rows={10}
											className="bg-light form-control mb-3"
										></textarea>
										<button className="btn btn-warning px-5 py-2 text-white fs-5 fw-bolder rounded-pill">
											Send Message
										</button>
									</form>
								</div>
							</div>
						</Contact>
					</section>
					<section className="">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15902.049573576072!2d7.024268335564958!3d4.85343172442949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069d27581a232db%3A0x5746f5c6e635dcbd!2sEDFHR!5e0!3m2!1sen!2sng!4v1624892454974!5m2!1sen!2sng"
							width="600"
							height="450"
							allowFullScreen={true}
							loading="lazy"
							frameBorder={0}
							className="w-100 p-0 m-0 rounded-3"
						></iframe>
					</section>
				</div>
			</FrontLayout>
		</Fragment>
	);
};

export default ContactPage;

export const getStaticProps: GetStaticProps = async (): Promise<{
	props: { meta: Strapi_Meta | null };
}> => {
	try {
		const { data } = await apolloStrapi.query({
			query: GET_STRAPI_META,
		});
		const meta = data?.meta;
		return {
			props: {
				meta,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				meta: null,
			},
		};
	}
};
