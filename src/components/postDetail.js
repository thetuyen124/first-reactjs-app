var React = require("react");

const CreateIdeaView = () => {
  return (
    <div>
      <h1>Create Post: </h1>
      <input type="text" ref="newIdeaTitle" placeholder="title"></input>
      <input type="text" ref="newIdeaBody" placeholder="body"></input>
    </div>
  );
};

export default CreateIdeaView;
