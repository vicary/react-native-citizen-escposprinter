# react-native-citizen-escposprinter

A React Native wrapper for the Citizen ECSPOSPrinter SDK.

This supports both the old architecture and new architecture, Android and iOS.

## Installation

```sh
npm install react-native-citizen-escposprinter
```

## Usage

Most of the methods are wrapped directly from the native SDK. For a complete
list of methods and their details, you may refer to the PDF manual inside the
[Citizen SDK](https://www.citizen-systems.co.jp/en/printer/download).

```tsx
import {
  connect,
  cutPaper,
  disconnect,
  ESCPOSConst,
  printText,
  searchCitizenPrinters,
} from "react-native-citizen-escposprinter";

const main = async () => {
  const printers: CitizenPrinerInfo = await searchCitizenPrinters(
    ESCPOSConst.CMP_PORT_WiFi,
  );
  console.info("Found printers:", printers);

  await connect(printers[0].ipAddress);
  await printText("Hello World!\n");
  await cutPaper(ESCPOSConst.CMP_CUT_FULL_PREFEED);
  await disconnect();
};
```

## ⚠️ Partial USB Support

USB connections without specified a serial number is supported and tested in the
following environments (see
[#7](https://github.com/vicary/react-native-citizen-escposprinter/pull/7)):

1. Android in "old" architecture
2. Android in
   [New Architecture](https://reactnative.dev/docs/the-new-architecture/landing-page)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the
repository and the development workflow.

If you use this library at work, consider
[sponsoring](https://github.com/sponsors/vicary) for a first-class technical
support.
