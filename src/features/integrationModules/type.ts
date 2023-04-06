import { Assignment } from "../entity/assignment/types";

export interface PostMessage {
    data: Array<Assignment>,
    url: string,
}
