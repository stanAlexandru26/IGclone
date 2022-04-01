import React from 'react';

export default function Image({ src, caption }) {
  return (
    <div className="post__img">
      <img src={require(`../../assets${src}`)} alt={caption} />
    </div>
  );
}
