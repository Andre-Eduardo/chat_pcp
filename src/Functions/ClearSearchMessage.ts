export function ClearSearchMessage(
  index: any,
  messageRefs: any,
  textInputSearch: any,
) {
  if (messageRefs.current[index]) {
    messageRefs.current[index].style.backgroundColor = ''

    // Cria um novo elemento span com o estilo
    const span = document.createElement('span')
    span.style.backgroundColor = ''
    span.innerText = textInputSearch

    // Acessa o elemento que contém o texto usando a referência
    const texto = messageRefs.current[index].children[0].children[0].children[0]

    // Encontra a posição do trecho para substituir
    const position = texto.innerText.indexOf(textInputSearch)

    // Cria um nó de texto com o conteúdo antes do trecho
    const antes = document.createTextNode(texto.innerText.slice(0, position))

    // Cria um nó de texto com o conteúdo depois do trecho
    const depois = document.createTextNode(
      texto.innerText.slice(position + textInputSearch.length),
    )

    // Remove todo o conteúdo do elemento que contém o texto
    texto.innerHTML = ''

    // Adicione os nós de texto e o elemento span na ordem correta
    texto.appendChild(antes)
    texto.appendChild(span)
    texto.appendChild(depois)
  }
}
