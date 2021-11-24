const empties = document.querySelectorAll('.empty')
const fill = document.querySelector('.fill')

fill.addEventListener('dragstart',dragStart)
fill.addEventListener('dragend',dragEnd)

function dragStart() {
    this.classList.add('hold')
    setTimeout(()=> (this.classList.add('invisible')),0)
    console.log(1)
}

function dragEnd() {
    this.classList.remove('invisible')
    this.classList.remove('hold')
    console.log(2)
}

for (const empty of empties) {
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('dragenter', dragEnter)
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('drop', dragDrop)
}
  
function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
    this.classList.add('hovered')
}

function dragLeave() {
    this.classList.remove('hovered')
}

function dragDrop() {
    this.classList.remove('hovered')
    this.append(fill)
}