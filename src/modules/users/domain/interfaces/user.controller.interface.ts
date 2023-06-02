
export interface IUpdateUserDto{
    name?: string;
    email?: string;
    password?: string;
    status?: string;
    recuperationCode?: string;
    verificationCode?: string;
    role?: string;
}
export interface IUpdateData{
    id: string;
    updateUserDto: Partial<IUpdateUserDto>;
}