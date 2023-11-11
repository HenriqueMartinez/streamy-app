import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import HomeScreen from '../screens/Home';

const Stack = createNativeStackNavigator();

function StackHome() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    animationEnabled: false,
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export default StackHome;
