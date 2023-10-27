import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Like, Tag, User,Image,Comment, UnLike, AddCommentForm } from "../Types";

 
export type Post={
     id:string;
     user: User;
     createdDate: string;
     updatedDAte: string;
     content: string;
     likes:Like[];
     unLikes:UnLike[];
     tages:Tag[];
     comments:Comment[];
     images:Image[];
}
export type PostListProps={
     posts: Post[];
}
export type CardProps={
     post: Post;
     isVisible: boolean;
     likeColor: string;
     unlikeColor: string;
     getElapsedTime: (date: string) => string;
     changeVisibility: () => void;   
     changeLikeColor: (postId:string) => void;
     changeUnlikeColor: (postId:string) => void; 
     register:UseFormRegister<AddCommentForm>;
     errors:FieldErrors<AddCommentForm>;
     handleSubmit: UseFormHandleSubmit<AddCommentForm, undefined>;
     onSubmit: SubmitHandler<AddCommentForm>;
     getImageFromBytes: (image: string) => string;
     formatContent: (content: string) => JSX.Element[]|JSX.Element;
     isProfile: boolean;
     handleEdit: (post : Post) => void;
     handleDelete: (postId: string)=> void;
}
export type CardContainerProps={
post: Post;
isProfile: boolean;
handleEdit: (post : Post) => void;
handleDelete:(postId: string) => void;
}
export type AddCommentProps={
     register:UseFormRegister<AddCommentForm>;
     errors:FieldErrors<AddCommentForm>;
     handleSubmit: UseFormHandleSubmit<AddCommentForm, undefined>;
     onSubmit: SubmitHandler<AddCommentForm>;
}
export type PopupEditPostprops={
     handlePopup : () => void | undefined;
     submitUpdatePost : () => void;
     content : string;
     image: File;
     changeContent: (e:any) => void;
     changeImage: (event:any) => void;
}

export type PopupDeleteProps={
     handlePopup : () => void;
     submitDelete : () => void | any;
}
