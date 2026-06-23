import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Producto } from '../modelos/Producto';

const API_URL = 'http://192.168.0.7:5001';

type RouteParams = {
  partNumber: string;
};

export default function DetalleProducto() {
  const route = useRoute();
  const navigation = useNavigation();
  const { partNumber } = route.params as RouteParams;
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerDetalle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/productos/${partNumber}`);
        const json = await response.json();
        if (response.ok) {
          setProducto(json.data);
        } else {
          Alert.alert('Error', json.message || 'Producto no encontrado');
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert('Error', 'Error de conexión');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    obtenerDetalle();
  }, [partNumber]);

  if (loading) {
    return (
      <SafeAreaView style={styles.centrado}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  if (!producto) {
    return (
      <SafeAreaView style={styles.centrado}>
        <Text>Producto no encontrado</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        {/* "Item" como título */}
        <Text style={styles.labelItem}>Item</Text>

        {/* Nombre */}
        <Text style={styles.nombre}>{producto.name}</Text>

        {/* Precio */}
        <Text style={styles.precio}>${producto.value} {producto.valueCurrency}</Text>

        {/* Descripción */}
        <Text style={styles.descripcion}>{producto.description || 'Sin descripción'}</Text>

        {/* Dos botones "Ver" */}
        <View style={styles.botones}>
          <TouchableOpacity style={[styles.boton, styles.botonVer]} onPress={() => Alert.alert('Ver', 'Acción Ver 1')}>
            <Text style={styles.botonTexto}>Ver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.boton, styles.botonVer]} onPress={() => Alert.alert('Ver', 'Acción Ver 2')}>
            <Text style={styles.botonTexto}>Ver</Text>
          </TouchableOpacity>
        </View>

        {/* Botón Volver */}
        <TouchableOpacity style={[styles.boton, styles.botonVolver]} onPress={() => navigation.goBack()}>
          <Text style={styles.botonTexto}>Volver</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  labelItem: { fontSize: 16, fontWeight: '600', color: '#888', marginBottom: 4 },
  nombre: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  precio: { fontSize: 24, fontWeight: '700', color: '#007AFF', marginBottom: 12 },
  descripcion: { fontSize: 16, color: '#666', marginBottom: 16 },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  boton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  botonVer: { backgroundColor: '#34C759' },
  botonVolver: { backgroundColor: '#007AFF' },
  botonTexto: { color: '#fff', fontWeight: '600', fontSize: 16 },
});