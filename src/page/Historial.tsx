import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { useContextBanco } from '../providers/ProviderBanco';
import { Transaccion } from '../modelos/Transaccion';

export default function Historial() {
  const { transacciones } = useContextBanco();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Historial Completo</Text>
      <FlatList
        data={transacciones}
        renderItem={({ item }: { item: Transaccion }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.descripcion}</Text>
            <Text>Monto: L.{item.monto}</Text>
            <Text>Fecha: {item.fecha.toLocaleString()}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}