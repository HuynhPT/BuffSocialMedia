import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "@/app/(tabs)/index";
import TabTwoScreen from "@/app/(tabs)/explore";
import {TabBarIcon} from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  const  BottomTab = createBottomTabNavigator();
  return (
      <BottomTab.Navigator    screenOptions={{
          headerShown: false,
          tabBarStyle: {
              backgroundColor: 'transparent', // Loại bỏ nền
              position: 'absolute', // Đảm bảo BottomAppBar luôn ở dưới cùng
              borderTopWidth: 0, // Loại bỏ viền trên
              elevation: 0, // Loại bỏ bóng đổ (shadow)
          },
      }}>
          <BottomTab.Screen name={'Trang chủ'} component={HomeScreen} options={({router}:any)=>({
              tabBarIcon: ({focused, color, size}:{focused:boolean, color:string, size:number})=>{
                  return <TabBarIcon name={'home'} style={{color: focused? 'yellow':'black'}}/>
              },
              tabBarActiveTintColor: 'yellow',
          })}/>
          <BottomTab.Screen name={'Lịch sử'} component={TabTwoScreen} options={({router}:any)=>({
              tabBarIcon: ({focused, color, size}:{focused:boolean, color:string, size:number})=>{
                  return <TabBarIcon name={'menu'} style={{color: focused? 'blue':'black'}}/>
              }
          })} />
      </BottomTab.Navigator>
  );
}
