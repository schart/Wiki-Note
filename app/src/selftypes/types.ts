export interface Register {
    username: any,
    email: any,
    password: any,
};


export interface Login {
    username: string,
    email: string,
    password: string,

}

export interface Note {
    userid: number,
    url: string,
    subject: string,
    file_name: any
}


/*
export interface Comment 
{
    userid: number,
    postid: number,
    content: string,
    date: any
}


export interface Reply_comment 
{
    userid: number,
    replied_commentid: number,
    content: string,

}
export interface Follow_user 
{
    followingID: number,
    followedUserID: number

}

export interface Block_user 
{
    blockingID: number,
    blockedUserID: number
}

export interface Notification 
{
        sourceID: number, 
        affectedID: number,
        type: string,
        redirectID: number,
        has_it_been_read: boolean
}

 */