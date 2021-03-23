
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, TextInput, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [input, setInput] = useState('');
  const [nome, setNome] = useState("Erika");


  //Aqui pego o nome o que esta salvo no storage e construou na tela.
  useEffect(() => {

    async function pegaNome() {
      let response = await AsyncStorage.getItem('nomes');
      if (response !== null) {
        setNome(response);
      }
    }

    pegaNome();

  }, []);




  //Componente DidUptade,e o que atualiza, dentro do useEffect para usar
  // async tenho que criar função. Vou setar uma key:nomes e a variavel que desejo
  //guardar nesse caso nomes
  useEffect(() => {

    async function saveStorage() {
      await AsyncStorage.setItem('nomes', nome);
    }
    saveStorage();

  }, [nome])


  function alterar() {
    setNome(input);
    setInput('');
  }

  return (
    <View>

      <TextInput
        style={styles.input}
        placeholder="novo nome"
        value={input}
        onChangeText={(texto) => setInput(texto)}
      />
      <Text style={styles.texto}>{nome}</Text>
      <TouchableOpacity style={styles.botao} onPress={alterar} >
        <Text style={styles.textoBo}>
          Alterar nome!!!
               </Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",


  },
  texto: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  botao: {
    backgroundColor: "black",
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    width: "100%",
    height: 50,
  },
  textoBo: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  input: {
    marginTop: 50,
    fontSize: 15,
    color: 'black',
    justifyContent: 'center',
    width: "100%",
    height: 100,
    backgroundColor: 'white',
    borderWidth: 5,
    borderColor: 'black',
    textAlign: 'center',
  }

});
