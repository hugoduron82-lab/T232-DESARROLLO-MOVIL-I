import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const API_URL = 'http://192.168.0.7:5001';

export default function App() {
  const [productos, setProductos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);

  const cargarProductos = async () => {
    setCargando(true);
    try {
      const res = await fetch(`${API_URL}/productos`);
      const json = await res.json();
      setProductos(json.data || []);
    } catch (error) {
      alert('Error de conexión');
    }
    setCargando(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📱 App Productos</Text>
      <Button title="Cargar productos" onPress={cargarProductos} />
      {cargando && <Text>Cargando...</Text>}
      <FlatList
        data={productos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nombre}>{item.name}</Text>
            <Text>${item.value} {item.valueCurrency}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No hay productos</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  nombre: { fontSize: 18, fontWeight: 'bold' },
});