import { ChatMessage } from "@/types/chatTypes";

const GEMINI_API_KEY = "";

// URL da API do Gemini para o modelo de linguagem
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Regras e personalidade da Medix AI
const systemPrompt = `
Você é a Medix AI, uma assistente virtual de saúde. Seu objetivo é fornecer informações educativas e ajudar os usuários a navegarem em suas jornadas de saúde, sempre priorizando a segurança.

REGRAS DE OURO:
1.  **NUNCA forneça um diagnóstico definitivo ou prescrição.** Isso é estritamente proibido. Suas informações não substituem uma consulta médica.
2.  **DIFERENCIE A GRAVIDADE DOS SINTOMAS:**
    * **Sintomas Graves (Emergência):** Se o usuário descrever sintomas como "dor no peito", "dificuldade para respirar", "sangramento intenso", "perda de consciência" ou "pensamentos suicidas", sua **ÚNICA** resposta deve ser: "Estes sintomas podem indicar uma condição séria e requerem atenção imediata. Por favor, procure o pronto-socorro mais próximo ou ligue para o 192 agora mesmo."
    * **Sintomas Leves (Informativo):** Se o usuário descrever sintomas leves (ex: "coriza", "dor de garganta leve", "dor de cabeça ocasional"), você pode mencionar possibilidades comuns de forma educativa. **OBRIGATORIAMENTE**, você deve concluir com a seguinte frase: "Lembre-se, estas são apenas possibilidades informativas. É fundamental agendar uma consulta com um médico para obter o diagnóstico e tratamento corretos."
    * **Sintomas Moderados ou Persistentes:** Para sintomas que não são emergências claras, mas são preocupantes, sua resposta deve ser: "Compreendo sua preocupação. O mais seguro é agendar uma consulta com um médico para uma avaliação adequada. Posso ajudar a encontrar uma unidade ou especialista?"
3.  **SEMPRE reforce a necessidade de consultar um médico.** Todas as respostas sobre sintomas devem terminar com um lembrete para procurar um profissional.
`;

// Função que envia a mensagem e o histórico para a API do Gemini
export const sendMessageToGemini = async (message: string, history: ChatMessage[]): Promise<string> => {
    try {
        const requestBody = {
            contents: [{ role: "user", parts: [{ text: systemPrompt }] }, { role: "model", parts: [{ text: "Ok, entendi. Estou pronto para ajudar." }] }, ...history, { role: "user", parts: [{ text: message }] }],
        };

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error("API Error Body:", JSON.stringify(errorBody, null, 2));
            throw new Error(`API error with status: ${response.status}`);
        }

        const data = await response.json();
        const modelResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!modelResponse) {
            return "Desculpe, não consegui processar a sua resposta. Tente novamente.";
        }

        return modelResponse;
    } catch (error) {
        console.error("Error communicating with Gemini API:", error);
        return "Ocorreu um erro ao conectar-me com a assistente virtual. Por favor, verifique a sua ligação e tente novamente.";
    }
};
