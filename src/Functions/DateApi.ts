import moment from 'moment'
export function DateApi(data: string) {
  var dataSplit = data.split(' ')
  var hourSplit = dataSplit[1].split('+')
  var d = moment(hourSplit[0])
  // var date = new Date(dataSplit[1])
  // var optionsDate: any = { year: 'numeric', month: '2-digit', day: '2-digit' }
  // var dateFormatted = date.toLocaleDateString('pt-BR', optionsDate)
  // var hour = date.getHours().toString().padStart(2, '0')
  // var minutos = date.getMinutes().toString().padStart(2, '0')
  // var segundos = date.getSeconds().toString().padStart(2, '0')
  // var HourFormatted = hour + ':' + minutos + ':' + segundos

  // return `${dateFormatted} ${HourFormatted}`

  const date = new Date(dataSplit[1])
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  // return `${hours}:${minutes}`

  return `${dataSplit[0]} ${hourSplit[0]}`
}
