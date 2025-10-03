import NotificationItem, { NotificationType } from "@/components/notification/NotificationItem";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dados mockados para a lista de notificações
const mockNotifications: NotificationType[] = [
    {
        id: "1",
        icon: "calendar",
        title: "Lembrete de Consulta",
        message: "Sua consulta com Dr. Carlos está marcada para amanhã às 14:30.",
        time: "5m atrás",
        read: false,
    },
    {
        id: "2",
        icon: "file-text",
        title: "Resultado de Exame",
        message: "Seu hemograma completo já está disponível no portal.",
        time: "2h atrás",
        read: false,
    },
    {
        id: "3",
        icon: "check-circle",
        title: "Agendamento Confirmado",
        message: "Sua consulta de Ortopedia foi confirmada para 20/10.",
        time: "1d atrás",
        read: true,
    },
    {
        id: "4",
        icon: "info",
        title: "Bem-vindo(a) ao Medix!",
        message: "Explore nossos recursos e agende sua primeira consulta.",
        time: "3d atrás",
        read: true,
    },
];

const NotificacoesScreen = () => {
    return (
        <SafeAreaView className="flex-1 bg-medix-50">
            {/* Lista de notificações */}
            <FlatList
                data={mockNotifications} // comentário só pro prettier não fazer isso um one-liner
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => <NotificationItem notification={item} />}
                ItemSeparatorComponent={() => <View className="h-3" />}
            />
        </SafeAreaView>
    );
};

export default NotificacoesScreen;
