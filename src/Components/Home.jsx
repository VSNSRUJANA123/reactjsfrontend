import "../index.css";
import "../App.css";
import { useEffect, useState } from "react";
import profile from "../images/profile.jpg";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className="min-h-screen flex justify-center">
      <p className="text-xl text-red-700">*Failed to fetch data</p>
    </div>
  );
};
const UserData = ({ user, filter }) => {
  return (
    <ul className="flex flex-wrap">
      {user.map((items) => {
        const { id, name, email, address } = items;
        return (
          <div
            className="shadow p-3 m-3 w-96 flex flex-col justify-center items-center"
            key={id}
          >
            <div className="flex justify-center items-center">
              <img className="w-28 h-28  rounded" src={profile} alt="profile" />
            </div>
            <Link to={`users/${id}`}>
              <h1 className="font-bold text-2xl h1-name">{name}</h1>
            </Link>
            <h3>{email}</h3>
            <p className="flex items-center text-gray-800">
              <svg
                className="text-orange-600"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12,14c2.206,0,4-1.794,4-4s-1.794-4-4-4s-4,1.794-4,4S9.794,14,12,14z M12,8c1.103,0,2,0.897,2,2s-0.897,2-2,2 s-2-0.897-2-2S10.897,8,12,8z"></path>
                <path d="M11.42,21.814C11.594,21.938,11.797,22,12,22s0.406-0.062,0.58-0.186C12.884,21.599,20.029,16.44,20,10 c0-4.411-3.589-8-8-8S4,5.589,4,9.995C3.971,16.44,11.116,21.599,11.42,21.814z M12,4c3.309,0,6,2.691,6,6.005 c0.021,4.438-4.388,8.423-6,9.73C10.389,18.427,5.979,14.441,6,10C6,6.691,8.691,4,12,4z"></path>
              </svg>
              {address.city}
            </p>
          </div>
        );
      })}
      {filter && (
        <div className="min-h-screen">
          <h1 className="font-bold">Data Not Found</h1>
        </div>
      )}
    </ul>
  );
};
const Home = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState({ msg: "", value: false });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("AZ");
  const [filter, setFilter] = useState(false);
  const fetchUserData = async () => {
    setLoading(true);
    setError({ ...error, value: false });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      const handleSort = [...data].sort((a, b) => a.name.localeCompare(b.name));
      setUser(handleSort);
      setLoading(false);
      setError({ ...error, value: false });
    } catch (err) {
      setLoading(false);
      setError({ value: true, msg: "Failed to fetch data" });
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const sortFilter = (sort) => {
    const sortedData = [...user].sort((a, b) =>
      sort === "AZ"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setUser(sortedData);
  };
  const filterData = (value = "") => {
    if (value === "") {
      fetchUserData();
    }
    const result = user.filter((items) =>
      items.name.toLowerCase().includes(value.toLowerCase())
    );

    if (result.length > 0) {
      setUser(result);
      setFilter(false);
    } else {
      setUser([]);
      setFilter(true);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold background-color text-white p-3">
        Dashboard
      </h1>
      <div className="flex justify-between p-3 items-center bg-gray-100 max-md:flex-col max-md:items-start">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            filterData(e.target.value);
          }}
          type="search"
          className="p-2 rounded shadow w-64 mb-3"
          placeholder="Search..."
        />
        <select
          onChange={(e) => {
            setSort(e.target.value);
            sortFilter(e.target.value);
          }}
          value={sort}
          className="p-2 w-52 rounded shadow"
        >
          <option name="AZ" value="AZ">
            A-Z
          </option>
          <option name="ZA" value="ZA">
            Z-A
          </option>
        </select>
      </div>
      <ul className="p-3  bg-gray-50">
        {loading && (
          <div className="min-h-screen w-full flex loading justify-center">
            <ClipLoader color="#fb6340" size={50} />
          </div>
        )}
        {error.value ? <Error /> : <UserData user={user} filter={filter} />}
      </ul>
    </div>
  );
};

export default Home;
