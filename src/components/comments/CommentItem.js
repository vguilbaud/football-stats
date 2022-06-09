import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import CommentsForm from "./CommentsForm";
import classes from "./Comments.module.css";

const CommentItem = (props) => {
  const authCtx = useContext(AuthContext);
  const [editor, setEditor] = useState();

  const editingHandler = () => {
    setEditor(
      <CommentsForm
        updating={true}
        initialValue={props.comment.message}
        type={props.comment.type}
        commentedId={props.comment.commentedId}
        commentId={props.comment._id}
        editComment={props.editComment}
        closeEditor={closeEditor}
      />
    );
  };

  const deleteComment = () => {
    fetch("http://localhost:4200/comments/deleteComment", {
      body: JSON.stringify({
        commentId: props.comment._id,
        userId: authCtx.userId,
      }),
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        props.deleteThisComment(props.id);
      })
      .catch((err) => console.log(err));
  };

  const closeEditor = () => {
    setEditor();
  };

  return (
    <div className={classes.commentItem}>
      {!editor && (
        <div>
          <div className={classes.flexButtons}>
            <p className={classes.message}>{props.comment.message}</p>
            <div>
              {authCtx.userId === props.comment.userId && (
                <button className="button" onClick={editingHandler}>
                  Update
                </button>
              )}
              {authCtx.userId === props.comment.userId && (
                <button
                  className={`button ${classes.redButton}`}
                  onClick={deleteComment}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
          <p>
            Par {props.comment.name} le{" "}
            {new Date(props.comment.date).toLocaleDateString("fr")}
          </p>
        </div>
      )}
      {editor}
      {editor && (
        <button className={`button ${classes.redButton}`} onClick={closeEditor}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default CommentItem;
