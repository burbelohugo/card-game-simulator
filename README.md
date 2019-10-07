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

**Feature Requirements**

First, I needed to take a good look at what this thing needed to do. 

I started by doing what I always do with any project: a quick brain dump of feature ideas, requirements, and anything else I wanted to consider.

<img src="https://user-images.githubusercontent.com/30019505/66279678-dfd13b00-e880-11e9-9915-f96e013a27ec.png" alt="drawing" width="200"/>

Core feature requirements were:
 - Accept user input via the command line
 - Prompt the user to start the game
 - Generate a hand of playing cards
 - Allow the user to either draw another card or pass
 - Keep track of the total score
 - Generate a realistic, challenging "opponent" for the user

**Picking a Language**

I started by considering which core technologies to use, before worrying about specific libraries. 
It came down to Javascript vs. Python. I have experience with other languages, but the most of my work right now is in these languages (plus PHP), and I wanted to pick something I wasn't rusty in.

Python is lovely for data science, but I was prefer Javascript for hacky projects like these because:
 1) The community is massive, so there are plenty of example projects 
 2) It can be used for both frontend and backend

So I ended up picking Javascript. 

**Picking a NPM Package**

Next, came the major challenge: accepting and processing command line input. 
I have never actually done this before in a project, so after a little googling I found [Inquirer.js](https://github.com/SBoudrias/Inquirer.js), a popular NPM package for accepting command line input. Perfect.

**Designing the Core Architecture**

When designing a large-scale system, I normally start with an architecture meeting, scope document, whiteboard session, etc. 
This was a 2 hour hack, and I was working with a technology (CLI) I was relatively unfamiliar with, so I opted to get an MVP out the door and then worry about architecture.

I started with the bare minimum - literally just a quick index.js file that could accept user input (their name) and spit it back out. This let me explore how Inquirer.js worked at a fundamental level.

Next, I wanted to get a decent app ready to go. 
Since I was severely constrained by time, I decided to keep all the code in a single index.js file - no mixins, helper functions, or complex factory patterns needed since the end goal was achievable in less than 400 lines of code.

I did realize I would need some data, but thought an actual database was a bit overkill. Instead, I opted for 2 JSON files - one for the card data, and one for the prompts.

Then, I considered how I wanted to manage data within the app. It needed to be quickly implementable and simple to manage. 
I opted to make the user's current "hand" - the cards they currently possessed - as the core data structure.
This was a Javascript array of 1 or more "cards", retrieved at random from the cards JSON noted above.

  