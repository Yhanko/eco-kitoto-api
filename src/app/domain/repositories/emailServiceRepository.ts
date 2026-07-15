export interface EmailServiceRepository {
    send(paramns : {
        from : string;
        to : string;
        subject : string;
        text : string;
        html?: string; 
    }) : Promise<void>
}