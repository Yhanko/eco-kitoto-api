import { statusEnum } from "../../../http/interfaces/clearEventDTO";

export class ClearEvent {

    constructor(
        public title : string,
        public areaId : string,
        public responsibleId : string,
        public eventDate : Date | string,
        public eventTime : string,
        public descrition : string,
        public max_volunteer : number,
        public current_volunteer : number,
        public meeting_point : string,
        public estatus : statusEnum,
        public idEvent? : string
    ) {}
}