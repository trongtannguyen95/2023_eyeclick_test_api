export interface UserModel {
    id?: string;
    username?: string;
    fullName?: string;
    createdAt?: string | any;
    isAdministrator?: boolean | number;
    acls?: Record<string, any>;
    name?: string;
    package?: string;
}
