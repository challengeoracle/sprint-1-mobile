import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";
import { CadastroFormData } from "../types/cadastroTypes";

export async function handleCadastro(data: CadastroFormData) {
    try {
        const plainUsers = await AsyncStorage.getItem("@usersDB");
        const users = JSON.parse(plainUsers || "[]");
        const userExists = users.some((user: { email: string }) => user.email === data.email);

        if (userExists) {
            Alert.alert("Erro", "Este e-mail já está cadastrado.");
            return;
        }

        // Montando um objeto newUser com as informações
        const newUser = {
            nomeCompleto: data.nomeCompleto,
            email: data.email,
            password: data.senha,
            cpf: data.cpf,
            dataNascimento: data.dataNascimento,
            telefone: data.telefone,
        };

        const updatedUsers = [...users, newUser];
        await AsyncStorage.setItem("@usersDB", JSON.stringify(updatedUsers));

        Alert.alert("Sucesso!", "Sua conta foi criada. Você será redirecionado para a tela de login.", [{ text: "OK", onPress: () => router.back() }]);
    } catch (error) {
        console.error("Erro ao cadastrar o usuário:", error);
        Alert.alert("Erro", "Ocorreu um erro ao tentar cadastrar. Tente novamente.");
    }
}
