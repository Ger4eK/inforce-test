import axios from 'axios';
import { useState } from 'react';
import styles from './Comments.module.scss';

const Comments = ({ product }) => {
  const [description, setDescription] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
    const today = new Date();
    const date =
      today.getHours() +
      ':' +
      today.getMinutes() +
      ' ' +
      today.getDate() +
      '.' +
      (today.getMonth() + 1) +
      '.' +
      today.getFullYear();

    const commentBody = {
      id: Math.floor(Math.random() * 100000000),
      productId: product.id,
      description,
      date: date,
    };

    const addComment = async () => {
      await axios.patch(`http://localhost:3001/products/${product.id}`, {
        ...product,
        comments: [...product.comments, commentBody],
      });
    };
    addComment();
    setDescription('');
    window.scrollTo(0, 0);
    window.location.reload();
  };
  const deleteComment = (id) => {
    const filteredComments = product.comments.filter(
      (comment) => comment.id !== id
    );

    const deleteProduct = async () => {
      await axios.patch(`http://localhost:3001/products/${product.id}`, {
        ...product,
        comments: [...filteredComments],
      });
    };
    deleteProduct();
    window.location.reload();
  };

  return (
    <div className={styles.commentSection}>
      <h1>Comments:</h1>
      <div className={styles.commentWrapper}>
        <div className={styles.comments}>
          {product.comments.length !== 0 ? (
            product.comments.map((comment) => (
              <div className={styles.commentsWrapper} key={comment.id}>
                <div className={styles.commentInfo}>
                  <b>{comment.date}</b>
                  <p>{comment.description}</p>
                </div>
                <button
                  onClick={() => deleteComment(comment.id)}
                  className='button comment delete'
                >
                  X
                </button>
              </div>
            ))
          ) : (
            <b className={styles.noComment}>Add the first comment!</b>
          )}
        </div>
        <div className={styles.addComment}>
          <form className={styles.form} onSubmit={submitHandler}>
            <h2>Add comment</h2>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder='Enter your comment...'
              maxLength={100}
            ></textarea>
            <button className='button'>Add comment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Comments;
