import "../index.css";
import "../App.css";
import { useEffect, useState } from "react";
import profile from "../images/profile.jpg";
const Home = () => {
  const [user, setUser] = useState([]);
  const fetchUserData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    fetchUserData();
  });
  return (
    <div>
      <h1 className="text-3xl font-bold background-color text-white p-3">
        Dashboard
      </h1>
      <div className="flex justify-between items-center p-3 bg-gray-100">
        <input
          type="search"
          className="p-2 rounded shadow w-64"
          placeholder="Search..."
        />
        <select className="p-2 w-52 rounded shadow">
          <option>A-Z</option>
          <option>Z-A</option>
        </select>
      </div>
      <ul className="p-3 flex flex-wrap bg-gray-50">
        {user.map((items) => {
          return (
            <div className="shadow p-3 m-3 w-96 flex flex-col justify-center items-center">
              <div className="flex justify-center items-center">
                <img
                  className="w-28 h-28  rounded"
                  src={profile}
                  alt="profile"
                />
              </div>
              <h1>Name</h1>
              <h2>Email</h2>
              <p className="flex items-center">
                <svg
                  className="text-orange-600"
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12,14c2.206,0,4-1.794,4-4s-1.794-4-4-4s-4,1.794-4,4S9.794,14,12,14z M12,8c1.103,0,2,0.897,2,2s-0.897,2-2,2 s-2-0.897-2-2S10.897,8,12,8z"></path>
                  <path d="M11.42,21.814C11.594,21.938,11.797,22,12,22s0.406-0.062,0.58-0.186C12.884,21.599,20.029,16.44,20,10 c0-4.411-3.589-8-8-8S4,5.589,4,9.995C3.971,16.44,11.116,21.599,11.42,21.814z M12,4c3.309,0,6,2.691,6,6.005 c0.021,4.438-4.388,8.423-6,9.73C10.389,18.427,5.979,14.441,6,10C6,6.691,8.691,4,12,4z"></path>
                </svg>
                City
              </p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
