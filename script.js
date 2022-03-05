const colorsList = [
    "b",
    "r", 
    "v", 
    "j", 
    "o"
]
const redButton = document.getElementById("red-btn")
const blueButton = document.getElementById("blue-btn")
const greenButton = document.getElementById("green-btn")
const yellowButton = document.getElementById("yellow-btn")
const orangeButton = document.getElementById("orange-btn")
const resetButton = document.getElementById("reset-btn")
const vldBtn = document.getElementById('validate-btn')
const refreshBtn = document.getElementById('refresh-btn')
const roundNumber = document.getElementById('round-circle')

let userArray = []
let r = 1


// Fonction qui génère 4 couleurs parmis une liste de max couleurs
function randomColorsGenerator(max, list) {

    let colorsSelectedList = []
    for (i=0;i<4;i++) {

        let randomIndex = Math.floor(Math.random() * max);
        colorsSelectedList.push(list[randomIndex])
    }
    return colorsSelectedList
}

// Fonction qui vérifie les couleurs bien et mal placée, et qui doit retourner la liste d'indice
function verification(userArr) {

    let goodSpotGoodColor = 0
    let badSpotGoodColor = 0

    // Copie de la séquence ordinateur à deviner
    let copyOfColorsSelectedList = colorsSelectedList.slice();

    // Boucle identifiant le nombre de couleur bien placée
    let i = 0
    while (i < userArr.length) {

        if (userArr[i] == copyOfColorsSelectedList[i] ){

            goodSpotGoodColor++;
            copyOfColorsSelectedList.splice(i,1)
            userArr.splice(i,1)

        } else {

            i++;
        }
    }

    // Boucle identifiant le nombre de couleur mal placée, si indexOf retourne un nombre positif, alors une couleur existe, mais est mal placée.
    i = 0
    while (i < userArr.length) {
        const positionColor = copyOfColorsSelectedList.indexOf(userArr[i])

        if (positionColor > -1) {

            badSpotGoodColor++;
            userArr.splice(i, 1)
            copyOfColorsSelectedList.splice(positionColor, 1)

        } else {
            i++;
        }
    }

    // Boucle colorant les points d'indice sur l'interface 
    amountOfColors = goodSpotGoodColor + badSpotGoodColor
    j = 1
    while (j <= amountOfColors) {

        for (rouge = 1; rouge <= goodSpotGoodColor; rouge++) {

            document.querySelector(`#indice-line-${r} .indice:nth-child(${j})`).style.background = "red";
            j++;
        }

        for (blanc = 1;blanc <= badSpotGoodColor; blanc++){

            document.querySelector(`#indice-line-${r} .indice:nth-child(${j})`).style.background = "white";
            j++;
        }   
    }
    return goodSpotGoodColor
}

// Fonction colorant un cercle, en fonction de la couleur cliquée
function setColor(colorLetter) {

    if (userArray.length < 4) {

        userArray.push(`${colorLetter}`)
        for (i = 1; i <= userArray.length; i++) {
            
            document.querySelector(`#line-${r} .colors:nth-child(${i})`).classList.add(userArray[i-1])
        }

    }
}

// Fonction appelé a la victoire, ou a la défaite, affichant les couleurs de l'ordinateur, donnant la possibilité de rejouer (rafraichir la page) et rendant impossible de cliquer sur les boutons  
function showResult(win,text) {

        let resultDiv = document.createElement("div")
        resultDiv.style.background="#00000060"
        resultDiv.style.backdropFilter="blur(10px)"
        resultDiv.style.webkitBackdropFilter= 'blur(5px)'
        resultDiv.style.width ="50%"
        resultDiv.style.height ="30%"
        resultDiv.style.position ="absolute"
        resultDiv.style.margin="0"
        resultDiv.style.borderRadius="20px"
        resultDiv.style.display = "flex"
        resultDiv.style.flexDirection = "column"
        resultDiv.style.justifyContent = "space-around"
        resultDiv.style.alignItems = "center"


        let resultText = document.createElement('span')
        resultText.style.fontSize = "300%"
        resultText.style.backgroundColor = "transparent"

        if (win) {

            resultText.style.color="rgb(9, 199, 9)"
        } else {

            resultText.style.color="red"
        }
        
        resultText.appendChild(document.createTextNode(text))
        


        let seqOrdi = document.createElement("div")
        seqOrdi.style.width="100%"
        seqOrdi.style.height= "60px"
        seqOrdi.style.display = "flex"
        seqOrdi.style.justifyContent = "space-around"
        seqOrdi.style.alignItems = "center"
        seqOrdi.style.backgroundColor = "#ffffff30"



        resultDiv.appendChild(resultText);
        resultDiv.appendChild(seqOrdi);
        // Boucle qui affiche les couleurs de l'ordinateur
        for (i=0; i<4; i++) {

            let colorsOrdi = document.createElement("div")
            colorsOrdi.classList.add("colors")
            colorsOrdi.classList.add(colorsSelectedList[i])
            seqOrdi.appendChild(colorsOrdi)
        }

        document.body.appendChild(resultDiv)
        resultDiv.style.boxShadow="10px 10px 100000px grey"

}

//  Au click de l'une d'un de ces boutons, on appelle la fonction setColor 
redButton.onclick = function(){setColor('r',r);};
blueButton.onclick = function(){setColor('b',r);};
greenButton.onclick = function(){setColor('v',r);};
yellowButton.onclick = function(){setColor('j',r);};
orangeButton.onclick = function(){setColor('o',r);};

// Vide le tableau au click du bouton reset
resetButton.addEventListener('click', () => {

    userArray = []

    for(boule=1;boule<5;boule++) {

        document.querySelector(`#line-${r} .colors:nth-child(${boule})`).className ="colors"
    }
})

vldBtn.onclick = function() {
    if (userArray.length != 4) {
        alert('Ta séquence de couleur est incomplète')
    } else {
        goodSpotGoodColor = verification(userArray)
        if (goodSpotGoodColor == 4 ){

            showResult(true,"GG")
            // Modification du bouton "Rejouer" pour qu'il prenne toute la place, et du bouton "Valider" pour qu'il disparaisse
            refreshBtn.style.width = '100%'
            refreshBtn.style.transition = '1s'
            refreshBtn.style.boxShadow = '-2px -2px 5px white'
            refreshBtn.fontSize='2rem'
            vldBtn.style.width='0'
            vldBtn.textContent=''
            vldBtn.style.transition = '0.5s'
        } else {

            r += 1

            roundNumber.innerHTML = `${r}`

            userArray = []
            
            if (r == 11) {
 
                showResult(false,"Perdu")
                refreshBtn.style.width = '100%'
                refreshBtn.style.transition = '1s'
                refreshBtn.style.boxShadow = '-2px -2px 5px white'
                refreshBtn.fontSize='2rem'
                vldBtn.style.width='0'
                vldBtn.textContent=''
                vldBtn.style.transition = '0.5s'
            }
            document.querySelector(`#line-${r}`).style.border = "1px white solid" 
            document.querySelector(`#line-${r-1}`).style.border = "0px" 
            return r
        }
    }
}

refreshBtn.onclick = function() {

    location.reload();
}

const colorsSelectedList = randomColorsGenerator(colorsList.length, colorsList)

document.querySelector(`#line-${r}`).style.border = "1px white solid" 