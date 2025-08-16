import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
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

  const handleOptions = () => {
    const result = [];
    tags.forEach((tag) => {
      const option = {};
      option.value = tag;
      option.label = tag;
      result.push(option);
    });
    setOptions(result);
  };

  useEffect(() => {
    handleTags();
  }, [user.uid]);

  useEffect(() => {
    handleOptions();
  }, [tags]);

  return (
    <Select
      defaultValue="Choose Tags"
      options={options}
      isMulti
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
}
