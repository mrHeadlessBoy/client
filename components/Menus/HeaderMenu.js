import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { AuthContext } from '../../context/authContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HeaderMenu = () => {
    const [state, setState] = useContext(AuthContext);
    //logut
    const handleLogout = async () => {
        setState({token:'', user: null})
        await AsyncStorage.removeItem('@auth')
        alert('logout: yes')
    }
  return (
    <View>
        <TouchableOpacity onPress={handleLogout} >
      <FontAwesome5 name="sign-out-alt" color={"red"} style={styles.icons}/>

        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        margin:10,
        justifyContent: "space-between",
    },
    icons:{
        marginBottom: 3,
        alignSelf: "center",
        fontSize:25,
    }
})

export default HeaderMenu