import { useState } from "react";
import { StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Home from "./src/components/Home";
import Game from "./src/components/Game";
import GameOver from "./src/components/GameOver";

import BgImage from "./assets/bg-image.jpg";

const AppTheme = {
  colors: {
    primary: "#ECECEA",
    background: "#505050",
    card: "#FDFDFD",
    text: "#505050",
    border: "#BDBDC7",
    notification: "",

    // testing
    lavenda: "#AECCFA",
    black: "#08080A",
    white: "#EAECF2",
    gray: "#A3A4A8",
    darkGray: "#3E4258",
    blue: "#339BE3",
    darkBlue: "#2057BF",
    red: "#BD2C31",
  },
};

const INITIAL_GAME_STATE = {
  target: null,
  isGameOver: false,
  roundsNeeded: 0,
};

const App = () => {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  const handleGameOver = (rounds) =>
    setGameState({ ...gameState, isGameOver: true, roundsNeeded: rounds });

  const handleStartOver = () => setGameState({ ...INITIAL_GAME_STATE });

  if (gameState.target === null) {
    return (
      <Home
        theme={AppTheme}
        setTarget={(target) => setGameState({ ...INITIAL_GAME_STATE, target })}
      />
    );
  }

  return gameState.isGameOver ? (
    <GameOver theme={AppTheme} state={gameState} startOver={handleStartOver} />
  ) : (
    <Game theme={AppTheme} state={gameState} setGameOver={handleGameOver} />
  );
};

export default () => (
  <LinearGradient
    colors={[AppTheme.colors.primary, AppTheme.colors.background]}
    style={styles.container}
  >
    <ImageBackground
      source={BgImage}
      resizeMode="cover"
      style={styles.container}
      imageStyle={styles.bgImage}
    >
      <SafeAreaView style={styles.container}>
        <App />
      </SafeAreaView>
    </ImageBackground>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    opacity: 0.15,
  },
});
