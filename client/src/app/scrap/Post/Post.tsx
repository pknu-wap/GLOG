import React from "react";
import { Image, Post, Thumbnail, Title } from "./Post.style";
import { PostComponentType } from "./Post.type";


function PostComponent({ thumbnail, title}: PostComponentType) {
    return(
        <Post>
            <Thumbnail>
                <Image alt="" src={thumbnail}/>
            </Thumbnail>
            <Title>{title}</Title>
        </Post>
    )
}

export default PostComponent;