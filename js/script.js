function range(n){
    const arr = []
    for (let i = 0; i < N; i++) arr.push('')
    return arr
}

function createDOMElem(parent = 'empty', elem, text = 'empty', className = 'empty', HTML = 'empty'){
    // createDOMElem()
    let element = document.createElement(`${elem}`)
    if (parent !== 'empty') parent.appendChild(element)
    if (text !== 'empty') element.textContent = text
    if (className !== 'empty') element.classList.add(`${className}`)
    if (HTML !== 'empty') element.innerHTML = HTML
    return element
}

const divContent = createDOMElem(document.body, 'div', 'empty', 'content')

function Form(){
    this.form = createDOMElem(divContent, 'div', 'empty', 'form')
    this.input = createDOMElem(this.form, 'input', '', 'formInput')
    this.select = createDOMElem(this.form, 'select', 'empty', 'formSelect')
    this.optionUrgent = createDOMElem(this.select, 'option', 'Срочные', 'formSelectOption')
    this.optionNonUrgent = createDOMElem(this.select, 'option', 'Несрочные', 'formSelectOption')
    this.inputButton = createDOMElem(this.form, 'input', 'Отправить Запрос', 'formButton')
    this.inputButton.type = 'submit'
    this.inputButton.addEventListener('click', () => {
        let li = createDOMElem('empty', 'li', 'empty', 'listElem', `<span>${this.input.value}</span>`)
        li.prepend(createDOMElem('empty', 'input', 'empty', 'checkBox'))
        li.querySelector('.checkBox').type = 'checkbox'
        
        li.querySelector('.checkBox').addEventListener('click', (event) => {
            if (event.target.checked !== false){
                event.target.parentNode.parentNode.appendChild(event.target.parentNode)
                event.target.parentNode.style.textDecoration = 'line-through'
            }else {
                event.target.parentNode.parentNode.insertBefore(event.target.parentNode, event.target.parentNode.parentNode.childNodes[1])
                event.target.parentNode.style.textDecoration = 'none'
            }
        })
        if (li.parentNode === null) li.appendChild((new Change).outerDiv)
        if (list.ul.children.length === 0 || this.select.value === 'Несрочные'){ 
            list.ul.appendChild(li)
        }else if (this.select.value === 'Срочные' ){
            list.ul.insertBefore(li, list.ul.childNodes[1])
        }
        this.input.value = ''
        localStorage.list = JSON.stringify(document.querySelector('.listUl').innerHTML)
        


    })
}

function FormClear(){
    this.form = createDOMElem(divContent, 'div', 'empty', 'form')
    this.input = createDOMElem(this.form, 'input', '', 'formInput')
    this.select = createDOMElem(this.form, 'select', 'empty', 'formSelect')
    this.optionUrgent = createDOMElem(this.select, 'option', 'Срочные', 'formSelectOption')
    this.optionNonUrgent = createDOMElem(this.select, 'option', 'Несрочные', 'formSelectOption')
    this.inputButton = createDOMElem(this.form, 'input', 'Отправить Запрос', 'formButton')
    this.inputButton.type = 'submit'

}
function List(){
    this.outerDiv = createDOMElem(divContent, 'div', 'empty', 'listWrapper')
    this.ul = createDOMElem(this.outerDiv, 'ul', 'Список Заданий:', 'listUl')

}

const form = new Form()
let list = new List()
list.ul.innerHTML += JSON.parse(localStorage.list).slice(15)


for (el of document.querySelectorAll('.listElem')){
    el.querySelector('.deleteButton').addEventListener('click', (event) => {
        document.querySelector('ul').removeChild(event.target.parentNode.parentNode)
    })
    el.querySelector('.editButton').addEventListener('click', (event) => {
        let ul = event.target.parentNode.parentNode.parentNode
        let targetLi = event.target.parentNode.parentNode
        let editForm = (new FormClear).form
        editForm.st
        ul.insertBefore(editForm, event.target.parentNode.parentNode)
        editForm.querySelector('.formButton').addEventListener('click', () => {
            targetLi.querySelector('span').textContent = editForm.querySelector('.formInput').value
            ul.removeChild(ul.querySelector('.form'))
        }) 
    })
    el.querySelector('.checkBox').addEventListener('click', (event) => {
        if (event.target.checked !== false){
            event.target.parentNode.parentNode.appendChild(event.target.parentNode)
            event.target.parentNode.style.textDecoration = 'line-through'
        }else {
            event.target.parentNode.parentNode.insertBefore(event.target.parentNode, event.target.parentNode.parentNode.childNodes[1])
            event.target.parentNode.style.textDecoration = 'none'
        }
    })
}



function Change(){
    this.outerDiv = createDOMElem('empty', 'div', 'empty', 'changeWrapper')
    this.deleteButton = createDOMElem(this.outerDiv, 'button', 'Delete', 'deleteButton')
    this.deleteButton.addEventListener('click', (event) => {
        document.querySelector('ul').removeChild(event.target.parentNode.parentNode)
    })
    this.editButton = createDOMElem(this.outerDiv, 'button', 'Edit', 'editButton')
    this.editButton.addEventListener('click', (event) => {
        let ul = event.target.parentNode.parentNode.parentNode
        let targetLi = event.target.parentNode.parentNode
        let editForm = (new FormClear).form
        editForm.st
        ul.insertBefore(editForm, event.target.parentNode.parentNode)
        editForm.querySelector('.formButton').addEventListener('click', () => {
            targetLi.querySelector('span').textContent = editForm.querySelector('.formInput').value
            ul.removeChild(ul.querySelector('.form'))
        }) 
    })
}




document.addEventListener('unload', () => localStorage.clear)