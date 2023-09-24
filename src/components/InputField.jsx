import { InputAdornment, TextField } from "@mui/material";
import React from "react";

export default function InputField({ value, onChange, name, type, label }) {
  return (
    <TextField
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      variant="filled"
      required
      fullWidth
      InputProps={{
        style: {
          borderRadius: "10px",
          borderBottom: "none",
        },
      }}
      InputLabelProps={{
        style: {
          color: "#7B88A8",
        },
      }}
    />
  );
}

export function MultiField({ value, onChange, name, type, label }) {
  return (
    <TextField
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      variant="filled"
      required
      fullWidth
      multiline
      rows={4}
      InputProps={{
        style: {
          borderRadius: "10px",
          borderBottom: "none",
        },
      }}
      InputLabelProps={{
        style: {
          color: "#7B88A8",
        },
      }}
    />
  );
}

export function InputFieldDate({ value, onChange, name, type, label }) {
  const today = new Date().toISOString().split("T")[0];
  return (
    <TextField
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      variant="filled"
      required
      fullWidth
      InputProps={{
        style: {
          borderRadius: "10px",
          borderBottom: "none",
        },
        startAdornment: (
          <InputAdornment position="start">
            <span role="img" aria-label="calendar">
              📅
            </span>
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        style: {
          color: "#7B88A8",
        },
      }}
      inputProps={{
        min: today,
      }}
    />
  );
}

export function TimeInputField({ value, onChange, name, label }) {
  return (
    <TextField
      type="time"
      name={name}
      value={value}
      onChange={onChange}
      label={label}
      variant="filled"
      fullWidth
      InputProps={{
        style: {
          borderRadius: "10px",
          borderBottom: "none",
        },
        startAdornment: (
          <InputAdornment position="start">
            <span role="img" aria-label="clock">
              ⏰
            </span>
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        style: {
          color: "#7B88A8",
        },
      }}
    />
  );
}
