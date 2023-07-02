import logo from './logo.png'; 
import './leftFrame.css'
const leftFrame = () => {
  return (
    <div className="left">
      <img src={logo} alt="logo"/>
      <h1>Your notes</h1>
    </div>
  );
};
export default leftFrame;
