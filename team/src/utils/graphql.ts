// import { ApolloServer } from "apollo-server-micro";
// import { connectDB } from "utils/db";
// import { schema } from "server/typeDefs";
// import { NextApiRequest, NextApiResponse } from "next";
// import { PubSub } from "apollo-server";

// export const pubSub = new PubSub();

// connectDB();

// interface NextServerProps {
//   res: NextApiResponse;
//   req: NextApiRequest;
// }

// const apolloServer = new ApolloServer({
//   schema,
//   context: async ({ req, res }: NextServerProps) => {
//     const authorization = req?.headers?.authorization;
//     return {
//       res,
//       req,
//       token: authorization,
//     };
//   },
//   subscriptions: {
//     path: "/api/v2/graphql",
//     onConnect: () => console.log("ws: connected"),
//     keepAlive: 9000,
//   },
//   playground: {
//     subscriptionEndpoint: "/api/v2/graphql",
//     settings: {
//       "request.credentials": "same-origin",
//     },
//   },
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const graphqlWithSubscribtionHandler = (req, res, next): any => {
//   if (!res.socket.server.apolloServer) {
//     console.log(`* apolloServer first use *`);

//     apolloServer.installSubscriptionHandlers(res.socket.server);
//     const handler = apolloServer.createHandler({ path: "/api/v2/graphql" });
//     res.socket.server.apolloServer = handler;
//   }

//   return res.socket.server.apolloServer(req, res, next);
// };

// export default graphqlWithSubscribtionHandler;

export default {};
