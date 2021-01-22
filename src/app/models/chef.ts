

export class Chef {
    _id: string;
    firstName: string
    lastName: string
    abilities: Object[]

    constructor(_id: string, firstName: string, lastName: string, abilities: Object[]) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.abilities = abilities;
    }
}