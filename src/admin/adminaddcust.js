import React from "react";

function Adminaddcust() {
  return (
    <div classNameName="dashboardContents">
      {/* <h3>InstAura Customer Registration</h3> */}
      <div>
        <form>
          <div className="mb-3">
            <br></br>
            <h3>Instaura Customer Registration</h3>
            <br></br>
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          {/* <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
          <button type="submit" className="btn ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Adminaddcust;
