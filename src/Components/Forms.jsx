// eslint-disable-next-line no-unused-vars
import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import PropTypes from 'prop-types';

const Forms = ({ handleSubmit, handleonchange, closehandle, rest }) => {
  return (
    <>
      <div className="form">
        <div className="icon" onClick={closehandle}>
          <IoMdCloseCircle />
        </div>
        <div className="task-heading">
          <h1>ADD TASK</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Your Name"
            id="name"
            name="name"
            onChange={handleonchange}
            value={rest.name}
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            id="email"
            name="email"
            onChange={handleonchange}
            value={rest.email}
          />
          <input
            type="number"
            placeholder="Enter Your Number"
            id="phone"
            name="phone"
            onChange={handleonchange}
            value={rest.phone}
          />
          <div className="submit-btn">
            <input type="submit" />
          </div>
        </form>
      </div>
    </>
  );
};

Forms.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleonchange: PropTypes.func.isRequired,
  closehandle: PropTypes.func.isRequired,
  rest: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default Forms;
