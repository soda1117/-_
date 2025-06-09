document.addEventListener('DOMContentLoaded', () => {
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

    let currentQuestionIndex = 0;
    let scores = {}; // To store counts for each politician

    const politicians = {
        terra: {
            name: "President Terra",
            description: "An idealist advocating for radical, immediate shifts to 100% renewable energy, strict carbon pricing, extensive rewilding, and international climate justice. Believes in planetary limits and degrowth models. Emphasizes participatory democracy and global cooperation.",
            emoji: "🌱"
        },
        ecoGrowth: {
            name: "Senator Eco-Growth",
            description: "A technocratic innovator focused on technological solutions (CCS, nuclear, geoengineering research), green industrial growth, and market-based incentives for sustainability. Believes in decoupling growth from emissions. Emphasizes expert-led governance and efficient public administration.",
            emoji: "💡"
        },
        sustain: {
            name: "Governor Sustain",
            description: "A pragmatic balancer supporting gradual transition to renewables, investments in climate-resilient infrastructure, responsible resource management, and international agreements with flexible targets. Seeks balance between environmental protection and economic stability. Believes in consensus-building and incremental reform.",
            emoji: "⚖️"
        },
        urban: {
            name: "Mayor Urban",
            description: "A local steward prioritizing localized solutions: urban farming, public transport expansion, community-led conservation, and waste reduction programs. Focuses on direct community benefits from environmental action. Strong belief in local autonomy and direct community engagement.",
            emoji: "🏡"
        },
        proEconomy: {
            name: "Representative Pro-Economy",
            description: "An advocate for prioritizing economic development and job creation, viewing environmental regulations as potential hindrances. Advocates for traditional energy sources and minimal government intervention. Emphasizes individual economic freedom and national sovereignty.",
            emoji: "📈"
        }
    };

    const questions = [
        {
            question: "What is the most effective approach to reducing global carbon emissions?",
            choices: [
                { text: "Immediately phasing out all fossil fuels globally, even if it causes short-term economic disruption, and investing massively in regenerative systems.", value: "terra" },
                { text: "Investing heavily in carbon capture technologies, advanced nuclear power, and green industrial innovation to make existing industries sustainable.", value: "ecoGrowth" },
                { text: "Implementing a phased transition to renewable energy, supporting international climate agreements, and investing in climate-resilient infrastructure.", value: "sustain" },
                { text: "Focusing on local community initiatives like public transport expansion and incentivizing household energy efficiency.", value: "urban" },
                { text: "Prioritizing economic growth and letting market forces and voluntary industry innovation drive emissions reductions over time.", value: "proEconomy" }
            ]
        },
        {
            question: "How should international climate agreements be enforced?",
            choices: [
                { text: "Through strong, legally binding international bodies with the power to penalize non-compliant nations and redistribute resources for climate justice.", value: "terra" },
                { text: "By developing global technological standards and fostering competition among nations to develop the most efficient green technologies.", value: "ecoGrowth" },
                { text: "Through collaborative diplomacy, setting achievable targets, and providing aid to developing nations for green transitions.", value: "sustain" },
                { text: "By focusing on regional pacts and sister-city initiatives that promote local climate action and knowledge sharing.", value: "urban" },
                { text: "Climate policies should primarily be decided by individual sovereign nations based on their own economic interests.", value: "proEconomy" }
            ]
        },
        {
            question: "Regarding land use and biodiversity, what is your priority?",
            choices: [
                { text: "Extensive rewilding, protecting at least 50% of land and ocean, and prioritizing ecosystem health over immediate human economic gain.", value: "terra" },
                { text: "Implementing smart agriculture with genetic engineering and precision farming to maximize yields on less land, allowing for some conservation.", value: "ecoGrowth" },
                { text: "Balancing agricultural needs with conservation, promoting sustainable forestry, and protecting key endangered species habitats.", value: "sustain" },
                { text: "Creating urban green spaces, promoting community gardens, and supporting local conservation efforts.", value: "urban" },
                { text: "Utilizing natural resources for economic development, while ensuring minimal environmental impact through industry best practices.", value: "proEconomy" }
            ]
        },
        {
            question: "What role should government play in transitioning to a green economy?",
            choices: [
                { text: "A leading, transformative role, actively restructuring industries and supporting public ownership of key green infrastructure.", value: "terra" },
                { text: "A role as an enabler and investor in research and development, setting broad goals, and offering incentives for private sector innovation.", value: "ecoGrowth" },
                { text: "A regulatory and supportive role, providing subsidies for green technologies and managing a fair transition for workers.", value: "sustain" },
                { text: "Empowering local communities with grants and resources to implement their own green projects and initiatives.", value: "urban" },
                { text: "A minimal role, allowing the free market to adapt and innovate without heavy government intervention.", value: "proEconomy" }
            ]
        },
        {
            question: "How should the burden of climate change adaptation be distributed?",
            choices: [
                { text: "Richer nations and historical polluters must bear the majority of the financial and technological burden, ensuring climate justice for vulnerable communities.", value: "terra" },
                { text: "Through international funds and expert-led programs that identify and invest in the most technologically sound adaptation projects globally.", value: "ecoGrowth" },
                { text: "A shared global responsibility, with differentiated commitments based on capacity and historical emissions, and international aid for vulnerable nations.", value: "sustain" },
                { text: "Local communities should be empowered to build their own resilience through community-led infrastructure and mutual aid networks.", value: "urban" },
                { text: "Each nation is primarily responsible for its own adaptation efforts, based on its economic capabilities.", value: "proEconomy" }
            ]
        },
        {
            question: "What is the most pressing aspect of environmental education?",
            choices: [
                { text: "Fostering a deep ecological understanding and critical awareness of systemic environmental injustices from an early age.", value: "terra" },
                { text: "Training a new generation of scientists and engineers to develop cutting-edge green technologies.", value: "ecoGrowth" },
                { text: "Teaching sustainable practices and promoting environmental literacy across all age groups through public campaigns and school curricula.", value: "sustain" },
                { text: "Empowering citizens with practical skills for sustainable living, such as composting, gardening, and energy saving at a local level.", value: "urban" },
                { text: "Educating about the importance of resource management and efficiency for economic competitiveness.", value: "proEconomy" }
            ]
        },
        {
            question: "How should energy consumption be addressed in daily life?",
            choices: [
                { text: "Through systemic changes that drastically reduce overall energy demand and shift to communal, renewable energy systems.", value: "terra" },
                { text: "By developing smart grids and advanced home technologies that optimize energy efficiency and integrate with renewable sources.", value: "ecoGrowth" },
                { text: "Encouraging individual energy saving habits and promoting widespread adoption of renewable energy in homes and businesses.", value: "sustain" },
                { text: "Supporting local renewable energy cooperatives and encouraging community-level energy independence.", value: "urban" },
                { text: "Allowing market forces to determine energy prices, which will naturally incentivize efficiency.", value: "proEconomy" }
            ]
        },
        {
            question: "What is your stance on sustainable consumption and waste?",
            choices: [
                { text: "Moving towards a circular economy with zero waste, prioritizing repair, reuse, and drastic reduction in production.", value: "terra" },
                { text: "Innovating new materials and recycling technologies to minimize waste, and developing efficient industrial processes.", value: "ecoGrowth" },
                { text: "Promoting recycling programs, reducing single-use plastics, and encouraging responsible consumer choices.", value: "sustain" },
                { text: "Establishing local composting initiatives, community repair shops, and bulk stores to reduce waste at the neighborhood level.", value: "urban" },
                { text: "Allowing consumer demand to drive production, with industry taking voluntary steps to improve sustainability of products.", value: "proEconomy" }
            ]
        },
        {
            question: "When faced with a choice between economic growth and environmental protection, what should be prioritized?",
            choices: [
                { text: "Environmental protection, as ecological stability is the foundation for all long-term well-being and genuine prosperity.", value: "terra" },
                { text: "Smart, green economic growth that decouples prosperity from resource depletion and pollution.", value: "ecoGrowth" },
                { text: "Finding a balance where environmental protection is integrated into economic planning, aiming for sustainable development.", value: "sustain" },
                { text: "Local environmental quality and community well-being, even if it means foregoing some larger-scale industrial development.", value: "urban" },
                { text: "Economic growth, as it provides the resources necessary to address environmental issues in the future.", value: "proEconomy" }
            ]
        },
        {
            question: "What is the ideal decision-making process for environmental policies?",
            choices: [
                { text: "Deeply democratic processes involving citizen assemblies, direct participation, and empowering marginalized voices.", value: "terra" },
                { text: "Expert-driven policymaking based on scientific evidence, data analysis, and technological feasibility studies.", value: "ecoGrowth" },
                { text: "Representative democracy with strong public consultation, cross-party consensus-building, and independent regulatory bodies.", value: "sustain" },
                { text: "Decentralized decision-making, allowing local communities to tailor environmental policies to their specific needs and contexts.", value: "urban" },
                { text: "Decisions primarily made by elected representatives with minimal interference, focusing on national economic competitiveness.", value: "proEconomy" }
            ]
        }
    ];

    // Initialize scores
    function initializeScores() {
        for (const key in politicians) {
            scores[key] = 0;
        }
    }

    // Display a question
    function displayQuestion() {
        const questionData = questions[currentQuestionIndex];
        questionText.textContent = `${currentQuestionIndex + 1}. ${questionData.question}`;
        choicesContainer.innerHTML = '';
        nextButton.disabled = true; // Disable next button until a choice is made

        questionData.choices.forEach(choice => {
            const button = document.createElement('button');
            button.classList.add('choice-button');
            button.textContent = choice.text;
            button.dataset.value = choice.value;
            button.addEventListener('click', () => selectChoice(button, choice.value));
            choicesContainer.appendChild(button);
        });

        currentQuestionNum.textContent = currentQuestionIndex + 1;
        totalQuestionsNum.textContent = questions.length;
        updateProgressBar();
    }

    // Handle choice selection
    let selectedChoiceButton = null;
    function selectChoice(button, politicianValue) {
        if (selectedChoiceButton) {
            selectedChoiceButton.classList.remove('selected');
        }
        button.classList.add('selected');
        selectedChoiceButton = button;
        nextButton.disabled = false;
        // Temporarily store selected value for current question
        // This will be added to scores when 'Next' is clicked
        quizScreen.dataset.currentSelection = politicianValue;
    }

    // Update progress bar
    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Show screen
    function showScreen(screenToShow) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        screenToShow.classList.add('active');
    }

    // Calculate results
    function showResults() {
        showScreen(resultsScreen);
        let maxScore = 0;
        let mostSimilar = '';

        for (const key in scores) {
            if (scores[key] > maxScore) {
                maxScore = scores[key];
                mostSimilar = key;
            } else if (scores[key] === maxScore) {
                // Handle ties: if tied, the first one encountered (or could add more complex tie-breaking logic)
                // For simplicity, we'll just keep the first one found in case of a tie.
            }
        }

        const resultPolitician = politicians[mostSimilar];
        mostSimilarPolitician.textContent = `${resultPolitician.emoji} ${resultPolitician.name}`;
        politicianDescription.textContent = resultPolitician.description;

        // Display all politicians' info
        allPoliticiansInfo.innerHTML = '';
        for (const key in politicians) {
            const p = politicians[key];
            const card = document.createElement('div');
            card.classList.add('politician-card');
            card.innerHTML = `
                <h4>${p.emoji} ${p.name}</h4>
                <p><strong>Description:</strong> ${p.description}</p>
                <p><strong>Your Score:</strong> ${scores[key] || 0} points</p>
            `;
            allPoliticiansInfo.appendChild(card);
        }
    }

    // Event Listeners
    startButton.addEventListener('click', () => {
        initializeScores();
        currentQuestionIndex = 0;
        showScreen(quizScreen);
        displayQuestion();
    });

    nextButton.addEventListener('click', () => {
        const selectedPolitician = quizScreen.dataset.currentSelection;
        if (selectedPolitician) {
            scores[selectedPolitician]++;
            delete quizScreen.dataset.currentSelection; // Clear selection for next question
            selectedChoiceButton = null; // Reset selected button
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResults();
        }
    });

    restartButton.addEventListener('click', () => {
        showScreen(introScreen);
    });

    // Initial load
    showScreen(introScreen);
});
