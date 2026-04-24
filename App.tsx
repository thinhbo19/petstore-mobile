import "react-native-gesture-handler";
import "./global.css";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { store } from "./src/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
