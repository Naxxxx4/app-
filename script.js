
const questionForm = document.getElementById('questionForm');
const questionInput = document.getElementById('questionInput');
const questionList = document.getElementById('questionList');
const adminPanel = document.getElementById('adminPanel');

let questions = [];

questionForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const questionText = questionInput.value.trim();
  if (questionText === '') return;

  const question = {
    id: Date.now(),
    text: questionText,
    answer: ''
  };

  questions.push(question);
  renderQuestions();
  questionInput.value = '';
});

function renderQuestions() {
  questionList.innerHTML = '';
  adminPanel.innerHTML = '';

  questions.forEach(q => {
    // Mostrar al público
    const li = document.createElement('li');
    li.innerHTML = `
      <p><strong>Pregunta:</strong> ${q.text}</p>
      <input type="text" placeholder="Escribe una respuesta..." id="res-${q.id}" />
      <button onclick="saveAnswer(${q.id})">Responder</button>
      ${q.answer ? `<p><strong>Respuesta:</strong> ${q.answer}</p>` : ''}
    `;
    questionList.appendChild(li);

    // Mostrar en panel privado
    const adminLi = document.createElement('li');
    adminLi.innerHTML = `<strong>${q.text}</strong> ${q.answer ? `→ <em>${q.answer}</em>` : ''}`;
    adminPanel.appendChild(adminLi);
  });
}

function saveAnswer(id) {
  const input = document.getElementById(`res-${id}`);
  const answerText = input.value.trim();
  if (answerText === '') return;

  const question = questions.find(q => q.id === id);
  question.answer = answerText;
  renderQuestions();
}
