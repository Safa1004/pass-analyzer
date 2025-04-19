import './styles/Notification.css'; 

const Notification = ({ message, type, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      {message}
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default Notification;
