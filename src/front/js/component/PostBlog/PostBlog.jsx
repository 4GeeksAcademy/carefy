import React from "react";
import styles from './PostBlog.module.css'

export const PostBlog = ({ title, body, img }) => {
    return (
        <div className={`${styles.post_blog} bg-light rounded post-blog p-5 mb-5`}>
            <h1 className="mb-4">{title}</h1>
            <div className={styles.post_body}>
                <img className="img-fluid rounded mb-4" src={img} />
                <p>{body}</p>
            </div>
        </div>
    )

}