import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SessionProvider } from './src/context/SessionContext';
import HomeScreen from './src/screens/HomeScreen';
import BreathingScreen from './src/screens/BreathingScreen';
import StatsScreen from './src/screens/StatsScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <SessionProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#f5f5f5',
                            elevation: 0,
                            shadowOpacity: 0,
                        },
                        headerTintColor: '#333',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                >
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ title: 'Breathe' }}
                    />
                    <Stack.Screen
                        name="Breathing"
                        component={BreathingScreen}
                        options={{ title: 'Session' }}
                    />
                    <Stack.Screen
                        name="Stats"
                        component={StatsScreen}
                        options={{ title: 'Statistics' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SessionProvider>
    );
}
