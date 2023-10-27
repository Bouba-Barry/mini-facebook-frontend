import { Post } from "../post/Types";
import { Image, User } from "../Types";

export type PopupEditUserProps={
    handlePopup :() =>  void;
    updateUser:(userId: string, user : updateUserInput ) => void;
    user: User;
}


export type updateUserInput={
    firstName:string;
    lastName:string;
    email: string;
    location: string;
}

export type AsideProfileProps={
    user : User;
    updateUserClick:(userId: string, user: updateUserInput) => void;
    posts: Post[];
    status: string;
    handleProfileChange: () => void;

}

export type PopupProfileProps={
    handleFileChange: (event : any) => void;
    submitProfileChange : (event : any) => void;
    handlePopup: () => void;
}
