// Importando as dependências necessárias do React Native
import React, { useState, useEffect } from 'react';
import { Alert, Text } from 'react-native';
import { createPost, getUsers } from '../services/Api'; // Importando funções de serviços
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../services/NavigationTypes'; // Importando tipos de navegação
import {
    Container,
    StyledTextInput,
    StyledButton,
    Title,
    ButtonText,
} from '../styles/StylesCreatePostScreen'; // Importando estilos

// Interface para um usuário
interface User {
    id: number;
    name: string;
    // Inclua outras propriedades do usuário conforme necessário
}

// Tipagem para a propriedade de navegação
type CreatePostNavigationProp = StackNavigationProp<RootStackParamList, 'CreatePost'>;

const CreatePostScreen = () => {
    // Definindo estados para o título, conteúdo do post e lista de usuários
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const navigation = useNavigation<CreatePostNavigationProp>();

    // Efeito para buscar os usuários ao carregar a tela
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    // Função para lidar com a criação de um novo post
    const handleCreate = async () => {
        try {
            if (users.length === 0) {
                // Verifica se há usuários disponíveis
                Alert.alert('Erro', 'Nenhum usuário disponível para atribuir como autor');
                return;
            }

            // Seleciona aleatoriamente um usuário da lista
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const userId = randomUser.id;

            // Cria um objeto de dados do post
            const postData = { title, body, userId };

            // Chama a função para criar o post
            const response = await createPost(postData);
            const newPost = { ...response.data, userName: randomUser.name };

            // Navega para a tela de posts, passando o novo post como parâmetro
            navigation.navigate('Posts', { newPost });
        } catch (error) {
            console.error(error);
        }
    };

    // Renderização da tela
    return (
        <Container>
            <Title>Novo Post</Title>
            <StyledTextInput
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
            />
            <StyledTextInput
                placeholder="Conteúdo"
                value={body}
                onChangeText={setBody}
                multiline
            />
            <StyledButton onPress={handleCreate} style={{ backgroundColor: '#633EBB' }}>
                <ButtonText>Salvar</ButtonText>
            </StyledButton>
        </Container>
    );
};

export default CreatePostScreen;
