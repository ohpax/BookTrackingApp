import React from 'react'
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import { CurrentlyReading, WantToRead, Read } from './BookStatus'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      showSearchPage: true
    };
    this.onBookStatusChanged = this.onBookStatusChanged.bind(this);
  }


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books,
        currentlyReading: books.filter((book) => book.shelf === CurrentlyReading),
        read: books.filter((book) => book.shelf === Read),
        wantToRead: books.filter((book) => book.shelf === WantToRead)
      })
    })
  }

  onBookStatusChanged(event, book) {
    //this.setState({value: event.target.value});
    const newStatus = event.target.value;
    BooksAPI.update(book, newStatus).then((newbooks) => {
      console.log(newbooks);
      var items = this.state.books;

      items.forEach((element, index) => {
        if (element.id === book.id) {
          items[index].shelf = newStatus;
        }
      });
      // for(var i in items.length){
      //   if(items[i].id === book.id){
      //     items[i].shelf = newStatus;
      //   }
      // }

      this.setState({
        book: items,
        currentlyReading: items.filter((book) => newbooks.currentlyReading.includes(book.id)),
        read: items.filter((book) => newbooks.read.includes(book.id)),
        wantToRead: items.filter((book) => newbooks.wantToRead.includes(book.id)),
      });
    })
  }

  render() {
    if (!this.state.books) {
      return <div>Loading ...</div>
    }

    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookShelf
                      title='Currently Reading'
                      onStatusChanged={this.onBookStatusChanged}
                      books={this.state.currentlyReading}
                    />
                    <BookShelf
                      title='Want to Read'
                      onStatusChanged={this.onBookStatusChanged}
                      books={this.state.wantToRead}
                    />
                    <BookShelf
                      title='Read'
                      onStatusChanged={this.onBookStatusChanged}
                      books={this.state.read}
                    />
                  </div>
                </div>
                <div className="open-search">
                  <Link to={'/search'}>Add a book</Link>
                </div>
              </div>
            )} />


            <Route path="/search" render={() => (
              <div className="search-books">
                <div className="search-books-bar">
                  <Link className="close-search" to={'/'} />
                  <div className="search-books-input-wrapper">
                   
                    <input type="text" placeholder="Search by title or author" />

                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid"></ol>
                </div>
              </div>
            )} />
          </Switch>
        </BrowserRouter>

        
      </div>
    )
  }
}

export default BooksApp
