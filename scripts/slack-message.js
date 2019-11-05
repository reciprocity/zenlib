#!/usr/bin/env node

const { SLACK_WEBHOOK } = process.env;

const slack = require("slack-notify")(SLACK_WEBHOOK);

const COMMIT_MESSAGE = process.argv[2];
const RELEASE_MESSAGE_SNIPPET =
  "chore(release): [skip ci] updated package versions";

if (COMMIT_MESSAGE.indexOf(RELEASE_MESSAGE_SNIPPET) !== -1) {
  const packages = COMMIT_MESSAGE.split("\n").splice(2);
  const message = `🚀 New packages versions published to NPM! \n\n ${packages.join(
    "\n"
  )}`;

  slack.success(message);
}
