import { useContext } from "react";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    setUserData({
      ...userData,
      name: e.target.elements.name.value,
      lastName: e.target.elements.lastName.value,
    });

    navigate("/forecast");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="First name" />
        <input type="text" name="lastName" placeholder="Last name" />
      </form>
    </div>
  );
};

export default Login;
