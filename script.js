document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 가져오기
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

    // 게임 상태 변수
    let currentQuestionIndex = 0;
    let scores = {}; // 각 정치인별 선택 횟수를 저장 (누가 더 많이 선택되었는지)

    // 정치인 정보 (실제 정치인 및 설명 업데이트)
    const politicians = {
        ardern: {
            name: "자신다 아던",
            description: "시민 목소리를 존중하고 직접 참여를 통해 정책 방향을 조율하는 데 중점을 둡니다. 기후 비상사태 선언 후 시민 협의회 운영 등 시민 기반의 기후 정책을 추진합니다.",
            emoji: "🇳🇿" // 뉴질랜드 국기
        },
        macron: {
            name: "에마뉘엘 마크롱",
            description: "정책 기조는 유지하되, 시위 원인을 파악해 보완하고 탄소세 조정이나 보조금 등 산업 부담 완화책을 병행합니다. 실용적인 접근과 절충을 중시합니다.",
            emoji: "🇫🇷" // 프랑스 국기
        },
        biden: {
            name: "조 바이든",
            description: "정책 추진은 계속하되, 반발을 줄이는 보완책과 인센티브 방식을 병행합니다. 기술 투자와 세제 혜택을 통해 산업 전환 및 기후 복원 인프라 투자를 유도합니다.",
            emoji: "🇺🇸" // 미국 국기
        },
        xi: {
            name: "시진핑",
            description: "국가 목표를 최우선으로 두며, 정책 추진을 위해 시위를 관리하거나 통제합니다. 국영기업을 포함해 목표 이행을 정부가 일률적으로 강제하는 중앙집권적 정책을 펼칩니다.",
            emoji: "🇨🇳" // 중국 국기
        },
        bolsonaro: {
            name: "자이르 보우소나루",
            description: "경제 성장과 산업 개발을 우선시하며, 환경 규제를 최소화하거나 사실상 자율에 맡깁니다. 정책에 방해가 되는 환경 단체 활동을 통제하는 등 강경 대응을 고려합니다.",
            emoji: "🇧🇷" // 브라질 국기
        }
    };

    // 질문 목록 (제공해주신 10개의 질문과 선택지, 정치인 매핑 반영)
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

    // 점수 초기화 함수
    function initializeScores() {
        for (const key in politicians) {
            scores[key] = 0;
        }
    }

    // 질문 표시 함수
    function displayQuestion() {
        const questionData = questions[currentQuestionIndex];
        questionText.textContent = `${currentQuestionIndex + 1}. ${questionData.question}`;
        choicesContainer.innerHTML = ''; // 기존 선택지 비우기
        nextButton.disabled = true; // 선택 전에는 '다음' 버튼 비활성화

        questionData.choices.forEach(choice => {
            const button = document.createElement('button');
            button.classList.add('choice-button');
            button.textContent = choice.text;
            button.dataset.value = choice.value; // 선택지 값 (정치인 키) 저장
            button.addEventListener('click', () => selectChoice(button, choice.value));
            choicesContainer.appendChild(button);
        });

        // 질문 번호 업데이트
        currentQuestionNum.textContent = currentQuestionIndex + 1;
        totalQuestionsNum.textContent = questions.length;
        updateProgressBar(); // 진행 바 업데이트
    }

    // 선택지 선택 처리 함수
    let selectedChoiceButton = null; // 현재 선택된 버튼 참조
    function selectChoice(button, politicianValue) {
        if (selectedChoiceButton) {
            selectedChoiceButton.classList.remove('selected'); // 이전에 선택된 버튼의 스타일 제거
        }
        button.classList.add('selected'); // 새롭게 선택된 버튼에 스타일 적용
        selectedChoiceButton = button; // 현재 선택된 버튼 업데이트
        nextButton.disabled = false; // '다음' 버튼 활성화
        quizScreen.dataset.currentSelection = politicianValue; // 선택된 정치인 값 임시 저장
    }

    // 진행 바 업데이트 함수
    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // 화면 전환 함수
    function showScreen(screenToShow) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active'); // 모든 화면 비활성화
        });
        screenToShow.classList.add('active'); // 특정 화면 활성화
    }

    // 결과 표시 함수
    function showResults() {
        showScreen(resultsScreen); // 결과 화면 표시

        let maxScore = 0;
        let mostSimilar = '';

        // 가장 많이 선택된 정치인 찾기
        for (const key in scores) {
            if (scores[key] > maxScore) {
                maxScore = scores[key];
                mostSimilar = key;
            } else if (scores[key] === maxScore) {
                // 동점일 경우, 먼저 발견된 정치인으로 유지 (순서는 임의적)
            }
        }

        const resultPolitician = politicians[mostSimilar];
        mostSimilarPolitician.textContent = `${resultPolitician.emoji} ${resultPolitician.name}`;
        politicianDescription.textContent = resultPolitician.description;

        // 모든 정치인 정보 표시
        allPoliticiansInfo.innerHTML = '';
        for (const key in politicians) {
            const p = politicians[key];
            const card = document.createElement('div');
            card.classList.add('politician-card');
            card.innerHTML = `
                <h4>${p.emoji} ${p.name}</h4>
                <p><strong>설명:</strong> ${p.description}</p>
                <p><strong>당신과의 유사도 점수:</strong> ${scores[key] || 0}점</p>
            `;
            allPoliticiansInfo.appendChild(card);
        }
    }

    // 이벤트 리스너
    startButton.addEventListener('click', () => {
        initializeScores(); // 점수 초기화
        currentQuestionIndex = 0; // 첫 질문으로 리셋
        showScreen(quizScreen); // 퀴즈 화면 표시
        displayQuestion(); // 첫 질문 로드
    });

    nextButton.addEventListener('click', () => {
        const selectedPolitician = quizScreen.dataset.currentSelection;
        if (selectedPolitician) {
            scores[selectedPolitician]++; // 선택된 정치인의 점수 증가
            delete quizScreen.dataset.currentSelection; // 현재 선택 해제
            selectedChoiceButton = null; // 선택된 버튼 리셋
        }

        currentQuestionIndex++; // 다음 질문으로
        if (currentQuestionIndex < questions.length) {
            displayQuestion(); // 다음 질문 표시
        } else {
            showResults(); // 모든 질문 완료 시 결과 표시
        }
    });

    restartButton.addEventListener('click', () => {
        showScreen(introScreen); // 인트로 화면으로 돌아가기
    });

    // 페이지 로드 시 초기 화면 설정
    showScreen(introScreen);
});
