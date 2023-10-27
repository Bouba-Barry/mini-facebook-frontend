import { AxiosInstance } from "axios";
import { Post } from "./post/Types"
import { Field, FieldError, FieldErrors, Merge, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"

export type AddPostProps={
    addPostClick:()=>void;
    user: User
}
export type FormHeaderProps={
    closePopupClick:()=>void;
    title: string
}
export type PopupProps={
    closePopupClick:()=>void;
    register:UseFormRegister<AddPostForm>;
    errors:FieldErrors<AddPostForm>;
    handleSubmit: UseFormHandleSubmit<AddPostForm, undefined>;
    onSubmit: SubmitHandler<AddPostForm>;
}
export type AddPostForm={
    content:string;
    image:any;
}
export type User={
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    createdAt:string;
    location: string;
    biography: string;
    profile:Image;
    userPosts: Post[];
}
export type Like={
    id:string;
    userId:string;
    postId:string;
}
export type UnLike={
    id:string;
    userId:string;
    postId:string;
}
export type Tag={
    id:string;
    content:string;
    isNew:boolean;
}
export type Comment={
    id:string;
    user:User;
    comment:string;
}
export type Image={
    id:string;
    url:string;
    imageBytes:any;
    userId: string;
}
export type CommentSectionProps={
   comment:Comment;
}

export type SearchProps={
    search:string;
    changeSearch:(value:string)=>void;
}
export type NavBarProps={
    search:string;
    changeSearch:(value:string)=>void;
    user: User
}

export type LoginInputs = {
    email: string,
    password: string
}
export type RegisterInputs = {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    localisation: string,
    bibliographie: string,
    numberPhone: string,
    image: any
}
export type AuthProviderProps = {
    children : React.ReactElement;
}
  
export type UserData={
    authToken: string;
    refreshToken: string;
    userId: string;
    name: string;
    email: string;
};

export type ErrorProps={
    error:FieldError|undefined|Merge<FieldError, (FieldError | undefined)[]> | undefined;
  }
export type AddCommentForm={
    comment:string;
}
export type MessageProps={
    message:string;
    action:string;
}
export type MessageListProps={
    listMessage: {message: string, isUser:boolean}[]
}
export type MessageInputProps={
    message: string,
    setMessage: (message: string) => void,
    sendMessage: ( axios: AxiosInstance, formData: FormData) => Promise<void>,
    addMessage: (message: string, isUser: boolean) => void
}
export interface Message {
    prompt: string,
    isUser: boolean
}
export interface MessageInputProp {
    onSendMessage : (message: string) => void
}
export type ChatBotHeaderProps={
    closeChatBot: () => void
}
export type AddPostContainerProps ={
    user: User
}