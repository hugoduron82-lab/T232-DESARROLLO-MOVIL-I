import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Maestro } from '../modelos/Maestro';

const API_URL = 'http://localhost:5000';

export default function MaestroComponent() {
    const [lista, setLista] = useState<Maestro[]>([]);
    const [id, setId] = useState(0);
    const [nombre, setNombre] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [estado, setEstado] = useState('');
    const [accion, setAccion] = useState(0);

    const obtenerMaestros = async () => {
        try {
            const response = await fetch(`${API_URL}/maestros`);
            const data = await response.json();
            if (data && data.data) setLista(data.data);
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor');
        }
    };

    const guardarMaestro = async () => {
        try {
            const body = { nombre, especialidad, email, telefono, estado: parseInt(estado) };
            if (accion === 0) {
                await fetch(`${API_URL}/maestros`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
            } else {
                await fetch(`${API_URL}/maestros/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
            }
            obtenerMaestros();
            limpiar();
        } catch (error) {
            Alert.alert('Error', 'No se pudo guardar');
        }
    };

    const editar = (item: Maestro) => {
        setId(item.idMaestro);
        setNombre(item.nombre);
        setEspecialidad(item.especialidad);
        setEmail(item.email);
        setTelefono(item.telefono);
        setEstado(item.estado.toString());
        setAccion(1);
    };

    const eliminar = async (id: number) => {
        Alert.alert('Confirmar', '¿Eliminar?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Eliminar',
                onPress: async () => {
                    await fetch(`${API_URL}/maestros/${id}`, { method: 'DELETE' });
                    obtenerMaestros();
                }
            }
        ]);
    };

    const limpiar = () => {
        setId(0);
        setNombre('');
        setEspecialidad('');
        setEmail('');
        setTelefono('');
        setEstado('');
        setAccion(0);
    };

    useEffect(() => { obtenerMaestros(); }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Maestros</Text>
            <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
            <TextInput style={styles.input} placeholder="Especialidad" value={especialidad} onChangeText={setEspecialidad} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Estado (1/0)" value={estado} onChangeText={setEstado} keyboardType="numeric" />
            <View style={styles.buttonRow}>
                <Button title={accion === 0 ? "Agregar" : "Actualizar"} onPress={guardarMaestro} />
                {accion === 1 && <Button title="Cancelar" onPress={limpiar} />}
            </View>
            <FlatList
                data={lista}
                keyExtractor={(item) => item.idMaestro.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.nombre} - {item.especialidad} (Estado: {item.estado})</Text>
                        <Text>{item.email} | {item.telefono}</Text>
                        <View style={styles.buttonGroup}>
                            <Button title="Editar" onPress={() => editar(item)} />
                            <Button title="Eliminar" onPress={() => eliminar(item.idMaestro)} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12, backgroundColor: '#fff' },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    item: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10 },
    buttonGroup: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 10 },
});