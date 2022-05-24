//adding selectors to bring in section


const playerLivesCount = document.querySelector('span');
let playerLives = 6;
const gameOver = "Game Over Kook, refresh page to try again"

//Link text with lives

playerLivesCount.textContent = playerLives;

//generate card data

const getData = () => [
    {imgSrc:'./images/Bobby_Quad_Featured_Curren.webp', board: 'Bobby Quad'},
    {imgSrc:'./images/Bobby-Logo-BB.webp', board: 'Bobby Quad'},
    {imgSrc:'./images/CI_Fish_Featured_Image.webp', board: 'CI Fish'},
    {imgSrc:'./images/CI_Fish_Logo_Site.webp', board: 'CI Fish'},
    {imgSrc:'./images/FishBeard_Web_Featured-Image.webp', board: 'FishBeard'},
    {imgSrc:'./images/FishBeard-logo-200px.webp', board: 'FishBeard'},
    {imgSrc:'./images/Free_Scrubber_Featured_Image.webp', board: 'Free Scrubber'},
    {imgSrc:'./images/Free-Scrubber-Logo-BB.webp', board: 'Free Scrubber'},
    {imgSrc:'./images/Happy_Everyday_Featured_Image.webp', board: 'Happy Everyday'},
    {imgSrc:'./images/Happy-Everyday-Logo-BB-v2.webp', board: 'Happy Everyday'},
    {imgSrc:'./images/Logo-Rocket-Wide-Squash-for-BB.webp', board: 'Rocket Wide Squash'},
    {imgSrc:'./images/rocket-wide-squash-featured-image-1228x2000.webp', board: 'Rocket Wide Squash'},
    {imgSrc:'./images/Mavs_Gun_Featured_Image.webp', board: 'Mavs Gun'},
    {imgSrc:'./images/Mavs_Gun_Logo.png', board: 'Mavs Gun'},
    {imgSrc:'./images/twin-pin-logo-194x205.webp', board: 'Twin Pin'},
    {imgSrc:'./images/twin-pin-seafoam-futures-featured-image.webp', board: 'Twin Pin'}
]



//randomize cards
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
}

//card html function

const generateCard = () => {
    const section = document.querySelector('section');

    const randomCardData = randomize();
    
    //loop through every card
    randomCardData.forEach(item => {
        console.log(item);
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        //add classes
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        //add image info
        face.src = item.imgSrc;
        card.setAttribute('board', item.board);
        console.log(item.board);
        //add to section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleFlip');
            checkCards(e);
        })
    })
    

}

//check for matches
const checkCards = (e, elem) => {
    const clickedCard = e.target;
    
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    
    
    
//Login for correct and incorrect matches
    if(flippedCards.length === 2) {
        if(flippedCards[0].parentElement.getAttribute('board') === flippedCards[1].parentElement.getAttribute('board')) {
            console.log('match');
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
            })
           
            

        } else {
            console.log('wrong');
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                setTimeout(() => card.parentElement.classList.remove('toggleFlip'), 1000);
            })

            playerLives -= 1;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                const game = document.getElementById('game');
                game.parentElement.removeChild(game);
                const lossTitle = document.createElement('h2');
                lossTitle.textContent = gameOver;
                const body = document.getElementById('body');
                body.appendChild(lossTitle);
            }
        }
    }

}

generateCard();