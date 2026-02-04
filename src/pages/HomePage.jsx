import { Link } from "react-router";

const HomePage = () => {
  return (
    <div className="flex gap-10">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/chat">Chat</Link>
    </div>
  );
};

export default HomePage;
