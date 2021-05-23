import { Link } from "react-router-dom";

export function NotFound(props) {
  return (
    <div className="text-center mt-5">
      <h3 className="p-4 font-bold">The Page You requested cound not be found!</h3>
      <h5>Go <Link to="/" className="text-blue-500">back to home</Link>.</h5>
    </div>
  );
}
