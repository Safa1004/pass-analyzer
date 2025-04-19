import React, { useState } from 'react';
import './styles/Q_A.css'; 
import { FaPlus, FaMinus } from 'react-icons/fa';

const qnaList = [
  {
    question: "Is it a good idea to change your password regularly?",
    answer: "Yes, Changing your passwords from time to time reduces the risk of long-term exposure in case your credentials are ever leaked or compromised.",
  },
  {
    question: "Do you save any passwords I enter?",
    answer: "No, All password checks happen in your browser. We never store or log your data.",
  },
  {
    question: "What does 'breached password' mean?",
    answer: "It means the password has appeared in a data breach and is known to hackers.",
  },
  {
    question: "How do I know if my password is really strong?",
    answer: "A strong password is long (12 characters or more), and contains uppercase and lowercase letters, numbers, and symbols. Avoid common words like 123456 or password.",
  },
  {
    question: "Are passwords that contain personal information such as  names or dates of birth safe?",
    answer: "No, passwords that contain personal information such as your name or date of birth can be easy to guess if an attacker knows some details about you. They should be avoided. ",
  },
];

export default function QnA() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className='qna-wrapper' id='Q&A'>
       
    <div className="qna-container">
      <h2 className="qna-title">Q&A</h2>
      {qnaList.map((item, index) => (
        <div
          key={index}
          className={`qna-item ${openIndex === index ? 'active' : ''}`}
          onClick={() => toggle(index)}
        >
          <div className="qna-question">
            {item.question}
            <span className="qna-icon">
              {openIndex === index ? <FaMinus /> : <FaPlus />}
            </span>
          </div>
          {openIndex === index && <div className="qna-answer">{item.answer}</div>}
        </div>
      ))}
    </div>
    </div>
  );
}
