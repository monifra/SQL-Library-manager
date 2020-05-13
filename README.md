## My Library App

This app helps manage a collection of books in my imaginary library. It uses simple SQLite  database, Node.js, Express, Pug and SQL ORM Sequelize. 

### What it is doing

- The user can see what books are in the library. They have title, author, genre and year attribute
- By clicking 'Create New Book' button the user can add new book to a database. New book will be displayed on index page
The user must add title and author, if not, the app will show error message and the new book form won't be submitted
- When the user selects book title, app renders update book form. User can update book info or decide to delete this book from a library
CAREFULLY! Changes made in this form are changing book database so when a book is deleted it is also gone from database

### How does it work
- Page has several routes: main rout redirects the user to book index route, new book route, update book route and two error routes for page not found and server errors
- When the user tries to access not existing book page or not existing route the 'page not find' error will be shown
- If something went wrong the server error will be shown
- All of the changes in an app will be executed in a database

### Styling 
- Simple layout with a classy color twist
- Transitions on button and anchor elements adds modern feeling
- Friendly coral color error messages that appears on a top of a new book form
- All clickable elements have different color then the rest of the page elements to make theme more visible 
### Setup
1. In the project directory you should run:<br/><br/>
`npm install`<br/><br/> This will download project dependencies which are listed in package.json.<br/><br/>
2. To start an app run:<br/><br/>
    `npm start`<br/><br/>
    and open in a browser http://localhost:3000. The page will automatically reload when you make changes.
## Credits
This project uses [Sequelize](https://sequelize.org), [Sequelize-cli](https://www.npmjs.com/package/sequelize-cli), [SQLit](https://www.sqlite.org/index.html), [Express](https://expressjs.com) Framework,
 [Pug](https://pugjs.org/api/getting-started.html) template engine for Node.js and starting files from [Treehouse](https://teamtreehouse.com).   

     

 
