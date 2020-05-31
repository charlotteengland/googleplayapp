import React from 'react';

export default function AppDetail(props) {
  return (
    <div className="book">
      <h2>{ props.App }</h2>
      <div className="book_author">Rated{ props.Rating }</div>
      <div className="app_description">{ props.Reviews}Review</div>
      <div className="app_details">
        Genre {props.Genres} 
      </div>
    </div>
  );
}

//equivilant to book function