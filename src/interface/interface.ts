export interface IUser {
    id: number,
    username: string,
    fullName: string,
    picture: string,
    email: string,
    bio: string,
    thumbnail: string,
    password: string,
    twitter: string,
    instagram: string
}

export interface IVideo {
    id: number,
    user_id: number,
    title: string,
    description: string,
    thumbnail: string,
    video: string,
    views: number,
    date_added: string
    categories: string
}

export interface IProfil {
    fullName: string
    picture: string
    username: string
    id: number
    bio: string
    thumbnail: string
    video_thumbnail: string
    date_added: string
    views: number
    title: string
    twitter: string,
    instagram: string
}

export interface IVideoAuthor extends IVideo {
    fullName: string
    username: string
    picture: string
    user_id: number
    purchased: boolean
}