//letting it be empty
let myLibrary = [
    // {
    //     title: "red rising",
    //     author: "martin",
    //     pages: 400,
    //     isRead: true,
    // },
    // {
    //     title: "hunger games",
    //     author: "jk rollling",
    //     pages: 340,
    //     isRead: false,
    // },
    // {
    //     title: "game of thrones",
    //     author: "rr something",
    //     pages: 1230,
    //     isRead: true,
    // },
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

    //reset the form to empy when we click enter

    document.getElementById("bookForm").reset();
    //OR, gets the first form
    // document.querySelector('form').reset();

    // for queryselector, just get the #id and then the tag type
    let bookDescription = document.querySelector("#new-book pre");
    let allBooks = document.querySelector("#book-data pre");
    bookDescription.textContent = "\n" + JSON.stringify(newBook, "\t", 2);
    allBooks.textContent = "\n" + JSON.stringify(myLibrary, "\t", 2);
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

    alert("delete button clicked");
    const btn = event.target;
    //gets the closest element
    // take current row
    btn.closet("tr");
}

console.log("hello");
// loopBooks();

// making sure that the document is loaded
document.addEventListener("DOMContentLoaded", () => {
    let addButton = document.getElementById("btn");
    // on click we want to add to the array
    addButton.addEventListener("click", addBookToLibrary);
    // addButton.addEventListener("click", loopBooks);
    addButton.addEventListener("click", displayTable);
    //we want event listeners on the table itself for when the user chooses to delete or add
    let table = document.getElementById("book-table");
    table.addEventListener("click", onDeleteRow);
});
