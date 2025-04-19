import './styles/Practices.css';

const Practices = () => {
  const items = [
    { img: "/assets/easy_pass.png", text: "Create Easy Passwords" },
    { img: "/assets/reuse_pass.png", text: "Reuse Passwords" },
    { img: "/assets/sharing_pass.png", text: "Sharing Passwords Insecurely" },
    { img: "/assets/writing_pass.png", text: "Writing Passwords Down, or Storing on Spreadsheets or on your Phone" },
    { img: "/assets/mfa.png", text: "Skip Adopting MFA" },
    { img: "/assets/browser1.png", text: "Letting Browsers Save Your Passwords" },
  ];

  return (
    <div className="practices-wrapper">
      <div className="practices-container">
        <h1 className="practices-heading">The Most Common Poor Password Practices</h1>
        <div className="practices-grid">
          {items.map((item, index) => (
            <div key={index} className="practice-item">
              <img src={item.img} alt={`bad practice ${index + 1}`} className="practice-icon" />
              <p className="practice-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Practices;
