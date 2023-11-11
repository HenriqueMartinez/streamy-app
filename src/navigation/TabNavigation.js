import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, gStyle } from '../constants';

// grabs stacks
import StackHome from './StackHome';
import StackMore from './StackMore';

// icons
import SvgHome from '../icons/Svg.Home';
import SvgMenu from '../icons/Svg.Menu';

const Tab = createBottomTabNavigator();

function TabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.white,
                tabBarInactiveTintColor: colors.inactiveGrey,
                tabBarIcon: ({ color }) => {
                    let icon = <SvgHome fill={color} />;

                    if (route.name === 'StackMore') {
                        icon = <SvgMenu fill={color} />;
                    }

                    return icon;
                },
                tabBarStyle: gStyle.navTabStyle
            })}
        >
            <Tab.Screen
                name="StackHome"
                component={StackHome}
                options={{
                    tabBarLabel: 'Início'
                }}
            />
            <Tab.Screen
                name="StackMore"
                component={StackMore}
                options={{
                    tabBarLabel: 'Opções'
                }}
            />
        </Tab.Navigator>
    );
}

export default TabNavigation;
