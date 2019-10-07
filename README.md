# Blackjack Simulator
Built with ❤️ in 2 hours on a Sunday night with a decent amount of red bull.

## What is this?
This repository is my submission for the 2020 Kleiner Perkins Fellows Program. 
It is a console-based game simulator of the popular card game Blackjack.

![alt text](https://user-images.githubusercontent.com/30019505/66279272-73553c80-e87e-11e9-8e99-85d924202391.png "An example screenshot of the game")

## How do I play?
1. Make sure you have Node.js version 10.x or higher installed.
2. Clone this repository.
3. `npm i`
4. `node index.js`
5. Have fun!

## How did I build it?
First, I needed to take a good look at what this thing needed to do. Core feature requirements were:
 - Accept user input via the command line
 - Prompt the user to start the game
 - Generate a hand of playing cards
 - Allow the user to either draw another card or pass
 - Keep track of the total score
 - Generate a realistic, challenging "opponent" for the user

I started by considering which core technologies to use, before worrying about specific libraries. 
It came down to Javascript vs. Python. I have experience with other languages, but the core of my work right now is in these languages (plus PHP), so I wanted to pick something I wasn't rusty in.

Python is lovely for data science, but I was prefer Javascript for hacky projects like these because:
 1) The community is massive, so there are plenty of example projects 
 2) It can be used for both frontend and backend

So I ended up picking Javascript. 

Next, came the major challenge: accepting and processing command line input. 
I have never actually done this before in a project, so after a little googling I found [Inquirer.js](https://github.com/SBoudrias/Inquirer.js), a popular NPM package for accepting command line input. Perfect.

