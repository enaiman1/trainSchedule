1. set up firebase
    * initialize firebase (by adding var config object)
2. make a variable that makes a database
3. create a variable that displays current time and set it undefined;
4. create a function to update the time
5. create a click event (when user click the submit button)
    1. allow use to add new train
        1. create an object with all train info
        2. create var and attach them to html id's
        3. upload the the user input and put it into local storage
        4. clear out all fields so user can add another train info
6. create a function that
    1. when a new train has been added
    2. add the data to the html table   
        1. convert train time by using moment.js
        2. show the difference between train times
        3. calculate how long it will take until next train
        4. add arrival time
7. create a function with an errorObject
8. creat a function with a setInterval
    1. put time of 60000 (minute)
