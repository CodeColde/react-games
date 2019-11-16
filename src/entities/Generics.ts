export interface IMediaFiles {
    id: string;
    type: "image" | "video";
    url: string;
}

export interface ISearchGame {
    game: string;
    genre: string;
    publisher: string;
    hours_viewed: number;
    current_rank: number;
    previous_rank: number;
}