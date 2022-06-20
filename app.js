//using ES5 prototypes 

//Book Constructor - creating book objects
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor - prototype methods to manipulate book methods
function UI() {} //empty function - everything else will go inside prototype
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');
    //insert columns
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
}
// show alert
UI.prototype.showAlert = function(message, className) {
    //create div
    const div = document.createElement('div');
    //create classes
    div.className = `${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.container');
    //get form
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form); //what you want to insert and before what
    //Timeout after 3 seconds
    setTimeout(function() {
        document.querySelector(`.${className}`).remove();
    }, 3000); //takes in a function and timeout in milliseconds

}
//delete book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
} 
//clear fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Event listeners
document.getElementById('book-form').addEventListener('submit', 
    function(e) { //get form values
        const title = document.getElementById('title').value,
              author = document.getElementById('author').value,
              isbn = document.getElementById('isbn').value;

        //instantiating a book
        const book = new Book(title, author, isbn);
        

        //instantiating UI
        const ui = new UI();
        

        //validate
        if(title === '' || author === '' || isbn === '') {
            //error alert
            ui.showAlert('Please fill in all fields', 'error')
        } else {
           //add book to list
        ui.addBookToList(book);

        //show succesful add
        ui.showAlert('Book Added Sucessfully Brosef!! Way to Go! On Your Way to the Top!',
        'success');

        //clear fields
        ui.clearFields();  
        }

       

        e.preventDefault(); //prevents default submit action
    });

    //dynamically added elements need to be accessed using event delegation
    //Event listener for delete - must use parent element
    document.getElementById('book-list').addEventListener('click', function(e) {
       //instantiating UI
       const ui = new UI();
        ui.deleteBook(e.target);
        //show message
        ui.showAlert('Book Removed Dude!! You Are a Superstar at Computer Wizardry!', 'success');
        e.preventDefault();
    } )
    