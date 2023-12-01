import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const TitleText = styled.Text`
  font-size: 15px;
 text-transform: uppercase;
  margin-bottom: 5px;
`;

export const ContentText = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

// Adicione isso no seu arquivo StylesUsersScreens.ts
export const Row = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;
`;


