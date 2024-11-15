import LottieView from "lottie-react-native";
import {useCallback, useEffect} from "react";
import {NativeStackNavigationProp} from "react-native-screens/lib/typescript/native-stack/types";
import {StackNames} from "@/app/_layout";
import * as SecureStore from 'expo-secure-store';
import CryptoJS from 'crypto-js';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Index = ({navigation}: { navigation: NativeStackNavigationProp<any> }) => {
    const _tokenKey = '1e1eff2bb7cafc63f4d93c96900640f5'
    useEffect(() => {
        setToken();
        setTimeout(() => {
            navigation.navigate(StackNames.home)
        }, 3000)
    }, [])
    const setToken = async () => {
        try {
            // await  AsyncStorage.setItem('token','1e1eff2bb7cafc63f4d93c96900640f5')
            await SecureStore.setItemAsync('token', _tokenKey)
        } catch (e) {

        }
    }
    return (
        <LottieView
            source={require('../../../assets/json/splash.json')}
            loop={true}
            autoPlay={true}
            style={{flex: 1, backgroundColor: 'white'}}
        />
    );
};
