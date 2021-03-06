#!/usr/bin/env node

const {
  GITHUB_ACCESS_TOKEN,
  CIRCLE_PROJECT_USERNAME,
  CIRCLE_PROJECT_REPONAME,
  CIRCLE_PULL_REQUEST
} = process.env;

const BOT_NAME = "zenbot-0";

const OctoKit = require("@octokit/rest");
const some = require("lodash.some");

const octokit = OctoKit({
  auth: GITHUB_ACCESS_TOKEN
});

// CIRCLE_PULL_REQUEST is a url that looks
// like https://github.com/reciprocity/zenlib/pull/41
// we need the number
const issue_number = CIRCLE_PULL_REQUEST.split("/")[6];

const body = process.argv[2];

const params = {
  owner: CIRCLE_PROJECT_USERNAME,
  repo: CIRCLE_PROJECT_REPONAME,
  issue_number
};

octokit.issues.listComments(params).then(response => {
  const comments = response.data;
  const exists = some(comments, comment => comment.user.login === BOT_NAME);

  // Only post the comment once
  if (!exists) {
    return octokit.issues.createComment({
      ...params,
      body
    });
  }
});
