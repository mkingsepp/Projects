const startMsgElement = document.getElementById("start-message")
const containerElement = document.querySelector(".pokemon-container")
const battleScreenElement = document.querySelector(".battle-screen")
const startBtnElement = document.querySelector(".start")
const leftBtnElement = document.querySelector(".left")
const rightBtnElement = document.querySelector(".right")
const aBtnElement = document.querySelector(".a")
const bBtnElement = document.querySelector(".b")

let pokemonIndex = [0];
let isPlayerTurn = true;
let playerPokemon, computerPokemon;

const pokemons = [
    {
      number: 25,
      name: "Pikachu",
      type: "Electric",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      stats: {
        hp: 35,
        attack: 55,
        defense: 40,
        speed: 90,
      },
    },
    {
      number: 1,
      name: "Bulbasaur",
      type: "Grass",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        speed: 45,
      },
    },
    {
      number: 4,
      name: "Charmander",
      type: "Fire",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      stats: {
        hp: 39,
        attack: 52,
        defense: 43,
        speed: 65,
      },
    },
    {
      number: 7,
      name: "Squirtle",
      type: "Water",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
      stats: {
        hp: 44,
        attack: 48,
        defense: 65,
        speed: 43,
      },
    },
    {
      number: 16,
      name: "Pidgey",
      type: "Flying",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
      stats: {
        hp: 40,
        attack: 45,
        defense: 40,
        speed: 56,
      },
    },
    {
      number: 19,
      name: "Rattata",
      type: "NYC Subway Rat",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
      stats: {
        hp: 30,
        attack: 56,
        defense: 35,
        speed: 72,
      },
    },
  ];

function startGame(){
    clearStartScreen()
    renderPokemon()
    console.log('SELECT A POKEMON')
    aBtnElement.addEventListener('click',selectPokemon)
    startBtnElement.removeEventListener('click',startGame)
};


startBtnElement.addEventListener('click', startGame)

function clearStartScreen(){
    startMsgElement.remove()
    containerElement.classList.remove('hidden');
};

function renderPokemon(){
    const pokemon = pokemons[pokemonIndex]

    // Select all relevant HTML elements
  const imageElement = document.querySelector(".pokemon img");
  const nameElement = document.querySelector(".pokemon h3");
  const numberElement = document.querySelector(".pokemon p:nth-child(3)");
  const typeElement = document.querySelector(".pokemon p:nth-child(4)");
  const hpElement = document.querySelector(".pokemon-stats p:nth-child(2)");
  const attackElement = document.querySelector(".pokemon-stats p:nth-child(3)");
  const defenseElement = document.querySelector(
    ".pokemon-stats p:nth-child(4)"
  );
  const speedElement = document.querySelector(".pokemon-stats p:nth-child(5)");

  // Update each HTML element with Pokemon data
  imageElement.src = pokemon.sprite;
  imageElement.alt = pokemon.name;
  nameElement.textContent = pokemon.name;
  numberElement.textContent = `No. ${pokemon.number}`;
  typeElement.textContent = `Type: ${pokemon.type}`;
  hpElement.textContent = `HP: ${pokemon.stats.hp}`;
  attackElement.textContent = `Attack: ${pokemon.stats.attack}`;
  defenseElement.textContent = `Defense: ${pokemon.stats.defense}`;
  speedElement.textContent = `Speed: ${pokemon.stats.speed}`;
};

leftBtnElement.addEventListener('click', scrollLeft);
rightBtnElement.addEventListener('click', scrollRight);

function scrollLeft() {
    pokemonIndex--;
    if (pokemonIndex < 0) {
        pokemonIndex = pokemons.length -1;
    }
    renderPokemon();
}

function scrollRight() {
    pokemonIndex++;
    if (pokemonIndex >= pokemons.length) {
        pokemonIndex = 0;
    }
    renderPokemon();
};

function selectPokemon(){
    //disable scroll
    leftBtnElement.removeEventListener('click', scrollLeft);
    rightBtnElement.removeEventListener('click', scrollRight);

    //display confirmation reference
    console.log(`${pokemons[pokemonIndex].name} - I CHOOSE YOU!`);

    //disable click event
    aBtnElement.removeEventListener('click', selectPokemon);

    //call battle screen function
    displayBattleScreen();
};

function displayBattleScreen() {
    //set player's Pokemon
    playerPokemon = pokemons[pokemonIndex];

    //set Computer's Pokemon randomly
    computerPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];

    //set variables for player img and HP bar
    const playerImage = document.querySelector(".player img");
    const playerHpProgress = document.querySelector("#player-hp");

    //set player image and HP values
    playerImage.src = playerPokemon.sprite;
    playerImage.alt = playerPokemon.name;
    playerHpProgress.value = playerPokemon.stats.hp;
    playerHpProgress.max = playerPokemon.stats.hp;

    //set variables for computer img and HP bar
    const computerImage = document.querySelector(".computer img")
    const computerHpProgress = document.querySelector("#computer-hp")

    //set computer image and HP values
    computerImage.src = computerPokemon.sprite;
    computerImage.alt = computerPokemon.name;
    computerHpProgress.value = computerPokemon.stats.hp;
    computerHpProgress.max = computerPokemon.stats.hp;

    //hide the containerElement to remove selection screen
    containerElement.classList.add('hidden');

    //show the battleScreen
    battleScreenElement.classList.remove('hidden');

    //add event listener for A clicks for attack and B clicks for defend
    aBtnElement.addEventListener("click",function() {
      playerAction("attack");
    });
    bBtnElement.addEventListener("click",function() {
      playerAction("defend");
    });
};

function attack(targetPokemon, targetProgress, damage) {
    //subtract damage from HP
    targetPokemon.stats.hp -= damage;

    //update HP progress bar
    targetProgress.value = targetPokemon.stats.hp;

    //If HP <= 0 Pokemon is defeated. 
    //True = defeated False = Still alive
    if (targetPokemon.stats.hp <= 0) {

      console.log(targetPokemon.name + " has fainted!");

      return true;
    }

    else {
      return false;
    };
};

function playerAction(action) {
    if (isPlayerTurn = true) {
      //set computer HP variable
      const computerHpProgress = document.querySelector("#computer-hp");

      //generate random number for damage
      const damage = Math.floor(Math.random() * 11);

      if (action === "attack") {
        //attack message
        console.log(playerPokemon.name + " attacks! " + damage + " points of damage!");
        //calculate damage
        const isDefeated = attack(computerPokemon, computerHpProgress, damage);
        //if HP is 0, player wins!
        if (isDefeated) {
          console.log("The battle is over! Player wins!");
          return;
        };
      //computer takes turn if HP is not 0
      isPlayerTurn = false;
      setTimeout(computerTurn(false), 1000);
      }
      else if (action === "defend") {
        //defend message
        console.log(playerPokemon.name + " is defending!")
        //computer takes turn after 1 second doing reduced damage
        isPlayerTurn = false;
        setTimeout(computerTurn(true), 1000);
      }
    }
    else {
      return;
    };
};

//computer takes their turn
function computerTurn(defending) {
  //set variable to player HP
  const playerHpProgress = document.querySelector("#player-hp");
  let damage;

  //if no reduced damage is sent to function, generate random damage
  if (defending) {
   damage = (Math.floor(Math.random() * 11) * 0.25);
  }
  else {
   damage = Math.floor(Math.random() * 11);
  };

  //computer attacking message
  console.log(computerPokemon.name + ' attacks! ' + damage + " points of damage!");

  //check if player is defeated
  const isDefeated = attack(playerPokemon, playerHpProgress, damage);

  //if player is defeated, the battle is over
  if (isDefeated) {
    console.log("The battle is over! Computer wins!");
    return;
  };

  //switch turn back to player
  isPlayerTurn = true;

}