// fetch existing todos from localstorage

const getSavedTodos = function () {
    let todoJSON = localStorage.getItem('todos')

    if (todoJSON !== null) {
        return JSON.parse(todoJSON)
    } else {
        return []
    }

}

// save todos to localstorage

const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// render app todos based on filters 

const renderTodos = function (todoObject, filter) {



    let filteredTodos = todoObject.filter(function (todo) {
        const searchtextMatch = todo.text.toLowerCase().includes(filter.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchtextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(function (item) {
        return !item.completed
    })

    document.querySelector('#todos').innerHTML = ''

    document.querySelector('#todos').appendChild(GenerateSummaryDOM(incompleteTodos))



    filteredTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })

}

// get the DOM elements for an individual note

const generateTodoDOM = function (todo) {
    const p = document.createElement('p')
    p.textContent = todo.text
    return p

}

// get the DOM elements for the list summary 

const GenerateSummaryDOM = function (incomplete) {

    const summary = document.createElement('p')
    summary.textContent = `you have ${incomplete.length} todos left`
    return summary

}