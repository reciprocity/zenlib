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

### Run storybook locally

To run the storybook website locally you can do it by running

`npm run storybook`

#### Building packages

After you change stuff in the component's source code, you'll need to build the packages so they're distributable. You can do that by running `npm run build`. Or if you want files to be watched so they build automatically after you make a change, you'll want to run `npm run build:watch` instead.

_The storybook website will also watch for changes while it's running. So if you want to develop using hot reloading, you need to run the storybook website in one terminal, and `npm run build:watch` in another one._

#### Reviewing component changes live in the Zengrc app

It's useful to see how component's modifications look like in the actual app. The problem is that Zenlib is a separate repo. Package's versions are bumped when your PR gets merged, so this is when we could run `npm install` in Zengrc, to update components. But we would like to see our component in action during development, not only after it's merged.

The idea is to substitute the actual installed folder in zengrc/frontend/node_modules with a symbolic link that's pointing to working folder of our component. Npm (yarn) do support such functionality out of the box! It's called `npm link`.

_Note:
- _These instructions apply if you're running frontend locally (outside the container) with frontend/yarn serve:local._
- _All commands below are an example for my-component component_

Go to `zenlib/packages/my-component` and create a symlink to make folder globally available:\
`yarn link`

Go to `zengrc\frontend` folder and run:\
`yarn link @reciprocity/my-component`
...which substituted actual module with a symlink

To make sure component's folder was replaced with symbolic link, go to `zengrc/frontend/` and run
`ls -la node_modules/@reciprocity`
Symbolic links have arrows pointing to original folders, eg. `my-component -> ../../../../../../.config/yarn/link/@reciprocity/my-component`

Make sure zenLib is rebuilt on each of your change - keep this running:\
`cd zenlib;`\
`npm run bootstrap;`\
`npm run build:watch`

Run Zengrc app in new tab:\
`cd zengrc/frontend/;`\
`yarn server:local`\

Changes should now be visible in Zengrc. It will also reload and show any addtional changes automatically.
(in case of troubles make sure _vue.config.js_ has param `config.resolve.symlinks(false);`)

#### Linting & code style

There's an `npm run lint` command that will run ESLint and Prettier to format and lint your code.

_This command is run automatically before pushing your changes just in case ;)_

There's also an `npm run lint:fix` command that will attempt to fix eslint errors automatically.

#### Running tests

You can do it by running the `npm run test` command. Also if you want tests to watch files and rerun automatically there's an `npm run test:watch` command.

_This will also be run automatically before pushing changes_

#### Test coverage

If you want to generate a coverage report for the unit tests, there's an `npm run test:coverage` command that will generate a coverage directory with a report.

Each component should have 95% lines of js covered with tests.

We run coverage checks on each PR so try not to ship code without tests ;)

### Adding a new package/component

1. Create a folder under the `packages` folder. Name it as the component, using Kebab case. It should contain an `index.js` file that exports the main component.

- Add a `README.md`
- Add a `package.json` to handle the new component dependencies
  Set version of the component to 0.1.0

2. Add the component to Story Book

- Add the package as a dependency in `packages/_storybook_/package.json`. Put in version ^0.1.0, although note that since package isn't published, you can't do `npm install`!
- Create a new story file under the `packages/_storybook_/stories/` folder
- Since we can't install our component throught npm, we need to use `npm link` to create symbolic link in `_storybook_/node_modules/@reciprocity` that's pointing to root path of our component (eg. `zenlib/packages/my-component`).
  For more details see section *Reiewing component changes live in the Zengrc app* in this readme. It's pretty much the same, you just need to do it for _storybook_ instead of zengrc.
- Re run [Bootstrap packages](#bootstrap-packages)

#### Versioning

Use [Semantic Versioning](https://semver.org/). Start by `0.0.1` and once the component is ready, change it to `0.1.0`
Component's version is bumped automatically once the PR is merged. Which number will bump depends on what kind of commits there are in the PR.

### Committing changes

As a general rule, try to make your commits atomic and self-contained. Think of it this way: if someone reviews your PR and goes commit by commit, would it be able to understand the changes?

#### Conventional Commits

For commit messages we use the **[Conventional Commits](https://www.conventionalcommits.org)** spec. This allows us to automate package version releasing and changelog generation.

_There's a commit message linter that will automatically tell you if you're using the wrong commit format. Just in case ;)_

### Releasing changes

Once you're finished with your changes you need to open a PR from your feature branch to master. Once your PR is approved and merged your changes will be released automatically to NPM.
