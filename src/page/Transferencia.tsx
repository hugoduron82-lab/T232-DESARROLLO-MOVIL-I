import { View, Text, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { useContextBanco } from '../providers/ProviderBanco';

export default function Transferencia() {
  const { saldo, transferir } = useContextBanco();
  const [cuenta, setCuenta] = useState('');
  const [destino, setDestino] = useState('');
  const [monto, setMonto] = useState('');

  const manejarTransferencia = () => {
    const montoNum = parseFloat(monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      alert('Monto inválido');
      return;
    }
    transferir(montoNum, destino, cuenta);
    setCuenta('');
    setDestino('');
    setMonto('');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Transferencias</Text>
      <Text>Saldo disponible: L. {saldo}</Text>
      <TextInput placeholder="Número de cuenta" value={cuenta} onChangeText={setCuenta} keyboardType="numeric" style={{ borderWidth: 1, marginVertical: 5, padding: 8 }} />
      <TextInput placeholder="Destinatario" value={destino} onChangeText={setDestino} style={{ borderWidth: 1, marginVertical: 5, padding: 8 }} />
      <TextInput placeholder="Monto" value={monto} onChangeText={setMonto} keyboardType="numeric" style={{ borderWidth: 1, marginVertical: 5, padding: 8 }} />
      <Button title="Transferir" onPress={manejarTransferencia} />
    </View>
  );
}