import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "./colors";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function Card() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.user);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: userTimeZone,
  };

  const basicCard = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Titre de la card</Text>
        <Text style={styles.description}>Description de la card</Text>
      </View>
    );
  };

  return <View>{basicCard()}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 15,
    padding: 10,
    width: screenWidth * 0.8,
    height: screenHeight * 0.7,
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.secondary,
    alignSelf: "center",
  },
  title: {
    color: colors.lightGray,
    textAlign: "center",
    fontSize: 18,
  },
  description: {
    color: colors.white,
    fontSize: 16,
    textAlign: "center",
  },
});
