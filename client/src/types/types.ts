export type userType = {
  name: string;
  phone: string;
  email: string;
  address: string;
  position_name: string;
  department: string;
  hire_date: string;
};

export type propsType = {
  showPopup: boolean;
  closePopup: () => void;
  // modalRef: React.MutableRefObject<HTMLDialogElement | null>;
  user: userType | null;
};

export type searchType = {
  setSearchUserName: React.Dispatch<React.SetStateAction<string>>;
};
