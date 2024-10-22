// ProfileInput.js
import React from 'react';

const ProfileInput = ({ label, type, value, onChange, name}) => {
    return (
        <p className={`acc-${label.toLowerCase()}`}>
            <span className="label">{label}:</span> 
            <input 
                type={type} 
                className="value" 
                value={value} 
                onChange={onChange} 
                name={name}
            />
        </p>
    );
};

export default ProfileInput;
