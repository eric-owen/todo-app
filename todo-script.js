const todos = [{
    text: 'buy food',
    completed: false
}, {
    text: 'work out',
    completed: true

}, {
    text: 'study',
    completed: false

}, {
    text: 'go to store',
    completed: true
}]


const filters = {
    searchText: ''
}



let renderTodos = function (todoObject, filter) {
    const filteredTodos = todoObject.filter(function (todo) {
        return todo.text.toLowerCase().includes(filter.searchText.toLowerCase())

    })

    const incomplete = filteredTodos.filter(function (item) {
        return !item.completed
    })

    document.querySelector('#todos').innerHTML = ''

    const summary = document.createElement('p')
    summary.textContent = `you have ${incomplete.length} todos left`
    document.querySelector('#todos').appendChild(summary)

    filteredTodos.forEach(function (item) {
        const p = document.createElement('p')
        p.textContent = item.text
        document.querySelector('#todos').appendChild(p)
    })

}

renderTodos(todos, filters)


//add a todo button 
document.querySelector('#add-todo').addEventListener('click', function (e) {
    console.log('button was clicked')
})

//listen for text of add a todo
document.querySelector('#new-todo-text').addEventListener('input', function (e) {

})

// filter
document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)

})