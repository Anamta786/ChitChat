import PropTypes from 'prop-types';
import React from 'react';
import Header from '../Header/Header';
import RegistrationForm from './RegistrationForm/RegistrationForm';

// const HelloWorld = ({ name, updateName }) => (
//   <div>
//     <h3>
//       Hello User, {name}!
//     </h3>
//     <hr />
//     <form >
//       <label htmlFor="name">
//         Say hello to:
//       </label>
//       <input
//         id="name"
//         type="text"
//         value={name}
//         onChange={(e) => updateName(e.target.value)}
//       />
//     </form>
//   </div>
// );
//
// HelloWorld.propTypes = {
//   name: PropTypes.string.isRequired,
//   updateName: PropTypes.func.isRequired,
// };
function HelloWorld () {
  return (
    <div className="App">
      <Header />
      <RegistrationForm />
    </div>
  )
}

export default HelloWorld
