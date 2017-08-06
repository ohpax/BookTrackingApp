import React from 'react'
import Book from './Book'

const showBooks = (props) => {
    if (!props.books)
        return <li></li>

    return (
        props.books.map((book) => {
            return (
                <li key={book.id}>
                    <Book
                        width={128}
                        height={193}
                        book={book}
                        onStatusChanged={props.onStatusChanged}
                    />
                </li>
            );
        })
    );
};

const BookShelf = (props) => {

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {showBooks(props)}
                </ol>
            </div>
        </div>
    );
}

export default BookShelf;