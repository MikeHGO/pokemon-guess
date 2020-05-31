import React, { Component, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity, Image } from 'react-native';
import {
	Container,
	SearchBar,
	SubContainer,
	BtnStyle,
	BtnText,
	SearchBox,
	AutoComplete,
	ScoreBox,
	ScoreText,
	PlayersList,
	PokemonBox,
	PokemonSprite,
	PokemonName,
} from './styles';

const generation = [
	// Lista de gerações pokémon
	{ name: 1, start: 1, amount: 151 },
	{ name: 2, start: 152, amount: 100 },
	{ name: 3, start: 252, amount: 135 },
	{ name: 4, start: 387, amount: 107 },
	{ name: 5, start: 494, amount: 156 },
	{ name: 6, start: 650, amount: 72 },
	{ name: 7, start: 722, amount: 80 },
];
let arrayGen = [];

const InGame = ({ navigation }) => {
	const route = useRoute();
	const genChoosed = route.params.gen;

	const imageBg = {
		uri:
			'https://upload.wikimedia.org/wikipedia/commons/b/b3/Park_Sielecki_w_Warszawie_2019.jpg',
	};

	// useState para atualizar dinamicamente a tela, styles...
	const [searchBarValue, setInputText] = useState('');
	const [scoreP1Value, setScoreP1Value] = useState(0);
	const [scoreP2Value, setScoreP2Value] = useState(0);
	const [pokemonSpriteValue, setpokemonSpriteValue] = useState(
		'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/791.png'
	);
	const [pokemonNameValue, setPokemonNameValue] = useState('ditto');
	const [pokemonSpriteVisible, setPokemonSpriteVisible] = useState({
		tintColor: 'black',
		width: 300,
		height: 300,
	});
	const [pokemonNameVisible, setPokemonNameVisible] = useState({
		color: 'transparent',
	});

	const [pokemonBoxColor, setPokemonBoxColor] = useState({
		backgroundColor: '#f5f5f580',
	});

	const [p1Color, setP1Color] = useState({
		backgroundColor: 'transparent',
	});

	const [p2Color, setP2Color] = useState({
		backgroundColor: 'transparent',
	});

	const pkBoxColorWhite = { backgroundColor: '#f5f5f580' };
	const pkBoxColorRed = { backgroundColor: '#8d000083' };

	const pkSpriteVisible = { width: 300, height: 300 };
	const pkSpriteHide = { tintColor: 'black', width: 300, height: 300 };

	const pkNameVisible = { color: 'white' };
	const pkNameHide = { color: 'transparent' };

	const scoreColorActive = { backgroundColor: '#a5602085' };
	const scoreColorNone = { backgroundColor: 'transparent' };

	let btnFlag = false;

	// quantidade de pokemons a serem sorteados
	let pokemonTotalMax = 20;

	// jogador atual
	let currentPlayer = 'PlayerTwo';

	// 20s, tempo do intervalo para gerar novo pokemon em milisegundos
	let intervalTime = 20000;

	function startGame() {
		// limpar pontuação
		setScoreP1Value(0);
		setScoreP2Value(0);

		arrayGen = [];
		// preenche o array com os ids da geração escolhida
		setArray(genChoosed);

		// Gera um pokemon
		setNewPokemon();

		// Chama o loop gerador de pks
		pokemonTimer();
	}

	// gera numero aleatorio no intervalo
	function random_number(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	function setArray(genChoosed) {
		// INICIO E TOTAL DE POKEMON DA GERACAO ESCOLHIDA <<<
		let inicio = generation[gen].start;
		let qtd = generation[gen].amount;

		// preenche o arrayGen com os IDs da geracao escolhida
		for (let index = 0; index < qtd; index++) {
			arrayGen[index] = inicio;
			inicio++;
		}
	}

	function setNewPokemon() {
		// verificar se todos os pokemons já foram sorteados
		if (arrayGen.length == 0 || pokemonTotalMax == 0) {
			// tela de final com o jogador vencedor e botao para retornar pra tela inicial. edit: feito
			clearInterval(pokemonTimer);
			return setTimeout(() => {
				navigation.navigate('GameOver', { scoreP1Value, scoreP2Value });
			}, 4000);
		}

		// sortei um index aleatorio
		let index = random_number(0, arrayGen.length - 1);

		// armazena o valor do index sorteado
		let num = arrayGen[index];

		// esconde o sprite e o nome
		setPokemonSpriteVisible(pkSpriteHide);
		setPokemonNameVisible(pkNameHide);

		// atualiza o sprite e o nome
		setPokemonNameValue('Abra');
		setpokemonSpriteValue('https://....');

		// remove o index sorteado do arrayGen
		arrayGen.splice(index, 1);

		// atualiza total de pokemons sorteados
		pokemonTotalMax--;

		// Atualiza currentPlayer
		if (currentPlayer == 'PlayerOne') {
			currentPlayer = 'PlayerTwo';
			setP2Color(scoreColorActive);
			setP1Color(scoreColorNone);
		} else {
			currentPlayer = 'PlayerOne';
			setP1Color(scoreColorActive);
			setP2Color(scoreColorNone);
		}

		// ativa o Check Btn
		btnFlag = false;
	}

	const pokemonTimer = () => {
		// A cada intervalTime *20s, chama a função de gerar novo pokemon
		newPokemonInterval = setInterval(setNewPokemon, intervalTime);
	};

	const checkSearchBar = () => {
		// impede multiplas ativações
		if (btnFlag) {
			return;
		}
		// checa se o valor do <SearchBar> é igual ao nome do <PokemonName>
		if (searchBarValue.trim().toLowerCase() == pokemonNameValue) {
			// controle de ativações
			btnFlag = true;
			return guessRight(true);
		}

		// muda o backgroundo do pokemon box para sinalizar erro
		setPokemonBoxColor(pkBoxColorRed);
		setTimeout(() => {
			setPokemonBoxColor(pkBoxColorWhite);
		}, 600);
	};

	const guessRight = (flag) => {
		if (flag == true) {
			// mostra nome do pokemon e o sprite
			setPokemonSpriteVisible(pkSpriteVisible);
			setPokemonNameVisible(pkNameVisible);
			// atualiza as pontuacoes
			if (currentPlayer == 'PlayerOne') {
				setScoreP1Value((prevScore) => prevScore + 1);
				// currentPlayer = 'PlayerTwo';
			} else {
				setScoreP2Value((prevScore) => prevScore + 1);
				// currentPlayer = 'PlayerOne';
			}
		}

		// verificar se todos os pokemons já foram sorteados
		if (arrayGen.length == 0 || pokemonTotalMax == 0) {
			// tela de final com o jogador vencedor e botao para retornar pra tela inicial. edit: feito
			clearInterval(pokemonTimer);
			return setTimeout(() => {
				navigation.navigate('GameOver', { scoreP1Value, scoreP2Value });
			}, 4000);
		}

		setTimeout(pokemonTimer, 4000);
	};

	// Sugestões na SearchBar com autocomplete onClick
	// obs: já testado no js web, mas não implementado no React Native

	let autoCompleteValue = 'Pikachu';

	const updateSearchBar = (autoCompleteValue) => {
		// atualiza SearchBar com o valor do AutoComplete
		// setInputText(autoCompleteValue);
		return;
	};

	// colocar o metodo -- searchPks -- no SearchBar onChange pra atualizar as sugestões
	const searchPks = async (searchText) => {
		// searchText = SearchBar value, gera uma lista com sugestões de nomes de pokemons

		// const res = await fetch("../data/pokemonsJson.json");
		// const pokemonsJson = await res.json();
		const pokemonsJson = [];

		// Encontra sugestoes que batem com o inicio do texto do input
		let matches = pokemonsJson.filter((pokemon) => {
			const regex = new RegExp(`^${searchText}`, 'gi');
			return pokemon.name.match(regex);
		});

		if (searchText.length === 0) {
			matches = [];
			// limpar caixa de sugestões <AutoCompleteBox> = ``;
		}
		outputAutoComplete(matches);
	};

	// Atualiza o searchBox com sugestoes
	const outputAutoComplete = (matches) => {
		if (matches.length > 0) {
			const autoComplete = matches
				.map(
					(match) => `
			<TouchableOpacity onPress={() => updateSearchBar(autoCompleteValue)}>
				<AutoComplete>${match.name}</AutoComplete>
			</TouchableOpacity>
			`
				)
				.join('');
			// inserir matchList no SearchBox
			// matchList.innerHTML = autoComplete;
		}
	};

	return (
		<Container source={imageBg} style={{ resizeMode: 'cover' }}>
			<SubContainer>
				<SearchBox>
					<SearchBar
						placeholder={'Pokemon name...'}
						onChangeText={(searchBarValue) => setInputText(searchBarValue)}
						defaultValue={searchBarValue}
					/>

					<TouchableOpacity onPress={() => updateSearchBar(autoCompleteValue)}>
						<AutoComplete>Sugestao</AutoComplete>
					</TouchableOpacity>
				</SearchBox>

				<PokemonBox style={pokemonBoxColor}>
					<PokemonSprite
						source={{ uri: pokemonSpriteValue }}
						style={pokemonSpriteVisible}
					/>
				</PokemonBox>
				<PokemonName style={pokemonNameVisible}>{pokemonNameValue}</PokemonName>

				<TouchableOpacity title="CHECAR" onPress={() => checkSearchBar()}>
					<BtnStyle>
						<BtnText>CHECK</BtnText>
					</BtnStyle>
				</TouchableOpacity>

				<ScoreBox>
					<ScoreText>SCORE</ScoreText>
					<PlayersList>
						<ScoreText style={p1Color}>P1: {scoreP1Value}</ScoreText>
						<ScoreText style={p2Color}>P2: {scoreP2Value}</ScoreText>
					</PlayersList>
				</ScoreBox>
			</SubContainer>
		</Container>
	);
};

export default InGame;
