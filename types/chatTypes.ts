// Estrutura de uma mensagem na conversa com o chatbot
export type ChatMessage = {
    role: "user" | "model";
    parts: { text: string }[];
};
