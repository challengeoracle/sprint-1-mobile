import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';

import Header from './components/header'; 
const Cadastro = () => {
    // gerenciar os campos do formulário
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        cpf: '',
        email: '',
        senha: '',
        dataNascimento: '',
    });

    /**
     * Função genérica para atualizar o estado do formulário.
     * @param field O nome do campo a ser atualizado.
     * @param value O novo valor do campo.
     */
    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

    /**
     * Função chamada ao pressionar o botão de cadastro.
     * validação simples de campos e simula chamar uma API (faremos isso na sprint 2 com a API de java)
     */
    const handleCadastro = () => {
        // Validação simples: verifica se algum campo está vazio
        for (const [key, value] of Object.entries(formData)) {
            if (value.trim() === '') {
                Alert.alert('Erro', `O campo "${key}" é obrigatório.`);
                return; // Interrompe a execução se um campo estiver vazio
            }
        }

        // simulando a api
        console.log('Dados do formulário prontos para envio:', formData);
        
        // Simulação de chamada de API para as tabelas USUARIO e PACIENTE
        Alert.alert(
            'Sucesso!',
            'Sua conta foi criada. Você será redirecionado para a tela de login.',
            [
                { text: 'OK', onPress: () => router.back() } // Volta para a tela anterior (login) PRECISA configurar a rota correta
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-medix-50">
            <View className="flex-1 bg-medix-100">
                <Header 
                    title="Cadastro"
                    leftIconName="arrow-left" // Ícone de "voltar"
                    onPressLeft={() => router.back()} // Função para voltar
                />

                
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="p-6 gap-4">
                        <Text className="text-2xl font-bold text-medix-800 mb-4">Crie sua conta</Text>

                        {/* Nome completo */}
                        <View>
                            <Text className="text-base text-medix-700 mb-1 font-semibold">Nome Completo</Text>
                            <TextInput
                                className="bg-white border border-medix-200 rounded-lg p-3 text-base"
                                placeholder="Digite seu nome completo"
                                value={formData.nomeCompleto}
                                onChangeText={(text) => handleInputChange('nomeCompleto', text)}
                            />
                        </View>

                        {/* CPF */}
                        <View>
                            <Text className="text-base text-medix-700 mb-1 font-semibold">CPF</Text>
                            <TextInput
                                className="bg-white border border-medix-200 rounded-lg p-3 text-base"
                                placeholder="000.000.000-00"
                                keyboardType="numeric" // Facilita a digitação
                                value={formData.cpf}
                                onChangeText={(text) => handleInputChange('cpf', text)}
                                
                            />
                        </View>

                        {/* E-mail */}
                        <View>
                            <Text className="text-base text-medix-700 mb-1 font-semibold">E-mail</Text>
                            <TextInput
                                className="bg-white border border-medix-200 rounded-lg p-3 text-base"
                                placeholder="seuemail@exemplo.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={formData.email}
                                onChangeText={(text) => handleInputChange('email', text)}
                            />
                        </View>

                        {/* Senha */}
                        <View>
                            <Text className="text-base text-medix-700 mb-1 font-semibold">Senha</Text>
                            <TextInput
                                className="bg-white border border-medix-200 rounded-lg p-3 text-base"
                                placeholder="Crie uma senha segura"
                                secureTextEntry // esconde a senha
                                value={formData.senha}
                                onChangeText={(text) => handleInputChange('senha', text)}
                            />
                        </View>

                        {/* Data de Nascimento */}
                        <View>
                            <Text className="text-base text-medix-700 mb-1 font-semibold">Data de Nascimento</Text>
                            <TextInput
                                className="bg-white border border-medix-200 rounded-lg p-3 text-base"
                                placeholder="DD/MM/AAAA"
                                value={formData.dataNascimento}
                                onChangeText={(text) => handleInputChange('dataNascimento', text)}
                                // utilizar DatePicker pro design
                            />
                        </View>

                        {/* Botão de Cadastro */}
                        <TouchableOpacity
                            className="bg-medix-600 p-4 rounded-lg mt-4 items-center"
                            activeOpacity={0.8}
                            onPress={handleCadastro}
                        >
                            <Text className="text-white text-lg font-bold">Confirmar Cadastro</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Cadastro;