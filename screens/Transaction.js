import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      bookId: "",
      studentId: "",
    };
  }

  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" é verdadeiro se o usuário concedeu permissão
          status === "granted" é falso se o usuário não concedeu permissão
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    const { domState } = this.state;

    if(domState === "bookId"){
    this.setState({
      bookId: data,
      domState: "normal",
      scanned: true
    });      
    }
  };

  render() {
    const { domState, hasCameraPermissions, bookId, studentId, scanned } = this.state;
    if (domState !== "normal") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    return (
      <View style={styles.container}>

        <View style={styles.lowerContainer}>
          <View style={styles.textinputContainer}>
            <TextInput
              style={styles.textinput}
              placeholder={"ID livro"}
              placeholderTextColor={"#FFFFFF"}
              value={bookId}
            />
        <Text style={styles.text}>
          {hasCameraPermissions ? scannedData : "Solicitar permissão da Camera"}
        </Text>
        <TouchableOpacity
          style={styles.scanbutton}
          onPress={() => this.getCameraPermissions("bookId")}
        >
          <Text style={styles.scanbuttonText}>Digitalizar QR Code</Text>
        </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //divisão dos espaços na tela do app
    backgroundColor: "#FFFFFF" //cor de fundo
  },
  lowerContainer: {
    flex: 0.5, //divisão dos espaços na tela do app
    alignItems: "center" //alinhamento na horizontal
  },
  textinputContainer: {
    borderWidth: 2, //largura da borda
    borderRadius: 10, //raio da borda
    flexDirection: "row", //mantém a mesma distância entre os itens da mesma linha
    backgroundColor: "#9DFD24", //cor de fundo
    borderColor: "#FFFFFF" //cor da borda
  },
  textinput: {
    width: "57%", //largura
    height: 50, //altura
    padding: 10, //distância entre o conteúdo de um elemento e suas bordas
    borderColor: "#FFFFFF", //cor da borda
    borderRadius: 10, //raio da borda
    borderWidth: 3, //largura da borda
    fontSize: 18, //tamanho da letra
    backgroundColor: "#5653D4", //cor de fundo
    color: "#FFFFFF" //cor da letra
  },
  scanbutton: {
    width: 100, //largura
    height: 50, //altura
    backgroundColor: "#9DFD24", //cor de fundo
    borderTopRightRadius: 10, //raio da borda superior da direita
    borderBottomRightRadius: 10, //raio da borda inferior da direita
    justifyContent: "center", //alinhamento na vertical
    alignItems: "center" //alinhamento na horizontal
  },
  scanbuttonText: {
    fontSize: 20, //tamanho da letra
    color: "#0A0101", //cor da letra
  }
 
});
