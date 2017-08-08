import React from 'react'
import Book from './Book'

const showBooks = (props) => {
    if (!props.books)
        return <li></li>

    return (
        props.books.map((book,index) => {
            return (
                <li key={index}>
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
    var title = '';
    if(props.title){
        title = <h2 className="bookshelf-title">{props.title}</h2>;
    }
    return (
        <div className="bookshelf">
            {title}
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {showBooks(props)}
                </ol>
            </div>
        </div>
    );
}

export default BookShelf;