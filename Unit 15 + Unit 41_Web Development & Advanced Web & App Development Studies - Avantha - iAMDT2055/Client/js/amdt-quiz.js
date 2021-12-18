const $quizForm = $(".quiz-question");
const $loadingAnimationDOM = $(".loading-animation");
const $questionNoDOM = $(".question .question-no .no");
const $questionDOM = $(".question p.question");
const $paginaterViewerDOM = $(".paginater-viewer");

const $answerDOMs = $("input.form-check-input");
const $answerLabelDOMs = $("label.form-check-label");

const $prevBtn = $(".quiz-question button[action=previous]");
const $nextBtn = $(".quiz-question button[action=next]");

const $resultModelDOM = $("#result-model");
const $resultModel = new bootstrap.Modal($resultModelDOM.get(0));




const minPointsNeedForPass = 12; //points needed to pass the quiz

/**
 * This array holds the questions
 * Eg
 * [
 *      {
 *          "question": "Question?",
 *          "answers": [
 *              "answer1", "answer2", "answer3", "answer4" // there should be exactly 4 answers 
 *          ],
 *          "correctAnswerIndex": 0 // the correct answer's index in the "answers" array
 *      }
 * ]
 */
const questions = [
    {
        question: "1 When did the AMDT school established",
        answers: [
            "2001",
            "2005",
            "1996",
            "2010"
        ],
        correctAnswerIndex: 2
    },
    {
        question: "2 How BTEC HND courses are there in AMDT?",
        answers: [
            "12",
            "10",
            "20",
            "15"
        ],
        correctAnswerIndex: 1
    },
    {
        question: "What majors are popular",
        answers: [
            "Graphic Design",
            "Fashion Design",
            "Web & App Development",
            "Interior Design"
        ],
        correctAnswerIndex: 3
    }, {
        question: "4 Where is school located at?",
        answers: [
            "Colombo 03",
            "Colombo 04",
            "Colombo 06",
            "Marine Drive"
        ],
        correctAnswerIndex: 2
    }, {
        question: "5 What is the affliated university",
        answers: [
            "Colombo University",
            "Edinburgh Napier University",
            "Falmouth University",
            "University of Stirling"
        ],
        correctAnswerIndex: 3
    }, {
        question: "6 Select the proper website URL at AMDT",
        answers: [
            "www.amdt.org",
            "www.amdtschoolofcreativity.lk",
            "www.amdt.com",
            "www.amdt.lk"
        ],
        correctAnswerIndex: 4
    }, {
        question: "7 What are the 4 theme colours at AMDT?",
        answers: [
            "Yellow, Purple, Green, White",
            "Yellow, Red, Green, Blue",
            "Black, Red, Green, Blue",
            "Black, Purple, Blue, White"
        ],
        correctAnswerIndex: 2
    }, {
        question: "8 What is moto of AMDT?",
        answers: [
            "Inspiring Creative Minds",
            "School of Creativity",
            "Creativity is Number 01",
            "Creativity"
        ],
        correctAnswerIndex: 1
    }, {
        question: "9 How many honors degrees AMDT offer?",
        answers: [
            "4",
            "10",
            "7",
            "3"
        ],
        correctAnswerIndex: 4
    }, {
        question: "10 Which year AMDTians premier league was held?",
        answers: [
            "2010",
            "2012",
            "2020",
            "2021"
        ],
        correctAnswerIndex: 3
    }
];
let $responses = []; //store response answer indexes


let currentQuestionIndex = 0; //current question index


//load the question by it's index 
function loadQuestion(index) {
    if (index < 0) return;
    if (index >= questions.length) return;

    let question = questions[index];


    $questionNoDOM.text(`${index + 1}`.padStart(2, "0"));
    $questionDOM.text(question.question);

    $answerDOMs.prop("checked", null);
    $quizForm.removeClass("was-validated");

   
    question.answers.forEach(function(answer, i) {
        $($answerLabelDOMs[i]).text(answer);
    });


    if ($responses[index] != null) {
        $($($answerDOMs).get($responses[index])).prop("checked", true);
    }

    //change the next button's text to "Finish" when 
    //current question is the last one
    if (isLastQuestion(index)) {
        $nextBtn.text("Finish");
    } else { 
        $nextBtn.text("Next");
    }

    //disable the previous button when the current
    //question is the first one
    if (index == 0) {
        $prevBtn.attr("disabled", true);
    } else { 
        $prevBtn.attr("disabled", false);
    }

    currentQuestionIndex = index;
    $paginaterViewerDOM.text(`${index + 1}/${questions.length}`);
}

//calculate total points for the responses
function validateResponses() {
    let points = 0;
    questions.forEach((question, i) => {
        if (question.correctAnswerIndex == $responses[i]) {
            points += 2;
        } else {
            points -= 1;
        }
    });
    return points;
}

//check wether the quiz is passed 
function isQuizPassed(points) {
    return points >= minPointsNeedForPass;
}
function isLastQuestion(index) {
    return index == (questions.length - 1);
}



$quizForm.on("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    let offset = $(event.originalEvent.submitter)
        .attr('action') == "next" ? 1 : -1;

    if (offset == 1) {
        $(this).addClass('was-validated');
        if (!this.checkValidity()) return;
    }

    if (this.checkValidity()) {
        //store the responses for later use
        $answerDOMs.each((i, answerDOM) => {
            answerDOM = $(answerDOM);
            if (!answerDOM.prop("checked")) return;

            $responses[currentQuestionIndex] = i;
        });
    }


    //check wether the current question is the last one
    if (currentQuestionIndex == questions.length - 1 && offset == 1) {
        let points = validateResponses(); //calculate total points

        $resultModelDOM.find(".quiz-passed").hide();
        $resultModelDOM.find(".quiz-failed").hide();

        //check wether the quiz is passed & show appropriate message
        if (isQuizPassed(points)) {
            $resultModelDOM.find(".quiz-passed").show();
        } else {
            $resultModelDOM.find(".quiz-failed").show();
        }


        $resultModelDOM.find(".points").text(`${points} Points`); //update the results model
        $resultModel.show(); //show the results model

        //reset the quiz
        $responses = [];
        loadQuestion(0);

    } else {
        //load the next question
        loadQuestion(currentQuestionIndex + offset);
    }

});
$(function () {
    loadQuestion(currentQuestionIndex);
    $loadingAnimationDOM.hide();
});

