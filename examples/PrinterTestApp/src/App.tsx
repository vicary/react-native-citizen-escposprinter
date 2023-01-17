import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
} from "react-native";
import {
  ESCPOSConst,
  searchESCPOSPrinter,
} from "react-native-citizen-escposprinter";
import { Colors } from "react-native/Libraries/NewAppScreen";

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [answer, setAnswer] = useState<string[]>();

  useEffect(() => {
    const doIt = async () => {
      try {
        const result = await searchESCPOSPrinter(ESCPOSConst.CMP_PORT_WiFi, 3);

        setAnswer(result);
      } catch (e) {
        console.error("Caught printer error:", e, typeof e, JSON.stringify(e));
      }
    };

    doIt();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <Text>{(answer ? JSON.stringify(answer) : null) ?? "N/A"}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
