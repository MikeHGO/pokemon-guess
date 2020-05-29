import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Main from './pages/main';
import InGame from './pages/ingame';
import GameOver from './pages/gameOver';

export default function Routes() {
	const Stack = createStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerTintColor: 'white',
					headerTransparent: true,
					title: '',
					headerBackTitleVisible: false,
				}}
			>
				<Stack.Screen name="Main" component={Main} />
				<Stack.Screen name="InGame" component={InGame} />
				<Stack.Screen name="GameOver" component={GameOver} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

// 	const Drawer = createDrawerNavigator();

// 	return (
// 		<NavigationContainer>
// 			<Drawer.Navigator>
// 				<Drawer.Screen name="Start" component={Main} />
// 			</Drawer.Navigator>
// 		</NavigationContainer>
// 	);
// }
