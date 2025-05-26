const $buttons = document.querySelectorAll(".button")
const $cards = document.querySelectorAll(".card")
const totalCards = document.querySelectorAll(".card").length

let activeCard = 1
let isAnimatingCardTransition = false;

// Variable para controlar si el título de la primera card ya fue animado
let hasFirstTitleBeenAnimated = false;

$buttons.forEach(button => {
  button.addEventListener("click", () => {
    getCard(activeCard).classList.remove("active")
    getCard(activeCard).classList.add("inactive")

    activeCard = activeCard === totalCards ? 1 : activeCard + 1
    setTimeout(() => {
      getCard(activeCard).classList.remove("inactive")
      getCard(activeCard).classList.add("active")
    }, 500)
    
  })
})

function getCard(n) {
  return document.querySelector(`.card:nth-child(${n})`)
}

function letterizeTitle(title) {
  //guardo el contenido y vacío el titulo
  const text = title.textContent
  title.innerHTML = ""

  //separo las palabras
  text.split(" ").forEach(word => {
    const wordSpan = document.createElement("span")
    wordSpan.classList.add("word")
    wordSpan.style.whiteSpace = "nowrap" // para que no se separe

    //separo las letras con clase letter
    word.split("").forEach(char => {
      const letterSpan = document.createElement("span")
      letterSpan.textContent = char
      letterSpan.classList.add("letter")
      wordSpan.appendChild(letterSpan)
    });

    title.appendChild(wordSpan)

    //agrego espacio de nuevo
    const spaceSpan = document.createElement("span")
    spaceSpan.textContent = " "
    title.appendChild(spaceSpan) 
  })
  title.removeChild(title.lastChild) //saco ultimo espacio
}

function animateTitle(titleElement) {
  const letters = titleElement.querySelectorAll('.letter')

  letters.forEach(letter => {
    letter.style.opacity = 0
    letter.style.transform = 'translateY(80px)'
    letter.style.transition = 'none'
  })

  setTimeout(() => {
    letters.forEach((letter, index) => {
      letter.style.transition = `opacity 0.5s ease-out ${index * 0.05}s, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.05}s`
      letter.style.opacity = 1
      letter.style.transform = 'translateY(0)'
    })
  }, 50)
}

document.addEventListener('DOMContentLoaded', () => {
  // Busca la primera card (asumiendo que tiene el índice 0)
  const firstCard = $cards[0]
  const firstTitle = firstCard ? firstCard.querySelector('.animated-title') : null

  if (firstTitle && !hasFirstTitleBeenAnimated) {
    letterizeTitle(firstTitle) // Divide el texto en letras
    setTimeout(() => {
      animateTitle(firstTitle)   // Anima esas letras
      hasFirstTitleBeenAnimated = true // Marca que ya se animó
    }, 800)
    
  }
})