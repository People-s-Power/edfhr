import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { execute, subscribe } from "graphql";
import { PubSub } from "graphql-subscriptions";
import { createServer } from "http";
import path from "path";
import { SubscriptionServer } from "subscriptions-transport-ws";
import auth from "./controllers/auth";
import verifyUser from "./controllers/verify";
import { Applicant } from "./models/Applicant";
import User from "./models/User";
import { schema } from "./typeDefs";
import { connectDB } from "./utils/db";
import forgotPassword from "./controllers/forgotpassword";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const exphbs = require("express-handlebars");

export const rootDir = path.dirname(require.main.path);

const PORT = process.env.PORT || 8002;
export const pubSub = new PubSub();

const app = express();
app.use(express.static("public"));
app.use(cors());

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
// app.engine("html",);

app.get("/api/v2", (_, res) => {
  res.render("home");
});

app.get("/api/v2/caseb", async (req, res) => {
  console.log("now in caseB");
  res.render("caseB");
});

app.use("/api/v2/auth", auth);
app.use("/api/v2/verify", verifyUser);

app.post("/api/v2/changeposition", async (req, res) => {
  const { from, to } = req.body;

  try {
    let users = await User.updateMany(
      { position: from },
      { position: to },
      { new: true }
    );
    users = await User.find({ position: to });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.use("/api/v2/forgot", forgotPassword);

app.post("/api/v2/pdf", async (req, res) => {
  try {
    const applicant = await Applicant.findOne({ _id: req.body.applicant_id });

    res.json(applicant);
  } catch (error) {
    res.json(error);
  }
});

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    let token;
    if (req.headers) {
      token = req.headers.authorization;
    }
    const host = req.headers.host;
    const protocol = req.protocol;

    return {
      res,
      req,
      token,
      host: `${protocol}://${host}`,
    };
  },
  playground: true,
  introspection: true,
});

apolloServer.applyMiddleware({
  app,
  path: "/api/v2/graphql",
  bodyParserConfig: { limit: "100mb" },
});

const server = createServer(app);

// apolloServer.installSubscriptionHandlers();
const start = async () => {
  await connectDB();
  try {
    server.listen(PORT, () => {
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema,
          onConnect: () => console.log("ws connected"),
          onDisconnect: (err) => console.log(err),
        },
        {
          server,
          path: "/api/v2/graphql",
        }
      );
    });

    console.log(`server started on ${PORT}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
