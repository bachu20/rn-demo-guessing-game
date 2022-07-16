import { View, StyleSheet } from "react-native";
import { Image, Text, Button } from "@rneui/themed";
import GameOverImage from "../../assets/game-over.jpg";

const GameOver = ({ state, theme, startOver }) => {
  const { target, roundsNeeded } = state;

  const styles = getStyles(theme.colors);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h3 h3Style={styles.headerText}>
          GAME OVER!
        </Text>
      </View>

      <Image
        style={styles.image}
        containerStyle={styles.imageContainer}
        source={GameOverImage}
      />

      <View style={styles.results}>
        <Text h4 h4Style={styles.resultsText}>
          Your phone needed <Text style={styles.bold}>{roundsNeeded}</Text>{" "}
          rounds to guess the number <Text style={styles.bold}>{target}</Text>.
        </Text>
      </View>

      <Button
        buttonStyle={styles.newGameBtn}
        title="Start New Game"
        size="md"
        onPress={() => startOver()}
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
    },

    header: {
      padding: 10,
      color: theme.text,
      backgroundColor: theme.card,
      marginHorizontal: 40,
      marginBottom: 30,
      ...dropShadow,
    },
    headerText: {
      textAlign: "center",
      fontWeight: "500",
    },

    imageContainer: {
      alignSelf: "center",
      width: 300,
      height: 300,
      borderRadius: 150,
      overflow: "hidden",
      borderWidth: 2,
      borderColor: theme.card,
      ...dropShadow,
    },
    image: {
      width: "100%",
      height: "100%",
    },

    results: {
      marginVertical: 30,
      backgroundColor: theme.card,
      padding: 10,
      ...dropShadow,
    },

    resultsText: {
      textAlign: "center",
    },

    bold: {
      fontWeight: "500",
      color: theme.background,
    },

    newGameBtn: {
      width: 200,
      alignSelf: "center",
      color: "#fff",
      backgroundColor: theme.background,
      borderRadius: 75,
    },
  });
};

export default GameOver;
