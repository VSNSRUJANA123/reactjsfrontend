import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold background-color text-white p-3">
        Dashboard
      </h1>
      <div className="text-center">
        <h1 className="text-2xl font-bold p-3">Page Not Found</h1>
        <Link to="/">
          <button className="button2 text-white p-3 rounded">Go to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
