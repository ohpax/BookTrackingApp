import React from 'react'
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import { CurrentlyReading, WantToRead, Read } from './BookStatus'
import Search from './Search'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showSearchPage: true
    };
    this.onBookStatusChanged = this.onBookStatusChanged.bind(this);
  }


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      })
    })
  }

  onBookStatusChanged(event, book) {

    const newStatus = event.target.value;
    BooksAPI.update(book, newStatus).then((newbooks) => {

      var items = this.state.books;

      items.forEach((element, index) => {
        if (element.id === book.id) {
          items[index].shelf = newStatus;
        }
      });

      this.setState({
         books: items,
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
                      books={this.state.books.filter((book) => book.shelf === CurrentlyReading)}
                    />
                    <BookShelf
                      title='Want to Read'
                      onStatusChanged={this.onBookStatusChanged}
                      books={this.state.books.filter((book) => book.shelf === WantToRead)}
                    />
                    <BookShelf
                      title='Read'
                      onStatusChanged={this.onBookStatusChanged}
                      books={this.state.books.filter((book) => book.shelf === Read)}
                    />
                  </div>
                </div>
                <div className="open-search">
                  <Link to={'/search'}>Add a book</Link>
                </div>
              </div>
            )} />


            <Route path="/search" render={() => (
              <Search onStatusChanged={this.onBookStatusChanged} books={this.state.books} />
            )} />
          </Switch>
        </BrowserRouter>
        
      </div>
    )
  }
}

export default BooksApp
