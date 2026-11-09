function flipCard(element, cardName, cardMeaning) {
    if (element.classList.contains('flipped')) return;

    element.classList.add('flipped');

    const resultBox = document.getElementById('result-box');
    resultBox.innerHTML = `
        <h2>선택하신 카드: ${cardName}</h2>
        <p>${cardMeaning}</p>
    `;
}
