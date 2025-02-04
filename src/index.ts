import * as readline from "readline";

let guesses = 0 
const numberToGuess = Math.floor(Math.random() * 100) + 1

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export const main = () => {
  const welcomeMessage = 
`Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.\n`

  const selectDificulty = `Please select the difficulty level:
  1. Easy (10 chances)
  2. Medium (5 chances)
  3. Hard (3 chances)

Enter your choice: `
  console.log(welcomeMessage)

  rl.question(selectDificulty, (answer) => {
    difficultyLevel(Number(answer))
  });
}

export const difficultyLevel = (level: number) => {
  const difficultyLevels = {
    1: {guesses: 10, name: 'Easy'},
    2: {guesses: 5, name: 'Medium'},
    3: {guesses: 3, name: 'Hard'}
  }
  const difficulty = difficultyLevels[level]
  guesses = difficulty.guesses
  console.log(`Great! You have selected the  ${difficulty.name} difficulty level.`)
  console.log(`Let's start the game!\n`)
  enterGuess()
}

export const enterGuess = () => {
  rl.question(`Enter your guess: `, (answer) => {
    const guess = Number(answer)
    checkAnswer(guess, numberToGuess)
  })
}

export const checkAnswer = (guess: number, correctNumber:number) => {
  if(guess === correctNumber) {
    correctGuess()
    return
  } 
  
  incorrectGuess(guess, correctNumber)
}

export const correctGuess = () => {
  console.log(`Congratulations! You guessed the correct number!`)
  rl.close()
}

export const incorrectGuess = (guess: number, correctNumber:number) => {
  const lowerOrGreater = correctNumber < guess ? 'lower' : 'greater' 
  console.log(`Incorrect! The number is ${lowerOrGreater} than ${guess}.`)

  guesses--
  if(guesses === 0) {
    outOfGuesses(correctNumber)
    return
  }
  console.log(`You have ${guesses} guesses left.\n`)
  enterGuess()
}

export const outOfGuesses = (correctNumber:number) => {
  console.log(`You have run out of guesses! The correct number was ${correctNumber}.`)
  rl.close()
}

main()
