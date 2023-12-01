// Importações dos componentes e bibliotecas necessárias
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Image } from 'react-native';
import { FlatList, Text, TouchableOpacity, TextInput, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container, PostItem, Title, FloatingActionButtonContainer } from '../styles/StylesPostsScreen';
import { getPosts, getUserDetails } from '../services/Api';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../services/NavigationTypes';

// Definição da estrutura de dados para um post
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    authorName?: string; // Opcional, para nome do autor
    isEditing?: boolean; // Opcional, para controle de edição
}

// Tipos para a navegação e rota do componente PostsScreen
type PostsScreenNavigationProp = NavigationProp<RootStackParamList, 'Posts'>;
type PostsScreenRouteProp = RouteProp<RootStackParamList, 'Posts'>;

const PostsScreen = () => {
    // Estado para armazenar os posts
    const [posts, setPosts] = useState<Post[]>([]);

    // Hooks do React Navigation para navegação e rota
    const navigation = useNavigation<PostsScreenNavigationProp>();
    const route = useRoute<PostsScreenRouteProp>();

    // Carrega os posts quando o componente é montado
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPosts();
                setPosts(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPosts();
    }, []);

    // Adiciona um novo post quando recebido pela rota
    useEffect(() => {
        const newPost = route.params?.newPost;
        if (newPost) {
            setPosts(currentPosts => [newPost, ...currentPosts]);
        }
    }, [route.params?.newPost]);

    // useEffect para buscar e atualizar os nomes dos autores dos posts
    useEffect(() => {
        const fetchAuthorNames = async () => {
            try {
                // Cria uma cópia do estado atual de posts
                const updatedPosts = [...posts];

                // Variável para verificar se é necessário atualizar o estado
                let needsUpdate = false;

                // Busca e atualiza o nome do autor para cada post, se necessário
                for (let i = 0; i < updatedPosts.length; i++) {
                    if (!updatedPosts[i].authorName) {
                        const authorResponse = await getUserDetails(updatedPosts[i].userId);
                        updatedPosts[i].authorName = authorResponse.data.name;
                        needsUpdate = true;
                    }
                }

                // Atualiza o estado com os novos dados, se necessário
                if (needsUpdate) {
                    setPosts(updatedPosts);
                }
            } catch (error) {
                console.error(error);
            }
        };

        // Chama a função se existirem posts
        if (posts.length > 0) {
            fetchAuthorNames();
        }
    }, [posts]);

    // Função para iniciar a edição de um post
    const handleEditPost = (postId: number) => {
        setPosts(currentPosts =>
            currentPosts.map(post =>
                post.id === postId ? { ...post, isEditing: true } : post
            )
        );
    };

    // Função para deletar um post
    const handleDeletePost = (postId: number) => {
        Alert.alert(
            "Confirmar Exclusão", // Título do alerta
            "Tem certeza de que deseja excluir este post?", // Mensagem do alerta
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: () => {
                        setPosts(currentPosts => currentPosts.filter(post => post.id !== postId));
                        // Adicione um feedback para o usuário aqui se desejar
                        Alert.alert("Excluído", "O post foi excluído com sucesso.");
                    },
                    style: 'destructive' // Isso geralmente estiliza o texto de forma a indicar uma ação destrutiva
                }
            ]
        );
    };

    // Função para salvar a edição de um post
    const handleSaveEdit = (postId: number, newTitle: string, newBody: string) => {
        setPosts(currentPosts =>
            currentPosts.map(post =>
                post.id === postId
                    ? { ...post, title: newTitle, body: newBody, isEditing: false }
                    : post
            )
        );
        // Mensagem de confirmação de que o post foi salvo
        Alert.alert("Salvo", "As alterações no post foram salvas com sucesso.");
    };

    // Renderização de cada item da lista
    const renderItem = ({ item }: { item: Post }) => {
        return (
            <PostItem>
                {/* Exibindo o nome do autor e permitindo navegação para UserScreen */}
                <TouchableOpacity onPress={() => navigation.navigate('UserScreen', { userId: item.userId })}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, fontStyle: 'italic', color: '#60D3D9' }}>{item.authorName}</Text>
                </TouchableOpacity>

                {/* Ícone para entrar em modo de edição, visível apenas se não estiver editando */}
                {!item.isEditing ? (
                    <TouchableOpacity
                        onPress={() => handleEditPost(item.id)}
                        style={{
                            position: 'absolute', // Posiciona sobre o conteúdo
                            top: 10, // Espaçamento do topo
                            right: 10, // Espaçamento da direita
                        }}>
                        <Ionicons name="md-create" size={25} color="#633EBB" />
                    </TouchableOpacity>
                ) : null}

                {/* Exibição normal do post ou campos de edição */}
                {!item.isEditing ? (
                    // Exibição normal do post
                    <>
                        <Title>{item.title}</Title>
                        <Text>{item.body}</Text>
                    </>
                ) : (
                    <View>
                        {/* Campos de texto para editar o título e o corpo */}
                        <TextInput
                            value={item.title}
                            onChangeText={text => setPosts(currentPosts =>
                                currentPosts.map(post =>
                                    post.id === item.id ? { ...post, title: text } : post
                                )
                            )}
                        />
                        <TextInput
                            value={item.body}
                            onChangeText={text => setPosts(currentPosts =>
                                currentPosts.map(post =>
                                    post.id === item.id ? { ...post, body: text } : post
                                )
                            )}
                            multiline
                        />
                        {/* Ícones para salvar e excluir */}
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => handleDeletePost(item.id)}>
                                <Ionicons name="md-trash" size={30} color="#633EBB" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleSaveEdit(item.id, item.title, item.body)}>
                                <Ionicons name="md-save" size={30} color="#BDBE6E" />
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
            </PostItem>
        );
    };

    // Estrutura principal da tela
    return (
        <Container>
            {/* Inserção da logo no topo do Container, alinhada à esquerda */}
            <View style={{ alignSelf: 'flex-start', padding: 18, marginTop: -15 }}>
                <Image
                    source={require('../Image/Logo-Clicksoft.webp')} // Caminho correto da sua logo
                    resizeMode="contain"
                    style={{ width: 200, height: 50 }} // Dimensões desejadas da sua logo
                />
            </View>

            {/* Lista de posts */}
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />

            {/* Botão flutuante para adicionar um novo post */}
            <FloatingActionButtonContainer>
                <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
                    <Ionicons name="add" size={30} color="white" />
                </TouchableOpacity>
            </FloatingActionButtonContainer>
        </Container>
    );
};

export default PostsScreen;
