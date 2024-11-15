import {Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {ResizeMode, Video} from "expo-av";
import {useEffect, useRef, useState} from "react";
import {PackModel} from "@/app/(tabs)";
import Ionicons from "@expo/vector-icons/Ionicons";
import {decode} from "entities";
import RenderHTML from "react-native-render-html";

class State {
    minOrder ?: string;
    maxOrder ?: string;
    content ?: string;
    isSelect ?: string;
    donGia ?: number;
    nhapSoLuong ?: string;
    linkTang ?: string;
    ghiChu ?: string;
    tongTien?: number;
}

const luuYContent = '<p><strong>Nghiêm cấm buff các đơn có nội dung vi phạm pháp luật, chính trị, đồ trụy... Nếu cố tình buff bạn sẽ bị trừ hết tiền và ban khỏi hệ thống vĩnh viễn, và phải chịu hoàn toàn trách nhiệm trước pháp luật.</strong></p>  <p><strong>Nếu đơn đang chạy trên hệ thống mà bạn vẫn mua ở các hệ thống bên khác, nếu có tình trạng hụt, thiếu số lượng giữa 2 bên thì sẽ không được xử lí.</strong></p>  <p><strong>Đơn cài sai thông tin hoặc lỗi trong quá trình tăng hệ thống sẽ không hoàn lại tiền.</strong></p>  <p><strong>Nếu gặp lỗi hãy nhắn tin hỗ trợ phía bên phải góc màn hình hoặc vào mục liên hệ hỗ trợ để được hỗ trợ tốt nhất</strong></p>  <p><strong>Chờ đơn chạy xong rồi mới mua tiếp, cấm đè đơn</strong></p>  <p><strong>Tài khoản, bài viết ở chế độ công khai, nghiêm cấm đổi Username trong quá trình tăng, cố tình đổi Username không hỗ trợ</strong></p>  <p><strong>Lưu ý: Riêng đối với buff like cho Avatar và ảnh Bìa hãy ấn thẳng vào ảnh rồi copy link</strong></p>'
export const ServiceScreen = ({route, navigation}: any) => {
    const data = route.params
    const [state, setState] = useState<State>({
        nhapSoLuong: "1",
        donGia: 0,
        tongTien: 0
    })
    const videoPlay = useRef(null)
    useEffect(() => {
        // @ts-ignore
        videoPlay.current.playAsync()
        // @ts-ignore
        var _sum = Number(state.nhapSoLuong) * state.donGia
        setState({
            ...state,
            tongTien: _sum,
        })
        console.log({_sum, sl: state.nhapSoLuong, dg: state.donGia, mOr: String(state.maxOrder).length}, 'tong so tien')
    }, [state.nhapSoLuong])
    let listService = data.item as Array<PackModel>
    listService.sort((a, b) => {
        if (Number(a.price) < Number(b.price)) return -1;
        if (Number(b.price) < Number(a.price)) return 1;
        return 0;
    })
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 3
        }).format(amount);
    };
    return (
        <View style={{flex: 1}}>
            <Video
                ref={videoPlay}
                source={require('../../../assets/Background.mp4')}
                isMuted={true}
                isLooping={true}
                resizeMode={ResizeMode.COVER}
                useNativeControls={false}
                style={styles.videoBackground}
            />
            <View style={{flex: 1}}>
                <View style={{height: 80, alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name={'chevron-back-outline'} style={{color: 'white', width: 24, height: 24}}
                                  size={24}/>
                    </TouchableOpacity>
                    <View style={{flex: 1, alignItems: 'center', paddingBottom: 2}}>
                        <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
                            {data.title + ' - ' + data.name}
                        </Text>
                    </View>

                </View>
                <ScrollView style={{marginHorizontal: 12, marginVertical: 12}}>
                    <View>
                        <Text style={[styles.texStyle, {marginBottom: 8}]}>
                            {data.textInput}
                        </Text>
                        <View
                            style={{
                                backgroundColor: 'white',
                                borderColor: 'white',
                                borderWidth: 1,
                                shadowColor: 'black',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                height: 36,
                                borderRadius: 4,
                                marginBottom: 16
                            }}>
                            <TextInput placeholder={data.textPlaceholder}
                                       style={{backgroundColor: 'white', marginHorizontal: 8}}/>
                        </View>
                    </View>
                    {listService.map((item: PackModel) => {
                        return (
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                paddingVertical: 4,
                                // width: Dimensions.get('screen').width - 100
                            }}
                                              onPress={() => {
                                                  console.log(item, 'data')
                                                  setState({
                                                      ...state,
                                                      minOrder: item.min_order,
                                                      maxOrder: item.max_order,
                                                      content: item.content,
                                                      isSelect: item.id,
                                                      donGia: Number(item.price) * 2,
                                                      nhapSoLuong: '1',
                                                      tongTien: Number(item.price) * 2
                                                  })
                                              }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: "center",
                                    flex: 1,
                                    marginRight: 8
                                }}>
                                    <View style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: 10,
                                        borderColor: 'white',
                                        borderWidth: 1,
                                        backgroundColor: state?.isSelect == undefined ? 'transparent' : state.isSelect === item.id ? 'white' : 'transparent'
                                    }}/>
                                    <Text style={{color: 'white', paddingHorizontal: 8}} numberOfLines={3}>
                                        {item.name}
                                    </Text>
                                </View>
                                <Text style={{color: 'yellow'}}>
                                    Giá {formatCurrency(Number(item.price) * 2)}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                    <View style={{
                        backgroundColor: '#fde8e4',
                        borderColor: '#fde8e4',
                        borderWidth: 1,
                        shadowColor: 'black',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        borderRadius: 4,
                        marginVertical: 16
                    }}>
                        {state?.content == undefined ?
                            <Text style={{padding: 8}}>Vui lòng chọn gói dịch vụ</Text>
                            : <View style={{padding: 8}}>
                                <RenderHTML source={{html: `${decode(state.content)}`}}
                                            contentWidth={Dimensions.get('screen').width}/>
                                <Text style={{fontWeight: '500', color: 'red', fontStyle: 'italic'}}> Số lượng có thể
                                    mua: {state?.minOrder == undefined && state?.maxOrder == undefined ? "1" : `Tối thiểu  ${state.minOrder}, Tối đa ${state.maxOrder}`}</Text>
                            </View>
                        }

                    </View>
                    <View style={{marginBottom: 16}}>
                        <Text style={[styles.texStyle, {marginBottom: 4}]}>
                            Nhập số lượng cần mua
                        </Text>
                        <View style={{
                            backgroundColor: 'white',
                            borderColor: 'white',
                            borderWidth: 1,
                            shadowColor: 'black',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            height: 36,
                            borderRadius: 4,
                            marginTop: 4
                        }}>
                            <TextInput
                                placeholder={state?.minOrder == undefined && state?.maxOrder == undefined ? "1" : `Min  ${state.minOrder}, Max ${state.maxOrder}`}
                                inputMode={"numeric"}
                                maxLength={String(state.maxOrder).length}
                                onChangeText={(e) => {
                                    setState({
                                        ...state,
                                        nhapSoLuong: e
                                    })
                                }}
                                style={{backgroundColor: 'white', marginHorizontal: 8}}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.texStyle}>
                            Ghi chú đơn hàng
                        </Text>
                        <View style={{
                            backgroundColor: 'white',
                            borderColor: 'white',
                            borderWidth: 1,
                            shadowColor: 'black',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            height: 50,
                            borderRadius: 4,
                            marginTop: 4
                        }}>
                            <TextInput placeholder={'Nhập ghi chú đơn hàng nếu có'}
                                       style={{backgroundColor: 'white', marginHorizontal: 8}} inputMode={'text'}
                                       numberOfLines={5}/>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: 'white',
                        borderColor: 'white',
                        borderWidth: 1,
                        shadowColor: 'black',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        borderRadius: 4,
                        marginTop: 16, padding:8
                    }}>
                        <Text style={{fontStyle:'italic', fontWeight:'bold', fontSize:16}}>
                            Lưu ý
                        </Text>
                        <RenderHTML source={{html: luuYContent}} />
                    </View>
                </ScrollView>

                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                    backgroundColor: 'white',
                    borderColor: 'white',
                    borderWidth: 1,
                    shadowColor: 'black',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    borderRadius: 8,
                    marginHorizontal: 12,
                    marginBottom: 24
                }}>
                    <Text style={{}}>
                        Tạo tiến trình - <Text
                        style={{color: 'red', fontWeight: '500'}}>
                        {/*@ts-ignore*/}
                        {formatCurrency(state.tongTien)}
                    </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
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
    },
    texStyle: {color: 'white'}
});
