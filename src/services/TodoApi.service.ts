import {Todos} from "entities";

export interface TodoApiService {
    get: () => Promise<Todos>;
}
