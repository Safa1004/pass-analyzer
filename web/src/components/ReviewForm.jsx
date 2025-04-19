import { useState } from 'react';
import {
  FaRegFrown,
  FaRegMeh,
  FaRegSmile,
  FaRegSmileBeam,
  FaRegGrinStars,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from 'react-icons/fa';
import './styles/ReviewForm.css';
import emailjs from '@emailjs/browser';
import Notification from './Notification';


const ReviewForm = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [notification, setNotification] = useState(null);


  const renderFace = (rating) => {
    switch (rating) {
      case 1:
        return <FaRegFrown />;
      case 2:
        return <FaRegMeh />;
      case 3:
        return <FaRegSmile />;
      case 4:
        return <FaRegSmileBeam />;
      case 5:
        return <FaRegGrinStars />;
      default:
        return null;
    }
  };

  const renderStar = (index) => {
    if (rating >= index + 1) {
      return <FaStar className="star-icon" />;
    } else if (rating >= index + 0.5) {
      return <FaStarHalfAlt className="star-icon" />;
    } else {
      return <FaRegStar className="star-icon" />;
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const templateParams = {
      name,
      rating,
      feedback,
    };
  
    emailjs.send(
      'service_7gshgj9',        // actual service ID
      'template_hfl48yc',       // template ID
      templateParams,
      '0g-gA-iKkG3sWTIYw'         // public key
    )
    const emailSentSuccessfully = true;
    if (emailSentSuccessfully) {
        setNotification({
          message: 'Thank you for your feedback!',
          type: 'success',
        });
      } else {
        setNotification({
          message: 'Failed to send feedback. Please try again later.',
          type: 'error',
        });
      }
    setName('')
    setFeedback('')
    setRating(0)
      setTimeout(() => {
        setNotification(null); // Hide notification after 5 seconds
      }, 5000);
  };

  const isFormValid = name.trim().length > 0 && feedback.trim().length > 0;
  return (
    <div className="form-container" id='Feedback'>
  <h2 className="section-title">We'd Love to Hear Your Feedback</h2>
  {/* Show notification if available */}
  {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
  <div className="face-icon">{renderFace(rating)}</div>
  <div className="rating-container">
    {[0, 1, 2, 3, 4].map((index) => (
      <div key={index} className="star-wrapper">
        <input
          type="button"
          id={`rating-${index + 1}`}
          value={index + 1}
          onClick={() =>
            setRating((prev) => (prev === index + 1 ? 0 : index + 1))
          }
          className="radio-input"
        />
        <label
          htmlFor={`rating-${index + 1}`}
          className="star-icon"
          style={{
            color: rating >= index + 1 ? '#FBB202' : '#ccc',
          }}
        >
          {renderStar(index)}
        </label>
      </div>
    ))}
  </div>

  <form onSubmit={handleSubmit} className="form">
    <div className="form-group">
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
        required
        placeholder="name"
      />
    </div>

    <div className="form-group">
      <textarea
        id="feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="textarea-field"
        placeholder="Share your experience with the tool"
        required
      />
    </div>

    <button
      type="submit"
      className="submit-button"
      disabled={!isFormValid}
    >
      Submit Feedback
    </button>
  </form>
</div>

  );
};


export default ReviewForm;
