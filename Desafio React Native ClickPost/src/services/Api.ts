import axios from 'axios';

// URL base da API JSONPlaceholder
const baseURL = 'https://jsonplaceholder.typicode.com';

// Cria uma instância do axios com a URL base da API
const api = axios.create({ baseURL });

// Tipos para post e usuário
interface PostData {
  userId: number;
  title: string;
  body: string;
}

interface UserData {
  id: number;
  name: string;
  // outros campos conforme necessário
}

// Função para obter todos os posts com tratamento de erros
export const getPosts = async () => {
    try {
        return await api.get('/posts');
    } catch (error) {
        console.error("Erro ao obter posts:", error);
        throw error;
    }
};

// Função para obter um post específico pelo ID com tratamento de erros
export const getPost = async (postId: number) => {
    try {
        return await api.get(`/posts/${postId}`);
    } catch (error) {
        console.error(`Erro ao obter o post ${postId}:`, error);
        throw error;
    }
};

// Função para criar um novo post com tipagem mais forte
export const createPost = async (postData: PostData) => {
    try {
        return await api.post('/posts', postData);
    } catch (error) {
        console.error("Erro ao criar post:", error);
        throw error;
    }
};

// Função para atualizar um post existente com tipagem mais forte
export const updatePost = async (postId: number, postData: PostData) => {
    try {
        return await api.put(`/posts/${postId}`, postData);
    } catch (error) {
        console.error(`Erro ao atualizar o post ${postId}:`, error);
        throw error;
    }
};

// Função para deletar um post pelo ID com tratamento de erros
export const deletePost = async (postId: number) => {
    try {
        return await api.delete(`/posts/${postId}`);
    } catch (error) {
        console.error(`Erro ao deletar o post ${postId}:`, error);
        throw error;
    }
};

// Função para obter detalhes do usuário pelo ID com tratamento de erros
export const getUserDetails = async (userId: number) => {
    try {
        return await api.get(`/users/${userId}`);
    } catch (error) {
        console.error(`Erro ao obter detalhes do usuário ${userId}:`, error);
        throw error;
    }
};

// Função para obter todos os usuários com tratamento de erros
export const getUsers = async () => {
    try {
        return await api.get('/users');
    } catch (error) {
        console.error("Erro ao obter usuários:", error);
        throw error;
    }
};

// Exporta a instância do Axios para uso direto, se necessário
export default api;
