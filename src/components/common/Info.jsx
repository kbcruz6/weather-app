import React from "react";

const Info = ({ data }) => {
  const info = JSON.stringify(data);
  return <div>{info}</div>;
};

export default Info;
