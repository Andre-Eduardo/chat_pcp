export function DateFormatted() {
  var date = new Date()
  var optionsDate: any = { year: 'numeric', month: '2-digit', day: '2-digit' }
  var dateFormatted = date.toLocaleDateString('pt-BR', optionsDate)
  var hour = date.getHours().toString().padStart(2, '0')
  var minutos = date.getMinutes().toString().padStart(2, '0')
  var segundos = date.getSeconds().toString().padStart(2, '0')
  // var milissegundos = data.getMilliseconds().toString().padStart(3, '0')
  var HourFormatted = hour + ':' + minutos + ':' + segundos

  //formato do servidor
  // var date = new Date()
  // var isoDate = date.toISOString()

  return `${dateFormatted} ${HourFormatted}`
  // return isoDate
}
