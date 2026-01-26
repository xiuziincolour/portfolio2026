import React from 'react';
import { ArrowLeft } from 'lucide-react';
import './AboutMe.css';

interface AboutMeProps {
  onBack: () => void;
}

const AboutMe: React.FC<AboutMeProps> = ({ onBack }) => {
  return (
    <div className="about-me-page">
      <div className="about-me-container">
        <button 
          onClick={onBack}
          className="about-me-back-button"
        >
          <ArrowLeft size={16} className="about-me-back-icon" />
          <span>Back</span>
        </button>
        
        <h1 className="about-me-title">xiuziguo</h1>
      </div>
    </div>
  );
};

export default AboutMe;
