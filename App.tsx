import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import EstudianteProvider from "./providers/EstudianteProvider";
import ListaEstudiante from "./components/ListaEstudiante";
import FormularioEstudiante from "./components/FormularioEstudiante";

export default function App() {
    return (
        <EstudianteProvider>
            <SafeAreaView style={styles.container}>
                <ListaEstudiante />
                <FormularioEstudiante />
            </SafeAreaView>
        </EstudianteProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f9fa" }
});