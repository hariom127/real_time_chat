const socket = io()

const textarea = document.querySelector('#msgBox')
const chatArea = document.querySelector('.message__area')

let name

do {
  name = prompt('Enter your name: ')
} while (!name)

textarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    sendMessage(e.target.value)
    e.target.value = ''
  }
})

function sendMessage(msg) {
  let data = {
    username: name,
    msg: msg.trim(),
  }
  // append msg in client side chat
  appendMsg(data, 'outgoing')
  textarea.value = ''
  scrollaToEnd()
  //send msg on server
  socket.emit('sendMsg', data)
}

function appendMsg(data, type) {
  let mainDiv = document.createElement('div')
  let className = type
  mainDiv.classList.add(className, 'message')

  let markup = `
    <h4>${data.username}</h4>
    <p>${data.msg}</p>
    `

  mainDiv.innerHTML = markup

  chatArea.appendChild(mainDiv)
}

//recive msg
socket.on('receiveMsg', (msg) => {
  appendMsg(msg, 'incoming')
  scrollaToEnd()
})

//scroll to bottom
function scrollaToEnd() {
  chatArea.scrollTop = chatArea.scrollHeight
}
