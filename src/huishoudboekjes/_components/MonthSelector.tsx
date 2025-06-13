import React from "react";
import { MenuItem, Select } from "@mui/material";

interface Props {
  maand: number;
  onChange: (maand: number) => void;
}

export const MonthSelector: React.FC<Props> = ({ maand, onChange }) => (
  <Select value={maand} onChange={(e) => onChange(Number(e.target.value))}>
    <MenuItem value={1}>Januari</MenuItem>
    <MenuItem value={2}>Februari</MenuItem>
    <MenuItem value={3}>Maart</MenuItem>
    <MenuItem value={4}>April</MenuItem>
    <MenuItem value={5}>Mei</MenuItem>
    <MenuItem value={6}>Juni</MenuItem>
    <MenuItem value={7}>Juli</MenuItem>
    <MenuItem value={8}>Augustus</MenuItem>
    <MenuItem value={9}>September</MenuItem>
    <MenuItem value={10}>Oktober</MenuItem>
    <MenuItem value={11}>November</MenuItem>
    <MenuItem value={12}>December</MenuItem>
  </Select>
);
