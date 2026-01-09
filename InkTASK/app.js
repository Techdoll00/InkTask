document.addEventListener('DOMContentLoaded', () => {
    // State
    let selectedDate = new Date();
    selectedDate.setHours(0,0,0,0);
    
    let allTasks = JSON.parse(localStorage.getItem('inktasks_v2')) || {};

    // Elements
    const taskList = document.getElementById('task-list');
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const deadlineInput = document.getElementById('deadline-input');
    const displayDate = document.getElementById('display-date');
    const datePickerInput = document.getElementById('date-picker-input');
    const prevDayBtn = document.getElementById('prev-day');
    const nextDayBtn = document.getElementById('next-day');
    const jumpTodayBtn = document.getElementById('jump-today');
    const taskStats = document.getElementById('task-stats');
    const emptyState = document.getElementById('empty-state');

    function getSelectedDateKey() {
        return selectedDate.toISOString().split('T')[0];
    }

    function formatDate(date) {
        return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
    }

    function updateUI() {
        const key = getSelectedDateKey();
        displayDate.textContent = formatDate(selectedDate);
        datePickerInput.value = key;

        const tasks = allTasks[key] || [];
        renderTasks(tasks);
    }

    function renderTasks(tasks) {
        taskList.innerHTML = '';
        if (tasks.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            const dateStatus = getDateStatus(task.deadline, task.completed);
            
            li.innerHTML = `
                <div class="checkbox-box" onclick="toggleTask('${getSelectedDateKey()}', ${index})"></div>
                <span class="task-text">${task.text}</span>
                ${task.deadline ? `<span class="task-deadline ${dateStatus}">${task.deadline}</span>` : ''}
                <button class="delete-btn" onclick="deleteTask('${getSelectedDateKey()}', ${index})">×</button>
            `;
            taskList.appendChild(li);
        });

        const completedCount = tasks.filter(t => t.completed).length;
        taskStats.textContent = `Completed ${completedCount} / ${tasks.length}`;
    }

    function getDateStatus(deadline, completed) {
        if (!deadline || completed) return '';
        const now = new Date();
        now.setHours(0,0,0,0);
        const due = new Date(deadline);
        
        const diffDays = (due - now) / (1000 * 60 * 60 * 24);
        
        if (diffDays < 0) return 'overdue';
        if (diffDays <= 2) return 'due-soon';
        return '';
    }

    function save() {
        localStorage.setItem('inktasks_v2', JSON.stringify(allTasks));
        updateUI();
    }

    // Handlers
    window.toggleTask = (dateKey, index) => {
        allTasks[dateKey][index].completed = !allTasks[dateKey][index].completed;
        allTasks[dateKey][index].completedAt = allTasks[dateKey][index].completed ? new Date().toISOString() : null;
        save();
    };

    window.deleteTask = (dateKey, index) => {
        allTasks[dateKey].splice(index, 1);
        if (allTasks[dateKey].length === 0) delete allTasks[dateKey];
        save();
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (text) {
            const key = getSelectedDateKey();
            if (!allTasks[key]) allTasks[key] = [];
            
            allTasks[key].push({
                id: Date.now(),
                text,
                deadline: deadlineInput.value,
                completed: false,
                createdAt: new Date().toISOString(),
                completedAt: null
            });
            
            taskInput.value = '';
            deadlineInput.value = '';
            save();
        }
    });

    prevDayBtn.addEventListener('click', () => {
        selectedDate.setDate(selectedDate.getDate() - 1);
        updateUI();
    });

    nextDayBtn.addEventListener('click', () => {
        selectedDate.setDate(selectedDate.getDate() + 1);
        updateUI();
    });

    jumpTodayBtn.addEventListener('click', () => {
        selectedDate = new Date();
        selectedDate.setHours(0,0,0,0);
        updateUI();
    });

    datePickerInput.addEventListener('change', (e) => {
        const [y, m, d] = e.target.value.split('-').map(Number);
        selectedDate = new Date(y, m - 1, d);
        updateUI();
    });

    updateUI();
});
