import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
} from "react-native";
import { multiply } from "react-native-citizen-escposprinter";
import { Colors } from "react-native/Libraries/NewAppScreen";

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [answer, setAnswer] = useState<number>();

  useEffect(() => {
    const doMultiply = async () => {
      const result = await multiply(2, 3);

      setAnswer(result);
    };

    doMultiply();
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
        <Text>{answer ?? "N/A"}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
