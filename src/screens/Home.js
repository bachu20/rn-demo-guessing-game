import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "@rneui/themed";
import { useTheme } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const [value, setValue] = useState("");

  const theme = useTheme();
  const styles = getStyles(theme.colors);

  const handleConfirm = () => {
    if (!value) return;
    navigation.navigate("Game", { target: value });
  };

  useEffect(() => {
    setValue("");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h3 h3Style={styles.headerText}>
          Guess My Number
        </Text>
      </View>

      <View style={styles.numEntry}>
        <Text h4 h4Style={styles.numEntryTitle}>
          Enter a Number
        </Text>

        <Input
          inputContainerStyle={styles.numInput}
          inputStyle={{ textAlign: "center" }}
          keyboardType="numeric"
          maxLength={2}
          value={value}
          onChangeText={(value) => {
            setValue(value.toString().replace(".", ""));
          }}
        />

        <View style={styles.numBtns}>
          <Button
            buttonStyle={styles.numBtn}
            title="Reset"
            size="md"
            onPress={() => setValue("")}
          />
          <Button
            buttonStyle={styles.numBtn}
            title="Confirm"
            size="md"
            onPress={() => handleConfirm()}
          />
        </View>
      </View>
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
      paddingTop: 100,
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

    numEntry: {
      padding: 30,
      backgroundColor: theme.card,
      ...dropShadow,
    },
    numEntryTitle: {
      alignSelf: "center",
      marginBottom: 15,
    },
    numInput: {
      width: 50,
      alignSelf: "center",
    },
    numBtns: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    numBtn: {
      width: 150,
      color: "#fff",
      backgroundColor: theme.background,
      borderRadius: 75,
    },
  });
};

export default Home;
