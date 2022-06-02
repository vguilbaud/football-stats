import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";

const CommentsForm = (props) => {
  const authCtx = useContext(AuthContext);
  const commentRef = useRef();

  const editComment = () => {
    fetch("http://localhost:4200/comments/updateComment", {
      body: JSON.stringify({
        comment: commentRef.current.value,
        commentId: props.commentId,
        userId: authCtx.userId,
      }),
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const addComment = () => {
    fetch("http://localhost:4200/comments/createComment", {
      body: JSON.stringify({
        comment: commentRef.current.value,
        type: props.type,
        commentedId: props.commentedId,
        userId: authCtx.userId,
        name: authCtx.name,
        date: new Date().toDateString(),
      }),
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        authCtx.addComment(res._id);
        commentRef.current.value = "";
        props.addNewComment(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <label htmlFor="comment">
        {!props.updating ? "Add a comment" : "Edit comment"}
      </label>
      <input
        id="comment"
        type="text"
        ref={commentRef}
        defaultValue={props.initialValue ? props.initialValue : ""}
      />
      <button onClick={props.updating ? editComment : addComment}>
        {props.updating ? "Edit Comment" : "Add Comment"}
      </button>
    </div>
  );
};

export default CommentsForm;
