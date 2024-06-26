const fs = require("fs");
const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");
const path = require("path");

fastify.register(cors, {
  origin: "*",
  methods: ["POST", "GET", "OPTIONS"],
});

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "dist"),
});

fastify.get("/", function (req, reply) {
  reply.sendFile("index.html");
});

fastify.get("/api", (request, reply) => {
  fs.readFile("./users.json", "utf8", (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }

    if (request.query.term) {
      const result = JSON.parse(data).filter(
        (elem) =>
          elem.name.toLowerCase().search(request.query.term.toLowerCase()) !==
          -1
      );
      reply.send(JSON.stringify(result));
    } else {
      reply.send(data);
    }
  });
});

const start = async () => {
  try {
    await fastify.listen({ port: 3010 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
