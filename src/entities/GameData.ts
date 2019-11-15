import { IMediaFiles } from "./Generics";

export interface IData {
    alternate_names: IAlternateNames[];
    artstyle: IMainProbability[];
    avatar_number: IMainProbability[];
    competitve_context: IMainProbability[];
    date_created: string;
    date_modified: string;
    description: string;
    developers: IIdName[];
    dimensionality: IMainProbability[];
    dlc: any[];
    franchise: IMainProbability[];
    game_modus: IMainProbability[];
    gamemechanic: IMainProbability[];
    genres: IMainProbability[];
    hardware_requirements: any[];
    id: string;
    image: string | null;
    logo: string | null;
    media_files: IMediaFiles[];
    name: string;
    not_a_game: boolean;
    perspective: IMainProbability[];
    playermodus: IMainProbability[];
    publishers: IPublisher[];
    rank: string;
    rank_fields: IRankFields[];
    release_date: string;
    release_dates: IReleases[];
    series: IMainProbability[];
    sources: ISources[];
    subthemes: IGameTheme[];
    suggestions: IGameSuggestions[];
    tags: IIdName[];
    validated: number;
    validated_fields: IValidatedFields[];
}

export interface IIdName {
    id: string;
    name: string;
}

export interface IAlternateNames {
    language: string;
    name: string;
}

export interface IMainProbability extends IIdName {
    is_main: boolean;
    probability: number;
}

export interface IRankFields {
    name: string;
    rank: number;
}

export interface IReleases {
    is_definite: boolean;
    platforms: string[];
    release_date: string;
}

export interface ISources extends IIdName {
    platform_game_id: string;
    source: string;
}

export interface IGameTheme extends IMainProbability {
    theme: string;
}

export interface IGenres {
    name: string;
    probability: string;
}
export interface IPublisher {
    id: string;
    is_main: boolean;
    name: string;
    region: string;
}

export interface IGameSuggestions {
    genres: IGenres[];
}

export interface IValidatedFields {
    name: string;
    validated: boolean;
}