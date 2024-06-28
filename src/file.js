import React, { useState } from "react";
const read = require("robotic-file-reader/file");

const file = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = useState("");

  function main() {
    setValue(new read().read("./App.js"));
  }

  return <div onLoad={main()}>{value}</div>;
};

export default file;
