import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../config/colors/Colors";

export default function DeleteBox({ visible, onCancel, onDelete }) {
  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <Pressable style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.text}>
            Are you sure you want to delete this expense?
          </Text>
          <View style={styles.btncontainer}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: Colors.green900,
    borderRadius: 6,
    width: 250,
    padding: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
  },
  text: {
    paddingVertical: 10,
    textAlign: "center",
    lineHeight: 20,
    color: "#fff",
  },
  btncontainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ffffff14",
  },
  delete: {
    color: "#ff6347ff",
    padding: 10,
  },
  cancel: {
    padding: 10,
    color: "#ffffffb7",
  },
});
