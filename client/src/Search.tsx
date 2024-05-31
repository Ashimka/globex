import React from "react";

import searchIcon from "./assets/search.svg";
import { searchType } from "./types/types";

const Search = ({ setSearchUserName }: searchType) => {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = (str: string) => {
    setTimeout(() => {
      setSearchUserName(str);
    }, 1000);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <>
      <div className="search">
        <input
          className="input-search"
          type="search"
          ref={inputRef}
          value={value}
          onChange={onChangeInput}
          placeholder="Search.."
        />
        <img className="img-search" src={searchIcon} alt="search" />
      </div>
    </>
  );
};

export default Search;
