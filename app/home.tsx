import QuickActionButton from "@/components/QuickActionButton";
import UnitCard from "@/components/UnitCard";
import UserData from "@/types/loginTypes";
import { calculateAge, getInitials, maskCPF } from "@/util/auxiliarFunctions";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const Home = () => {
    // Estado para armazenar as informações do usuário buscado no AsyncStorage
    const [user, setUser] = useState<Partial<UserData>>({ nomeCompleto: "Usuário" });
    // Estado para controlar a visibilidade do CPF
    const [isCpfVisible, setIsCpfVisible] = useState(false);

    // JOGAR ISSO AQUI PARA UM HOMESERVICE.TS DEPOIS!!!!!
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUserJson = await AsyncStorage.getItem("@currentUser");
                if (currentUserJson) {
                    setUser(JSON.parse(currentUserJson));
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("@currentUser");
            router.replace("/");
        } catch (e) {
            console.error("Erro ao fazer logout:", e);
            Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
            <View className="p-6">
                {/* Cabeçalho com saudação e avatar do usuário */}
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-xl text-medix-700">Bem-vindo(a),</Text>
                        <Text className="text-2xl font-bold text-medix-900">{user.nomeCompleto?.split(" ")[0]}</Text>
                    </View>
                    <TouchableOpacity onPress={() => console.log("Abrir Perfil")} className="w-12 h-12 bg-medix-600 rounded-full justify-center items-center">
                        <Text className="text-white font-bold text-lg">{getInitials(user.nomeCompleto || "")}</Text>
                    </TouchableOpacity>
                </View>

                {/* Barra de busca - ainda não implementada */}
                <View className="bg-white flex-row items-center rounded-lg p-3 border border-medix-200 shadow-sm mb-6">
                    <Feather name="search" size={20} color="#006666" />
                    <TextInput placeholder="Buscar hospitais, exames..." className="flex-1 ml-3 text-base" placeholderTextColor="#7fbfbf" />
                </View>

                {/* Ações rápidas do aplicativo - ainda não implementado */}
                <View className="flex-row justify-around mb-8">
                    <QuickActionButton icon="map-pin" label="Unidades" onPress={() => console.log("Buscar Unidades")} />
                    <QuickActionButton icon="calendar" label="Agendar" onPress={() => router.push("/AgendamentoOnline")} />
                    <QuickActionButton icon="file-text" label="Resultados" onPress={() => console.log("Ver Resultados")} />
                    <QuickActionButton icon="smile" label="Medix AI" onPress={() => router.replace("/chatbot")} />
                </View>

                {/* Card de resumo do perfil do usuário - ainda não implementado, talvez mudar isso*/}
                <Text className="text-lg font-bold text-medix-800 mb-4">Meu Perfil</Text>
                <View className="bg-white rounded-lg p-4 shadow-sm mb-8">
                    <View className="flex-row items-center border-b border-gray-200 pb-3">
                        <Feather name="user" size={20} color="#008080" />
                        <View className="ml-4">
                            <Text className="text-base text-medix-900 font-bold">{user.nomeCompleto}</Text>
                            <Text className="text-sm text-medix-700">{user.email}</Text>
                        </View>
                    </View>
                    <View className="flex-row justify-around pt-3">
                        <View className="items-center">
                            <Text className="text-sm text-medix-700">Idade</Text>
                            <Text className="text-base font-semibold text-medix-800">{calculateAge(user.dataNascimento || "")}</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-sm text-medix-700">CPF</Text>
                            <View className="flex-row items-center gap-2">
                                <Text className="text-base font-semibold text-medix-800">{isCpfVisible ? user.cpf : maskCPF(user.cpf || "")}</Text>
                                <TouchableOpacity onPress={() => setIsCpfVisible(!isCpfVisible)}>
                                    <Feather name={isCpfVisible ? "eye-off" : "eye"} size={20} color="#008080" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Lembrete do próximo agendamento, talvez mudar isso  */}
                <Text className="text-lg font-bold text-medix-800 mb-4">Próximo Agendamento</Text>
                <View className="bg-medix-600 rounded-lg p-5 shadow-lg mb-10">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-white font-bold text-lg">Consulta Cardiológica</Text>
                        <Text className="text-medix-100 text-sm">Hoje</Text>
                    </View>
                    <View className="gap-2">
                        <View className="flex-row items-center">
                            <Feather name="user" size={16} color="#cce5e5" />
                            <Text className="text-white ml-3">Dr. Carlos Andrade</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Feather name="clock" size={16} color="#cce5e5" />
                            <Text className="text-white ml-3">14:30</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Feather name="map-pin" size={16} color="#cce5e5" />
                            <Text className="text-white ml-3">Hospital Medix - Sala 203</Text>
                        </View>
                    </View>
                </View>

                {/* Lista de clínicas e hospitais próximos, talvez mudar isso, ou então remover :) */}
                <Text className="text-lg font-bold text-medix-800 mb-4">Unidades Próximas</Text>
                <View className="gap-3 mb-8">
                    <UnitCard name="Hospital Central de Caieiras" address="Av. Paulicéia, 230" type="HOSPITAL" />
                    <UnitCard name="Clínica Medix Laranjeiras" address="R. dos Pinheiros, 12" type="CLINICA" />
                    <UnitCard name="Laboratório Análises" address="Centro, Rua 7 de Setembro" type="LABORATORIO" />
                </View>

                <TouchableOpacity onPress={handleLogout} className="flex-row justify-center items-center gap-2 p-3">
                    {/* Botão para sair da conta */}
                    <Feather name="log-out" size={18} color="#cc3333" />
                    <Text className="text-base font-semibold text-red-600">Sair da conta</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Home;
