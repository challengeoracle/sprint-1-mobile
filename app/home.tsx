import AppointmentCard from "@/components/home/AppointmentCard";
import HomeHeader from "@/components/home/HomeHeader";
import NearbyUnits from "@/components/home/NearbyUnits";
import ProfileCard from "@/components/home/ProfileCard";
import QuickActions from "@/components/home/QuickActions";
import UserData from "@/types/loginTypes";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SearchBar } from "react-native-screens";

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
        <ScrollView className="flex-1 pb-32">
            <View className="p-6">
                {/* Chamando os componentes para cada um dos campos */}
                <HomeHeader user={user} />
                <SearchBar />
                <QuickActions />
                <ProfileCard user={user} />
                <AppointmentCard />
                <NearbyUnits />

                {/* Botão de logout */}
                <TouchableOpacity onPress={handleLogout} className="flex-row justify-center items-center gap-2 p-3">
                    <Feather name="log-out" size={18} color="#cc3333" />
                    <Text className="text-base font-semibold text-red-600">Sair da conta</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Home;
