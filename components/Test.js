import React from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'

class Test extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'yellow' }}>
        <View style={{  height: 50, width: 50, backgroundColor: 'red' }}></View>
        <View style={{  height: 50, width: 50, backgroundColor: 'green' }}></View>
        <View style={{  height: 50, width: 50, backgroundColor: 'blue' }}></View>
      </View>
    )
  }
}

export default Test
