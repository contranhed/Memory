# Title: Memory
This application was built as the second assignment three weeks into the JavaScript course at EC Utbildning. The content requirements were to include one useEffect, individual components serving different purposes and apply a game logic where props are sent between the components. 


### Game logic
A human player is presented with ten cards, all faced down. The player clicks on two cards. If it's a match in terms of value and suit, the cards will remain faced up and the player can choose two new cards. If the chosen cards do not match, they will flip again faced down after a second. The game goes on until the player has matched all cards.


### The code logic
The application has four components. The application's entry point (index.js) points out that the component App will be rendered where the root is indicated in the index.html. In turn, the App component renders two components: Greeting and MemoryBoard. The greeting only includes a header in text format while the MemoryBoard holds all game logic.

MemoryBoard keeps tracks of changes in the application through the use of three react hooks (useStates), two of which have connected useEffects to ensure certain logic/update of states to render the application correctly on the browser. 


### Technologies. 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The code is written in JavaScript and the page is structured and styled through the use of HTML and CSS, respectively.


### How to install the application. 
    1. Open the app file in an IDE and open the terminal.
    2. Write "npm install" and push enter. Packages will be installed.
    3. Write "npm start" and push enter. A browser should pop up and display the application on port 3000. If this does not happen, please open [http://localhost:3000](http://localhost:3000) to view it in the browser.
    4. If the application cannot be rendered on port 3000, you will be asked if you want to open the application using a different port. Answer yes.

Important to note is that the application only runs in development mode. 


### Room for improvement
1. As of now, there is a risk that a match is found before both cards have flipped if the player is quick to click on a third card. A feature that disables clicks on the other non-chosen cards while the cards are evaluated could do the trick. 
2. To boost the gamification, the application could include features such as counting rounds, set a time limit or even register the time it takes to finish the game and store it on localStorage. If anything with time features were to be included, the solution could smootly be implemented with the help of a button to kickstart the game.


### Author
Connie Hedberg <humanitariancoder@gmail.com>