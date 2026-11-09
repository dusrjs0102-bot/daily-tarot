// 타로 카드 데이터 리스트 (원하는 만큼 추가 가능)
const tarotPool = [
    { name: "바보 (The Fool)", meaning: "새로운 시작과 도전의 시기입니다." },
    { name: "마법사 (The Magician)", meaning: "당신의 재능과 잠재력이 발휘될 때입니다." },
    { name: "여사제 (The High Priestess)", meaning: "직관을 믿고 신중하게 결정하세요." },
    { name: "여황제 (The Empress)", meaning: "풍요롭고 따뜻한 사랑이 찾아옵니다." },
    { name: "황제 (The Emperor)", meaning: "리더십을 발휘하고 체계를 잡아야 할 때입니다." },
    { name: "연인들 (The Lovers)", meaning: "중요한 선택이나 좋은 인연을 만날 수 있습니다." },
    { name: "전차 (The Chariot)", meaning: "굳은 의지로 목표를 향해 전진하세요." }
];

let isChosen = false; // 이미 카드를 골랐는지 체크

// 화면이 열릴 때 타로 카드 여러 장(예: 8장)을 화면에 생성
function initCards() {
    const cardList = document.getElementById('card-list');
    
    // 예시로 8장의 뒷면 카드 생성
    for (let i = 0; i < 8; i++) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'tarot-card';
        
        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-back">TAROT</div>
                <div class="card-front" id="front-${i}"></div>
            </div>
        `;
        
        // 클릭했을 때 이벤트 연결
        cardDiv.addEventListener('click', function() {
            if (isChosen) return; // 이미 골랐다면 무시
            isChosen = true;

            // 타로 풀에서 무작위로 하나 선택
            const randomIndex = Math.floor(Math.random() * tarotPool.length);
            const selectedTarot = tarotPool[randomIndex];

            // 선택된 카드의 앞면에 결과 세팅
            const frontDiv = document.getElementById(`front-${i}`);
            frontDiv.innerHTML = `🃏<br><b>${selectedTarot.name}</b>`;

            // 뒤집기 애니메이션 클래스 추가
            cardDiv.classList.add('flipped');

            // 결과 텍스트 출력
            const resultBox = document.getElementById('result-box');
            resultBox.innerHTML = `
                <h2>선택하신 카드: ${selectedTarot.name}</h2>
                <p>${selectedTarot.meaning}</p>
            `;
        });

        cardList.appendChild(cardDiv);
    }
}

// 실행
initCards();
