import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

// Define a estrutura de dados de uma notificação
export type NotificationType = {
    id: string;
    icon: keyof typeof Feather.glyphMap;
    title: string;
    message: string;
    time: string;
    read: boolean;
};

type NotificationItemProps = {
    notification: NotificationType;
};

/**
 * Componente para exibir um único item na lista de notificações.
 */
const NotificationItem = ({ notification }: NotificationItemProps) => {
    // Define a cor de fundo com base no estado de leitura
    const backgroundColor = notification.read ? "bg-white" : "bg-medix-100";

    return (
        <TouchableOpacity className={`flex-row items-center p-4 rounded-lg shadow-sm ${backgroundColor}`}>
            {/* Ícone da Notificação */}
            <View className="mr-4 bg-medix-200 p-3 rounded-full">
                <Feather name={notification.icon} size={24} color="#008080" />
            </View>

            {/* Conteúdo da Notificação */}
            <View className="flex-1">
                <Text className="text-base font-bold text-medix-900">{notification.title}</Text>
                <Text className="text-sm text-medix-700 mt-1">{notification.message}</Text>
            </View>

            {/* Tempo e Indicador de Não Lido */}
            <View className="items-end ml-2">
                <Text className="text-xs text-medix-500 mb-2">{notification.time}</Text>
                {!notification.read && <View className="w-3 h-3 bg-medix-600 rounded-full" />}
            </View>
        </TouchableOpacity>
    );
};

export default NotificationItem;
