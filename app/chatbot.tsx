import { useChat } from "@/hooks/useChat";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

const ChatScreen = () => {
    // Chamando as informações do chat do hook
    const { history, message, setMessage, isLoading, handleSendMessage } = useChat();
    const flatListRef = useRef<FlatList>(null);

    // Efeito de auto-scroll
    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [history]);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1" keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
            {/* Cabeçalho */}
            <View className="flex-row items-center p-4 border-b border-medix-200 bg-white">
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="chevron-left" size={28} color="#004D4D" />
                </TouchableOpacity>
                <View className="flex-1 items-center">
                    <Text className="text-xl font-bold text-medix-900">Assistente Virtual</Text>
                </View>
                <View className="w-7" />
            </View>

            {/* Disclaimer */}
            <View className="bg-yellow-100 p-3 mx-4 mt-4 rounded-lg">
                <Text className="text-yellow-800 text-xs text-center">Esta é uma IA informativa. As suas respostas não substituem uma consulta médica. Em caso de emergência, procure um hospital.</Text>
            </View>

            {/* Lista de mensagens */}
            <FlatList
                ref={flatListRef}
                data={history}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{ padding: 16, gap: 12 }}
                renderItem={({ item }) => (
                    <View className={`flex-row ${item.role === "user" ? "justify-end" : "justify-start"}`}>
                        <View className={`p-3 rounded-2xl max-w-[80%] ${item.role === "user" ? "bg-medix-600 rounded-br-none" : "bg-white border border-medix-200 rounded-bl-none"}`}>
                            <Text className={item.role === "user" ? "text-white" : "text-medix-900"}>{item.parts[0].text}</Text>
                        </View>
                    </View>
                )}
                ListFooterComponent={isLoading ? <ActivityIndicator size="small" color="#008080" className="mt-4" /> : null}
            />

            {/* Campo de texto */}
            <View className="flex-row items-center p-4 border-t border-medix-200 bg-white">
                <TextInput value={message} onChangeText={setMessage} placeholder="Escreva a sua dúvida..." className="flex-1 bg-medix-100 rounded-full px-4 py-3 mr-3" placeholderTextColor="#7fbfbf" editable={!isLoading} />
                <TouchableOpacity onPress={handleSendMessage} disabled={isLoading || !message.trim()} className="bg-medix-600 p-3 rounded-full">
                    <Feather name="arrow-up" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChatScreen;
