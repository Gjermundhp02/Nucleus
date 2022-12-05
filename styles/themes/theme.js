import { View, TouchableOpacity,Image} from 'react-native';
import React, {useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SS } from '../settingStyles';

export default function Theme() {

    const [data, setData] = useState({
        theme: "0"
    }) 

    const fetchState = async() => {
        let foundState = await AsyncStorage.getItem('theme');
        switch (foundState) {
            case "1":
                setData({
                    ...data,
                    theme: "1"
                    });
                break;

            case "2":
                setData({
                    ...data,
                    theme: "2"
                  });
                break;

            default:
                setData({
                    ...data,
                    theme: "0"
                  });
                break;
        }
    }

    useEffect(() => {
        fetchState();
    },[])
    
    const changeTheme = async() => {
        switch (data.theme) {
            case "1":
                await AsyncStorage.setItem("theme", "2")
                setData({
                    theme: "2"
                })
                break;

            case "2":
                await AsyncStorage.setItem("theme", "0")
                setData({
                    theme: "0"
                })
                break;

            default:
                await AsyncStorage.setItem("theme", "1")
                setData({
                    theme: "1"
                })
                break;
        }
      }
      
      return (
        <View>
        <TouchableOpacity onPress={() => changeTheme()}>
        {data.theme == 0 ? <Image style={SS.lightSwitchImage} source={require('../../assets/sun.png')} />: null}
        {data.theme == 1 ? <Image style={SS.lightSwitchImage} source={require('../../assets/moon.png')} />: null}
        {data.theme == 2 ? <Image style={SS.lightSwitchImage} source={require('../../assets/christmas.png')} />: null}
        </TouchableOpacity>
        </View>
    )
}
