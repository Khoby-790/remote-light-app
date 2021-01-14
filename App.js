import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const BASE_URL = "http://192.168.100.9:3000"

const socket = io(BASE_URL);

const App = () => {
  const [isOn, setIsOn] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      setInitialized(socket.connected)
    }
  }, [])


  useEffect(() => {
    socket.on("Joined", (lightOn) => {
      setIsOn(lightOn);
    })
  }, []);


  const toggleLight = () => {
    // handle socket emission
    setIsOn(prev => {
      socket.emit("switch", prev ? "Off" : "On")
      return !prev
    })
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

