import PickerInput from "@/components/PickerInput";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity } from "react-native";

const Agendamento = () => {
    const [hospital, setHospital] = useState<string | undefined>();
    const [medico, setMedico] = useState<string | undefined>();
    const [especialidade, setEspecialidade] = useState<string | undefined>();
    const [modalidade, setModalidade] = useState<string | undefined>();

    // Função para confirmar o agendamento
    const handleConfirmarAgendamento = () => {
        if (!hospital || !medico || !especialidade || !modalidade) {
            Alert.alert("Campos incompletos", "Por favor, selecione todas as opções.");
            return;
        }

        Alert.alert("Agendamento Confirmado!", "Sua consulta foi agendada com sucesso.", [{ text: "OK", onPress: () => router.back() }]);
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
            <Text className="text-2xl font-bold text-medix-800 mb-6">Agendar Consulta</Text>

            {/* Seletor de Hospital */}
            <PickerInput
                label="Selecione um Hospital..."
                selectedValue={hospital}
                onValueChange={setHospital}
                items={[
                    { label: "São Camilo", value: "São Camilo" },
                    { label: "Oswaldo Cruz", value: "Oswaldo Cruz" },
                    { label: "Albert Einstein", value: "Albert Einstein" },
                ]}
            />

            {/* Seletor de Médico */}
            <PickerInput
                label="Selecione um Médico..."
                selectedValue={medico}
                onValueChange={setMedico}
                items={[
                    { label: "Arthur", value: "Arthur" },
                    { label: "Davi", value: "Davi" },
                    { label: "Matheus", value: "Matheus" },
                ]}
            />

            {/* Seletor de Especialidade */}
            <PickerInput
                label="Selecione uma Especialidade..."
                selectedValue={especialidade}
                onValueChange={setEspecialidade}
                items={[
                    { label: "Ortopedia", value: "Ortopedia" },
                    { label: "Cardiologia", value: "Cardiologia" },
                    { label: "Neurologia", value: "Neurologia" },
                ]}
            />

            {/* Seletor de Modalidade */}
            <PickerInput
                label="Selecione a Modalidade..."
                selectedValue={modalidade}
                onValueChange={setModalidade}
                items={[
                    { label: "Online", value: "Online" },
                    { label: "Presencial", value: "Presencial" },
                ]}
            />

            {/* Botão de confirmação */}
            <TouchableOpacity onPress={handleConfirmarAgendamento} className="bg-medix-600 p-4 rounded-lg items-center mt-4">
                <Text className="text-white text-lg font-bold">Confirmar Agendamento</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Agendamento;
