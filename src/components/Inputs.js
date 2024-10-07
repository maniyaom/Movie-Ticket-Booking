// Inputs.js
import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

// Text Input Component
export const TextInput = ({ label, id, type = "text", value, onChange, error, placeholder }) => {
  return (
    <div>
      <label htmlFor={id} className="label-text">
        {label}
        <span className="error-inline">{error}</span>
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`input-field ${error !== "" ? 'error-input-field' : ''}`}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

// Text Area Component
export const TextAreaInput = ({ label, value, onChange, error, placeholder }) => {
  return (
    <div>
      <label className="label-text">
        {label}
        <span className="error-inline">{error}</span>
      </label>
      <textarea
        value={value}
        onChange={onChange}
        className={`input-field ${error !== "" ? 'error-input-field' : ''}`}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

// Password Input Component
export const PasswordInput = ({
  label,
  id,
  value,
  onChange,
  error,
  placeholder,
  isVisible,
  toggleVisibility,
}) => {
  return (
    <div>
      <label htmlFor={id} className="label-text">
        {label}
        <span className="error-inline">{error}</span>
      </label>
      <div className="input-wrapper">
        <input
          type={isVisible ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field ${error !== "" ? 'error-input-field' : ''}`}
        />
        <button type="button" className="password-toggle" onClick={toggleVisibility}>
          {isVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

// Radio Button Component
export const RadioInput = ({ label, name, options, onChange }) => {
  return (
    <div>
      <label className="label-text">{label}</label>
      <div className="flex align-center myb-20">
        {options.map((option) => (
          <div key={option.id}>
            <input
              type="radio"
              name={name}
              id={option.id}
              value={option.value}
              className="mxl-10"
              onChange={onChange}
            />
            <label htmlFor={option.id} style={{ marginLeft: '3px' }}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
