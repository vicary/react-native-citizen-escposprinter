import { FunctionComponent, useState } from "react";
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  connect,
  cutPaper,
  disconnect,
  ESCPOSConst,
  printerCheck,
  printQRCode,
  printText,
  searchCitizenPrinter,
  setEncoding,
  status,
} from "react-native-citizen-escposprinter";
import {
  CitizenPrinerInfo,
  CitizenPrinerWiFiInfo,
} from "react-native-citizen-escposprinter/lib/typescript/ESCPOSConst";
import { Colors } from "react-native/Libraries/NewAppScreen";

const App: FunctionComponent = () => {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [answer, setAnswer] = useState<CitizenPrinerInfo[] | null>(null);
  const [loading, setLoading] = useState(false);

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
    <SafeAreaView className="bg-gray-300">
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        className="h-full flex gap-5"
        contentInsetAdjustmentBehavior="automatic"
      >
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button
            title="Search"
            onPress={async () => {
              setLoading(true);

              setAnswer(null);

              try {
                setAnswer(
                  await searchCitizenPrinter(ESCPOSConst.CMP_PORT_WiFi),
                );
              } catch (e) {
                console.error(e);
              }

              setLoading(false);
            }}
          />
        )}

        {answer
          ?.filter(
            (printer): printer is CitizenPrinerWiFiInfo =>
              !!(printer as any).ipAddress,
          )
          .map((printer) => (
            <TouchableOpacity
              key={printer.ipAddress}
              disabled={loading}
              onPress={async () => {
                setLoading(true);

                try {
                  const address = printer.ipAddress;
                  await connect(ESCPOSConst.CMP_PORT_WiFi, address);
                  console.log("✅ connected:", address);
                  await printerCheck();
                  console.log("✅ printerCheck");
                  const printerStatus = await status();
                  await setEncoding("UTF-8");
                  console.log("✅ status", printerStatus);
                  await printText("Hello World!你好世界！\n");
                  await printText(
                    "Hello World!你好世界！\n",
                    ESCPOSConst.CMP_ALIGNMENT_LEFT,
                    ESCPOSConst.CMP_FNT_DEFAULT,
                    ESCPOSConst.CMP_TXT_2WIDTH | ESCPOSConst.CMP_TXT_2HEIGHT,
                  );
                  await printText(
                    "Hello World!你好世界！\n",
                    ESCPOSConst.CMP_ALIGNMENT_LEFT,
                    ESCPOSConst.CMP_FNT_DEFAULT,
                    ESCPOSConst.CMP_TXT_3WIDTH | ESCPOSConst.CMP_TXT_3HEIGHT,
                  );
                  await printText(
                    "Hello World!你好世界！\n",
                    ESCPOSConst.CMP_ALIGNMENT_LEFT,
                    ESCPOSConst.CMP_FNT_DEFAULT,
                    ESCPOSConst.CMP_TXT_4WIDTH | ESCPOSConst.CMP_TXT_4HEIGHT,
                  );
                  await printText(
                    "Hello World!你好世界！\n",
                    ESCPOSConst.CMP_ALIGNMENT_LEFT,
                    ESCPOSConst.CMP_FNT_DEFAULT,
                    ESCPOSConst.CMP_TXT_5WIDTH | ESCPOSConst.CMP_TXT_5HEIGHT,
                  );
                  await printText(
                    "Hello World!你好世界！\n",
                    ESCPOSConst.CMP_ALIGNMENT_LEFT,
                    ESCPOSConst.CMP_FNT_DEFAULT,
                    ESCPOSConst.CMP_TXT_6WIDTH | ESCPOSConst.CMP_TXT_6HEIGHT,
                  );
                  await printText(
                    "Hello World!你好世界！\n",
                    ESCPOSConst.CMP_ALIGNMENT_LEFT,
                    ESCPOSConst.CMP_FNT_DEFAULT,
                    ESCPOSConst.CMP_TXT_7WIDTH | ESCPOSConst.CMP_TXT_7HEIGHT,
                  );
                  await printText(
                    "Hello World!你好世界！\n",
                    ESCPOSConst.CMP_ALIGNMENT_LEFT,
                    ESCPOSConst.CMP_FNT_DEFAULT,
                    ESCPOSConst.CMP_TXT_8WIDTH | ESCPOSConst.CMP_TXT_8HEIGHT,
                  );
                  await printQRCode(
                    "https://www.google.com",
                    8,
                    ESCPOSConst.CMP_QRCODE_EC_LEVEL_H,
                  );
                  console.log("✅ printText");
                  await cutPaper(ESCPOSConst.CMP_CUT_FULL_PREFEED);
                  console.log("✅ cutPaper");
                  await disconnect();
                  console.log("✅ disconnect");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <View className="p-4 bg-gray-200 flex flex-row justify-between">
                <Text className="color-blue-500">{printer.ipAddress}</Text>
                <Text>{printer.macAddress}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
