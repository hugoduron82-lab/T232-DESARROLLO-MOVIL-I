import { createContext } from 'react';
import { Producto } from '../modelos/Producto';

// Definimos la interfaz del contexto (igual que en ContexPersona)
export interface ProductContextProps {
  listaProductos: Producto[];
  productoSeleccionado: Producto | null;
  cargando: boolean;
  obtenerProductos: () => Promise<void>;
  seleccionarProducto: (producto: Producto) => void;
  eliminarProducto: (partNumber: string) => Promise<void>;
  guardarProducto: (producto: Omit<Producto, 'partNumber'>) => Promise<boolean>;
  limpiarSeleccion: () => void;
}

// Creamos el contexto con valores por defecto (como en ContexPersona)
export const ProductContext = createContext<ProductContextProps>({
  listaProductos: [],
  productoSeleccionado: null,
  cargando: false,
  obtenerProductos: async () => {},
  seleccionarProducto: () => {},
  eliminarProducto: async () => {},
  guardarProducto: async () => false,
  limpiarSeleccion: () => {},
});