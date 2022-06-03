import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import CommentsForm from "./CommentsForm";

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
    <div>
      {!editor && (
        <div>
          <p>{props.comment.message}</p>
          <p>
            By {props.comment.name} on the {props.comment.date}
          </p>
          {authCtx.userId === props.comment.userId && (
            <button onClick={editingHandler}>Update</button>
          )}
          {authCtx.userId === props.comment.userId && (
            <button onClick={deleteComment}>Delete</button>
          )}
        </div>
      )}
      {editor}
      {editor && <button onClick={closeEditor}>Cancel</button>}
    </div>
  );
};

export default CommentItem;
