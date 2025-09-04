import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Button from "../components/Button";
import TimeOfDay from "../components/TimeOfDay";
import IntensityLevel from "../components/IntensityLevel";
import SubmitButton from "../components/SubmitButton";
import ExclamationPoint from "../components/ExclamationPoint";
import Dropdown from "../components/Dropdown";

function Submission() {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({
    uid: user.uid,
    title: "",
    body: "",
    tags: [],
    timesUsed: 1,
    timeOfDay: "Morning",
    intensity: "1",
    flagged: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFlag = () => {
    setForm((prev) => ({ ...prev, flagged: !prev.flagged }));
  };

  const handleTagSelection = (option) => {
    setSelected(option);
    console.log("Selected options:", option);
  };

  useEffect(() => {
    const tagsArray = selected.map((tag) => tag.value);
    setForm((prev) => ({
      ...prev,
      tags: tagsArray,
    }));
  }, [selected]);

  // const handleNewTag = async (tag) => {

  // };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      console.log("Form: ", form);
      // await handleNewTag();
      await axios.post("/api/entries/submission", form);
      console.log("Form submitted successfully");
    } catch (err) {
      console.error("📦 Error: ", err);
    }
    navigate("/home");
  };

  return (
    <div className="@container">
      <Header />

      <Button
        className="m-3 cursor-pointer rounded-md"
        text="Back to Homepage"
        onClick={() => {
          navigate("/home");
        }}
      />

      <form
        method="post"
        onSubmit={handleSubmission}
        className="grid grid-cols-1 gap-4 p-5"
      >
        <div className="flex gap-5">
          <ExclamationPoint onClick={toggleFlag} isFlagged={form.flagged} />

          <Input
            className="border-1 border-solid rounded-md p-1 min-w-80"
            placeholder="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          <Dropdown onChange={handleTagSelection} selected={selected} />
        </div>

        <div className="flex gap-10">
          <textarea
            className="border-1 border-solid rounded-md p-2 w-full"
            placeholder="Type your entry here!"
            name="body"
            value={form.body}
            cols="50"
            rows="20"
            onChange={handleChange}
          />
          <div className="flex flex-col justify-around gap-10">
            <TimeOfDay onChange={handleChange} timeOfDay={form.timeOfDay} />
            <IntensityLevel
              onChange={handleChange}
              intensity={form.intensity}
            />
            <SubmitButton className="p-2 cursor-pointer border-none rounded-md bg-sky-900 text-white" />
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default Submission;
