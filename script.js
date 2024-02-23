// Initialize key elements and variables for quiz functionality
var startBtn = document.getElementById("startBtn"); // Initiates the quiz when clicked
var time = 40; // Sets the starting time for the quiz countdown
var countdownTimer = document.getElementById("countdownTimer"); // Displays remaining time
var homeContainer = document.getElementById("homeContainer"); // Shows introductory content
var quizContainer = document.getElementById("quizContainer"); // Holds and displays quiz questions
var questionHeading = document.getElementById("questionHeading"); // Displays the question to the user
// Elements for selecting answers
var answerChoiceA = document.getElementById("answerChoiceA");
var answerChoiceB = document.getElementById("answerChoiceB");
var answerChoiceC = document.getElementById("answerChoiceC");
var answerChoiceD = document.getElementById("answerChoiceD");
var high_scores = []; // Stores high scores for session
var score = 0; // Tracks the user's current score
let i = 0; // Index for navigating through questions

// Array containing quiz questions and answers
var questionsArray = [
     // Question about JavaScript delay functionality
    {
        question: "Which object in JavaScript can be used to ensure code runs after a delay?",
        answerChoice: ["setTimeout", "timeWait", "delayFunction", "setInterval"],
        correctAnswer: 0
    },
    // Question on correctly linking an external script
    {
        question: "What is the correct syntax for referring to an external script called 'app.js'?",
        answerChoice: ["<script src='app.js'>", "<script href='app.js'>", "<script ref='app.js'>", "<script name='app.js'>"],
        correctAnswer: 0
    },
    // Question on displaying alert messages
    {
        question: "How do you write 'Hello World' in an alert box?",
        answerChoice: ["msg('Hello World');", "alertBox('Hello World');", "document.write('Hello World');", "alert('Hello World');"],
        correctAnswer: 3
    },
    // Question on element selection by ID
    {
        question: "Which JavaScript method is used to access an HTML element by its ID?",
        answerChoice: ["getElementById()", "querySelector()", "getElementsByTagName()", "findElementById()"],
        correctAnswer: 0
    },
    // Question on variable declaration
    {
        question: "How do you declare a JavaScript variable?",
        answerChoice: ["var carName;", "variable carName;", "v carName;", "int carName;"],
        correctAnswer: 0
    }
];

// Timer setup to decrement quiz time and manage quiz end
var countdownTimerInterval = setInterval(setCountdownTimer, 1000);

function setCountdownTimer() {
    if (time > 0) {
        time--; // Reduce time each second
        document.getElementById("timer").textContent = time + " seconds";
    } else {
        end_quiz(); // Call to finish quiz when time expires
    }
}

// Listener for start button to trigger quiz start
startBtn.addEventListener("click", function() {
    quizContainer.style.display = "block"; // Show quiz questions
    homeContainer.style.display = "none"; // Hide intro content
    countdownTimer.style.display = "block"; // Show timer
    document.getElementById("score_keeper").style.display = "block"; // Show score tracker
    document.getElementById("score").textContent = score;
    time_start = true;
    setQuizQuestions();
});

// Function to display current question and choices
function setQuizQuestions() {
    if (i < questionsArray.length) {
        questionHeading.textContent = questionsArray[i].question;
        answerChoiceA.textContent = questionsArray[i].answerChoice[0];
        answerChoiceB.textContent = questionsArray[i].answerChoice[1];
        answerChoiceC.textContent = questionsArray[i].answerChoice[2];
        answerChoiceD.textContent = questionsArray[i].answerChoice[3];
    } else {
        end_quiz();
    }
}

// Answer choice event listeners
[answerChoiceA, answerChoiceB, answerChoiceC, answerChoiceD].forEach((choice, index) => {
    choice.addEventListener('click', function() {
        // Check if selected answer is correct
        if (index === questionsArray[i].correctAnswer) {
            document.getElementById("AnswerResponse").textContent = "Correct!";
            score++;
        } else {
            document.getElementById("AnswerResponse").textContent = "Incorrect!";
            time -= 5; // Penalize time for incorrect answer
        }
        document.getElementById("score").textContent = score;
        // Delay before showing response and moving to next question
        setTimeout(function() {
            document.getElementById("AnswerResponse").textContent = "";
            if (i < questionsArray.length - 1) {
                i++;
                setQuizQuestions();
            } else {
                end_quiz();
            }
        }, 1000);
    });
});

// Function to end the quiz
function end_quiz() {
    clearInterval(countdownTimerInterval); // Stop the timer
    quizContainer.style.display = "none";
    document.getElementById("game_over").style.display = "block";
    document.getElementById("countdownTimer").style.display = "none";
    document.getElementById("score_keeper").style.display = "none";
    document.getElementById("end_score").textContent = score; // Display final score
}