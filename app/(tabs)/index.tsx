import {FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ResizeMode, Video} from "expo-av";
import * as SecureStore from 'expo-secure-store';
import {NativeStackNavigationProp} from "react-native-screens/lib/typescript/native-stack/types";
import {StackNames} from "@/app/_layout";

export class CategoryModel {
    id?: string;
    name?: string;
    icon?: string;
    content?: string;
    service?: Array<ServiceModel> | []
}

export class ServiceModel {
    content?: string;
    icon?: string;
    id?: string;
    name?: string;
    pack?: Array<PackModel> | [];
    text_input?: string;
    text_placeholder?: string;
}

export class PackModel {
    content?: string;
    id?: string;
    max_order?: string;
    min_order?: string;
    name?: string;
    price?: string;
    show_camxuc?: string;
    show_comment?: string;
}

class StateProps {
    listService?: Array<CategoryModel> | [];
    loading?: boolean | undefined;
    token?: string | null | undefined;
}

export default function HomeScreen({navigation}: { navigation: NativeStackNavigationProp<any> }) {
    const _tokenKey = '1e1eff2bb7cafc63f4d93c96900640f5'

    const [state, setState] = useState<StateProps>({
        listService: [],
        loading: true,
        token: ""
    })
    const videoPlay = useRef(null)
    useEffect(() => {
        // @ts-ignore
        videoPlay.current.playAsync();
        StatusBar.setBarStyle('light-content', true);
        getToken();
    }, []);
    const getToken = async () => {
        try {
            // let value = await AsyncStorage.getItem('token');
            let value = await SecureStore.getItemAsync("token");
            if (value != null) {
                setState({token: value})
                await _getListService(value)
            }
            console.log(value, 'token async')
        } catch (e) {

        }
    }
    const _getListService = async (token: string) => {
        let uri = 'https://www.thilyquan.xyz/api/listService.php';
        try {
            const res = await axios.postForm(uri, {
                "token": token
            })
            if (res.status === 200) {
                let data = res.data.category
                setState({
                    listService: data
                })
                console.log(data, 'listService')
            } else {
                console.log(res.statusText)
            }

        } catch (e) {

        }
    }
    const renderItem = ({item}: { item: CategoryModel }) => {
        return (
            <View style={{flex: 0.5}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={{uri: item.icon}} style={{width: 24, height: 24}}
                           resizeMode='contain'/>
                    <View style={{width: 8}}/>
                    <Text style={{color: 'white', fontWeight: '500'}}>
                        {item.name}
                    </Text>
                </View>
                <View style={{height: 8}}/>
                <View style={{marginHorizontal: 12}}>
                    {item.service?.flatMap((e) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate(StackNames.serviceScreen, {
                                    item: e.pack,
                                    name: e.name,
                                    textInput: e.text_input,
                                    textPlaceholder: e.text_placeholder,
                                    title: item.name
                                })}
                                style={styles.subItem}>
                                <Image source={{uri: e.icon}} style={{width: 16, height: 16}}
                                       resizeMode={'contain'}/>
                                <View style={{width: 4}}/>
                                <Text ellipsizeMode={'clip'}
                                      style={{width: 130, fontWeight: '400', fontSize: 12}}
                                      numberOfLines={2}>
                                    {e.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        )
    }
    return (
        <View style={{flex: 1}}>
            <Video
                ref={videoPlay}
                source={require('../../assets/Background.mp4')}
                isMuted={true}
                isLooping={true}
                resizeMode={ResizeMode.COVER}
                useNativeControls
                style={styles.videoBackground}
            />
            <View style={{padding: 12}}>
                <FlatList
                    data={state.listService}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    ListHeaderComponent={() => {
                        return (<View style={{height: 42}}/>)
                    }}
                    ListFooterComponent={() => {
                        return (<View style={{height: 62}}/>)
                    }}
                />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    subItem: {
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginBottom: 8,
        borderRadius: 8,
        overflow: 'hidden'
    },
    videoBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',
    }
});
