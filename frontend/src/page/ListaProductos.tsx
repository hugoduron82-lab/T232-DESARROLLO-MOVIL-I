import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useProductContext } from '../providers/ProviderProducto';
import { Producto } from '../modelos/Producto';

export default function ListaProductos() {
  // Usamos el contexto para obtener los datos y funciones
  const {
    listaProductos,
    productoSeleccionado,
    cargando,
    obtenerProductos,
    seleccionarProducto,
    eliminarProducto,
  } = useProductContext();

  // Cargar productos al montar el componente
  useEffect(() => {
    obtenerProductos();
  }, []);

  // Renderizar cada fila de la tabla
  const renderItem = ({ item }: { item: Producto }) => (
    <View style={styles.filaTabla}>
      <View style={styles.filaInfo}>
        <Text style={styles.nombreTabla}>{item.name}</Text>
        <Text style={styles.precioTabla}>${item.value} {item.valueCurrency}</Text>
        <Text style={styles.descripcionTabla} numberOfLines={1}>{item.description}</Text>
      </View>
      <TouchableOpacity style={[styles.boton, styles.botonVer]} onPress={() => seleccionarProducto(item)}>
        <Text style={styles.botonTexto}>Ver</Text>
      </TouchableOpacity>
    </View>
  );

  // Renderizar el detalle del producto seleccionado
  const renderDetalle = () => {
    if (!productoSeleccionado) {
      return (
        <View style={styles.detalleVacio}>
          <Text style={styles.detalleVacioTexto}>Selecciona un producto presionando "Ver"</Text>
        </View>
      );
    }
    return (
      <View style={styles.detalleCard}>
        {productoSeleccionado.sourceLink ? (
          <Image source={{ uri: productoSeleccionado.sourceLink }} style={styles.detalleImagen} />
        ) : (
          <View style={styles.detalleImagenPlaceholder}>
            <Text style={styles.fotoPlaceholderText}>📷</Text>
          </View>
        )}
        <Text style={styles.detalleNombre}>{productoSeleccionado.name}</Text>
        <Text style={styles.detallePrecio}>${productoSeleccionado.value} {productoSeleccionado.valueCurrency}</Text>
        <Text style={styles.detalleDescripcion}>{productoSeleccionado.description}</Text>
        <Text style={styles.detalleCategoria}>Categoría: {productoSeleccionado.categoryCode}</Text>
        <Text style={[styles.detalleEstado, productoSeleccionado.status === 'Disponible' ? styles.estadoDisponible : styles.estadoNoDisponible]}>
          {productoSeleccionado.status}
        </Text>
        <TouchableOpacity style={[styles.boton, styles.botonEliminar]} onPress={() => eliminarProducto(productoSeleccionado.partNumber)}>
          <Text style={styles.botonTexto}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (cargando) {
    return (
      <SafeAreaView style={styles.centrado}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Listado de Productos</Text>
      <FlatList
        data={listaProductos}
        keyExtractor={(item) => item.partNumber}
        renderItem={renderItem}
        contentContainerStyle={styles.listaContenido}
        ListEmptyComponent={<Text style={styles.textoVacio}>No hay productos disponibles</Text>}
      />
      <View style={styles.detalleContainer}>
        <Text style={styles.detalleTitulo}>Detalle</Text>
        <Text style={styles.detalleSubtitulo}>Ver detalle del item</Text>
        {renderDetalle()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingHorizontal: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 12, textAlign: 'center' },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listaContenido: { paddingBottom: 10 },
  filaTabla: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  filaInfo: { flex: 1, marginRight: 12 },
  nombreTabla: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  precioTabla: { fontSize: 15, fontWeight: '600', color: '#007AFF', marginTop: 2 },
  descripcionTabla: { fontSize: 13, color: '#888', marginTop: 2 },
  boton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  botonTexto: { color: '#fff', fontSize: 14, fontWeight: '600' },
  botonVer: { backgroundColor: '#34C759' },
  botonEliminar: { backgroundColor: '#FF6B6B', width: '100%', marginTop: 8 },
  textoVacio: { textAlign: 'center', color: '#999', fontSize: 16, paddingVertical: 30 },
  detalleContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  detalleTitulo: { fontSize: 22, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  detalleSubtitulo: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 12 },
  detalleCard: { alignItems: 'center' },
  detalleImagen: { width: 150, height: 150, borderRadius: 8, marginBottom: 12, resizeMode: 'cover', borderWidth: 1, borderColor: '#ddd' },
  detalleImagenPlaceholder: { width: 150, height: 150, borderRadius: 8, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#ddd' },
  fotoPlaceholderText: { fontSize: 40 },
  detalleNombre: { fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 4 },
  detallePrecio: { fontSize: 18, fontWeight: '600', color: '#007AFF', marginBottom: 8 },
  detalleDescripcion: { fontSize: 15, color: '#555', textAlign: 'center', marginBottom: 6 },
  detalleCategoria: { fontSize: 14, color: '#888', marginBottom: 4 },
  detalleEstado: { fontSize: 14, fontWeight: '600', marginBottom: 12 },
  estadoDisponible: { color: '#34C759' },
  estadoNoDisponible: { color: '#FF3B30' },
  detalleVacio: { paddingVertical: 30, alignItems: 'center' },
  detalleVacioTexto: { fontSize: 16, color: '#999', textAlign: 'center' },
});