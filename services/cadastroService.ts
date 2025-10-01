import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";
import { CadastroFormData } from "../types/cadastroTypes"; // <-- Caminho atualizado

// Função responsável por registrar um novo usuáriom, verifica se o usuário já existe e, caso não, o salva no AsyncStorage.
export async function handleCadastro(data: CadastroFormData) {
    try {
        // Verifica se o usuário já existe
        const plainUsers = await AsyncStorage.getItem("@usersDB");
        const users = JSON.parse(plainUsers || "[]");
        const userExists = users.some((user: { email: string }) => user.email === data.email);

        if (userExists) {
            Alert.alert("Erro", "Este e-mail já está cadastrado.");
            return;
        }

        // Adiciona o novo usuário à lista e salva no AsyncStorage
        const newUser = { email: data.email, password: data.senha };
        const updatedUsers = [...users, newUser];
        await AsyncStorage.setItem("@usersDB", JSON.stringify(updatedUsers));

        Alert.alert("Sucesso!", "Sua conta foi criada. Você será redirecionado para a tela de login.", [{ text: "OK", onPress: () => router.back() }]);
    } catch (error) {
        console.error("Erro ao cadastrar o usuário:", error);
        Alert.alert("Erro", "Ocorreu um erro ao tentar cadastrar. Tente novamente.");
    }
}
