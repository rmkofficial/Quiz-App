const questions = [
  {
    id: 1,
    question: "Hangi gezegen Güneş Sistemi'mizdeki en büyük gezegendir?",
    options: ["Jüpiter", "Mars", "Satürn", "Venüs"],
  },
  {
    id: 2,
    question: "Nobel Fizik Ödülü'nü kazanan ilk kadın bilim insanı kimdir?",
    options: [
      "Ada Yonath",
      "Marie Curie",
      "Maria Goeppert Mayer",
      "Donna Strickland",
    ],
  },
  {
    id: 3,
    question: `Hangi ünlü sanatçı, "Monalisa" adlı tablo ile tanınmaktadır?`,
    options: [
      "Vincent Van Gogh",
      "Leonardo Da Vinci",
      "Pablo Picasso",
      "Michelangelo",
    ],
  },
  {
    id: 4,
    question: ` "Kehanetler" adlı kitabıyla ünlü olan ünlü yazar Nostradamus, hangi yüzyılda yaşamıştır?`,
    options: ["17. Yüzyıl", "18. Yüzyıl", "19. Yüzyıl", "16. Yüzyıl"],
  },
  {
    id: 5,
    question: ` "Sümela Manastırı" hangi ülkede bulunmaktadır?`,
    options: ["Yunanistan", "Türkiye", "Bulgaristan", "Romanya"],
  },
]; // sorular

const questionAnswer = [
  {
    id: 1,
    answer: "Jüpiter",
  },
  {
    id: 2,
    answer: "Marie Curie",
  },
  {
    id: 3,
    answer: "Leonardo Da Vinci",
  },
  {
    id: 4,
    answer: "16. Yüzyıl",
  },
  {
    id: 5,
    answer: "Türkiye",
  },
]; // soruların cevapları

let userAnswer = []; // kullanıcının seçtiği cevaplar

const startBtn = document.getElementById("start-btn"); // start butonu
const questionModal = document.querySelector("#question-modal"); // soru modalı

// start butonuna tıklandığında soru modalı açılır
startBtn.addEventListener("click", () => {
  startBtn.classList.add("hide");
  questionModal.classList.remove("hide");
  questionModal.classList.add("visible");
}); // start butonuna tıklandığında soru modalı açılır

let currentIndex = 0; // soruların index numarası

// soruları modal üzerinde göstermek için
function updateModalQuestion() {
  const modalQuestion = document.querySelector(
    "#question-modal .modal-question"
  );
  const modalOptions = document.querySelector("#question-modal .modal-options");

  modalQuestion.textContent = questions[currentIndex].question;
  modalOptions.innerHTML = "";

  questions[currentIndex].options.forEach((option) => {
    const li = document.createElement("li");
    li.textContent = option;
    modalOptions.appendChild(li);

    li.addEventListener("click", handleOptionClick);
  });
} // soruları modal üzerinde göstermek için

updateModalQuestion(); // ilk soruyu modal üzerinde göstermek için

// soru modalındaki seçenekleri seçmek için
const optionItem = document.querySelectorAll(
  "#question-modal .modal-options li"
);
optionItem.forEach((li) => {
  li.addEventListener("click", handleOptionClick);
});
// soru modalındaki seçenekleri seçmek için

// kullanıcının seçtiği cevapları userAnswer dizisine eklemek için
function handleOptionClick(e) {
  const clickedLi = e.target;
  const answer = clickedLi.textContent;
  userAnswer[currentIndex] = answer; // Seçilen cevabı doğru indekse ekleyin

  if (userAnswer[currentIndex] == questionAnswer[currentIndex].answer) {
    this.classList.add("true");
  } else {
    this.classList.add("false");
  }
  optionItem.forEach((li) => {
    li.classList.add("disabled");
  });
}
optionItem.forEach((li) => {
  li.addEventListener("click", handleOptionClick);
}); // kullanıcının seçtiği cevapları userAnswer dizisine eklemek için

const nextButton = document.querySelector("#question-modal .next-button"); // next butonu
const finishButton = document.querySelector("#question-modal .finish-button"); // finish butonu
const scoreModal = document.querySelector("#score-modal"); // skor modalı
const scoreContent = document.querySelector("#score-modal .score-content"); // skor modalı içeriği
// const scoreQuestion = document.querySelector("#score-modal .score-question"); // skor modalı içeriği
const scoreText = document.querySelector("#score-modal .score-text"); // skor modalı içeriği

// sonraki soruya geçmek için
function handleNextButtonClick() {
  currentIndex++;

  if (currentIndex == questions.length - 1) {
    nextButton.classList.add("hide");
    finishButton.classList.remove("hide");
  }
  updateModalQuestion();
} // sonraki soruya geçmek için

nextButton.addEventListener("click", handleNextButtonClick); // sonraki soru butonuna tıklandığında

// skor modalını açmak için
function handleFinishButtonClick() {
  questionModal.classList.remove("visible");
  questionModal.classList.add("hide");
  scoreModal.classList.remove("hide");
  scoreModal.classList.add("visible");
  scoreContent.textContent =
    "Tebrikler! Skorunuz: " +
    userAnswer.filter((answer, index) => answer == questionAnswer[index].answer)
      .length;

  const scoreTextElement = document.querySelector("#score-modal .score-text");
  scoreTextElement.innerHTML = ""; // skor modalı içeriğini temizlemek için

  questions.forEach((question, index) => {
    const questionText = question.question;
    const userAnswerText = userAnswer[index] || "Cevaplanmadı";
    const correctAnswerText = questionAnswer[index].answer;

    const questionResult = document.createElement("h1");
    questionResult.innerHTML = "Soru  " + (index + 1) + ": " + questionText;

    const userAnswerResult = document.createElement("p");
    userAnswerResult.innerHTML = "Verilen Cevap: " + userAnswerText;

    const correctAnswerResult = document.createElement("p");
    correctAnswerResult.innerHTML = "Doğru Cevap: " + correctAnswerText;

    scoreTextElement.appendChild(questionResult);
    scoreTextElement.appendChild(userAnswerResult);
    scoreTextElement.appendChild(correctAnswerResult);
  });
} // skor modalını açmak için

finishButton.addEventListener("click", handleFinishButtonClick); // skor modalını açmak için
