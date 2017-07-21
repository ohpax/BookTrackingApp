import React from 'react'
import Book from './Book'

const BookShelf = (props) => {

    return (     
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map((book) =>{
                        return (
                            <li key={book.title}>
                                <Book
                                    width={128}
                                    height={193}
                                    imageURL={book.imageLinks.thumbnail}
                                    title={book.title}
                                    authors={book.authors}
                                />
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
}

export default BookShelf;