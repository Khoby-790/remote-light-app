import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const BASE_URL = "http://192.168.100.14:3000"

const App = () => {
  let socket = null;
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    socket = io.connect(BASE_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 15 //Nombre de fois qu'il doit réessayer de se connecter
    });
    if (socket) {
      alert(socket.connected)
    }
  }, [])


  const toggleLight = () => {
    // handle socket emission
    setIsOn(prev => !prev)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleLight} style={styles.button}>
        <Text style={styles.buttonText}>Turn {isOn ? "Off" : "On"}</Text>
      </TouchableOpacity>
    </View>
  )
};


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    height: 50,
    width: 100,
    borderRadius: 12,
    backgroundColor: "#246FB9",
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white"
  }
})

