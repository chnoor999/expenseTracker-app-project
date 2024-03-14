import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ProfileLogo() {
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/profileLogo.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    imageContainer:{
        justifyContent:"center",
        alignItems:"center",
        paddingTop:50
    },
    image:{
        width:100,
        height:100
    }
});
