import React from "react";
import { useNavigate } from "react-router-dom";

function Doctor({ doctor }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
    >
      <h1 className="form-title doc-name px-2">Dr. {doctor.fullName}</h1>
      <hr />

      <p>
        <b>Specialization : </b>
        {doctor.specialization}
      </p>
      <p>
        <b>Experience : </b>
        {doctor.experience} Years
      </p>
      <p>
        <b>Phone Number : </b>
        {doctor.phone}
      </p>
      <p>
        <b>Fee per Visit : </b>
        {doctor.fee} INR /-
      </p>
      <p>
        <b>Timings : </b>
        {doctor.timings[0]} - {doctor.timings[1]}
      </p>
    </div>
  );
}

export default Doctor;
