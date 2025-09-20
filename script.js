const questions = [
  {
    title: "Questão 1",
    statement: "Qual é a melhor descrição da Primeira Lei de Newton?",
    options: [
      {
        text: "Um corpo mantém seu estado de movimento ou repouso se a força resultante for nula.",
        correct: true,
      },
      {
        text: "A aceleração de um corpo é proporcional à força resultante que age nele.",
        correct: false,
      },
      {
        text: "Forças sempre ocorrem aos pares, com mesma intensidade e sentidos opostos.",
        correct: false,
      },
      {
        text: "A gravidade atua entre todos os corpos proporcionalmente ao produto de suas massas.",
        correct: false,
      },
    ],
    feedback: {
      correct:
        "A Primeira Lei, ou lei da inércia, afirma que um corpo tende a manter seu estado de repouso ou movimento retilíneo uniforme quando a força resultante é zero.",
      incorrect:
        "Revise a lei da inércia: ela descreve o comportamento de um corpo na ausência de força resultante.",
    },
  },
  {
    title: "Questão 2",
    statement:
      "Um ônibus estava parado e arranca de repente. Os passageiros tendem a ficar para trás em relação ao veículo. Qual lei explica esse fenômeno?",
    options: [
      { text: "Primeira Lei de Newton", correct: true },
      { text: "Segunda Lei de Newton", correct: false },
      { text: "Terceira Lei de Newton", correct: false },
      { text: "Lei da Gravitação Universal", correct: false },
    ],
    feedback: {
      correct:
        "O efeito observado é consequência da inércia: os corpos tendem a manter o estado de repouso quando nenhuma força resultante os impulsiona.",
      incorrect:
        "Lembre-se de que a inércia explica por que os passageiros resistem à mudança repentina de movimento.",
    },
  },
  {
    title: "Questão 3",
    statement:
      "Se a força resultante sobre um objeto é nula, o que acontecerá com seu movimento?",
    options: [
      {
        text: "Ele permanecerá em repouso ou em movimento retilíneo uniforme.",
        correct: true,
      },
      {
        text: "Ele obrigatoriamente entrará em movimento circular uniforme.",
        correct: false,
      },
      {
        text: "Ele ganhará velocidade proporcional à sua massa.",
        correct: false,
      },
      {
        text: "Ele experimentará uma força centrípeta igual à sua massa.",
        correct: false,
      },
    ],
    feedback: {
      correct:
        "Sem força resultante, o corpo mantém seu estado de movimento — é a manifestação direta da Primeira Lei de Newton.",
      incorrect:
        "Quando a força resultante é zero, não há mudança de movimento; não surge aceleração.",
    },
  },
  {
    title: "Questão 4",
    statement: "Qual equação representa corretamente a Segunda Lei de Newton?",
    options: [
      { text: "F = m · a", correct: true },
      { text: "F = m / a", correct: false },
      { text: "F = a / m", correct: false },
      { text: "F = m · v", correct: false },
    ],
    feedback: {
      correct:
        "A Segunda Lei afirma que a força resultante equivale ao produto da massa pela aceleração do corpo.",
      incorrect:
        "Recorde-se: força resultante, massa e aceleração estão relacionados por F = m · a.",
    },
  },
  {
    title: "Questão 5",
    statement:
      "Um bloco de 2 kg recebe uma aceleração de 3 m/s². Qual é a força resultante que atua sobre ele?",
    options: [
      { text: "6 N", correct: true },
      { text: "1,5 N", correct: false },
      { text: "5 N", correct: false },
      { text: "9 N", correct: false },
    ],
    feedback: {
      correct:
        "Aplicando F = m · a: 2 kg × 3 m/s² = 6 newtons de força resultante.",
      incorrect:
        "Use F = m · a: multiplique a massa (2 kg) pela aceleração (3 m/s²).",
    },
  },
  {
    title: "Questão 6",
    statement:
      "Mantendo a força resultante constante, o que acontece com a aceleração de um corpo se sua massa dobrar?",
    options: [
      {
        text: "A aceleração diminui para metade do valor original.",
        correct: true,
      },
      {
        text: "A aceleração dobra.",
        correct: false,
      },
      {
        text: "A aceleração permanece igual, pois não depende da massa.",
        correct: false,
      },
      {
        text: "A aceleração passa a ser nula.",
        correct: false,
      },
    ],
    feedback: {
      correct:
        "Segundo F = m · a, com força constante, massa e aceleração são inversamente proporcionais; dobrar a massa reduz a aceleração pela metade.",
      incorrect:
        "Repare que a aceleração é inversamente proporcional à massa quando a força resultante é fixa.",
    },
  },
  {
    title: "Questão 7",
    statement:
      "Se triplicarmos a força resultante aplicada a um corpo mantendo a massa constante, o que acontece com a aceleração?",
    options: [
      { text: "Ela triplica.", correct: true },
      { text: "Ela reduz para um terço.", correct: false },
      { text: "Ela permanece igual.", correct: false },
      { text: "Ela passa a depender apenas da gravidade.", correct: false },
    ],
    feedback: {
      correct:
        "Com massa constante, a aceleração é diretamente proporcional à força resultante, portanto triplica.",
      incorrect:
        "Pense na relação direta entre força resultante e aceleração quando a massa não muda.",
    },
  },
  {
    title: "Questão 8",
    statement:
      "Qual situação ilustra claramente a Terceira Lei de Newton?",
    options: [
      {
        text: "Ao empurrar uma parede, você sente suas mãos sendo pressionadas em sentido contrário.",
        correct: true,
      },
      {
        text: "Um objeto em repouso permanece parado até que uma força atue sobre ele.",
        correct: false,
      },
      {
        text: "Ao aumentar a força sobre um carrinho, sua aceleração cresce na mesma proporção.",
        correct: false,
      },
      {
        text: "Um carro freia porque os pneus exercem atrito sobre o asfalto.",
        correct: false,
      },
    ],
    feedback: {
      correct:
        "A Terceira Lei afirma que toda ação gera uma reação igual e oposta — ao empurrar a parede, ela exerce força contrária em você.",
      incorrect:
        "Procure a alternativa que destaque a presença de forças de ação e reação atuando em pares.",
    },
  },
  {
    title: "Questão 9",
    statement:
      "Por que um foguete consegue subir expulsando gases para trás?",
    options: [
      {
        text: "Porque os gases exercem uma força de reação para cima, igual e oposta à força com que são expelidos para baixo.",
        correct: true,
      },
      {
        text: "Porque a ausência de gravidade no espaço elimina qualquer força contrária ao movimento.",
        correct: false,
      },
      {
        text: "Porque a massa do foguete diminui e ele se torna automaticamente mais leve.",
        correct: false,
      },
      {
        text: "Porque os gases criam vácuo à frente do foguete, puxando-o para cima.",
        correct: false,
      },
    ],
    feedback: {
      correct:
        "O princípio de ação e reação explica o movimento: o foguete empurra os gases para trás e recebe um empurrão para cima de mesma intensidade.",
      incorrect:
        "Lembre que o foguete se move graças à força de reação gerada ao expelir os gases, conforme a Terceira Lei.",
    },
  },
  {
    title: "Questão 10",
    statement:
      "Ao disparar uma arma, o atirador sente um forte recuo. O que a Terceira Lei de Newton nos diz sobre essa situação?",
    options: [
      {
        text: "A bala empurra a arma para trás com a mesma intensidade que a arma empurra a bala para frente.",
        correct: true,
      },
      {
        text: "A arma recua porque seu peso aumenta subitamente durante o disparo.",
        correct: false,
      },
      {
        text: "A arma recua porque a força resultante sobre ela é sempre zero.",
        correct: false,
      },
      {
        text: "O recuo ocorre porque a Primeira Lei impede o movimento da arma.",
        correct: false,
      },
    ],
    feedback: {
      correct:
        "A ação de empurrar a bala gera uma reação de mesma intensidade em sentido contrário sobre a arma, causando o recuo.",
      incorrect:
        "A Terceira Lei garante que, ao exercer força sobre a bala, a arma recebe força contrária de igual intensidade.",
    },
  },
];

const quizElement = document.getElementById("quiz");
const template = document.getElementById("question-template");

function handleAnswer(questionElement, button, option, feedback) {
  const feedbackElement = questionElement.querySelector(".question__feedback");

  if (questionElement.dataset.answered === "true") {
    return;
  }

  if (button.getAttribute("aria-disabled") === "true") {
    return;
  }

  if (option.correct) {
    feedbackElement.textContent = `Acertou! ${feedback.correct}`;
    feedbackElement.classList.remove("incorrect");
    feedbackElement.classList.add("correct");

    const optionButtons = questionElement.querySelectorAll(".option-button");
    optionButtons.forEach((btn) => {
      btn.setAttribute("aria-disabled", "true");
      if (btn === button) {
        btn.classList.add("correct");
      } else {
        btn.classList.remove("incorrect");
      }
    });

    questionElement.dataset.answered = "true";
  } else {
    feedbackElement.textContent = `Você errou. ${feedback.incorrect}`;
    feedbackElement.classList.remove("correct");
    feedbackElement.classList.add("incorrect");

    button.classList.add("incorrect");
    button.setAttribute("aria-disabled", "true");
  }
}

questions.forEach((question, index) => {
  const fragment = template.content.cloneNode(true);
  const questionElement = fragment.querySelector(".question");
  const titleElement = fragment.querySelector(".question__title");
  const statementElement = fragment.querySelector(".question__statement");
  const optionsContainer = fragment.querySelector(".question__options");

  const titleId = `question-${index + 1}`;
  titleElement.id = titleId;
  titleElement.textContent = question.title;
  questionElement.setAttribute("aria-labelledby", titleId);

  statementElement.textContent = question.statement;

  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = option.text;
    button.setAttribute(
      "aria-label",
      `Alternativa ${String.fromCharCode(65 + optionIndex)}: ${option.text}`
    );

    button.addEventListener("click", () =>
      handleAnswer(questionElement, button, option, question.feedback)
    );

    optionsContainer.appendChild(button);
  });

  quizElement.appendChild(fragment);
});
