import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SearchBox = () => {
  const [keyWord, setKeyWord] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (keyWord.trim()) {
      history.push(`/search/${keyWord}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onSubmit={handleSubmit} inline>
      <Form.Control
        type="text"
        name="q"
        value={keyWord}
        onChange={(e) => setKeyWord(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
