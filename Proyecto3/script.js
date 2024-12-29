window.onload = function() {
    loadEntries();
    loadDraft();
};
document.getElementById('entryContent').addEventListener('input', function() {
    const content = document.getElementById('entryContent').value;
    const date = document.getElementById('entryDate').value;
    saveDraft(date, content);
});

document.getElementById('entryDate').addEventListener('change', function() {
    const content = document.getElementById('entryContent').value;
    const date = document.getElementById('entryDate').value;
    saveDraft(date, content);
});

function saveEntry() {
    const date = document.getElementById('entryDate').value;
    const content = document.getElementById('entryContent').value;

    if (date === '' || content === '') {
        alert('Por favor, completa la fecha y la entrada.');
        return;
    }

    const entry = {
        date: date,
        content: content
    };

    let entries = getEntries();
    entries.push(entry);
    saveEntries(entries);
    renderEntries();
    document.getElementById('entryDate').value = '';
    document.getElementById('entryContent').value = '';
    localStorage.removeItem('draftEntry');
}

function renderEntries() {
    const entries = getEntries();
    const entriesList = document.getElementById('entries');
    entriesList.innerHTML = '';

    entries.forEach((entry, index) => {
        const li = document.createElement('li');
        const entryDate = document.createElement('h3');
        const entryContent = document.createElement('p');
        const deleteButton = document.createElement('button');

        entryDate.textContent = entry.date;
        entryContent.textContent = entry.content;
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function() {
            deleteEntry(index);
        };

        li.appendChild(entryDate);
        li.appendChild(entryContent);
        li.appendChild(deleteButton);
        entriesList.appendChild(li);
    });
}

function deleteEntry(index) {
    let entries = getEntries();
    entries.splice(index, 1);
    saveEntries(entries);
    renderEntries();
}

function getEntries() {
    const entries = localStorage.getItem('diaryEntries');
    return entries ? JSON.parse(entries) : [];
}

function saveEntries(entries) {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
}

function loadEntries() {
    renderEntries();
}

function saveDraft(date, content) {
    const draft = {
        date: date,
        content: content
    };
    localStorage.setItem('draftEntry', JSON.stringify(draft));
}

function loadDraft() {
    const draft = localStorage.getItem('draftEntry');
    if (draft) {
        const { date, content } = JSON.parse(draft);
        document.getElementById('entryDate').value = date;
        document.getElementById('entryContent').value = content;
    }
}