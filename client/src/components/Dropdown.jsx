import React, { useState, useEffect } from "react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import { UserAuth } from "../context/AuthContext";

export default function Dropdown() {
  const { user } = UserAuth();
  const [tags, setTags] = useState([]);
  const [options, setOptions] = useState([]);

  const handleTags = async () => {
    try {
      const fetchedTags = await axios.get(`/api/${user.uid}/tags`);
      setTags(fetchedTags.data);
    } catch (error) {
      console.log("🐼", error);
    }
  };

  useEffect(() => {
    handleTags();
  }, [user.uid]);

  useEffect(() => {
    setOptions(tags.map((tag) => ({ value: tag, label: tag })));
  }, [tags]);

  return (
    <CreatableSelect
      options={options}
      isMulti
      className="basic-multi-select w-95"
      classNamePrefix="select"
      placeholder="Choose tag(s)"
      closeMenuOnSelect={false}
    />
  );
}
