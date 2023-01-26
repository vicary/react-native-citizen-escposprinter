# Contributing

Contributions are always welcome, no matter how large or small!

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project. Before contributing, please read the [code of conduct](./CODE_OF_CONDUCT.md).

## Development workflow

To get started with the project, run `yarn` in the root directory to install the required dependencies for each package:

```sh
yarn
```

> While it's possible to use [`npm`](https://github.com/npm/cli), the tooling is built around [`yarn`](https://classic.yarnpkg.com/), so you'll have an easier time if you use `yarn` for development.

While developing, you can run the [example app](/examples/PrinterTestApp/) to test your changes. Any changes you make in your library's JavaScript code will be reflected in the example app without a rebuild. If you change any native code, then you'll need to rebuild the example app.

To start the packager:

```sh
yarn workspace PrinterTestApp start
```

To run the example app on Android:

```sh
yarn workspace PrinterTestApp android
```

To run the example app on iOS:

```sh
yarn workspace PrinterTestApp ios
```

By default, the example is configured to build with the old architecture. To run the example with the new architecture, you can do the following:

1. For Android, run:

   ```sh
   ORG_GRADLE_PROJECT_newArchEnabled=true yarn workspace PrinterTestApp android
   ```

2. For iOS, run:

   ```sh
   RCT_NEW_ARCH_ENABLED=1 yarn workspace PrinterTestApp pods
   yarn workspace PrinterTestApp ios
   ```

If you are building for a different architecture than your previous build, make sure to remove the build folders first. You can run the following command to cleanup all build folders:

```sh
yarn clean
```

To confirm that the app is running with the new architecture, you can check the Metro logs for a message like this:

```sh
Running "CitizenEscposprinterExample" with {"fabric":true,"initialProps":{"concurrentRoot":true},"rootTag":1}
```

Note the `"fabric":true` and `"concurrentRoot":true` properties.

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

To edit the Objective-C or Swift files, open `examples/PrinterTestApp/ios/CitizenEscposprinterExample.xcworkspace` in XCode and find the source files at `Pods > Development Pods > react-native-citizen-escposprinter`.

To edit the Java or Kotlin files, open `examples/PrinterTestApp/android` in Android studio and find the source files at `react-native-citizen-escposprinter` under `Android`.

### Create a new function

1. Expose the function in `src/index.tsx`
1. Implement it in Native Module
   1. (oldarch) Add an abstract method in `android/src/oldarch/CitizenEscposprinterSpec.java`
   1. (newarch) Add JNI interface in `src/NativeCitizenEscposprinter.ts`
   1. (ios) Add the method in `ios/CitizenEscposprinter.m` and `ios/CitizenEscposprinter.swift`

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes (PATCH), e.g. fix crash due to deprecated method.
- `feat`: new features (MAJOR/MINOR), e.g. add new method to the module.
- `chore`: any non semver changes, e.g. CI/CD configs, docs, tests... etc.

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

### Publishing

Can't bother with it right now, the default `release-it` is not exactly easy to setup in monorepo.

Just ask me.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.
