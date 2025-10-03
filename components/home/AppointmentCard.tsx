import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

const AppointmentCard = () => {
    return (
        <View className="mb-10">
            <Text className="text-lg font-bold text-medix-800 mb-4">Próximo Agendamento</Text>
            <View className="bg-medix-600 rounded-lg p-5 shadow-lg">
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
        </View>
    );
};

export default AppointmentCard;
