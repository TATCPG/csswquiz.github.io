function submitQuiz() { //fuction submitquiz
    const resultElement = document.getElementById('result');
    const quizForm = document.getElementById('quizForm');
    
    const formData = new FormData(quizForm);
    const quizInputs = quizForm.querySelectorAll('input');
    //creat variable
    
    const answers = {
        q1: 'Correct',
        q2: 'Correct',
        q3: 'Correct',
        q4: 'Correct',
        q5: 'Correct',
        q6: 'Correct',
        q7: 'Correct',
        q8: 'Correct',
        q9: 'Correct',
        q10: 'Correct'

    };


    let score = 0;
    const totalQuestions = Object.keys(answers).length;

    let allAnswered = true;
        quizInputs.forEach(input => {
            if (!quizForm[input.name].value) {
                allAnswered = false;
            }
        });

        if (!allAnswered) {
            alert('Please answer all questions before submitting.');
            return;
        }

        // Disable all inputs to prevent editing
        quizInputs.forEach(input => {
            input.disabled = true;
        });

         // Hide submit button and show retry button
         document.querySelector('.btn[onclick="submitQuiz()"]').classList.add('hidden');
         document.getElementById('retryButton').classList.remove('hidden');

    // Clear previous results
    resultElement.innerHTML = '';
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        question.querySelectorAll('.options label').forEach(label => { //remove class correct and in correct from answer
            label.classList.remove('correct', 'incorrect');
        });
    });


    // Check answers and show correct/incorrect feedback
    for (let [question, answer] of formData.entries()) {
        const correctAnswer = answers[question];
        const questionElement = document.querySelector(`.question[data-question="${question}"]`);
        if (answer === correctAnswer) { //if answer is correct add class css [correct]
            score++;
            questionElement.querySelector(`input[value="${answer}"]`).parentElement.classList.add('correct');
        } else { //if answer is correct add class css [incorrect] and correct answer
            questionElement.querySelector(`input[value="${answer}"]`).parentElement.classList.add('incorrect');
            questionElement.querySelector(`input[value="${correctAnswer}"]`).parentElement.classList.add('correct');
        }
    }

    function checkAnswer(questionName, correctAnswer, resultId) {
        const userAnswer = document.querySelector(`input[name="${questionName}"]:checked`).value;
        const resultElement = document.getElementById(resultId);

        if (userAnswer === correctAnswer) {
            resultElement.classList.add('correct');
        } else {
            resultElement.classList.add('incorrect');
        }

        resultElement.classList.remove('hidden');
    }

    resultElement.textContent = `คุณได้คะแนน ${score} จาก ${totalQuestions}`; //print score
}

function retryQuiz() {
    const quizForm = document.getElementById('quizForm');
    const quizInputs = quizForm.querySelectorAll('input');

    // Enable all inputs and reset form
    quizForm.reset();
    quizInputs.forEach(input => {
        input.disabled = false;
    });

    // Hide all result messages
    const results = document.querySelectorAll('.result');
    results.forEach(result => {
        result.classList.add('hidden');
        result.classList.remove('correct', 'incorrect');
    });

    // Remove 'correct' and 'incorrect' classes from all labels
    const allLabels = document.querySelectorAll('label');
    allLabels.forEach(label => {
        label.classList.remove('correct', 'incorrect');
    });

    // Hide retry button and show submit button
    document.querySelector('.btn[onclick="submitQuiz()"]').classList.remove('hidden');
    document.getElementById('retryButton').classList.add('hidden');
}

