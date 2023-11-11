import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import MoreScreen from '../screens/More';

const Stack = createNativeStackNavigator();

function StackMore() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="More"
                component={MoreScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export default StackMore;
