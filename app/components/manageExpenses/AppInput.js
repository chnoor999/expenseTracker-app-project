import { StyleSheet, Text, TextInput, View } from "react-native";
// constant colors
import { Colors } from "../../config/colors/Colors";

export default function AppInput({
  containerStyle,
  inputStyle,
  label,
  ...props
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={[styles.input, inputStyle]} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: Colors.green100,
    marginBottom: 3,
  },
  input: {
    backgroundColor: Colors.green100,
    borderRadius: 6,
    fontSize: 20,
    color: Colors.green700,
    padding: 10,
  },
});
