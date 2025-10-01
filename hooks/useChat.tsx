import { sendMessageToGemini } from "@/services/geminiService";
import { ChatMessage } from "@/types/chatTypes";
import { useEffect, useState } from "react";

export const useChat = () => {
    const [history, setHistory] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Efeito para iniciar a conversa com uma mensagem de boas-vindas da IA
    useEffect(() => {
        setHistory([
            {
                role: "model",
                parts: [{ text: "Olá! Sou a Medix AI, a sua assistente de saúde virtual. Como posso ajudar a tirar as suas dúvidas hoje?" }],
            },
        ]);
    }, []);

    // Função para enviar uma nova mensagem
    const handleSendMessage = async () => {
        if (!message.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            role: "user",
            parts: [{ text: message }],
        };

        // Adiciona a mensagem do usuário ao histórico localmente primeiro
        const updatedHistory = [...history, userMessage];
        setHistory(updatedHistory);
        setMessage("");
        setIsLoading(true);

        try {
            // Envia a mensagem para a API do Gemini
            const modelResponse = await sendMessageToGemini(message, updatedHistory);

            const modelMessage: ChatMessage = {
                role: "model",
                parts: [{ text: modelResponse }],
            };

            // Adiciona a resposta da IA ao histórico
            setHistory((prevHistory) => [...prevHistory, modelMessage]);
        } catch (error) {
            console.error("Falha ao obter resposta:", error);
            // Opcional: Adicionar uma mensagem de erro ao chat
            const errorMessage: ChatMessage = {
                role: "model",
                parts: [{ text: "Desculpe, ocorreu um erro. Tente novamente." }],
            };
            setHistory((prevHistory) => [...prevHistory, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        history,
        message,
        setMessage,
        isLoading,
        handleSendMessage,
    };
};
