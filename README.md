# Scripts

### `npm install`

Run this command first. It will install all the necessary packages. Make sure `node`/`npm` is installed first. This project has been tested on node version `v16.14.2`.

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

# Instructions

Welcome to the Kahoot intern frontend assignment.

This is a simplified version of the assignment we give to regular candidates. We have already given you an almost completed project to start on so that you can focus on the most important parts of the code. Please follow these steps:

1. Read the `full-instructions.pdf` manual for the initial assignment
2. Note that 90% of the assignment is already completed here in this repository
3. For the last 10%, we want you to add the missing code here: `src/components/PlayerItems.tsx:68`. By writing this function, you will make sure that the application works as specified in the instructions.
4. Bonus point: Currently, the buttons are not accessible by keyboard. Please fix so that they are keyboard-friendly like normal buttons.
5. Please document any assumptions or notes you want to share below, at the bottom of this readme.

# Notes submitted by the candidate

- Based on the UI sketch, I decided to order the elements in `PlayerItemsList` by the order in which the items were pressed first.
- I assume that you may only receive one bonus for each letter, but multiple bonuses could be supported with a variable like this: 
`const numberOfBonuses = Math.floor(numberOfOccurences / itemDefinition.bonus.count);`.
- I assume that `playerItems` will not contain uneligble keys, but I added a filter to handle that possibility.

