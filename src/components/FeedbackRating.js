import ReactStars from 'react-rating-stars-component';

const FeedbackRating = ({ handleRating, rating, recordId }) => {
  const ratingChanged = (newRating) => {
    handleRating(newRating, recordId);
  };

  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={30}
      isHalf={true}
      emptyIcon={<i className='far fa-star'></i>}
      halfIcon={<i className='fa fa-star-half-alt'></i>}
      fullIcon={<i className='fa fa-star'></i>}
      activeColor='#ffd700'
      value={rating}
    />
  );
};

export default FeedbackRating;
