import { useEffect, useReducer } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Button } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";

const reducer = (state, action) => {
  const { curr, guesses, bounds } = state;

  switch (action.type) {
    case "GUESS":
      const guess = Math.ceil((bounds.upper + bounds.lower - 1) / 2);
      return { ...state, guesses: [...guesses, guess], curr: guess };
    case "HIGHER":
      return { ...state, bounds: { ...bounds, lower: curr + 1 } };
    case "LOWER":
      return { ...state, bounds: { ...bounds, upper: curr - 1 } };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  guesses: [],
  bounds: { upper: 99, lower: 0 },
};

const Game = ({ navigation, route }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const theme = useTheme();
  const styles = getStyles(theme.colors);

  useEffect(() => {
    dispatch({ type: "GUESS" });
  }, [state.bounds]);

  useEffect(() => {
    if (state.curr === +route.params.target) {
      return navigation.navigate("GameOver", {
        target: route.params.target,
        rounds: state.guesses.length + 1, // plus 1 since we're short-circuiting final guess
      });
    }
  }, [state.curr]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h3 h3Style={styles.headerText}>
          Opponent's Guess
        </Text>
      </View>

      <View style={styles.oppGuess}>
        <Text h3 h3Style={styles.oppGuessText}>
          {state.curr}
        </Text>
      </View>

      <View style={styles.bounds}>
        <Text h4 h4Style={styles.boundsTitle}>
          Higher or lower?
        </Text>

        <View style={styles.boundsBtns}>
          <Button
            buttonStyle={styles.boundsBtn}
            title="-"
            size="md"
            onPress={() => dispatch({ type: "LOWER" })}
          />
          <Button
            buttonStyle={styles.boundsBtn}
            title="+"
            size="md"
            onPress={() => dispatch({ type: "HIGHER" })}
          />
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.guesses}
        data={state.guesses.reverse()}
        keyExtractor={(_, i) => i}
        renderItem={({ item, index }) => {
          const num = state.guesses.length - index;

          return (
            <View style={styles.guess}>
              <Text style={styles.guessItem}>#{num}</Text>
              <Text style={styles.guessItem}>Opponent's Guess: {item}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const getStyles = (theme) => {
  const dropShadow = {
    shadowColor: theme.border,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  };

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      paddingTop: 50,
      paddingHorizontal: 25,
      backgroundColor: theme.primary,
    },

    header: {
      padding: 10,
      color: theme.text,
      backgroundColor: theme.card,
      marginBottom: 30,
      ...dropShadow,
    },
    headerText: {
      textAlign: "center",
      fontWeight: "500",
    },

    oppGuess: {
      padding: 30,
      backgroundColor: theme.card,
      marginHorizontal: 40,
      marginBottom: 60,
      ...dropShadow,
    },
    oppGuessText: {
      alignSelf: "center",
    },

    bounds: {
      padding: 30,
      backgroundColor: theme.card,
      ...dropShadow,
    },
    boundsTitle: {
      alignSelf: "center",
      marginBottom: 15,
    },
    boundsBtns: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    boundsBtn: {
      width: 150,
      color: "#fff",
      backgroundColor: theme.background,
      borderRadius: 75,
    },

    guesses: {
      marginVertical: 30,
    },
    guess: {
      flexDirection: "row",
      justifyContent: "flex-start",
      padding: 15,
      marginBottom: 15,
      backgroundColor: theme.card,
      ...dropShadow,
    },
    guessItem: {
      color: theme.text,
      fontWeight: "500",
      flex: 3,
    },
  });
};

export default Game;
