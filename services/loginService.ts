import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { LoginFormData, StoredUser } from "../types/loginTypes";

export async function handleLogin(data: LoginFormData, router: ReturnType<typeof useRouter>) {
    const { email, password } = data;
    const plainUsers = await AsyncStorage.getItem("@usersDB");
    const users: StoredUser[] = JSON.parse(plainUsers || "[]");

    // Buscando o usuário na lista
    const user = users.find((item) => item.email === email && item.password === password);

    if (user) {
        // Se o usuário for encontrado salva os dados para a home usar
        await AsyncStorage.setItem("@currentUser", JSON.stringify(user));
        router.replace("/home");
    } else {
        Alert.alert("Erro de Login", "Usuário ou senha inválidos.");
    }
}
