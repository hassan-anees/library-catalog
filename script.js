//letting it be empty
let myLibrary = [
    {
        title: "red rising",
        author: "martin",
        pages: 400,
        isRead: true,
    },
    {
        title: "hunger games",
        author: "jk rollling",
        pages: 340,
        isRead: false,
    },
    {
        title: "game of thrones",
        author: "rr something",
        pages: 1230,
        isRead: true,
    },
];

function Book(title, author, pages, isRead) {
    this.id = myLibrary.length;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function () {
        return `Current book: ${title}, ${author}, ${pages}, ${isRead}`;
    };
}

//event is passed from the event listener
function addBookToLibrary(event) {
    event.preventDefault(); //stopping the form from submitting
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let isRead = document.getElementById("read").checked;

    let newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    console.log("book added");
    document.getElementById("bookForm").reset();
}

function displayTable() {
    let table = document.getElementById("book-table");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    myLibrary.forEach((element, i) => {
        let row = document.createElement("tr");

        // properties of object
        let properties = ["title", "author", "pages", "isRead", "delete"];
        properties.forEach((attr) => {
            // creating the cells
            let cell = document.createElement("td");
            // this is basically myLibrary["title"]
            if (attr === "delete") {
                //make button
                cell.innerHTML = '<input class="delete-btn" type="button" value="Delete" />';
            } else if (attr == "isRead") {
                let buttonStyle = ``;
                if (element[attr]) {
                    buttonStyle = `green`;
                } else {
                    buttonStyle = `red`;
                }
                cell.innerHTML = `<input class="read-btn" type="button" value="Read" style="background-color:${buttonStyle}" />`;
            } else {
                cell.innerHTML = element[attr];
            }
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
}

function clearTable(table) {
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}

function onDeleteRow(event) {
    // only respond to things with specific class
    if (!event.target.classList.contains("delete-btn")) {
        return;
    }

    // alert("delete button clicked");
    const btn = event.target;
    //gets the closest element
    // take current row
    let row = btn.closest("tr");
    console.log(row.cells[0].innerHTML);
    let index = row.rowIndex;
    console.log(index);

    row.remove();
    //removing from data
    if (index > -1) {
        myLibrary.splice(index - 1, 1);
    }
    // recreate the table
    displayTable();
}

function onUpdateRead(event) {
    if (!event.target.classList.contains("read-btn")) {
        return;
    }

    const btn = event.target;
    console.log(btn.style.backgroundColor);

    if (btn.style.backgroundColor == "green") {
        btn.style.backgroundColor = "red";
    } else {
        btn.style.backgroundColor = "green";
    }

    //gets the closest element
    // take current row
    let row = btn.closest("tr");
    let index = row.rowIndex;

    // changing the actual value in the data
    myLibrary[index - 1].isRead = !myLibrary[index - 1].isRead;
    console.log(myLibrary[index - 1].isRead);
}

document.addEventListener("DOMContentLoaded", () => {
    // for testing below
    displayTable();

    // let addButton = document.getElementById("btn");
    let formEl = document.querySelector("form");
    // on click we want to add to the array
    formEl.addEventListener("submit", addBookToLibrary);
    console.log("after");
    // addButton.addEventListener("click", loopBooks);
    formEl.addEventListener("submit", displayTable);
    //we want event listeners on the table itself for when the user chooses to delete or add
    let table = document.getElementById("book-table");
    table.addEventListener("click", onDeleteRow);
    table.addEventListener("click", onUpdateRead);
});
