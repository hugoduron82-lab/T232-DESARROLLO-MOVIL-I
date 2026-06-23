import React, { useState, useCallback, ReactNode } from 'react';
import { Alert } from 'react-native';
import { ProductContext } from '../context/ProductContext';
import { Producto } from '../modelos/Producto';

// URL del backend (cámbiala si es necesario)
const API_URL = 'http://192.168.0.7:5001';

export default function ProviderProducto({ children }: { children: ReactNode }) {
  // Estado local (igual que en ProviderPersona)
  const [listaProductos, setListaProductos] = useState<Producto[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(false);

  // Función para obtener productos (GET /productos)
  const obtenerProductos = useCallback(async () => {
    setCargando(true);
    try {
      const response = await fetch(`${API_URL}/productos`);
      const json = await response.json();
      if (response.ok) {
        setListaProductos(json.data || []);
      } else {
        Alert.alert('Error', json.message || 'No se pudieron cargar los productos');
      }
    } catch (error) {
      Alert.alert('Error', 'Error de conexión');
    } finally {
      setCargando(false);
    }
  }, []);

  // Seleccionar producto para detalle
  const seleccionarProducto = useCallback((producto: Producto) => {
    setProductoSeleccionado(producto);
  }, []);

  // Limpiar selección
  const limpiarSeleccion = useCallback(() => {
    setProductoSeleccionado(null);
  }, []);

  // Guardar producto (POST /productos)
  const guardarProducto = useCallback(async (producto: Omit<Producto, 'partNumber'>): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...producto,
          partNumber: `PROD-${Date.now()}`,
        }),
      });
      if (response.ok) {
        Alert.alert('Éxito', 'Producto guardado correctamente');
        await obtenerProductos(); // refrescar lista
        return true;
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'No se pudo guardar');
        return false;
      }
    } catch (error) {
      Alert.alert('Error', 'Error de conexión');
      return false;
    }
  }, [obtenerProductos]);

  // Eliminar producto (DELETE /items/:id) - exactamente como pide el examen
  const eliminarProducto = useCallback(async (partNumber: string) => {
    try {
      const response = await fetch(`${API_URL}/items/${partNumber}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        Alert.alert('Éxito', 'Producto eliminado');
        setProductoSeleccionado(null);
        await obtenerProductos();
      } else {
        Alert.alert('Error', 'No se pudo eliminar');
      }
    } catch (error) {
      Alert.alert('Error', 'Error de conexión');
    }
  }, [obtenerProductos]);

  // Valor del provider (igual que en ProviderPersona)
  const value = {
    listaProductos,
    productoSeleccionado,
    cargando,
    obtenerProductos,
    seleccionarProducto,
    eliminarProducto,
    guardarProducto,
    limpiarSeleccion,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

// Hook personalizado (igual que useContextPersona)
export function useProductContext() {
  const context = React.useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext debe ser usado dentro de ProviderProducto');
  }
  return context;
}