import React from 'react';
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
	// { name: 8, start: 810, amount: 85 }, nao funciona com a pokeapi
];
let arrayGen = [];

const InGame = ({ navigation }) => {
	const route = useRoute();
	const genChoosed = route.params.gen;

	const imageBg = {
		uri:
			'https://upload.wikimedia.org/wikipedia/commons/b/b3/Park_Sielecki_w_Warszawie_2019.jpg',
	};

	const sprite = {
		uri: pokemonNewSprite,
	};

	let scoreP1 = 0;
	let scoreP2 = 0;
	// quantidade de pokemons a serem sorteados
	let pokemonTotalMax = 20;
	let pokemonNewName = 'Abra';
	let pokemonNewSprite =
		'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';
	let currentPlayer = 'PlayerTwo';
	// 20s, tempo do intervalo para gerar novo pokemon em milisegundos
	let intervalTime = 20000;
	// setInterval para gerar novos pk
	var newPokemonInterval;

	function startGame() {
		// limpar pontuação
		scoreP1 = 0;
		scoreP2 = 0;

		// preenche o array com os ids da geração escolhida
		setArray(genChoosed);

		// Gera um pokemon
		setNewPokemon();

		// Chama o loop gerador de pks
		pokemonTimer();
	}

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
			return navigation.navigate('GameOver');
		}
		// sortei um index aleatorio
		let index = random_number(0, arrayGen.length - 1);
		// armazena o valor do index sorteado
		let num = array_total[index];
		// atualizar <pokemonSprite> e <pokemonName>
		//
		//

		// remove o index sorteado do arrayGen
		arrayGen.splice(index, 1);

		// atualiza total de pokemons sorteados
		pokemonTotalMax--;
		// Atualiza currentPlayer
		if (currentPlayer == 'PlayerOne') {
			currentPlayer = 'PlayerTwo';
		} else {
			currentPlayer = 'PlayerOne';
		}
		// Dar um highlight no <ScoreText> do currentPlayer
		//
		//
	}

	const pokemonTimer = () => {
		// A cada intervalTime *20s, chama a função de gerar novo pokemon
		newPokemonInterval = setInterval(setNewPokemon, intervalTime);
	};

	const checarSearchBar = (searchBarValue) => {
		// checa se o valor do <SearchBar> é igual ao nome do <PokemonName>
		// guessPokemon deve receber um = get <PokemonName>
		let guessPokemon = 'Geodude';
		if (searchBarValue.trim().toLowerCase() == guessPokemon.name) {
			guessRight(true);
			return;
		}
		// senão estiver correto colocar vermelho translucido #8d0000cb no <PokemonBox> e remover depois de meio segundo com setTimeout(clearPKBox, 600)
	};

	const guessRight = (flag) => {
		if (flag == true) {
			pokemonHide(true);
			if (currentPlayer == 'PlayerOne') {
				scoreP1++;
				currentPlayer = 'PlayerTwo';
			} else {
				scoreP2++;
				currentPlayer = 'PlayerOne';
			}
			// mostrar o <PokemonName>, se estiver correto colocar uma background verde, senão vermelho
		}
		setTimeout(pokemonTimer, 2000);
	};

	const pokemonHide = (checar) => {
		// alterar o <PokemonName> também, hide ou visible
		return checar ? {} : { tintColor: 'black' };
	};

	let autoCompleteValue = 'Pikachu';

	const updateSearchBar = (autoCompleteValue) => {
		// atualiza SearchBar com o valor do AutoComplete
		return;
	};

	// colocar o metodo -- searchPks -- no SearchBar onChange
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
			// limpar lista de sugestões
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
					<SearchBar placeholder={'Pokemon name...'} />

					<TouchableOpacity onPress={() => updateSearchBar(autoCompleteValue)}>
						<AutoComplete>Sugestao</AutoComplete>
					</TouchableOpacity>
				</SearchBox>

				<PokemonBox>
					<PokemonSprite
						source={require('../../../assets/pokemon/25.png')}
						style={pokemonHide(true)}
					/>
				</PokemonBox>
				<PokemonName>{pokemonNewName}</PokemonName>

				<TouchableOpacity
					title="CHECAR"
					onPress={() => checarSearchBar(searchBarValue)}
				>
					<BtnStyle>
						<BtnText>CHECAR</BtnText>
					</BtnStyle>
				</TouchableOpacity>

				<ScoreBox>
					<ScoreText>SCORE</ScoreText>
					<PlayersList>
						<ScoreText>P1: {scoreP1}</ScoreText>
						<ScoreText>P2: {scoreP2}</ScoreText>
					</PlayersList>
				</ScoreBox>
			</SubContainer>
		</Container>
	);
};

export default InGame;
