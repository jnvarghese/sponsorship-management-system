import { Sponsor, Student } from "./index";
import { Observable } from "rxjs/Observable";

export class ResultSet {
    results: Observable<Sponsor[]|Student[]>;
}

