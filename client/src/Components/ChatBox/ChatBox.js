import React from "react";
import Col from "../Col";
import "./ChatBox.css";
import ChatFile from "../ChatFile";

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
const ChatBox = ({ _id, handleSaveButton, title, snippet, date, url }) => (
  <Col size="md-4">
    <ChatFile />
  </Col>
);

// Export search results list component.
export default ChatBox;
