import { View, Text, Button, FlatList } from 'react-native';
import React from 'react';
import { useContextBanco } from '../providers/ProviderBanco';
import { Transaccion } from '../modelos/Transaccion';

export default function Inicio() {
  const { saldo, depositar, transacciones } = useContextBanco();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>¡Hola, Usuario!</Text>
      <View style={{ marginVertical: 20 }}>
        <Text>Saldo Actual: L. {saldo}</Text>
        <Button title="Depositar L.500" onPress={() => depositar(500)} />
      </View>
      <Text>Últimas transacciones</Text>
      <FlatList
        data={transacciones}
        renderItem={({ item }: { item: Transaccion }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
            <Text>{item.descripcion}</Text>
            <Text>{item.tipo === 'deposito' ? '+' : '-'} L.{item.monto}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}