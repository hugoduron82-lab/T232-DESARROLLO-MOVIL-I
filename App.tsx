import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Switch,
} from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [palabra, setPalabra] = useState('');
  const [idioma, setIdioma] = useState('es');

  const hablar = () => {
    if (palabra.trim() === '') {
      Alert.alert('Campo vacío', 'Escribe una palabra o frase');
      return;
    }

    // Opciones de pronunciación con manejo de errores
    const opciones = {
      language: idioma,
      onError: (error: Error) => {
        let mensaje = '';
        if (error.message.includes('language')) {
          mensaje = `Parece que el idioma ${idioma === 'es' ? 'español' : 'inglés'} no está instalado en tu dispositivo. Ve a Ajustes > Texto a voz e instálalo.`;
        } else {
          mensaje = `Error al hablar: ${error.message}`;
        }
        Alert.alert('Error de pronunciación', mensaje);
      }
    };

    Speech.speak(palabra, opciones);
  };

  const cambiarIdioma = () => {
    setIdioma(idioma === 'es' ? 'en' : 'es');
  };

  // (Opcional) Función para verificar voces disponibles - descomentar si se necesita depurar
  // const verificarVoces = async () => {
  //   const voces = await Speech.getAvailableVoicesAsync();
  //   console.log(voces);
  //   Alert.alert('Voces disponibles', JSON.stringify(voces.map(v => v.language), null, 2));
  // };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>🗣️ Plugin: expo-speech</Text>
      <Text style={styles.subtitulo}>
        Pronunciación para tu app de idiomas
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ej: Manzana, Feliz, Aprender..."
        value={palabra}
        onChangeText={setPalabra}
      />

      <View style={styles.filaSwitch}>
        <Text>Idioma: {idioma === 'es' ? 'Español 🇪🇸' : 'Inglés 🇺🇸'}</Text>
        <Switch value={idioma === 'en'} onValueChange={cambiarIdioma} />
      </View>

      <Button title="🔊 Escuchar pronunciación" onPress={hablar} />

      {/* Botón opcional para verificar voces (descomentar en el JSX si se usa la función) */}
      {/* <Button title="Ver voces instaladas" onPress={verificarVoces} /> */}

      <View style={styles.explicacion}>
        <Text style={styles.explicacionTitulo}>✅ Lo que aprendí con este plugin:</Text>
        <Text>• expo-speech permite síntesis de voz nativa.</Text>
        <Text>• Funciona en iOS, Android y web.</Text>
        <Text>• Se puede cambiar idioma (es, en, fr, etc).</Text>
        <Text>• Muy fácil de instalar: npx expo install expo-speech</Text>
        <Text>• No necesita configuración extra, corre en Expo Go.</Text>
        <Text style={{ marginTop: 8 }}>🎯 Para mi proyecto final: servirá para que cada palabra diaria tenga un botón 🔈 y el usuario escuche su pronunciación en el idioma que elija.</Text>
        <Text style={{ marginTop: 8, fontStyle: 'italic', color: '#e67e22' }}>💡 Si el español no suena, instala el paquete de voz en Ajustes  Texto a voz.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 30,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#bdc3c7',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 20,
  },
  filaSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  explicacion: {
    marginTop: 40,
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 12,
    width: '100%',
  },
  explicacionTitulo: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2980b9',
  },
});