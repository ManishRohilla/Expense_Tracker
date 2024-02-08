document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM content loaded")
    const form = document.getElementById('expense_details');
    console.log(form)
    listExpensesLogged();
    function addExpense(event) {
        event.preventDefault();
        console.log("Details Entered");
        const amount = form.querySelector('#amount').value;
        const description = form.querySelector('#description').value;
        const category = form.querySelector('#category').selectedOptions[0].textContent;
        console.log(category)
        const currentTimestamp = getCurrentTimestamp();
        const obj = {
            "amount": amount,
            "description": description,
            "category": category,
            "timestamp": currentTimestamp
        };
        console.log(obj);
        localStorage.setItem(currentTimestamp, JSON.stringify(obj));
        listExpensesLogged();
    }
    form.addEventListener('submit', addExpense);

})
function getCurrentTimestamp() {
    // Create a new Date object with the current date and time
    const currentDate = new Date();

    // Extract date components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Extract time components
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    // Construct the date-time string in the desired format
    const timestampString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    return timestampString;
}
const expenses_list = document.getElementById('expenses_logged');
function listExpensesLogged() {
    expenses_list.innerHTML = ''
    for (let i = 0; i < localStorage.length; i++) {
        const createListElement = document.createElement('li');
        createListElement.className = 'expense';
        createListElement.id = 'expense';
        var expenseKey = localStorage.key(i);
        var expenseDetails = JSON.parse(localStorage.getItem(expenseKey));
        createListElement.innerHTML = `${expenseDetails.amount}
         - ${expenseDetails.category}
         - ${expenseDetails.description}
         - ${expenseDetails.timestamp}
          ` +
            '<input type = "button" value = "Delete Expense" class="dlt-btn">' +
            '<input type = "button" value = "Edit Expense" class="edit-btn">'
        expenses_list.appendChild(createListElement);
    }
}

expenses_list.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('edit-btn')) {
        const parentElement = event.target.parentElement;
        console.log(parentElement.innerText.split(' - '));
        const [amount, category, description, time] = parentElement.innerText.trim().split(' - ');
        document.getElementById('amount').value = amount;
        document.getElementById('category').value = category;
        document.getElementById('description').value = description;
        console.log(localStorage.getItem(time))
        expenses_list.removeChild(parentElement);
        localStorage.removeItem(time);
        listExpensesLogged();
    };
    if (event.target.classList.contains('dlt-btn')) {
        const parentElement = event.target.parentElement;
        document.getElementById('amount').value = '';
        document.getElementById('category').value = '';
        document.getElementById('description').value = '';
        console.log(parentElement.innerText.split(' - '));
        const time = parentElement.innerText.trim().split(' - ')[3];
        console.log(localStorage.getItem(time))
        expenses_list.removeChild(parentElement);
        localStorage.removeItem(time);
        listExpensesLogged()
    }
})