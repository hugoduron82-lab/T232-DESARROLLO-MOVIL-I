import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useContextEstudiante } from "../providers/EstudianteProvider";

export default function ListaEstudiante() {
    const { listaEstudiantes } = useContextEstudiante();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Estudiantes</Text>
            <FlatList
                data={listaEstudiantes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>
                            {item.id}. {item.nombre}
                        </Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Cargando estudiantes...</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#2c3e50" },
    item: { backgroundColor: "white", padding: 15, marginVertical: 6, borderRadius: 12, elevation: 2 },
    itemText: { fontSize: 16, color: "#34495e" },
    emptyText: { textAlign: "center", marginTop: 30, fontSize: 16, color: "#7f8c8d" }
});