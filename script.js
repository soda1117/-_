document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const introScreen = document.getElementById('intro-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultsScreen = document.getElementById('results-screen');
    const startButton = document.getElementById('start-button');
    const nextButton = document.getElementById('next-button');
    const restartButton = document.getElementById('restart-button');
    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices-container');
    const progressBar = document.getElementById('progress-bar');
    const currentQuestionNum = document.getElementById('current-question-num');
    const totalQuestionsNum = document.getElementById('total-questions-num');
    const mostSimilarPolitician = document.getElementById('most-similar-politician');
    const politicianDescription = document.getElementById('politician-description');
    const allPoliticiansInfo = document.getElementById('all-politicians-info');

    // Game Data
    const politicians = {
        ardern: {
            name: "자신다 아던",
            description: "시민 목소리를 존중하고 직접 참여를 통해 정책 방향을 조율하는 데 중점을 둡니다. 기후 비상사태 선언 후 시민 협의회 운영 등 시민 기반의 기후 정책을 추진합니다.",
            emoji: "🇳🇿"
        },
        macron: {
            name: "에마뉘엘 마크롱",
            description: "정책 기조는 유지하되, 시위 원인을 파악해 보완하고 탄소세 조정이나 보조금 등 산업 부담 완화책을 병행합니다. 실용적인 접근과 절충을 중시합니다.",
            emoji: "🇫🇷"
        },
        biden: {
            name: "조 바이든",
            description: "정책 추진은 계속하되, 반발을 줄이는 보완책과 인센티브 방식을 병행합니다. 기술 투자와 세제 혜택을 통해 산업 전환 및 기후 복원 인프라 투자를 유도합니다.",
            emoji: "🇺🇸"
        },
        xi: {
            name: "시진핑",
            description: "국가 목표를 최우선으로 두며, 정책 추진을 위해 시위를 관리하거나 통제합니다. 국영기업을 포함해 목표 이행을 정부가 일률적으로 강제하는 중앙집권적 정책을 펼칩니다.",
            emoji: "🇨🇳"
        },
        bolsonaro: {
            name: "자이르 보우소나루",
            description: "경제 성장과 산업 개발을 우선시하며, 환경 규제를 최소화하거나 사실상 자율에 맡깁니다. 정책에 방해가 되는 환경 단체 활동을 통제하는 등 강경 대응을 고려합니다.",
            emoji: "🇧🇷"
        }
    };

    const questions = [
        {
            question: "시민들이 기후 정책에 반발하거나 시위할 경우, 정부의 태도는?",
            choices: [
                { text: "시민 목소리를 존중하며 정책 방향과 방법을 조율한다.", value: "ardern" },
                { text: "시위 원인을 파악해 보완하되 정책 기조는 유지한다.", value: "macron" },
                { text: "정책 추진은 계속하되, 반발을 줄이는 보완책 병행한다.", value: "biden" },
                { text: "국가 목표 우선, 시위는 관리하되 통제한다.", value: "xi" },
                { text: "강경 대응, 정책에 방해가 되면 탄압까지도 정당하다.", value: "bolsonaro" }
            ]
        },
        {
            question: "탄소배출 많은 산업 규제 제안을 어떻게 다룰까?",
            choices: [
                { text: "다자 협의를 통해 사회적 합의를 도출한다.", value: "ardern" },
                { text: "목표는 유지하되, 산업 부담은 탄소세 조정이나 보조금으로 완화한다.", value: "macron" },
                { text: "기술 투자와 세제 혜택을 통해 산업 전환을 유도한다.", value: "biden" },
                { text: "국영기업 포함해 목표 이행을 정부가 일률적으로 강제한다.", value: "xi" },
                { text: "규제는 산업 성장 방해하니 사실상 자율로 둔다.", value: "bolsonaro" }
            ]
        },
        {
            question: "자동차 정책을 바꾸려면?",
            choices: [
                { text: "시민과 논의하여 지역별 맞춤 제한 조치를 도입한다.", value: "ardern" },
                { text: "유류세 조정과 전기차 보급 확대 병행한다.", value: "macron" },
                { text: "전기차 인프라 확대하며 점진적 전환을 추진한다.", value: "biden" },
                { text: "대도시는 차량 제한 구역 지정해 빠르게 실행한다.", value: "xi" },
                { text: "최소 규제, 산업·소비자 자유 우선이다.", value: "bolsonaro" }
            ]
        },
        {
            question: "산불·폭염 같은 기후 재난 대응 방법은?",
            choices: [
                { text: "주민 주도 복구 프로그램 중심으로 대응한다.", value: "ardern" },
                { text: "피해 지역에 재정 지원을 늘리고 보상 체계 구축한다.", value: "macron" },
                { text: "기후 복원 인프라에 투자하는 재난 대응 전략을 펴고 있다.", value: "biden" },
                { text: "중앙 정부 주도 시스템으로 지역 대응 일괄 관리한다.", value: "xi" },
                { text: "재난 대응보다 경제 복구를 우선시한다.", value: "bolsonaro" }
            ]
        },
        {
            question: "온실가스 감축 반발 대응은?",
            choices: [
                { text: "산업·시민·환경단체 등과 함께 협의회를 구성한다.", value: "ardern" },
                { text: "목표는 유지하고 산업 지원책도 병행 시행한다.", value: "macron" },
                { text: "녹색 기술 개발에 예산 집중하여 정책 저항을 완화한다.", value: "biden" },
                { text: "국영기업에까지 감축 의무를 부과하고 단호히 시행한다.", value: "xi" },
                { text: "산업 위축 우려 시 정책 재검토도 고려한다.", value: "bolsonaro" }
            ]
        },
        {
            question: "기후위기 교육 확대 시?",
            choices: [
                { text: "학생 직접 참여형 기후 교육을 운영한다.", value: "ardern" },
                { text: "산업·환경 연계 실용 교육 중심으로 개편한다.", value: "macron" },
                { text: "녹색 일자리 기반 STEM 교육을 확충한다.", value: "biden" },
                { text: "국가가 중심이 된 환경교육 체계로 통일 적용한다.", value: "xi" },
                { text: "자율에 맡기고 의무화는 지양한다.", value: "bolsonaro" }
            ]
        },
        {
            question: "재생에너지 시설 반발 대응?",
            choices: [
                { text: "주민 협의로 입지 결정, 동의를 우선한다.", value: "ardern" },
                { text: "인센티브 및 지역 개발 혜택을 함께 제공한다.", value: "macron" },
                { text: "지역경제와 연계된 그린 인프라를 추진한다.", value: "biden" },
                { text: "중앙정부에 의해 입지를 강제할 수 있다.", value: "xi" },
                { text: "반대 시 제외, 대체 방안 모색한다.", value: "bolsonaro" }
            ]
        },
        {
            question: "기후 불평등 완화 방안은?",
            choices: [
                { text: "원주민·취약계층 중심의 맞춤형 지원 정책을 시행한다.", value: "ardern" },
                { text: "차등 보조금+에너지 복지를 강화한다.", value: "macron" },
                { text: "녹색 일자리·인프라로 지역 불평등 개선을 지원한다.", value: "biden" },
                { text: "중앙 기준 균형으로 지역 간 격차를 통제한다.", value: "xi" },
                { text: "시장에 맡겨 불평등을 해결한다.", value: "bolsonaro" }
            ]
        },
        {
            question: "탄소세 도입 방식은?",
            choices: [
                { text: "공개토론 거쳐 사회적 합의를 통해 도입한다.", value: "ardern" },
                { text: "일부 환급 포함해 점진적으로 적용한다.", value: "macron" },
                { text: "세금수익을 청정에너지에 재투자하겠다고 명확히 한다.", value: "biden" },
                { text: "정부가 세율 정해 강제 시행한다.", value: "xi" },
                { text: "경제 부담 우려로 도입하지 않는다.", value: "bolsonaro" }
            ]
        },
        {
            question: "국제 기후회의에서의 정부 역할은?",
            choices: [
                { text: "시민 대표(청년 포함)와 동행하며 공동 발언을 한다.", value: "ardern" },
                { text: "EU 등 협력 틀 내에서 현실적 합의 도출을 목표로 한다.", value: "macron" },
                { text: "자국 산업 경쟁력 고려하며 선도국 이미지를 강조한다.", value: "biden" },
                { text: "개발도상국 입장 강조하며 자국 요구를 강하게 주장한다.", value: "xi" },
                { text: "주권·경제 보호 차원에서 협력은 최소화한다.", value: "bolsonaro" }
            ]
        }
    ];

    // State
    let currentQuestionIndex = 0;
    let scores = {};
    let selectedChoiceButton = null;

    // Helpers
    function initializeScores() {
        scores = {};
        for (const key in politicians) scores[key] = 0;
    }

    function showScreen(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
    }

    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function displayQuestion() {
        const questionData = questions[currentQuestionIndex];
        questionText.textContent = `${currentQuestionIndex + 1}. ${questionData.question}`;
        choicesContainer.innerHTML = '';
        nextButton.disabled = true;
        selectedChoiceButton = null;

        questionData.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.classList.add('choice-button');
            btn.textContent = choice.text;
            btn.dataset.value = choice.value;
            btn.onclick = () => selectChoice(btn, choice.value);
            choicesContainer.appendChild(btn);
        });

        currentQuestionNum.textContent = currentQuestionIndex + 1;
        totalQuestionsNum.textContent = questions.length;
        updateProgressBar();
    }

    function selectChoice(button, value) {
        if (selectedChoiceButton) selectedChoiceButton.classList.remove('selected');
        button.classList.add('selected');
        selectedChoiceButton = button;
        nextButton.disabled = false;
        quizScreen.dataset.currentSelection = value;
    }

    function showResults() {
        showScreen(resultsScreen);

        // max score politician (동점일 경우 먼저 등장하는 순서)
        let maxScore = -1;
        let mostSimilar = null;
        for (const key in scores) {
            if (scores[key] > maxScore) {
                maxScore = scores[key];
                mostSimilar = key;
            }
        }

        if (!mostSimilar) {
            mostSimilarPolitician.textContent = "결과를 알 수 없습니다.";
            politicianDescription.textContent = "질문에 답변이 없습니다.";
        } else {
            const result = politicians[mostSimilar];
            mostSimilarPolitician.textContent = `${result.emoji} ${result.name}`;
            politicianDescription.textContent = result.description;
        }

        // 모든 정치인 정보
        allPoliticiansInfo.innerHTML = '';
        for (const key in politicians) {
            const p = politicians[key];
            const card = document.createElement('div');
            card.className = 'politician-card';
            card.innerHTML = `
                <h4>${p.emoji} ${p.name}</h4>
                <p><strong>설명:</strong> ${p.description}</p>
                <p><strong>당신과의 유사도 점수:</strong> ${scores[key] || 0}점</p>
            `;
            allPoliticiansInfo.appendChild(card);
        }
    }

    // Event Listeners
    startButton.onclick = () => {
        initializeScores();
        currentQuestionIndex = 0;
        showScreen(quizScreen);
        displayQuestion();
    };

    nextButton.onclick = () => {
        const selectedValue = quizScreen.dataset.currentSelection;
        if (selectedValue) {
            scores[selectedValue]++;
            delete quizScreen.dataset.currentSelection;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    };

    restartButton.onclick = () => {
        showScreen(introScreen);
    };

    // Init
    showScreen(introScreen);
});
