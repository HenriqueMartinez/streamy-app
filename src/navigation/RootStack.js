import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigation from './TabNavigation';

import ModalAddProfile from '../screens/ModalAddProfile';
// import ModalCastConnect from '../screens/ModalCastConnect';
import ModalManageProfiles from '../screens/ModalManageProfiles';

const Stack = createNativeStackNavigator();

function RootStack() {
    return (
        <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator
                screenOptions={{
                    presentation: 'fullScreenModal'
                }}
            >
                <Stack.Screen
                    name="TabNavigation"
                    component={TabNavigation}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="ModalAddProfile"
                    component={ModalAddProfile}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="ModalManageProfiles"
                    component={ModalManageProfiles}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack;
