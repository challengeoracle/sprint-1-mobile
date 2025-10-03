import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Tipos
type Medico = { nome: string; especialidade: string };
type Unidade = { nome: string };
type SelecaoAgendamento = {
    especialidade?: string;
    unidade?: Unidade;
    data?: string;
    horario?: string;
    medico?: Medico;
};

// Componente auxiliar de linha
const InfoRow = ({ icon, label, value }: { icon: any; label: string; value?: string }) => (
    <View>
        <Text className="text-sm text-medix-700">{label}</Text>
        <View className="flex-row items-center mt-1">
            <Feather name={icon} size={16} color="#008080" />
            <Text className="text-base text-medix-900 font-semibold ml-2">{value}</Text>
        </View>
    </View>
);

const AgendamentoOnline = () => {
    const [step, setStep] = useState(1);
    const [selecao, setSelecao] = useState<SelecaoAgendamento>({});
    const totalSteps = 5;

    // Dados mockados
    const especialidades = ["Cardiologia", "Ortopedia", "Neurologia"];
    const unidades: Unidade[] = [{ nome: "Hospital São Camilo" }, { nome: "Clínica Medix Laranjeiras" }];
    const horarios = ["09:00", "10:30", "11:00", "14:30"];
    const medicos: Medico[] = [
        { nome: "Dr. Arthur Thomas", especialidade: "Cardiologia" },
        { nome: "Dr. Davi Cavalcanti", especialidade: "Ortopedia" },
        { nome: "Dr. Mateus Lima", especialidade: "Neurologia" },
    ];

    // Funções de navegação do formulário
    const handleNextStep = (data: Partial<SelecaoAgendamento>) => {
        setSelecao((prev) => ({ ...prev, ...data }));
        setStep((prev) => prev + 1);
    };

    const handlePreviousStep = () => {
        setStep((prev) => prev - 1);
    };

    const handleConfirm = () => {
        Alert.alert("Agendamento Confirmado!", "A sua consulta foi agendada com sucesso.", [{ text: "OK", onPress: () => router.back() }]);
    };

    // Renderiza o conteúdo do passo atual
    const renderStepContent = () => {
        switch (step) {
            case 1: // Escolha da Especialidade
                return (
                    <View>
                        <Text className="text-xl font-bold text-medix-800 mb-6">Qual especialidade você deseja?</Text>
                        <View className="gap-4">
                            {especialidades.map((especialidade) => (
                                <TouchableOpacity key={especialidade} onPress={() => handleNextStep({ especialidade })} className="bg-white p-5 rounded-lg border border-medix-200 flex-row justify-between items-center">
                                    <Text className="text-lg text-medix-900">{especialidade}</Text>
                                    <Feather name="chevron-right" size={24} color="#008080" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );
            case 2: // Escolha da Unidade
                return (
                    <View>
                        <Text className="text-xl font-bold text-medix-800 mb-6">Qual unidade você deseja?</Text>
                        <View className="gap-4">
                            {unidades.map((unidade) => (
                                <TouchableOpacity key={unidade.nome} onPress={() => handleNextStep({ unidade })} className="bg-white p-5 rounded-lg border border-medix-200 flex-row justify-between items-center">
                                    <Text className="text-lg text-medix-900">{unidade.nome}</Text>
                                    <Feather name="chevron-right" size={24} color="#008080" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );
            case 3: // Escolha do Horário
                return (
                    <View>
                        <Text className="text-xl font-bold text-medix-800 mb-6">Escolha um horário disponível</Text>
                        <Text className="text-base font-semibold text-medix-700 mb-4">Hoje, 3 de Outubro</Text>
                        <View className="flex-row flex-wrap gap-3">
                            {horarios.map((horario) => (
                                <TouchableOpacity key={horario} onPress={() => handleNextStep({ data: "Hoje, 3 de Outubro", horario })} className="bg-white border border-medix-600 rounded-lg py-3 px-5">
                                    <Text className="text-medix-600 font-bold">{horario}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                );
            case 4: // Escolha do Médico
                return (
                    <View>
                        <Text className="text-xl font-bold text-medix-800 mb-6">Profissionais disponíveis</Text>
                        <Text className="text-base text-medix-700 mb-4">
                            Às {selecao.horario} em {selecao.unidade?.nome}
                        </Text>
                        <View className="gap-4">
                            {medicos
                                .filter((m) => m.especialidade === selecao.especialidade)
                                .map((medico) => (
                                    <TouchableOpacity key={medico.nome} onPress={() => handleNextStep({ medico })} className="bg-white p-4 rounded-lg border border-medix-200">
                                        <Text className="text-lg font-bold text-medix-900">{medico.nome}</Text>
                                        <Text className="text-base text-medix-700">{medico.especialidade}</Text>
                                    </TouchableOpacity>
                                ))}
                        </View>
                    </View>
                );
            case 5: // Confirmação
                return (
                    <View>
                        <Text className="text-xl font-bold text-medix-800 mb-6">Confirme o agendamento</Text>
                        <View className="bg-white p-5 rounded-lg border border-medix-200 gap-4">
                            <InfoRow icon="tag" label="Especialidade" value={selecao.especialidade} />
                            <InfoRow icon="map-pin" label="Unidade" value={selecao.unidade?.nome} />
                            <InfoRow icon="calendar" label="Data" value={selecao.data} />
                            <InfoRow icon="clock" label="Horário" value={selecao.horario} />
                            <InfoRow icon="user" label="Profissional" value={selecao.medico?.nome} />
                        </View>
                        <TouchableOpacity onPress={handleConfirm} className="bg-medix-600 p-4 rounded-lg items-center mt-8">
                            <Text className="text-white text-lg font-bold">Confirmar Agendamento</Text>
                        </TouchableOpacity>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-medix-100">
            {/* Cabeçalho */}
            <View className="flex-row items-center p-4 h-16">
                {step > 1 && (
                    <TouchableOpacity onPress={handlePreviousStep} className="p-2">
                        <Feather name="arrow-left" size={24} color="#004D4D" />
                    </TouchableOpacity>
                )}
            </View>

            <View className="px-6 pb-6 flex-1">
                {/* Indicador de progresso */}
                <View className="flex-row items-center mb-8">
                    <Text className="text-medix-700 font-semibold mr-4">
                        Passo {step} de {totalSteps}
                    </Text>
                    <View className="flex-1 h-2 bg-medix-200 rounded-full">
                        <View className="h-2 bg-medix-600 rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }} />
                    </View>
                </View>

                {/* Conteúdo principal */}
                {renderStepContent()}
            </View>
        </SafeAreaView>
    );
};

export default AgendamentoOnline;
