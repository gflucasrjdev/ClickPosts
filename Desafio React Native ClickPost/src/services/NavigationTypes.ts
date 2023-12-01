// No arquivo onde RootStackParamList está definido

export type RootStackParamList = {
  Posts: { newPost?: Post };
  CreatePost: undefined;
  UserScreen: { userId: number }; // Adicione esta linha
};

// A interface Post permanece como você definiu
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}




