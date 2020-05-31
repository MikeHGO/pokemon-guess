import styled from 'styled-components';

export const Container = styled.ImageBackground`
	flex: 1;
`;

export const SearchBar = styled.TextInput`
	height: 50px;
	padding-left: 15px;
	background-color: rgba(27, 27, 27, 0.9);
	color: white;
	font-size: 20px;
`;

export const SubContainer = styled.View`
	flex: 1;
	background-color: rgba(27, 27, 27, 0.6);
`;

export const BtnStyle = styled.View`
	margin-left: auto;
	margin-right: auto;
	margin-top: 30px;
	width: 115px;
	height: 50px;
	align-items: center;
	justify-content: center;
	background-color: rgba(224, 120, 0, 0.9);
	border-radius: 4px;
`;

export const BtnText = styled.Text`
	color: white;
	font-size: 25px;
	font-weight: 900;
`;

export const SearchBox = styled.View`
	margin-top: 100px;
	margin-left: 20px;
	margin-right: 20px;
	border-radius: 5px;
`;

export const AutoComplete = styled.Text`
	background-color: rgba(27, 27, 27, 0.9);
	color: white;
	font-size: 20px;
	padding-left: 15px;
	text-decoration: underline;
`;

export const PokemonBox = styled.View`
	margin-left: auto;
	margin-right: auto;
	align-items: center;
	justify-content: center;
	background-color: rgba(245, 245, 245, 0.5);
	width: 296px;
	height: 296px;
	border-radius: 4px;
	margin-top: 120px;
`;
// filter: contrast(0%) brightness(50%); INVALIDO <<<
export const PokemonSprite = styled.Image``;

export const PokemonName = styled.Text`
	color: white;
	font-size: 30px;
	text-align: center;
	font-weight: 900;
	margin-top: 10px;
`;

export const ScoreBox = styled.View`
	margin-top: 10px;
`;

export const PlayersList = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 30px;
`;

export const ScoreText = styled.Text`
	color: white;
	font-size: 20px;
	text-align: center;
	font-weight: 900;
	padding-left: 20px;
	padding-right: 20px;
	border-radius: 4px;
`;
