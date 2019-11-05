# ZenLib is a Vue.js components library
[![CircleCI](https://circleci.com/gh/reciprocity/zenlib.svg?style=svg)](https://circleci.com/gh/reciprocity/zenlib) [![Coverage Status](https://coveralls.io/repos/github/reciprocity/zenlib/badge.svg?branch=master)](https://coveralls.io/github/reciprocity/zenlib?branch=master)

We made this library to put all the Vue.js components we share across projects.

## Quick Start

Using components from the library in your projects is as simple as installing the components you want with yarn or npm.

Eg.
`npm install @reciprocity/button`
or
`yarn add @reciprocity/button`

*Each component will have its own instructions on importing and usage. You should find a `README.md` file in each component's directory*

To see component demos and documentation checkout https://reciprocity.github.io/zenlib.

To browse a list of available components go to [Reciprocity's NPM page](https://www.npmjs.com/org/reciprocity).

## Contributing

### Getting started

#### Requirements

To start working with the library you'll need to have Node.js and npm installed on your system.

#### Bootstrap packages

First, you'll need to install all packages dependencies, interlink packages locally and build them. Run these commands to do it:

`npm install && npm run bootstrap && npm run build`

#### Run storybook locally

To run the storybook website locally you can do it by running

`npm run storybook`

#### Building packages

After you change stuff in the component's source code, you'll need to build the packages so they're distributable. You can do that by running `npm run build`. Or if you want files to be watched so they build automatically after you make a change, you'll want to run `npm run build:watch` instead.

_The storybook website will also watch for changes while it's running. So if you want to develop using hot reloading, you need to run the storybook website in one terminal, and `npm run build:watch` in another one._

#### Linting & code style

There's an `npm run lint` command that will run ESLint and Prettier to format and lint your code.

_This command is run automatically before pushing your changes just in case ;)_

There's also an `npm run lint:fix` command that will attempt to fix eslint errors automatically.

#### Running tests

You can do it by running the `npm run test` command. Also if you want tests to watch files and rerun automatically there's an `npm run test:watch` command.

_This will also be run automatically before pushing changes_

#### Test coverage

If you want to generate a coverage report for the unit tests, there's an `npm run test:coverage` command that will generate a coverage directory with a report.

We run coverage checks on each PR so try not to ship code without tests ;)

### Committing changes

As a general rule, try to make your commits atomic and self-contained. Think of it this way: if someone reviews your PR and goes commit by commit, would it be able to understand the changes?

#### Conventional Commits

For commit messages we use the **[Conventional Commits](https://www.conventionalcommits.org)** spec. This allows us to automate package version releasing and changelog generation.

_There's a commit message linter that will automatically tell you if you're using the wrong commit format. Just in case ;)_

### Releasing changes

Once you're finished with your changes you need to open a PR from your feature branch to master. Once your PR is approved and merged your changes will be released automatically to NPM.
