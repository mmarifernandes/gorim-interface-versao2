import { PersonSimplified } from "../../models/person.simplified";

export interface FriendCell {
    friend: PersonSimplified;
    hasNewMessage: boolean;
}