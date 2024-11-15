import {DarkTheme, NavigationContainer, ThemeProvider} from '@react-navigation/native';
import 'react-native-reanimated';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Index} from "@/app/screens/splashScreen";
import TabLayout from "@/app/(tabs)/_layout";
import {useEffect} from "react";
import {StatusBar} from "react-native";
import {ServiceScreen} from "@/app/screens/service";

// Prevent the splash screen from auto-hiding before asset loading is complete.
export  enum StackNames{
    splash = "splash",
    home = "home",
    serviceScreen = "serviceScreen",
}
export default function RootLayout() {

  const  navigator = createNativeStackNavigator();
    useEffect(() => {
        StatusBar.setBarStyle('light-content');
    }, []);

  return (

      <ThemeProvider value={DarkTheme}>
          <NavigationContainer independent={true}>
              <navigator.Navigator screenOptions={{headerShown: false}}>
                  <navigator.Screen name={StackNames.splash} component={Index}/>
                  <navigator.Screen name={StackNames.home} component={TabLayout}/>
                  <navigator.Screen name={StackNames.serviceScreen} component={ServiceScreen}/>
              </navigator.Navigator>
          </NavigationContainer>
      </ThemeProvider>

  );
}
