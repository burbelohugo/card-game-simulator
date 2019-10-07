const inquirer = require('inquirer');
const prompts = require('./prompts.json');
const cards = require('./cards.json');

/**
 * Total size of all card types
 */
const CARD_LIST_SIZE = cards.CARD_LIST.length;

/**
 * Total size of all suit types
 */
const SUIT_LIST_SIZE = cards.SUIT_LIST.length;

/**
 * Initial size of a player's hand.
 */
const INITIAL_HAND_SIZE = 2;

/**
 * Score limit one must meet to achieve Blackjack.
 */
const SCORE_LIMIT = 21;


/**
 * Initialize a new game.
 */
const playGame = async () => {
  const startPrompt = await inquirer.prompt([prompts.START_PROMPT]);
  const currentHand = initializeHand();
  let drawAnotherCard = true;
  displayCurrentHand(currentHand);

  /**
   * Keep allowing the user to draw more cards until they either meet the score limit or stop.
   */
  while(drawAnotherCard && totalScoreIsUnderLimit(currentHand)) {
    const hitPrompt = await inquirer.prompt([prompts.HIT_OR_PASS_PROMPT]);
    drawAnotherCard = hitPrompt.Hit;
    if(drawAnotherCard) {
      currentHand.push(drawCard());
      displayCurrentHand(currentHand, totalScoreIsUnderLimit(currentHand));
    }
  }

  const dealersHand = getRandomDealerHand();

  if(getScore(currentHand) === SCORE_LIMIT){   // Handle for when the user reaches Blackjack
    displayDealersHand(dealersHand)
    displayFinalHand(currentHand)
    console.log("Congratulations, you win! You've hit Blackjack. We hope you had fun!");
  }
  else if(nobodyWon(currentHand, dealersHand)){ // If both players exceed the score limit
    displayDealersHand(dealersHand)
    displayFinalHand(currentHand)
    console.log("Sorry, looks like you both went over the limit. Try again next time!");
  }
  else if(playerWon(currentHand, dealersHand)){ // Handle for when the player did better than the dealer
    displayDealersHand(dealersHand)
    displayFinalHand(currentHand)
    console.log("Congratulations, you win! You had the highest score. We hope you had fun!");
  }
  else { // If the player lost, display a "sorry" message
    displayDealersHand(dealersHand)
    displayFinalHand(currentHand)
    console.log("Sorry, you lose. Try again next time!");
  }

  // Prompt the user to play again
  const playAgain = await inquirer.prompt([prompts.PLAY_AGAIN_PROMPT]);
  if(playAgain.Yes){
    playGame()
  }
}

/**
 * Returns true if neither player won the game.
 */
const nobodyWon = (playerHand, dealersHand) => {
  return getScore(dealersHand) > SCORE_LIMIT &&  getScore(playerHand) > SCORE_LIMIT;
}

/**
 * Returns true if the human player won the game.
 */
const playerWon = (playerHand, dealersHand) => {
  return (getScore(playerHand) > getScore(dealersHand) || getScore(dealersHand) > SCORE_LIMIT) && getScore(playerHand) < SCORE_LIMIT;
}

/**
 * Print the final score for the human player
 */
const displayFinalHand = (hand) => {
  console.log(`Your final score: ${getScore(hand)}`)
}

/**
 * Get a random, but challenging dealer's hand to play against
 */
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

/**
 * Print the dealer's final hand
 */
const displayDealersHand = (hand) => {
  console.log(`The dealer's final score: ${getScore(hand)}`);
}

/**
 * Returns true if the score is under the limit
 */
const totalScoreIsUnderLimit = (hand) => {
  return getScore(hand) < SCORE_LIMIT;
}

/**
 * Prints the current hand of the player
 */
const displayCurrentHand = (hand, displayScore = true) => {
  console.log(`Awesome, here's your hand: ${getOutput(hand)}`);
  if(displayScore){
    console.log(`Your current score: ${getScore(hand)}`);
  }
}

/**
 * Get a new hand for the player
 */
const initializeHand = () => {
  const hand = [];
  for(let i = 0; i < INITIAL_HAND_SIZE; i++) {
    hand.push(drawCard());
  }
  return hand;
}

/**
 * Print a human-readable version of the current hand
 */
const getOutput = (hand) => {
  const cardLabels = hand.map(card => card.label);
  return cardLabels.join(", ");
}

/**
 * Get the current score for the hand
 */
const getScore = (hand) => {
  let score = 0;
  let numAces = 0;
  hand.forEach(card => {
    if(card.value == 11){
      numAces++;
    }
    score = score + card.value;
  });

  // Handle special logic for Aces
  if(score > SCORE_LIMIT && numAces > 0){
    while(score > SCORE_LIMIT && numAces > 0){
      score = score - 10;
      numAces--;
    }
  }
  return score;
}

/**
 * Draw a new card
 */
const drawCard = () => {
  const randomCardIndex = getRandomCardIndex();
  const randomSuitIndex = getRandomSuitIndex();
  // get a random card from the list
  const randomCard = JSON.parse(JSON.stringify(cards.CARD_LIST[randomCardIndex])); // make a deep copy of the card
  randomCard.suit = cards.SUIT_LIST[randomSuitIndex].label;
  randomCard.label = randomCard.label + randomCard.suit;
  return randomCard;
}

/**
 * Get a random card index based upon the card list size
 */
const getRandomCardIndex = () => {
  return Math.floor(Math.random() * CARD_LIST_SIZE);
}

/**
 * Get a random suit index based upon the suit list size
 */
const getRandomSuitIndex = () => {
  return Math.floor(Math.random() * SUIT_LIST_SIZE);
}

playGame()
