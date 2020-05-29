import React from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Title, SubContainer, BtnStyle, BtnText } from './styles';

export default function GameOver({ navigation }) {
	const imageBg = {
		uri:
			'https://upload.wikimedia.org/wikipedia/commons/b/b3/Park_Sielecki_w_Warszawie_2019.jpg',
	};

	const route = useRoute();
	let scoreP1 = route.params.scoreP1;
	let scoreP2 = route.params.scoreP2;
	let winner = `EMPATE!`;

	if (scoreP1 > scoreP2) {
		winner = `PLAYER{'\n'}ONE{'\n'}WIN!`;
	} else if (scoreP2 > scoreP1) {
		winner = `PLAYER{'\n'}TWO{'\n'}WIN!`;
	}

	return (
		<Container source={imageBg} style={styles.image}>
			<SubContainer>
				<Title>{winner}</Title>

				<TouchableOpacity
					title="AGAIN"
					onPress={() => navigation.navigate('Main')}
				>
					<BtnStyle>
						<BtnText>AGAIN</BtnText>
					</BtnStyle>
				</TouchableOpacity>
			</SubContainer>
		</Container>
	);
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: 'cover',
		// justifyContent: 'center',
	},
});
