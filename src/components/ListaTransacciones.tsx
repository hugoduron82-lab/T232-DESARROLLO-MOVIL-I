import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { Transaccion } from '../src/modelos/Transaccion';

export default function ListaTransacciones({ transacciones }: { transacciones: Transaccion[] }) {
  return (
    <FlatList
      data={transacciones}
      renderItem={({ item }: { item: Transaccion }) => (
        <View style={{ padding: 8, borderBottomWidth: 1 }}>
          <Text>{item.descripcion}</Text>
          <Text>{item.tipo === 'deposito' ? '+' : '-'} L.{item.monto}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}