import { ApolloClient, InMemoryCache } from "@apollo/client";
import cookies from "js-cookie";
import { TOKEN_NAME, HTTP_URI } from "utils/constants";

const token = cookies.get(TOKEN_NAME);

const client = new ApolloClient({
  uri: `${HTTP_URI}/graphql`,
  cache: new InMemoryCache(),
  credentials: "include",
  headers: {
    authorization: token || "",
  },
});

export default client;
