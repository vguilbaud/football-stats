import { useEffect, useState } from "react";
import CommentItem from "./CommentItem";

const CommentsList = (props) => {
  const [commentList, setCommentList] = useState([]);

  const setUpComment = (comments) => {
    if (comments) {
      return comments.map((comment, i) => {
        return (
          <CommentItem
            deleteThisComment={deleteCommentHandler}
            key={comment._id}
            index={i}
            comment={comment}
          />
        );
      });
    }
  };

  const deleteCommentHandler = (index) => {
    setCommentList((prev) => {
      const newComs = [...prev];
      newComs.splice(index, 1);
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
          res.map((comment, i) => {
            return (
              <CommentItem
                deleteThisComment={deleteCommentHandler}
                key={`${i}${comment._id}`}
                comment={comment}
              />
            );
          })
        );
      })
      .catch((err) => console.log(err));
  }, [props.type, props.commentedId]);

  return (
    <div>
      {commentList}
      {props.newComments && setUpComment(props.newComments)}
    </div>
  );
};

export default CommentsList;
