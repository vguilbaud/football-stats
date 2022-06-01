import { useRef } from "react";

const CommentsForm = (props) => {
  const commentRef = useRef();

  const addComment = () => {
    fetch("http://localhost:4200/comments", {
      body: JSON.stringify({
        comment: commentRef.current.value,
        type: props.type,
        commentedId: props.commentedId,
        userId: props.userId,
      }),
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <label htmlFor="comment">Add a comment</label>
      <input id="comment" type="text" ref={commentRef} />
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
};

export default CommentsForm;
