import { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Input, Button } from "@rneui/themed";

const Home = ({ state, theme, setTarget }) => {
  const [value, setValue] = useState("");

  const styles = getStyles(theme.colors);

  useEffect(() => {
    setValue("");
  }, []);

  const handleConfirm = () => {
    const target = value !== "" && +value;

    if (!Number.isInteger(target) || target < 0) {
      Alert.alert(
        "Invalid input!",
        "Number must be a positive integer between 0 and 99",
        [
          {
            text: "Confirm",
            style: "destructive",
            onPress: () => setValue(""),
          },
        ]
      );

      return;
    }

    return setTarget(target);
  };

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
          onChangeText={(value) => setValue(value)}
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
