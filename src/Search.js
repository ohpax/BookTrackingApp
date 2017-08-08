import React from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            result: [],
            searchTerm: ''
        };

    }

    searchTermChanged = (event) => {
        this.setState({ searchTerm: event.target.value });
        BooksAPI.search(this.state.searchTerm, 10).then((books) => {
            if(books && !books.error){
                books.map((book) => {
                    var shelfBook = this.props.books.find(b => b.id === book.id);
                    if(shelfBook){
                        book.shelf = shelfBook.shelf;
                    }
                });

                this.setState({ result: books });
            }
                
        })
    }



    render() {
        let searchResult = '';

        if(this.state.result){
            searchResult =  
                    <BookShelf
                      onStatusChanged={this.props.onStatusChanged}
                      books={this.state.result}
                    />
        }

        return (<div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to={'/'} />
                <div className="search-books-input-wrapper">

                    <input type="text"
                        value={this.state.searchTerm}
                        onChange={this.searchTermChanged}
                        placeholder="Search by title or author" />

                </div>
            </div>
            <div className="search-books-results">
                {searchResult}                 
            </div>
        </div>);
    }
}

export default Search;