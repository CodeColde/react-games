import { IMediaFiles } from "./Generics";

export interface IGenreData {
    data: IGenreInfo[];
}

export interface IGenreInfo {
    alternate_names: string[];
    description: string;
    id: string;
    media_files: IMediaFiles[];
    name: string;
}