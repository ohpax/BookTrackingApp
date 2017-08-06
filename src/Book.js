import React from 'react';

const Book = (props) => {
    const shelf = props.book.shelf
    let tumbnail = '';
    
    if (props.book.imageLinks && props.book.imageLinks.thumbnail) {
        tumbnail = props.book.imageLinks.thumbnail
    }
    else {
        tumbnail = `http://via.placeholder.com/${props.width}x${props.height}`;
    }

    return (
        <div className="book">

            <div className="book-top">
                <div className="book-cover" style={{ width: props.width, height: props.height, backgroundImage: `url(${tumbnail})` }}></div>
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
             <div className="book-authors">{(props.book.authors)? props.book.authors.map((author) => author):""}</div> 
        </div>
    );
};

export default Book;