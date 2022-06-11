import { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Comments.module.css";

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
        if (res.error) {
          alert(res.error);
        } else {
          props.editComment(props.commentId, commentRef.current.value);
          props.closeEditor();
        }
      })
      .catch((err) => alert(err));
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
        if (res.error) {
          alert(res.error);
        } else {
          authCtx.addComment(res._id);
          commentRef.current.value = "";
          props.addNewComment(res);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.commentForm}>
      <input
        id="comment"
        type="text"
        ref={commentRef}
        defaultValue={props.initialValue ? props.initialValue : ""}
        placeholder="100 characters max"
      />
      <button
        className="button"
        onClick={props.updating ? editComment : addComment}
      >
        {props.updating ? "Edit Comment" : "Add Comment"}
      </button>
    </div>
  );
};

export default CommentsForm;
