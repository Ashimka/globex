import closeIcon from "./assets/close.svg";
import { propsType } from "./types/types";
import { useClickOutside } from "./hooks/useClickOutside";

const Popup = ({ closePopup, modalRef, user }: propsType) => {
  const clickClose = () => {
    closePopup();
  };

  useClickOutside(modalRef, clickClose);
  return (
    <>
      <dialog ref={modalRef}>
        <div className="wrapper">
          <div className="popup">
            <div className="header">
              <h2 className="name">{user?.name}</h2>
              <img
                className="close-icon"
                src={closeIcon}
                alt="close"
                onClick={clickClose}
              />
            </div>
            <div className="body">
              <div className="info">
                <div className="info-name">Телефон:</div>
                <div className="info-desc">{user?.phone}</div>
              </div>
              <div className="info">
                <div className="info-name">Почта:</div>
                <div className="info-desc">{user?.email}</div>
              </div>
              <div className="info">
                <div className="info-name">Дата приема:</div>
                <div className="info-desc">{user?.hire_date}</div>
              </div>
              <div className="info">
                <div className="info-name">Должность:</div>
                <div className="info-desc">{user?.position_name}</div>
              </div>
              <div className="info">
                <div className="info-name">Подразделение:</div>
                <div className="info-desc">{user?.department}</div>
              </div>
            </div>
            <div className="footer">
              <div className="footer-title">Дополнительная информация:</div>
              <div className="footer-desc">{user?.address}</div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Popup;
