import QuickActionButton from "@/components/QuickActionButton";
import { router } from "expo-router";
import { View } from "react-native";

const QuickActions = () => {
    return (
        <View className="flex-row justify-around mb-8">
            <QuickActionButton icon="map-pin" label="Unidades" onPress={() => router.push("/agendamento-segundo")} />
            <QuickActionButton icon="calendar" label="Agendar" onPress={() => router.push("/agendamento")} />
            <QuickActionButton icon="file-text" label="Resultados" onPress={() => console.log("Ver Resultados")} />
            <QuickActionButton icon="smile" label="Medix AI" onPress={() => router.push("/chatbot")} />
        </View>
    );
};

export default QuickActions;
