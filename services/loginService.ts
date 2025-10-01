import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { LoginFormData, StoredUser } from "../types/loginTypes";

// Função para gerenciar a lógica de autenticação do usuário

export async function handleLogin(data: LoginFormData, router: ReturnType<typeof useRouter>) {
    const { email, password } = data;
    const plainUsers = await AsyncStorage.getItem("@usersDB");
    const users: StoredUser[] = JSON.parse(plainUsers || "[]");

    // Bloco para depuração que mostra todos os usuários no storage
    const userListMessage = users.length > 0 ? users.map((u) => `Email: ${u.email}\nSenha: ${u.password}`).join("\n\n") : "Nenhum usuário cadastrado no AsyncStorage.";

    Alert.alert("Usuários Salvos (Depuração)", userListMessage);

    // Lógica de login - busca no
    const user = users.find((item) => item.email === email && item.password === password);

    if (user) {
        router.replace("/home");
    } else {
        Alert.alert("Erro de Login", "Usuário ou senha inválidos. Verifique os dados no alerta de depuração.");
    }
}
