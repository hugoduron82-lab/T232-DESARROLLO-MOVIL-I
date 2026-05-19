import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inicio from '../page/Inicio';
import Transferencia from '../page/Transferencia';
import Historial from '../page/Historial';
import ProviderBanco from '../providers/ProviderBanco';

const Tab = createBottomTabNavigator();

export default function Navegacion() {
  return (
    <ProviderBanco>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Inicio" component={Inicio} />
          <Tab.Screen name="Transferencias" component={Transferencia} />
          <Tab.Screen name="Histórico" component={Historial} />
        </Tab.Navigator>
      </NavigationContainer>
    </ProviderBanco>
  );
}