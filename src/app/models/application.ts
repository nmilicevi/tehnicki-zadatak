import { Account } from "./account";

export interface Application {
    id: string;
    name: string;
    version: string;
    url: string;
    accId: String[];
}
