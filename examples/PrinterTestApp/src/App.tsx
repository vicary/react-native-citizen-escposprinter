import { FunctionComponent, useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
} from "react-native";
import {
  getVersionCode,
  getVersionName,
} from "react-native-citizen-escposprinter";
import { Colors } from "react-native/Libraries/NewAppScreen";
import type { JsonValue } from "type-fest";

const App: FunctionComponent = () => {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [counter, setCounter] = useState<number>(0);
  const [answer, setAnswer] = useState<JsonValue>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const intId = setInterval(() => {
      setCounter((currentCount) => currentCount + 1);
    }, 1000);

    return () => {
      clearInterval(intId);
    };
  }, []);

  // useEffect(() => {
  //   const doIt = async () => {
  //     try {
  //       const result = await Promise.all([
  //         searchESCPOSPrinter(ESCPOSConst.CMP_PORT_WiFi, 3),
  //         // searchCitizenPrinter(ESCPOSConst.CMP_PORT_WiFi, 3),
  //       ]);
  //
  //       setAnswer(result);
  //     } catch (e) {
  //       console.error("Caught printer error:", e, typeof e, JSON.stringify(e));
  //     }
  //   };
  //
  //   doIt();
  // }, []);

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        className="bg-gray-300 h-full"
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text>Counter: {counter}</Text>
        <Text>
          Answer: {(answer ? JSON.stringify(answer, null, 2) : null) ?? "N/A"}
        </Text>
        <Button
          title="Click Me"
          disabled={loading}
          onPress={async () => {
            setLoading(true);

            setAnswer(await Promise.all([getVersionCode(), getVersionName()]));

            // const addresses = await searchCitizenPrinter(
            //   ESCPOSConst.CMP_PORT_WiFi,
            // );
            // setAnswer(addresses);

            // const address = "192.168.1.108";
            // await connect(ESCPOSConst.CMP_PORT_WiFi, address);
            // console.log("✅ connected:", address);
            // await printerCheck();
            // console.log("✅ printerCheck");
            // const printerStatus = await status();
            // await setEncoding("UTF-8");
            // console.log("✅ status", printerStatus);
            // await printText("Hello World!你好世界！\n");
            // await printText(
            //   "Hello World!你好世界！\n",
            //   ESCPOSConst.CMP_ALIGNMENT_LEFT,
            //   ESCPOSConst.CMP_FNT_DEFAULT,
            //   ESCPOSConst.CMP_TXT_2WIDTH | ESCPOSConst.CMP_TXT_2HEIGHT,
            // );
            // await printText(
            //   "Hello World!你好世界！\n",
            //   ESCPOSConst.CMP_ALIGNMENT_LEFT,
            //   ESCPOSConst.CMP_FNT_DEFAULT,
            //   ESCPOSConst.CMP_TXT_3WIDTH | ESCPOSConst.CMP_TXT_3HEIGHT,
            // );
            // await printText(
            //   "Hello World!你好世界！\n",
            //   ESCPOSConst.CMP_ALIGNMENT_LEFT,
            //   ESCPOSConst.CMP_FNT_DEFAULT,
            //   ESCPOSConst.CMP_TXT_4WIDTH | ESCPOSConst.CMP_TXT_4HEIGHT,
            // );
            // await printText(
            //   "Hello World!你好世界！\n",
            //   ESCPOSConst.CMP_ALIGNMENT_LEFT,
            //   ESCPOSConst.CMP_FNT_DEFAULT,
            //   ESCPOSConst.CMP_TXT_5WIDTH | ESCPOSConst.CMP_TXT_5HEIGHT,
            // );
            // await printText(
            //   "Hello World!你好世界！\n",
            //   ESCPOSConst.CMP_ALIGNMENT_LEFT,
            //   ESCPOSConst.CMP_FNT_DEFAULT,
            //   ESCPOSConst.CMP_TXT_6WIDTH | ESCPOSConst.CMP_TXT_6HEIGHT,
            // );
            // await printText(
            //   "Hello World!你好世界！\n",
            //   ESCPOSConst.CMP_ALIGNMENT_LEFT,
            //   ESCPOSConst.CMP_FNT_DEFAULT,
            //   ESCPOSConst.CMP_TXT_7WIDTH | ESCPOSConst.CMP_TXT_7HEIGHT,
            // );
            // await printText(
            //   "Hello World!你好世界！\n",
            //   ESCPOSConst.CMP_ALIGNMENT_LEFT,
            //   ESCPOSConst.CMP_FNT_DEFAULT,
            //   ESCPOSConst.CMP_TXT_8WIDTH | ESCPOSConst.CMP_TXT_8HEIGHT,
            // );
            // await printQRCode(
            //   "https://www.google.com",
            //   8,
            //   ESCPOSConst.CMP_QRCODE_EC_LEVEL_H,
            // );
            // console.log("✅ printText");
            // await cutPaper(ESCPOSConst.CMP_CUT_FULL_PREFEED);
            // console.log("✅ cutPaper");
            // await disconnect();
            // console.log("✅ disconnect");

            setLoading(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
