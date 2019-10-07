const inquirer = require('inquirer');
const prompts = require('./prompts.json');
const cards = require('./cards.json');

const CARD_LIST_SIZE = cards.CARD_LIST.length;
const SUIT_LIST_SIZE = cards.SUIT_LIST.length;
const INITIAL_HAND_SIZE = 2;
const SCORE_LIMIT = 21;

const playGame = async () => {
  const startPrompt = await inquirer.prompt([prompts.START_PROMPT]);
  const currentHand = initializeHand();
  let drawAnotherCard = true;
  displayCurrentHand(currentHand);
  while(drawAnotherCard && totalScoreIsUnderLimit(currentHand)) {
    const hitPrompt = await inquirer.prompt([prompts.HIT_OR_PASS_PROMPT]);
    drawAnotherCard = hitPrompt.Hit;
    if(drawAnotherCard) {
      currentHand.push(drawCard());
      displayCurrentHand(currentHand, totalScoreIsUnderLimit(currentHand));
    }
  }

  const dealersHand = getRandomDealerHand();

  if(getScore(currentHand) === SCORE_LIMIT){
    displayDealersHand(dealersHand)
    displayFinalHand(currentHand)
    console.log("Congratulations, you win! You've hit Blackjack. We hope you had fun!");
  }
  else if(nobodyWon(currentHand, dealersHand)){
    displayDealersHand(dealersHand)
    displayFinalHand(currentHand)
    console.log("Sorry, looks like you both went over the limit. Try again next time!");
  }
  else if(playerWon(currentHand, dealersHand)){
    displayDealersHand(dealersHand)
    displayFinalHand(currentHand)
    console.log("Congratulations, you win! You had the highest score. We hope you had fun!");
  }
  else {
    displayDealersHand(dealersHand)
    displayFinalHand(currentHand)
    console.log("Sorry, you lose. Try again next time!");
  }

  const playAgain = await inquirer.prompt([prompts.PLAY_AGAIN_PROMPT]);
  if(playAgain.Yes){
    playGame()
  }
}

const nobodyWon = (playerHand, dealersHand) => {
  return getScore(dealersHand) > SCORE_LIMIT &&  getScore(playerHand) > SCORE_LIMIT;
}

const playerWon = (playerHand, dealersHand) => {
  return (getScore(playerHand) > getScore(dealersHand) || getScore(dealersHand) > SCORE_LIMIT) && getScore(playerHand) < SCORE_LIMIT;
}

const displayFinalHand = (hand) => {
  console.log(`Your final score: ${getScore(hand)}`)
}

const getRandomDealerHand = () => {
  const currentHand = initializeHand();
  if(getScore(currentHand) == SCORE_LIMIT) {
    return currentHand;
  }
  else if (getScore(currentHand) > SCORE_LIMIT) {
    return currentHand;
  }
  else {
    const DEALER_SCORE_BUFFER = Math.floor(Math.random() * 6);
    while(getScore(currentHand) < SCORE_LIMIT - DEALER_SCORE_BUFFER) {
      currentHand.push(drawCard());
    }
    return currentHand;
  }
}

const displayDealersHand = (hand) => {
  console.log(`The dealer's final score: ${getScore(hand)}`);
}

const totalScoreIsUnderLimit = (hand) => {
  return getScore(hand) < SCORE_LIMIT;
}

const displayCurrentHand = (hand, displayScore = true) => {
  console.log(`Awesome, here's your hand: ${getOutput(hand)}`);
  if(displayScore){
    console.log(`Your current score: ${getScore(hand)}`);
  }
}

const initializeHand = () => {
  const hand = [];
  for(let i = 0; i < INITIAL_HAND_SIZE; i++) {
    hand.push(drawCard());
  }
  return hand;
}

const getOutput = (hand) => {
  const cardLabels = hand.map(card => card.label);
  return cardLabels.join(", ");
}

const getScore = (hand) => {
  let score = 0;
  let numAces = 0;
  hand.forEach(card => {
    if(card.value == 11){
      numAces++;
    }
    score = score + card.value;
  });
  if(score > SCORE_LIMIT && numAces > 0){
    while(score > SCORE_LIMIT && numAces > 0){
      score = score - 10;
      numAces--;
    }
  }
  return score;
}

const drawCard = () => {
  const randomCardIndex = getRandomCardIndex();
  const randomSuitIndex = getRandomSuitIndex();
  // get a random card from the list
  const randomCard = JSON.parse(JSON.stringify(cards.CARD_LIST[randomCardIndex])); // make a deep copy of the card
  randomCard.suit = cards.SUIT_LIST[randomSuitIndex].label;
  randomCard.label = randomCard.label + randomCard.suit;
  return randomCard;
}

const getRandomCardIndex = () => {
  return Math.floor(Math.random() * CARD_LIST_SIZE);
}

const getRandomSuitIndex = () => {
  return Math.floor(Math.random() * SUIT_LIST_SIZE);
}

playGame()
