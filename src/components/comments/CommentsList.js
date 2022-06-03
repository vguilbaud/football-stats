import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import CommentItem from "./CommentItem";
import CommentsForm from "./CommentsForm";

const CommentsList = (props) => {
  const [commentList, setCommentList] = useState([]);
  const authCtx = useContext(AuthContext);

  const editCommentHandler = (id, message) => {
    setCommentList((prev) => {
      let newComs = prev.map((com) => {
        if (com.props.id === id) {
          com.props.comment.message = message;
          return com;
        }
        return com;
      });
      return newComs;
    });
  };

  const deleteCommentHandler = (id) => {
    setCommentList((prev) => {
      let newComs = prev.filter((com) => com.props.id !== id);
      return newComs;
    });
  };

  const addNewCommentsHandler = (comment) => {
    setCommentList((prev) => {
      let newComs = [
        ...prev.concat(
          <CommentItem
            deleteThisComment={deleteCommentHandler}
            key={comment._id}
            id={comment._id}
            comment={comment}
            editComment={editCommentHandler}
          />
        ),
      ];
      return newComs;
    });
  };

  useEffect(() => {
    fetch(`http://localhost:4200/comments/getComments`, {
      body: JSON.stringify({
        type: props.type,
        commentedId: props.commentedId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setCommentList(
          res.map((comment) => {
            return (
              <CommentItem
                deleteThisComment={deleteCommentHandler}
                key={comment._id}
                id={comment._id}
                comment={comment}
                editComment={editCommentHandler}
              />
            );
          })
        );
      })
      .catch((err) => console.log(err));
  }, [props.type, props.commentedId]);

  return (
    <div>
      {authCtx.isLoggedIn && (
        <CommentsForm
          type={props.type}
          commentedId={props.commentedId}
          addNewComment={addNewCommentsHandler}
        ></CommentsForm>
      )}
      {commentList}
    </div>
  );
};

export default CommentsList;
