// 타로 카드 데이터 (이미지 주소, 이름, 의미 포함)
const tarotPool = [
    { 
        name: "바보 (The Fool)", 
        meaning: "새로운 시작과 도전의 시기입니다.", 
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80" 
    },
    { 
        name: "마법사 (The Magician)", 
        meaning: "당신의 재능과 잠재력이 발휘될 때입니다.", 
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80" 
    },
    { 
        name: "여사제 (The High Priestess)", 
        meaning: "직관을 믿고 신중하게 결정하세요.", 
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80" 
    },
    { 
        name: "여황제 (The Empress)", 
        meaning: "풍요롭고 따뜻한 사랑이 찾아옵니다.", 
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80" 
    },
    { 
        name: "황제 (The Emperor)", 
        meaning: "리더십을 발휘하고 체계를 잡아야 할 때입니다.", 
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80" 
    },
    { 
        name: "연인들 (The Lovers)", 
        meaning: "중요한 선택이나 좋은 인연을 만날 수 있습니다.", 
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80" 
    }
];

let isChosen = false;

function initCards() {
    const cardList = document.getElementById('card-list');
    
    // 8장의 뒷면 카드 생성
    for (let i = 0; i < 8; i++) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'tarot-card';
        
        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-back">TAROT</div>
                <div class="card-front" id="front-${i}"></div>
            </div>
        `;
        
        cardDiv.addEventListener('click', function() {
            if (isChosen) return;
            isChosen = true;

            // 무작위 카드 선택
            const randomIndex = Math.floor(Math.random() * tarotPool.length);
            const selectedTarot = tarotPool[randomIndex];

            // 앞면에 이미지와 글자 채우기
            const frontDiv = document.getElementById(`front-${i}`);
            frontDiv.innerHTML = `
                <img src="${selectedTarot.image}" alt="${selectedTarot.name}">
                <span>${selectedTarot.name}</span>
            `;

            // 뒤집기
            cardDiv.classList.add('flipped');

            // 하단 결과 출력
            const resultBox = document.getElementById('result-box');
            resultBox.innerHTML = `
                <h2>선택하신 카드: ${selectedTarot.name}</h2>
                <p>${selectedTarot.meaning}</p>
            `;
        });

        cardList.appendChild(cardDiv);
    }
}

initCards();
