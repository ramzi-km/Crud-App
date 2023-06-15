export interface User {
    name?: string;
    email?: string;
    password?: string
    profilePic?: Image
}

export interface Image {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number
}