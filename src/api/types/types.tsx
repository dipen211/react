export interface IValues {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}
export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}