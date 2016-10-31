module.exports = {
  overlay : {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(255, 255, 255, 0.75)',
  },
  content : {
    backgroundColor : '#353535',
    position        : 'fixed',
    width: '350px',
    height: '300px',
    top: '44%',
    left: '50%',
    transform: 'perspective(1px) translate(-50%, -50%)',
    border          : '1px solid #ccc',
    padding         : '20px',
    opacity         : '0',
    color           : '#afafaf',
    transition      : 'opacity 1s'
  }
};
