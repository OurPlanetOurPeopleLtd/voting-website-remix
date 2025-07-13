

export interface QueryResult {
    data: Data;
    errors: [];
}

export interface Data {
    allSpecialPages: SpecialPages[]
}


export interface SpecialPages {

    stage:string

}



