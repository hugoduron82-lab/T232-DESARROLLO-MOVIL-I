import React, { useState } from 'react';
import { SafeAreaView, View, Button, StyleSheet } from 'react-native';
import AsignaturaComponent from './componentes/AsignaturaComponent';
import MaestroComponent from './componentes/MaestroComponent';

export default function App() {
    const [mostrarMaestros, setMostrarMaestros] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.toggle}>
                <Button title="Asignaturas" onPress={() => setMostrarMaestros(false)} />
                <Button title="Maestros" onPress={() => setMostrarMaestros(true)} />
            </View>
            {mostrarMaestros ? <MaestroComponent /> : <AsignaturaComponent />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    toggle: { flexDirection: 'row', justifyContent: 'space-around', padding: 12, backgroundColor: '#f0f0f0' },
});