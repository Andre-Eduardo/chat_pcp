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

    const texto =
      messageRefs.current[index].children[0].children[0].children[0].children[1]

    texto.innerHTML = texto.innerText
  }
}
