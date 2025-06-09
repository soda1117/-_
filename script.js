// DOM 요소 가져오기
const introScreen = document.getElementById('intro-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const progressBar = document.getElementById('progress-bar');
const questionText = document.getElementById('question-text');
const choicesContainer = document.getElementById('choices-container');
const currentQuestionNumSpan = document.getElementById('current-question-num');
const totalQuestionsNumSpan = document.getElementById('total-questions-num');
const mostSimilarPolitician = document.getElementById('most-similar-politician');
const politicianDescription = document.getElementById('politician-description');
const allPoliticiansInfo = document.getElementById('all-politicians-info');

let currentQuestionIndex = 0;
let userAnswers = []; // 사용자가 선택한 답변의 가치 점수를 저장할 배열

// 퀴즈 데이터 (예시, 실제 데이터는 더 많을 수 있습니다)
const questions = [
    {
        question: "어떤 에너지 정책이 기후 변화 대응에 가장 중요하다고 생각하시나요?",
        choices: [
            { text: "재생 에너지 투자 확대 및 화석 연료 사용 전면 중단", value: { green: 5, democracy: 0, economy: 0 } },
            { text: "원자력 발전 비중을 유지하며 재생 에너지와 함께 발전", value: { green: 3, democracy: 0, economy: 1 } },
            { text: "기술 개발을 통해 화석 연료의 탄소 배출량 최소화", value: { green: 2, democracy: 0, economy: 2 } },
            { text: "경제 성장을 우선하고 에너지 수급 안정에 집중", value: { green: 0, democracy: 0, economy: 5 } }
        ]
    },
    {
        question: "환경 보호와 경제 성장 중 무엇이 더 우선되어야 할까요?",
        choices: [
            { text: "환경 보호가 최우선이며, 경제는 환경의 지속 가능성 안에서 추구되어야 한다.", value: { green: 5, democracy: 0, economy: 0 } },
            { text: "환경 보호와 경제 성장은 균형을 이루어야 한다.", value: { green: 3, democracy: 0, economy: 1 } },
            { text: "단기적인 경제 성장을 위해 환경 규제 완화도 고려할 수 있다.", value: { green: 1, democracy: 0, economy: 3 } },
            { text: "경제 성장이 모든 정책의 핵심이며, 환경은 나중에 고려될 문제이다.", value: { green: 0, democracy: 0, economy: 5 } }
        ]
    },
    {
        question: "기후 변화 해결을 위한 국제 협력에 대해 어떻게 생각하시나요?",
        choices: [
            { text: "국제 사회의 강력한 협약과 공동의 목표 설정이 필수적이다.", value: { green: 5, democracy: 1, economy: 0 } },
            { text: "각 국가의 자율성을 존중하되, 정보 공유 및 기술 지원은 필요하다.", value: { green: 3, democracy: 2, economy: 1 } },
            { text: "자국의 이익을 우선하며, 강제적인 국제 협약은 지양해야 한다.", value: { green: 1, democracy: 4, economy: 3 } },
            { text: "국제 협력은 자국 경제에 도움이 될 때만 참여한다.", value: { green: 0, democracy: 5, economy: 5 } }
        ]
    },
    {
        question: "시민들의 환경 운동 참여에 대해 어떤 입장이신가요?",
        choices: [
            { text: "시민 운동은 중요한 변화의 동력이며 적극 장려해야 한다.", value: { green: 4, democracy: 5, economy: 0 } },
            { text: "시민들의 자발적인 참여는 중요하지만, 법과 질서 안에서 이루어져야 한다.", value: { green: 2, democracy: 3, economy: 1 } },
            { text: "과격한 환경 운동은 사회적 혼란을 야기하며 규제해야 한다.", value: { green: 1, democracy: 2, economy: 2 } },
            { text: "시민 운동보다는 정부와 기업의 역할이 더 중요하다.", value: { green: 0, democracy: 0, economy: 3 } }
        ]
    },
    {
        question: "재활용 및 폐기물 관리 시스템을 어떻게 개선해야 할까요?",
        choices: [
            { text: "생산 단계부터 재활용을 고려한 디자인과 강력한 폐기물 감축 목표 설정", value: { green: 5, democracy: 0, economy: 0 } },
            { text: "시민들의 분리수거 참여 독려 및 재활용 기술 투자 확대", value: { green: 3, democracy: 1, economy: 1 } },
            { text: "폐기물 소각 및 매립 기술을 고도화하여 효율적인 처리 추구", value: { green: 1, democracy: 0, economy: 3 } },
            { text: "기업의 자율적인 폐기물 감축 노력에 맡기고 정부 개입은 최소화", value: { green: 0, democracy: 2, economy: 5 } }
        ]
    }
];

// 정치인 데이터 (예시, 실제 데이터는 더 많을 수 있습니다)
const politicians = [
    {
        name: "지구의 수호자: 에코 그린 (Eco Green)",
        description: "환경 보호를 최우선으로 생각하며, 과감한 재생 에너지 전환과 친환경 정책을 강력히 추진합니다. 시민 참여와 국제 협력을 강조하며, 때로는 경제적 비용보다 환경적 가치를 더 중요하게 여깁니다.",
        values: { green: 5, democracy: 4, economy: 0 }
    },
    {
        name: "지속 가능한 개발자: 발란스 블루 (Balance Blue)",
        description: "환경 보호와 경제 성장의 균형을 중시합니다. 점진적인 재생 에너지 확대를 지지하며, 기술 혁신을 통해 환경 문제를 해결하려 합니다. 실용적이고 합리적인 접근을 선호합니다.",
        values: { green: 3, democracy: 2, economy: 3 }
    },
    {
        name: "자유 시장의 옹호자: 프로스퍼 레드 (Prosper Red)",
        description: "경제 성장과 시장의 자유를 최우선으로 여깁니다. 환경 규제는 기업 활동을 저해한다고 보고, 기술 개발을 통해 환경 문제를 해결할 수 있다고 믿습니다. 정부의 개입을 최소화하려는 경향이 있습니다.",
        values: { green: 0, democracy: 1, economy: 5 }
    },
    {
        name: "참여 민주주의자: 피플 옐로우 (People Yellow)",
        description: "시민의 목소리와 풀뿌리 민주주의를 가장 중요하게 생각합니다. 환경 문제 해결에 있어서도 시민들의 직접적인 참여와 의견 수렴을 통해 정책을 결정해야 한다고 주장합니다. 환경보다는 민주적 절차를 더 강조할 때도 있습니다.",
        values: { green: 2, democracy: 5, economy: 1 }
    }
];

// 게임 시작 함수
function startGame() {
    introScreen.classList.remove('active'); // 인트로 화면 숨기기
    quizScreen.classList.add('active'); // 퀴즈 화면 보이기

    currentQuestionIndex = 0;
    userAnswers = [];
    loadQuestion();
    updateProgressBar();
    updateQuestionCounter();
    nextButton.disabled = true; // 첫 질문 로드 시 '다음' 버튼 비활성화
}

// 질문 로드
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    choicesContainer.innerHTML = ''; // 기존 선택지 지우기

    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.classList.add('choice-button');
        button.textContent = choice.text;
        button.dataset.index = index; // 선택지 인덱스 저장
        button.addEventListener('click', () => selectChoice(button, choice.value));
        choicesContainer.appendChild(button);
    });
    nextButton.disabled = true; // 새로운 질문 로드 시 다음 버튼 비활성화
}

// 선택지 선택
function selectChoice(selectedButton, value) {
    // 모든 선택지에서 'selected' 클래스 제거
    Array.from(choicesContainer.children).forEach(button => {
        button.classList.remove('selected');
    });

    // 선택된 버튼에 'selected' 클래스 추가
    selectedButton.classList.add('selected');

    // 사용자의 답변 저장
    userAnswers[currentQuestionIndex] = value;

    // '다음' 버튼 활성화
    nextButton.disabled = false;
}

// 다음 질문으로 이동
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        updateProgressBar();
        updateQuestionCounter();
    } else {
        showResults();
    }
}

// 진행 바 업데이트
function updateProgressBar() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// 질문 카운터 업데이트
function updateQuestionCounter() {
    currentQuestionNumSpan.textContent = currentQuestionIndex + 1;
    totalQuestionsNumSpan.textContent = questions.length;
}

// 결과 계산 및 표시
function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');

    const finalScores = { green: 0, democracy: 0, economy: 0 };

    // 사용자의 모든 답변을 합산하여 최종 점수 계산
    userAnswers.forEach(answer => {
        finalScores.green += answer.green || 0;
        finalScores.democracy += answer.democracy || 0;
        finalScores.economy += answer.economy || 0;
    });

    // 가장 유사한 정치인 찾기
    let closestPolitician = null;
    let minDifference = Infinity; // 차이점의 최소값을 저장

    politicians.forEach(politician => {
        // 각 정치인과의 '차이점'을 계산 (맨해튼 거리 또는 유클리드 거리 등)
        // 여기서는 간단하게 절대값 차이의 합을 사용
        const difference =
            Math.abs(finalScores.green - politician.values.green) +
            Math.abs(finalScores.democracy - politician.values.democracy) +
            Math.abs(finalScores.economy - politician.values.economy);

        if (difference < minDifference) {
            minDifference = difference;
            closestPolitician = politician;
        }
    });

    if (closestPolitician) {
        mostSimilarPolitician.textContent = closestPolitician.name;
        politicianDescription.textContent = closestPolitician.description;
    } else {
        mostSimilarPolitician.textContent = "결과를 찾을 수 없습니다.";
        politicianDescription.textContent = "오류가 발생했습니다.";
    }

    // 모든 정치인 정보 표시
    allPoliticiansInfo.innerHTML = '';
    politicians.forEach(politician => {
        const card = document.createElement('div');
        card.classList.add('politician-card');
        card.innerHTML = `
            <h4>${politician.name}</h4>
            <p>${politician.description}</p>
            <p><strong>주요 가치:</strong></p>
            <p>환경 보호: ${politician.values.green}/5, 민주적 가치: ${politician.values.democracy}/5, 경제 성장: ${politician.values.economy}/5</p>
        `;
        allPoliticiansInfo.appendChild(card);
    });
}

// 게임 재시작
function restartGame() {
    resultsScreen.classList.remove('active');
    introScreen.classList.add('active'); // 인트로 화면으로 돌아가기 (Start Game 버튼 다시 표시)

    // 모든 변수 초기화
    currentQuestionIndex = 0;
    userAnswers = [];
    progressBar.style.width = '0%';
    nextButton.disabled = true; // 재시작 시 다음 버튼 비활성화
    // 다시 시작 버튼을 누르도록 대기
}

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', () => {
    totalQuestionsNumSpan.textContent = questions.length; // 전체 질문 수 초기 설정

    // 시작 버튼 클릭 이벤트
    if (startButton) {
        startButton.addEventListener('click', startGame);
    }

    // 다음 버튼 클릭 이벤트
    if (nextButton) {
        nextButton.addEventListener('click', nextQuestion);
    }

    // 재시작 버튼 클릭 이벤트
    if (restartButton) {
        restartButton.addEventListener('click', restartGame);
    }
});
