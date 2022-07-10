import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Image, Text, Button } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";

const GameOver = ({ navigation, route }) => {
  const { target, rounds } = route.params ?? {};

  const theme = useTheme();
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
        source={require("../../assets/game-over.jpg")}
      />

      <View style={styles.results}>
        <Text h4 h4Style={styles.resultsText}>
          Your phone needed <Text style={styles.bold}>{rounds}</Text> rounds to
          guess the number <Text style={styles.bold}>{target}</Text>.
        </Text>
      </View>

      <Button
        buttonStyle={styles.newGameBtn}
        title="Start New Game"
        size="md"
        onPress={() => navigation.navigate("Home")}
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
      ...dropShadow,
    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 300 / 2,
      borderWidth: 2,
      borderColor: theme.card,
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
