import { FunctionComponent, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
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
  searchESCPOSPrinter,
  setEncoding,
  status,
} from "react-native-citizen-escposprinter";
import {
  CitizenPrinerInfo,
  CitizenPrinerWiFiInfo,
} from "react-native-citizen-escposprinter/lib/typescript/ESCPOSConst";
import { Colors } from "react-native/Libraries/NewAppScreen";

const testPrint = async (connectType: number, address?: string) => {
  await connect(connectType, address);
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
};

const App: FunctionComponent = () => {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [answer, setAnswer] = useState<CitizenPrinerInfo[] | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView className="bg-gray-300">
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        className="p-3 h-full flex gap-5"
        contentInsetAdjustmentBehavior="automatic"
      >
        <Pressable
          className="bg-gray-200 active:bg-gray-300 active:opacity-50 rounded-xl"
          onPress={async () => {
            setLoading(!loading);

            try {
              await testPrint(ESCPOSConst.CMP_PORT_USB);
            } catch (e) {
              if (e instanceof Error) {
                console.error(e);
              } else {
                throw e;
              }
            }

            setLoading(false);
          }}
        >
          {loading ? (
            <ActivityIndicator className="p-4 text-lg color-blue-500" />
          ) : (
            <Text className="p-3 color-blue-500 text-lg text-center">
              Test USB Printer
            </Text>
          )}
        </Pressable>

        <Pressable
          className="bg-gray-200 active:bg-gray-300 active:opacity-50 rounded-xl"
          onPress={async () => {
            setLoading(true);
            setAnswer(null);

            try {
              setAnswer(await searchCitizenPrinter(ESCPOSConst.CMP_PORT_WiFi));
            } catch (e) {
              if (e instanceof Error) {
                console.error(e);
              } else {
                throw e;
              }
            }

            const printers = await searchESCPOSPrinter(
              ESCPOSConst.CMP_PORT_WiFi,
            );
            console.debug({ printers });

            setLoading(false);
          }}
        >
          {loading ? (
            <ActivityIndicator className="p-4 text-lg color-blue-500" />
          ) : (
            <Text className="p-3 color-blue-500 text-lg text-center">
              Search Wifi Printers
            </Text>
          )}
        </Pressable>

        {answer
          ?.filter(
            (printer): printer is CitizenPrinerWiFiInfo =>
              !!(printer as any).ipAddress,
          )
          .map((printer) => (
            <Pressable
              className="bg-gray-200 active:bg-gray-300 active:opacity-50 rounded-xl"
              key={printer.ipAddress}
              disabled={loading}
              onPress={async () => {
                setLoading(true);

                try {
                  await testPrint(ESCPOSConst.CMP_PORT_WiFi, printer.ipAddress);
                } catch (e) {
                  if (e instanceof Error) {
                    console.error(e.message);
                  } else {
                    throw e;
                  }
                }

                setLoading(false);
              }}
            >
              <View className="p-4 flex flex-row justify-between">
                <Text className="color-blue-500">{printer.ipAddress}</Text>
                <Text className="color-black">{printer.macAddress}</Text>
              </View>
            </Pressable>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
