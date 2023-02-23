import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { Button } from "react-native-web";
export default function App() {
  return (
    <View style={styles.general}>
      <StatusBar style="auto" />
      <View style={styles.general}>
        <View style={styles.titulo}>
          <Text style={{ fontSize: 70 }}>GESTION</Text>
        </View>
        <View style={styles.profit}>
          <Text style={{ fontSize: 40, fontWeight: "400" }}>Profit:</Text>
          <Text style={{ fontSize: 33, fontWeight: "300" }}>0,00€</Text>
        </View>
        <View style={styles.sumadorRestador}>
          <TouchableOpacity style={styles.botones}>
            <Text>-</Text>
          </TouchableOpacity>
          <TextInput
            keyboardType="number-pad"
            placeholder="0,00"
            style={styles.inputNumerico}
          ></TextInput>
          <TouchableOpacity style={styles.botones}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  general: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff9",
    alignItems: "center",
    justifyContent: "space-around",
  },
  inputNumerico: {
    borderWidth: 2,
    borderColor: "#655b5b",
    borderRadius: 20,
    width: 155,
    height: 150,
    fontSize: 40,
    fontWeight: "300",
    backgroundColor: "#ffffff",
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  componentes: {
    flex: 1,
    flexDirection: "column",
    alignContent: "space-between",
    justifyContent: "center",
  },
  botones: {
    backgroundColor: "#f175",
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  profit: {
    flex: 2,
    // backgroundColor: "#f175",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    marginTop: Constants.statusBarHeight + 70,
    flex: 1,
    justifyContent: "center",
  },
  sumadorRestador: {
    flexDirection: "row",
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
});
