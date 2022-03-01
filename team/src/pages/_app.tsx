/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable react/react-in-jsx-scope */
import { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";
import "../styles/sass/index.scss";
import "animate.css/animate.css";
import { ThemeProvider } from "styled-components";
import Router from "next/router";
import Nprogress from "nprogress";
import { theme } from "theme";
import "react-mde/lib/styles/css/react-mde-all.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "apollo";
import { RecoilRoot } from "recoil";

if (process.browser) {
	require("popper.js");
	require("jquery");
	require("bootstrap/dist/js/bootstrap");
}

Router.events.on("routeChangeStart", () => {
	Nprogress.start();
});
Router.events.on("routeChangeComplete", () => Nprogress.done());
Router.events.on("routeChangeError", () => Nprogress.done());

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
	const client = useApollo(pageProps.apollo);
	// useEffect(() => {
	//   if(process.browser)
	// },[])
	return (
		<Fragment>
			<Head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
				/>
				<title>EDFHR</title>
			</Head>
			<RecoilRoot>
				<ApolloProvider client={client}>
					<ThemeProvider theme={theme}>
						<Component {...pageProps} />
					</ThemeProvider>
				</ApolloProvider>
			</RecoilRoot>
		</Fragment>
	);
};

export default MyApp;
