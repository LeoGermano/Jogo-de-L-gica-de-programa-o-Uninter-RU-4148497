document.addEventListener("DOMContentLoaded", function() {
    const startContainer = document.getElementById("start");
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
    const nextButton = document.getElementById("next");
    const restartButton = document.getElementById("restart");
    const startButton = document.getElementById("start-btn");
    const nameInput = document.getElementById("name");
    const questionElement = document.getElementById("question");
    const answerElement = document.getElementById("answers");
    const scoreElement = document.getElementById("score");
    const gabaritoElement = document.getElementById("gabarito");

    let currentQuestionIndex = 0;
    let score = 0;
    let playerName = "";

    const quizQuestions = [
        {
            question: "O que é HTML?",
            answers: [
                { text: "Uma linguagem de programação", correct: false },
                { text: "Uma linguagem de marcação", correct: true },
                { text: "Um banco de dados", correct: false }
            ]
        },
        {
            question: "O que é CSS usado para fazer?",
            answers: [
                { text: "Estruturar o conteúdo", correct: false },
                { text: "Adicionar estilo ao conteúdo", correct: true },
                { text: "Programar funcionalidades", correct: false }
            ]
        },
        {
            question: "O que significa JS?",
            answers: [
                { text: "JavaScript", correct: true },
                { text: "JavaSource", correct: false },
                { text: "JustScript", correct: false }
            ]
        },
        {
            question: "Qual a tag correta para um parágrafo em HTML?",
            answers: [
                { text: "<par>", correct: false },
                { text: "<p>", correct: true },
                { text: "<text>", correct: false }
            ]
        },
        {
            question: "Como se refere a um id no CSS?",
            answers: [
                { text: ".idName", correct: false },
                { text: "#idName", correct: true },
                { text: "@idName", correct: false }
            ]
        },
        {
            question: "Como se chama uma função em JavaScript?",
            answers: [
                { text: "functionName()", correct: true },
                { text: "call functionName()", correct: false },
                { text: "function: functionName()", correct: false }
            ]
        },
        {
            question: "Como se comenta uma linha em CSS?",
            answers: [
                { text: "// isto é um comentário", correct: false },
                { text: "/* isto é um comentário */", correct: true },
                { text: "# isto é um comentário", correct: false }
            ]
        }
    ];

    startButton.addEventListener("click", startQuiz);

    function startQuiz() {
        playerName = nameInput.value.trim();
        if (playerName === "") {
            alert("Por favor, digite seu nome para iniciar o quiz.");
            return;
        }
        startContainer.style.display = "none";
        quizContainer.style.display = "block";
        showQuestion(currentQuestionIndex);
    }

    function showQuestion(index) {
        const currentQuestion = quizQuestions[index];
        questionElement.innerText = currentQuestion.question;
        answerElement.innerHTML = "";

        currentQuestion.answers.forEach((answer, idx) => {
            const button = document.createElement("button");
            button.innerText = answer.text;
            button.classList.add("btn");
            button.addEventListener("click", () => {
                selectAnswer(answer, index);
            });
            answerElement.appendChild(button);
        });

        nextButton.disabled = true; // Inicialmente desabilita o botão de próxima

        // Verifica se é a última pergunta para exibir o botão de finalizar
        if (index === quizQuestions.length - 1) {
            submitButton.style.display = "inline-block";
            nextButton.style.display = "none";
        } else {
            submitButton.style.display = "none";
            nextButton.style.display = "inline-block";
        }
    }

    function selectAnswer(answer, index) {
        if (answerElement.querySelector(".selected")) {
            // Se já houver uma resposta selecionada, não faz nada
            return;
        }

        const correct = answer.correct;
        const buttons = answerElement.querySelectorAll(".btn");
        buttons.forEach(button => {
            button.disabled = true;
            if (button.innerText === answer.text) {
                if (correct) {
                    button.classList.add("correct");
                    score++; // Aumenta a pontuação se a resposta for correta
                } else {
                    button.classList.add("incorrect");
                }
            }
        });

        nextButton.disabled = false; // Habilita o botão de próxima após responder
    }

    function showResults() {
        quizContainer.style.display = "none";
        resultsContainer.style.display = "block";

        scoreElement.textContent = `${playerName}, você acertou ${score} de ${quizQuestions.length} perguntas.`;

        quizQuestions.forEach((question, index) => {
            gabaritoElement.innerHTML += `
                <div>
                    <p><strong>Pergunta ${index + 1}:</strong> ${question.question}</p>
                    <p><strong>Resposta correta:</strong> ${question.answers.find(a => a.correct).text}</p>
                </div>
            `;
        });
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        resultsContainer.style.display = "none";
        quizContainer.style.display = "block";
        gabaritoElement.innerHTML = "";
        showQuestion(currentQuestionIndex);
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }

    nextButton.addEventListener("click", showNextQuestion);
    submitButton.addEventListener("click", showResults);
    restartButton.addEventListener("click", restartQuiz);

    // Mostra a primeira pergunta ao carregar a página
    // showQuestion(currentQuestionIndex);
});
