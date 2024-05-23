import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const NavbarComponent = ({ brand, menu }: { brand: string; menu: string }) => {
  const navigate = useNavigate();
  const onClickLogin = () => {
    navigate("/login");
  };

  const onClickLogout = () => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (token) {
      localStorage.setItem("token", "");
      console.log(localStorage.getItem("token"));

      navigate("/login");
    }
  };
  return (
    <nav className="flex bg-slate-700 text-slate-100 px-4 py-4 fixed top-0 left-0 w-full">
      <div className="flex-1 navbar-brand">
        <h1 className="text-lg">{brand}</h1>
      </div>
      <div className="flex-1 flex navbar-menu">
        <div className="flex ml-auto">
          <h1 className="text-lg text-right">{menu}</h1>
          <span className="flex items-center justify-center">
            {menu === "Logout" && (
              <button onClick={onClickLogout}>
                <LogoutIcon className="mx-2" />
              </button>
            )}
            {menu === "Login" && (
              <button onClick={onClickLogin}>
                <LoginIcon className="mx-2" />
              </button>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
