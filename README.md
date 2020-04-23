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

#### Reiewing component changes live in the Zengrc app

_Note! These instructions apply if you're running frontend locally (outside the container) with frontend/yarn serve:local._

When you're modifying some component **it's useful to see how modifications look like in the actual app.** The problem is that Zenlib is a separate repo and thus packages included in Zengrc are updated only when your work is done when your PR is merged. Here's how you can make it work:

**The idea is to substitute the actual node module included in the ZenGrc with a symlink that's pointing to work version of our component (example for multiselect):**

`cd zenlib/packages/multiselect`
...and create a symlink to make component globally available:
`npm link`

Go to the frontend folder of the app:
cd zengrc/frontend
... and use the previously created link:
_npm link [Name of the module you're modifying]
eg. npm `link @reciprocity/multiselect`

To view changes live while coding, Zenlib needs to be rebuilt on any change. So keep the following command running:
`cd zenlib;
npm run bootstrap;
npm run build:watch`

Open new terminal tab and start Zengrc local server:
`cd zengrc/frontend/;
yarn server:local`

The new component should be already visible.

Thanks to param in _vue.config.js_ - `config.resolve.symlinks(false);`, any changes in symlinks within node_modules will trigger a rebuild of Zengrc and you'll be able to review component changes.

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

### Adding a new package/component

1. Create a folder under the `packages` folder. Name it as the component, using Kebab case. It should contain an `index.js` file that exports the main component.

- Add a `README.md`
- Add a `package.json` to handle the new component dependencies

2. Add the component to Story Book

- Add the package as a dependency in `packages/_storybook_/package.json`
- Create a new story file under the `packages/_storybook_/stories/` folder
- Re run [Bootstrap packages](#bootstrap-packages)

#### Versioning

Use [Semantic Versioning](https://semver.org/). Start by `0.0.1` and once the component is ready, change it to `0.1.0`

### Committing changes

As a general rule, try to make your commits atomic and self-contained. Think of it this way: if someone reviews your PR and goes commit by commit, would it be able to understand the changes?

#### Conventional Commits

For commit messages we use the **[Conventional Commits](https://www.conventionalcommits.org)** spec. This allows us to automate package version releasing and changelog generation.

_There's a commit message linter that will automatically tell you if you're using the wrong commit format. Just in case ;)_

### Releasing changes

Once you're finished with your changes you need to open a PR from your feature branch to master. Once your PR is approved and merged your changes will be released automatically to NPM.
