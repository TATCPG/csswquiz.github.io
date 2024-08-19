function submitQuiz() { //fuction submitquiz
    const resultElement = document.getElementById('result');
    const quizForm = document.getElementById('quizForm');
    const formData = new FormData(quizForm);
    //creat variable
    
    const answers = {
        q1: 'Correct',
        q2: 'Correct',
        q3: 'Correct'
    };


    let score = 0;
    const totalQuestions = Object.keys(answers).length;

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

    resultElement.textContent = `Your score is ${score} out of ${totalQuestions}`; //print score
}
