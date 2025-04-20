import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const SubmitButton = ({ handleSubmit, btnTitle, loading }) => {
  return (
    <TouchableOpacity style={styles.sbtn} onPress={handleSubmit}>
        <Text style={styles.btntxt}>{ loading ? 'please wait . . .' : btnTitle }</Text> 
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    sbtn:{
        backgroundColor:"#1e2225"
        , height:50
        , marginHorizontal:25
        , borderRadius: 80
        , justifyContent:"center"
        , marginBottom:20
    },
    btntxt:{
        color:"#fff",
        textAlign:"center"
        , fontWeight:"800"
    }
})

export default SubmitButton