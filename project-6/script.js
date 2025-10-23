// Todo List Application
class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.editingId = null;
        
        this.initializeElements();
        this.bindEvents();
        this.render();
    }

    initializeElements() {
        this.todoForm = document.getElementById('todo-form');
        this.todoInput = document.getElementById('todo-input');
        this.todoList = document.getElementById('todo-list');
        this.emptyState = document.getElementById('empty-state');
        this.taskCount = document.getElementById('task-count');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clear-completed');
    }

    bindEvents() {
        // Form submission
        this.todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Clear completed button
        this.clearCompletedBtn.addEventListener('click', () => {
            this.clearCompleted();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.editingId) {
                this.cancelEdit();
            }
        });
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) return;

        const todo = {
            id: Date.now().toString(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.todoInput.value = '';
        this.saveTodos();
        this.render();
        
        // Focus back to input
        this.todoInput.focus();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    deleteTodo(id) {
        const todoElement = document.querySelector(`[data-id="${id}"]`);
        if (todoElement) {
            todoElement.classList.add('removing');
            setTimeout(() => {
                this.todos = this.todos.filter(t => t.id !== id);
                this.saveTodos();
                this.render();
            }, 300);
        }
    }

    startEdit(id) {
        this.editingId = id;
        this.render();
        
        // Focus on edit input
        setTimeout(() => {
            const editInput = document.querySelector(`[data-id="${id}"] .edit-input`);
            if (editInput) {
                editInput.focus();
                editInput.select();
            }
        }, 100);
    }

    saveEdit(id, newText) {
        const todo = this.todos.find(t => t.id === id);
        if (todo && newText.trim()) {
            todo.text = newText.trim();
            this.editingId = null;
            this.saveTodos();
            this.render();
        } else {
            this.cancelEdit();
        }
    }

    cancelEdit() {
        this.editingId = null;
        this.render();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });
        
        this.render();
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) return;

        if (confirm(`Are you sure you want to delete ${completedCount} completed task${completedCount > 1 ? 's' : ''}?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
        }
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'pending':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const pending = total - completed;

        let statsText = '';
        if (total === 0) {
            statsText = 'No tasks';
        } else if (this.currentFilter === 'all') {
            statsText = `${total} task${total !== 1 ? 's' : ''} (${pending} pending, ${completed} completed)`;
        } else if (this.currentFilter === 'pending') {
            statsText = `${pending} pending task${pending !== 1 ? 's' : ''}`;
        } else if (this.currentFilter === 'completed') {
            statsText = `${completed} completed task${completed !== 1 ? 's' : ''}`;
        }

        this.taskCount.textContent = statsText;
    }

    render() {
        const filteredTodos = this.getFilteredTodos();
        
        // Update stats
        this.updateStats();
        
        // Show/hide empty state
        if (filteredTodos.length === 0) {
            this.emptyState.style.display = 'block';
            this.todoList.style.display = 'none';
        } else {
            this.emptyState.style.display = 'none';
            this.todoList.style.display = 'block';
        }

        // Render todo items
        this.todoList.innerHTML = filteredTodos.map(todo => this.createTodoElement(todo)).join('');

        // Update clear completed button
        const completedCount = this.todos.filter(t => t.completed).length;
        this.clearCompletedBtn.disabled = completedCount === 0;
        this.clearCompletedBtn.textContent = completedCount > 0 
            ? `Clear ${completedCount} Completed` 
            : 'Clear Completed';
    }

    createTodoElement(todo) {
        const isEditing = this.editingId === todo.id;
        
        if (isEditing) {
            return `
                <li class="todo-item editing" data-id="${todo.id}">
                    <input type="text" class="edit-input" value="${this.escapeHtml(todo.text)}" 
                           onkeydown="handleEditKeydown(event, '${todo.id}')"
                           onblur="app.saveEdit('${todo.id}', this.value)">
                    <div class="todo-actions">
                        <button class="todo-btn save-btn" onclick="app.saveEdit('${todo.id}', this.previousElementSibling.value)">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="todo-btn cancel-btn" onclick="app.cancelEdit()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </li>
            `;
        }

        return `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} 
                       onchange="app.toggleTodo('${todo.id}')">
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <div class="todo-actions">
                    <button class="todo-btn edit-btn" onclick="app.startEdit('${todo.id}')" title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="todo-btn delete-btn" onclick="app.deleteTodo('${todo.id}')" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadTodos() {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    }
}

// Global functions for inline event handlers
function handleEditKeydown(event, id) {
    if (event.key === 'Enter') {
        app.saveEdit(id, event.target.value);
    } else if (event.key === 'Escape') {
        app.cancelEdit();
    }
}

// Initialize the app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TodoApp();
    
    // Add some sample todos if none exist
    if (app.todos.length === 0) {
        const sampleTodos = [
            { id: '1', text: 'Welcome to your Todo List!', completed: false, createdAt: new Date().toISOString() },
            { id: '2', text: 'Click the checkbox to mark tasks as complete', completed: true, createdAt: new Date().toISOString() },
            { id: '3', text: 'Use the edit button to modify tasks', completed: false, createdAt: new Date().toISOString() },
            { id: '4', text: 'Filter tasks using the buttons above', completed: false, createdAt: new Date().toISOString() }
        ];
        app.todos = sampleTodos;
        app.saveTodos();
        app.render();
    }
});

// Add some helpful console messages
console.log('📝 Todo List App loaded successfully!');
console.log('💡 Tips:');
console.log('  - Press Enter to add tasks');
console.log('  - Press Escape to cancel editing');
console.log('  - Use filter buttons to view different task states');
console.log('  - All data is automatically saved to localStorage');
