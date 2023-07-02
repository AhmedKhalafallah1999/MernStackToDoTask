import "./ModifyUser.css";
const ModifyUser = () => {
  return (
    <div className="modifyPage">
      {/* <img src="." alt="cover" /> */}
      <div className="modifyTitle">
        <h1>Modify User Information</h1>
      </div>
      <div className="modify">
        <form>
          <div>
            <label>Email</label>
            <input type="email"></input>
          </div>
          <div>
            <label>Password</label>
            <input type="password"></input>
          </div>
          <div>
            <label>Username</label>
            <input type="text"></input>
          </div>
          <div>
            <label>Phone</label>
            <input type="number"></input>
          </div>
          <div>
            <label>Birth Year</label>
            <input type="text"></input>
          </div>
        </form>
      </div>
      <div className="saveChange">
        <button>Save Changes</button>
      </div>
    </div>
  );
};
export default ModifyUser;
