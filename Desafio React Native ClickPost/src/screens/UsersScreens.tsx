// Importações das bibliotecas e componentes necessários
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { getUserDetails } from '../services/Api';
import { Container, TitleText, ContentText, Row } from '../styles/StylesUsersScreens'; // Importação dos componentes estilizados
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../services/NavigationTypes';

// Definindo o tipo para a prop route
type UserScreenRouteProp = RouteProp<RootStackParamList, 'UserScreen'>;

// Definindo a estrutura do objeto User
interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

const UserScreen = ({ route }: { route: UserScreenRouteProp }) => {
    // Definindo um estado para o usuário
    const [user, setUser] = useState<User | null>(null);
    const { userId } = route.params;

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // Obtém os detalhes do usuário da API
                const response = await getUserDetails(userId);
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        // Chama a função fetchUserDetails quando userId muda
        fetchUserDetails();
    }, [userId]);

    if (!user) {
        return (
            <Container>
                <ContentText>Carregando...</ContentText>
            </Container>
        );
    }

    return (
        <ScrollView>
            <Container>
                <Row>
                    <TitleText>Nome:</TitleText>
                    <ContentText>{user.name}</ContentText>
                </Row>
                <Row>
                    <TitleText>Usuário:</TitleText>
                    <ContentText>{user.username}</ContentText>
                </Row>
                <Row>
                    <TitleText>Email:</TitleText>
                    <ContentText>{user.email}</ContentText>
                </Row>
                <TitleText>Endereço:</TitleText>
                <ContentText>Rua: {user.address.street}</ContentText>
                <ContentText>Suíte: {user.address.suite}</ContentText>
                <ContentText>Cidade: {user.address.city}</ContentText>
                <ContentText>CEP: {user.address.zipcode}</ContentText>
                <TitleText>Geo:</TitleText>
                <ContentText>Latitude: {user.address.geo.lat}</ContentText>
                <ContentText>Longitude: {user.address.geo.lng}</ContentText>
                <Row>
                    <TitleText>Telefone:</TitleText>
                    <ContentText>{user.phone}</ContentText>
                </Row>
                <Row>
                    <TitleText>Site:</TitleText>
                    <ContentText>{user.website}</ContentText>
                </Row>
                <Row>
                    <TitleText>Empresa:</TitleText>
                    <ContentText>{user.company.name}</ContentText>
                </Row>
            </Container>
        </ScrollView>
    );
};

export default UserScreen;
