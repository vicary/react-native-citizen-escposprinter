# Contributing

Contributions are always welcome, no matter how large or small!

We want this community to be friendly and respectful to each other. Please
follow it in all your interactions with the project. Before contributing, please
read the [code of conduct](./CODE_OF_CONDUCT.md).

## Development workflow

To get started with the project, run `yarn` in the root directory to install the
required dependencies for each package:

```sh
yarn
```

> While it's possible to use [`npm`](https://github.com/npm/cli), the tooling is
> built around [`yarn`](https://classic.yarnpkg.com/), so you'll have an easier
> time if you use `yarn` for development.

While developing, you can run the example app at `/examples/testprint-app` to
test your changes. JavaScript changes are hot-reloaded without a rebuild, while
native code and configuration changes requires a full rebuild.

### "Old" Architecture

```sh
cd examples/testprint-app

# Prebuild Expo with New Architecture disabled
yarn arch:old

# Android
yarn android

# iOS
yarn ios
```

### New Architecture

```sh
cd examples/testprint-app

# Prebuild Expo with New Architecture enabled
yarn arch:new

# Android
yarn android

# iOS
yarn ios
```

To confirm that the app is running with the new architecture, you can check the
Metro logs for a message like this:

```sh
(NOBRIDGE) LOG  Bridgeless mode is enabled
```

### Linting and Testing

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
yarn workspace react-native-citizen-escposprinter lint
```

To fix formatting errors, run the following:

```sh
yarn workspace react-native-citizen-escposprinter lint --fix
```

Remember to add tests for your change if possible. Run the unit tests by:

```sh
yarn workspace react-native-citizen-escposprinter test
```

### Creating new functions

1. Expose the function in `src/index.tsx`
1. Create newarch implementation in `src/NativeCitizenEscposprinter.ts`
1. Expose the function signature in `ios/CitizenEscposprinter.m`
1. Implement the function in `ios/CitizenEscposprinter.swift`
1. Create an abstract function in
   `android/src/oldarch/CitizenEscposprinterSpec.kt`
1. Implement the function in
   `android/src/main/java/com/citizenescposprinter/CitizenEscposprinterModule.kt`

### Commit message convention

We follow the
[conventional commits specification](https://www.conventionalcommits.org/en) for
our commit messages:

- `fix`: bug fixes (PATCH), e.g. fix crash due to deprecated method.
- `feat`: new features (MAJOR/MINOR), e.g. add new method to the module.
- `chore`: any non semver changes, e.g. CI/CD configs, docs, tests... etc.

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/),
[TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking,
[ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting
and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

### Publishing

This repo relies on `semantic-release` GitHub Actions to publish new versions, a
new version will be published automatically when your PR is merged.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_
> series:
> [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with
  maintainers first by opening an issue.
