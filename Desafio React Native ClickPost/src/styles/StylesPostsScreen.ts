import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-top: 50px;
  background-color: #C0CB4B;
`;

export const PostItem = styled.View`
  background-color: #F4EBFF;
  padding: 20px;
  margin: 8px 16px;
  border-radius: 10px;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.23;
  shadow-radius: 2.62px;
`;

export const Title = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;
export const FloatingActionButtonContainer = styled.View`
  position: absolute;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  right: 20px;
  bottom: 20px;
  background-color: #633EBB;
  border-radius: 30px;
  elevation: 8;
`;