import React from "react";
import phoneIcon from "./assets/phone.svg";
import emailIcon from "./assets/email.svg";
import { userType } from "./types/types";
import Popup from "./Popup";
import Search from "./Search";

const URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [usersList, setUsersList] = React.useState<userType[] | null>(null);
  const [user, setUser] = React.useState<userType | null>(null);
  const [searchUserName, setSearchUserName] = React.useState("");

  const [showPopup, setShowPopup] = React.useState(false);
  const modalRef = React.useRef<null | HTMLDialogElement>(null);

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    if (showPopup) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showPopup]);

  const fetchData = async () => {
    try {
      const data = await fetch(URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (data.ok) {
        setUsersList(await data.json());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSearchUser = React.useCallback(async () => {
    try {
      const data = await fetch(`${URL}?term=${searchUserName}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (data.ok) {
        setUsersList(await data.json());
      }
    } catch (error) {
      console.log(error);
    }
  }, [searchUserName]);

  React.useEffect(() => {
    if (searchUserName) {
      fetchSearchUser();
    }
  }, [searchUserName, fetchSearchUser]);

  const openPopup = (data: userType) => {
    setShowPopup(true);
    setUser(data);
    document.querySelector("body")?.classList.add("hidden");
  };

  const closePopup = () => {
    setShowPopup(false);
    modalRef.current?.close();
    document.querySelector("body")?.classList.remove("hidden");
  };

  return (
    <>
      <div className="container">
        <Search setSearchUserName={setSearchUserName} />
        <ul className="users">
          {usersList &&
            usersList.map((user, index) => (
              <li className="item" key={index} onClick={() => openPopup(user)}>
                <h4 className="title">{user.name}</h4>
                <div className="contacts">
                  <div className="phone">
                    <img src={phoneIcon} alt="phone" className="img-icon" />
                    <span className="text">{user.phone}</span>
                  </div>
                  <div className="email">
                    <img src={emailIcon} alt="email" className="img-icon" />
                    <span className="text">{user.email}</span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
        {showPopup && (
          <Popup closePopup={closePopup} modalRef={modalRef} user={user} />
        )}
      </div>
    </>
  );
};
export default App;
