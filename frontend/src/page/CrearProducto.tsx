import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useProductContext } from '../providers/ProviderProducto';

export default function CrearProducto() {
  // Usamos el contexto para guardar el producto
  const { guardarProducto } = useProductContext();

  // Estado local del formulario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [estado, setEstado] = useState('Disponible');
  const [categoria, setCategoria] = useState('');
  const [urlFoto, setUrlFoto] = useState('');
  const [imagenUri, setImagenUri] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  // --- Funciones de cámara ---
  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la cámara');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImagenUri(uri);
      setUrlFoto(uri);
    }
  };

  const seleccionarGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la galería');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImagenUri(uri);
      setUrlFoto(uri);
    }
  };

  // --- Guardar producto ---
  const handleGuardar = async () => {
    if (!nombre || !descripcion || !precio || !categoria) {
      Alert.alert('Error', 'Nombre, Descripción, Precio y Categoría son obligatorios');
      return;
    }
    const precioNum = parseFloat(precio);
    if (isNaN(precioNum) || precioNum <= 0) {
      Alert.alert('Error', 'El precio debe ser un número válido mayor a 0');
      return;
    }

    setGuardando(true);
    const exito = await guardarProducto({
      name: nombre,
      description: descripcion,
      value: precioNum,
      valueCurrency: 'USD',
      status: estado,
      categoryCode: categoria,
      sourceLink: urlFoto || '',
      productType: '',
      brandCode: '',
      familyCode: '',
      lineCode: '',
      productSegmentCode: '',
      defaultQuantityUnits: '',
      plannerCode: '',
    });
    setGuardando(false);

    if (exito) {
      // Limpiar formulario
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setEstado('Disponible');
      setCategoria('');
      setUrlFoto('');
      setImagenUri(null);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.titulo}>Registro de Producto</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Ej: Laptop Pro" />

      <Text style={styles.label}>Descripción</Text>
      <TextInput style={[styles.input, styles.textArea]} value={descripcion} onChangeText={setDescripcion} placeholder="Descripción" multiline numberOfLines={3} textAlignVertical="top" />

      <Text style={styles.label}>Precio</Text>
      <TextInput style={styles.input} value={precio} onChangeText={setPrecio} placeholder="0.00" keyboardType="numeric" />

      <Text style={styles.label}>Estado</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={estado}
          onValueChange={(itemValue: string) => setEstado(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Disponible" value="Disponible" />
          <Picker.Item label="No disponible" value="No disponible" />
        </Picker>
      </View>

      <Text style={styles.label}>Categoría</Text>
      <TextInput style={styles.input} value={categoria} onChangeText={setCategoria} placeholder="Ej: Electrónicos" />

      <Text style={styles.label}>Fotografía Item</Text>
      <View style={styles.fotoContainer}>
        {imagenUri ? (
          <Image source={{ uri: imagenUri }} style={styles.fotoPreview} />
        ) : (
          <View style={styles.fotoPlaceholder}>
            <Text style={styles.fotoPlaceholderText}>📷</Text>
            <Text style={styles.fotoPlaceholderSub}>Sin imagen</Text>
          </View>
        )}
        <View style={styles.fotoBotones}>
          <TouchableOpacity style={[styles.boton, styles.botonCamara]} onPress={tomarFoto}>
            <Text style={styles.botonTexto}>📷 Cámara</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.boton, styles.botonGaleria]} onPress={seleccionarGaleria}>
            <Text style={styles.botonTexto}>🖼️ Galería</Text>
          </TouchableOpacity>
        </View>
        {urlFoto !== '' && <Text style={styles.urlTexto}>URL: {urlFoto.substring(0, 40)}...</Text>}
      </View>

      <TouchableOpacity style={[styles.boton, styles.botonGuardar]} onPress={handleGuardar} disabled={guardando}>
        {guardando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botonTexto}>Guardar</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', color: '#555', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16, backgroundColor: '#fff' },
  textArea: { height: 80, textAlignVertical: 'top' },
  pickerContainer: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, backgroundColor: '#fff', overflow: 'hidden' },
  picker: { height: 50, width: '100%' },
  fotoContainer: { backgroundColor: '#fff', borderRadius: 8, padding: 16, borderWidth: 1, borderColor: '#ddd', marginTop: 4, alignItems: 'center' },
  fotoPreview: { width: 120, height: 120, borderRadius: 8, marginBottom: 10, resizeMode: 'cover' },
  fotoPlaceholder: { width: 120, height: 120, borderRadius: 8, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#ddd', borderStyle: 'dashed' },
  fotoPlaceholderText: { fontSize: 40 },
  fotoPlaceholderSub: { fontSize: 12, color: '#999', marginTop: 4 },
  fotoBotones: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  boton: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginVertical: 6, elevation: 2 },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
  botonCamara: { backgroundColor: '#007AFF', flex: 1, marginRight: 6 },
  botonGaleria: { backgroundColor: '#34C759', flex: 1, marginLeft: 6 },
  urlTexto: { fontSize: 12, color: '#888', marginTop: 8, fontStyle: 'italic' },
  botonGuardar: { backgroundColor: '#007AFF', width: '100%', marginTop: 20 },
});