import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <ul>
        <Link to="/">Home</Link>
        <br />
        <Link to="/test1">Test 1</Link>
        <br />
        <Link to="/test2">Test 2</Link>
        <br />
        <Link to="/test3">Room test</Link>
        <br />
      </ul>
    </div>
  );
};

export default Nav;
