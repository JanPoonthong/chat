#!/usr/bin/env node

const tmi = require("tmi.js");
const fs = require("fs");
const path = require("path");
const SECRET = getSecret();
const client = new tmi.Client({
  connection: {
    reconnect: false,
    secure: true,
  },
  identity: {
    username: "janpoonthong",
    password: `oauth:${SECRET}`,
  },
});

function main() {
  let args = process.argv.slice(2);
  if (args.length !== 1) {
    console.log("You need atleast one argument");
    process.exit(1);
  }
  let message = args[0];
  sendMessage(message);
}

function sendMessage(message) {
  client.connect();
  client.on("connected", () => {
    client.say("#janpoonthong", message);
    client.disconnect();
    process.exit(0)
  });
}

function getSecret() {
  let secretFilePath = path.join(path.dirname(__filename), "SECRET");
  return fs.readFileSync(secretFilePath, "utf-8").trim();
}

main();
