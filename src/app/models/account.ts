export interface Account {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    date_of_birth: Date | string;
    active: boolean;
}
