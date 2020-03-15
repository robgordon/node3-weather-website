const weatherform = document.querySelector('form')
const searchVal = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

messageOne.textContent=""
messageTwo.textContent=""

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent= 'Loading...'
    const location = searchVal.value
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
       if (data.error) {
        messageOne.textContent= 'ERROR: ' + data.error
       }
       else {
        messageOne.textContent=data.location;
        messageTwo.textContent=data.forecast.summary + 'The high temperature is ' + data.forecast.high + ' and the low is ' + data.forecast.low + '.  The temperature is ' + data.forecast.temp + ' degrees and there is a ' + data.forecast.precip + '% chance of rain';
       }
   })
})
})