import styled from 'styled-components';

export const Container = styled.ImageBackground`
	flex: 1;
`;

export const SubContainer = styled.View`
	flex: 1;
	background-color: rgba(27, 27, 27, 0.6);
`;

export const Title = styled.Text`
	margin-top: 250px;
	color: white;
	font-size: 70px;
	text-align: center;
	letter-spacing: 3px;
	font-weight: 900;
`;

export const BtnStyle = styled.View`
	margin-left: auto;
	margin-right: auto;
	margin-top: 50px;
	width: 150px;
	height: 70px;
	align-items: center;
	justify-content: center;
	background-color: rgba(224, 120, 0, 0.9);
	border-radius: 4px;
`;

export const BtnText = styled.Text`
	color: white;
	font-size: 40px;
	font-weight: 900;
`;
