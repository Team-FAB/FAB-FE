import React from "react";
import styles from "./postModal.module.css";

interface PostModalProps {
  post: any; // Roommate post data type
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {/* Add other post fields as needed */}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  
  export default PostModal;
