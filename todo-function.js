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

    // filters todos by content and completion
    let filteredTodos = todoObject.filter(function (todo) {
        const searchtextMatch = todo.text.toLowerCase().includes(filter.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchtextMatch && hideCompletedMatch
    })

    // finds incomplete todos for summary 
    const incompleteTodos = filteredTodos.filter(function (item) {
        return !item.completed
    })

    // clears inner html or else function renders duplicates 
    document.querySelector('#todos').innerHTML = ''

    // appends the summary of todo's remaining 
    document.querySelector('#todos').appendChild(GenerateSummaryDOM(incompleteTodos))


    // appends todos after filtering
    filteredTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })

}


// remove todo functionality

const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function (item) {
        return item.id === id
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }

}

// update todo completion status 

const toggleTodo = function (id) {
    const todoIndex = todos.findIndex(function (item) {
        return item.id === id
    })


    if (todoIndex > -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed
    }

}
// get the DOM elements for an individual note

const generateTodoDOM = function (todo) {
    // creates elements needed
    const todoDiv = document.createElement('div')
    const todoTitle = document.createElement('span')
    const checkBox = document.createElement('input')
    const removeButton = document.createElement('button')

    // setup for checkbox
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = todo.completed
    checkBox.addEventListener('click', function () {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    //setup title
    todoTitle.textContent = todo.text

    //setup remove button
    removeButton.textContent = 'x'
    removeButton.addEventListener('click', function () {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)

    })


    //appends elements to the todo div 
    todoDiv.appendChild(checkBox)
    todoDiv.appendChild(todoTitle)
    todoDiv.appendChild(removeButton)



    return todoDiv

}

// get the DOM elements for the list summary 

const GenerateSummaryDOM = function (incomplete) {

    const summary = document.createElement('p')
    summary.textContent = `you have ${incomplete.length} todos left`
    return summary

}