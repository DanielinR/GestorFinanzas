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
import { useEffect, useState } from "react";

export default function App() {
  const [sumaMesActual, setsumaMesActual] = useState(0);
  const [importeActual, setImporteActual] = useState("");

  useEffect(() => {
    fetchSumaMesActual();
  }, []);

  async function addMovimiento(signo) {
    if (importeActual == 0) {
      setImporteActual("");
      return;
    }
    const response = await fetch(
      `http://localhost:8080/movimiento/Sin Concepto/${signo * importeActual}`,
      { method: "PUT" }
    );
    fetchSumaMesActual();
    setImporteActual("");
  }

  async function fetchSumaMesActual() {
    const response = await fetch(
      "http://localhost:8080/movimientos/suma/mesActual"
    );
    const data = await response.json();
    setsumaMesActual(data[0]["sum(Importe)"]);
  }
  return (
    <View style={styles.general}>
      <StatusBar style="auto" />
      <View style={styles.general}>
        <View style={styles.titulo}>
          <Text style={{ fontSize: 70 }}>GESTION</Text>
        </View>
        <View style={styles.profit}>
          <Text style={{ fontSize: 40, fontWeight: "400" }}>Profit:</Text>
          <Text style={{ fontSize: 33, fontWeight: "300" }}>
            {sumaMesActual != null ? sumaMesActual : "0.00"}€
          </Text>
        </View>
        <View style={styles.sumadorRestador}>
          <TouchableOpacity
            style={styles.botones}
            onPress={() => addMovimiento(-1)}
          >
            <Text style={{ fontSize: 40, fontWeight: "300" }}>-</Text>
          </TouchableOpacity>
          <TextInput
            value={importeActual}
            onChangeText={(Text) => setImporteActual(Text)}
            keyboardType="number-pad"
            placeholder="0.00€"
            style={styles.inputNumerico}
          ></TextInput>
          <TouchableOpacity
            style={styles.botones}
            onPress={() => addMovimiento(1)}
          >
            <Text style={{ fontSize: 40, fontWeight: "300" }}>+</Text>
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
    backgroundColor: "#fff6",
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
    // backgroundColor: "#f175",
    // borderRadius: 20,
    // padding: 15,
    flex: 2,
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
