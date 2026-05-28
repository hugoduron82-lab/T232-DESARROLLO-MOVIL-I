import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Asignatura } from '../modelos/Asignatura';

const API_URL = 'http://localhost:5000';

export default function AsignaturaComponent() {
    const [lista, setLista] = useState<Asignatura[]>([]);
    const [id, setId] = useState(0);
    const [nombre, setNombre] = useState('');
    const [cantidadhoras, setCantidadhoras] = useState('');
    const [estado, setEstado] = useState('');
    const [accion, setAccion] = useState(0);

    const obtenerAsignaturas = async () => {
        try {
            const response = await fetch(`${API_URL}/asignaturas`);
            const data = await response.json();
            if (data && data.data) setLista(data.data);
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor');
        }
    };

    const guardarAsignatura = async () => {
        try {
            const body = {
                nombre,
                cantidadhoras: parseInt(cantidadhoras),
                estado: parseInt(estado)
            };
            if (accion === 0) {
                await fetch(`${API_URL}/asignaturas`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
            } else {
                await fetch(`${API_URL}/asignaturas/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
            }
            obtenerAsignaturas();
            limpiar();
        } catch (error) {
            Alert.alert('Error', 'No se pudo guardar');
        }
    };

    const editar = (item: Asignatura) => {
        setId(item.idAsignatura);
        setNombre(item.nombre);
        setCantidadhoras(item.cantidadhoras.toString());
        setEstado(item.estado.toString());
        setAccion(1);
    };

    const eliminar = async (id: number) => {
        Alert.alert('Confirmar', '¿Eliminar?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Eliminar',
                onPress: async () => {
                    await fetch(`${API_URL}/asignaturas/${id}`, { method: 'DELETE' });
                    obtenerAsignaturas();
                }
            }
        ]);
    };

    const limpiar = () => {
        setId(0);
        setNombre('');
        setCantidadhoras('');
        setEstado('');
        setAccion(0);
    };

    useEffect(() => { obtenerAsignaturas(); }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Asignaturas</Text>
            <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
            <TextInput style={styles.input} placeholder="Horas" value={cantidadhoras} onChangeText={setCantidadhoras} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Estado (1/0)" value={estado} onChangeText={setEstado} keyboardType="numeric" />
            <View style={styles.buttonRow}>
                <Button title={accion === 0 ? "Agregar" : "Actualizar"} onPress={guardarAsignatura} />
                {accion === 1 && <Button title="Cancelar" onPress={limpiar} />}
            </View>
            <FlatList
                data={lista}
                keyExtractor={(item) => item.idAsignatura.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.nombre} - {item.cantidadhoras} hrs (Estado: {item.estado})</Text>
                        <View style={styles.buttonGroup}>
                            <Button title="Editar" onPress={() => editar(item)} />
                            <Button title="Eliminar" onPress={() => eliminar(item.idAsignatura)} />
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
    item: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    buttonGroup: { flexDirection: 'row', gap: 10 },
});