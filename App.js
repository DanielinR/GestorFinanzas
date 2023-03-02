import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { useEffect, useState } from "react";

const db = SQLite.openDatabase("gestion.db");

export default function App() {
  const [sumaMesActual, setsumaMesActual] = useState(0);
  const [importeActual, setImporteActual] = useState("");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`CREATE TABLE IF NOT EXISTS gestion(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Concepto TEXT,
      Importe REAL,
      Fecha TEXT)`),
        (txObj, resultSet) => {
          console.log(JSON.stringify(resultSet));
        },
        (txObj, error) => {
          console.log("Error: " + error.message);
        };
    });
    fetchSumaMesActual();
  }, []);

  async function addMovimiento(signo) {
    if (importeActual == 0) {
      setImporteActual("");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO gestion (Concepto, Importe, Fecha) VALUES (?, ?, datetime('now'))`,
        ["Sin concepto", importeActual * signo],
        (txObj, resultSet) => {
          // console.log(
          //   "Row:  " + JSON.stringify(resultSet) + "  " + resultSet.rows
          // );
        },
        (txObj, error) => {
          console.log("Error: " + error.message);
        }
      );
    });
    fetchSumaMesActual();
    setImporteActual("");
  }

  async function fetchSumaMesActual() {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT sum(Importe) As ImporteSum FROM gestion WHERE STRFTIME("%m-%Y",datetime('now')) = STRFTIME("%m-%Y",Fecha)`,
        null,
        (txObj, resultSet) => {
          console.log("Tesrult" + JSON.stringify(resultSet.rows._array[0]));
          setsumaMesActual(resultSet.rows._array[0]["ImporteSum"]);
        },
        (txObj, error) => {
          console.log("Error: " + error.message);
        }
      );
    });
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
            {sumaMesActual != null && sumaMesActual != ""
              ? sumaMesActual
              : "0.00"}
            €
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
