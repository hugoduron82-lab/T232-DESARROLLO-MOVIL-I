import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useContextEstudiante } from "../providers/EstudianteProvider";
import { Estudiante } from "../modelos/Estudiante";

export default function FormularioEstudiante() {
    const { listaEstudiantes, agregarEstudiante } = useContextEstudiante();
    const [nombre, setNombre] = useState("");

    function agregar() {
        if (nombre.trim() === "") {
            Alert.alert("Error", "El nombre no puede estar vacío");
            return;
        }
        const nuevoId = (listaEstudiantes.length + 1).toString();
        const nuevoEstudiante: Estudiante = {
            id: nuevoId,
            nombre: nombre.trim(),
        };
        agregarEstudiante(nuevoEstudiante);
        setNombre("");
        Alert.alert("Éxito", `Estudiante "${nombre}" agregado`);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre del nuevo estudiante"
                value={nombre}
                onChangeText={setNombre}
            />
            <Button title="➕ Agregar Estudiante" onPress={agregar} color="#3498db" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#e0e0e0" },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 10, marginBottom: 15, fontSize: 16, backgroundColor: "#fefefe" }
});