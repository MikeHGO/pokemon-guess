import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Title, SubContainer, BtnStyle, BtnText } from './styles';

export default function Main({ navigation }) {
	const imageBg = {
		uri:
			'https://upload.wikimedia.org/wikipedia/commons/b/b3/Park_Sielecki_w_Warszawie_2019.jpg',
	};

	return (
		<Container source={imageBg} style={styles.image}>
			<SubContainer>
				<Title>
					QUEM É{'\n'}ESSE{'\n'}POKEMON!
				</Title>

				{/* Gerações em radio */}

				<TouchableOpacity
					title="START"
					onPress={() => navigation.navigate('InGame', { gen: 1 })}
				>
					<BtnStyle>
						<BtnText>START</BtnText>
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
