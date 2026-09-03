import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccountDetail } from '../screens/AccountDetail';
import { AccountsScreen } from '../screens/AccountsScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Accounts"
          component={AccountsScreen}
          options={{ title: 'Mis cuentas' }}
        />
        <Stack.Screen
          name="AccountDetail"
          component={AccountDetail}
          options={{ title: 'Detalle de cuenta' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
