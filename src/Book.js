import React from 'react';

const Book = (props) => {
    const shelf = props.book.shelf
    return (
        <div className="book">

            <div className="book-top">
                <div className="book-cover" style={{ width: props.width, height: props.height, backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">

                    <select value={shelf} onChange={(event) => props.onStatusChanged(event, props.book)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead" >Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{props.book.authors.map((author) => author)}</div>
        </div>
    );
};

export default Book;