import React from "react";

import searchIcon from "./assets/search.svg";
import { searchType } from "./types/types";

const Search = ({ setSearchUserName }: searchType) => {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = (str: string) => {
    setSearchUserName(str);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setTimeout(() => {
      updateSearchValue(event.target.value);
    }, 1000);
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
