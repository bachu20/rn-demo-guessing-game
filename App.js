import { StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/Home";
import Game from "./src/screens/Game";
import GameOver from "./src/screens/GameOver";

const Stack = createNativeStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    primary: "#ECECEA",
    background: "#505050",
    card: "#FDFDFD",
    text: "#505050",
    border: "#BDBDC7",
    notification: "",
  },
};

const screens = [
  { name: "Home", component: Home, options: { title: "Start Game" } },
];

export default function App() {
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Start Game" }}
        />
        <Stack.Screen
          name="Game"
          component={Game}
          options={{ title: "Opponent's Guess" }}
        />
        <Stack.Screen
          name="GameOver"
          component={GameOver}
          options={{ title: "Results" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
