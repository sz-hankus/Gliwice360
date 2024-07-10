interface Point {
    id: number,
    name: string;
    description: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    panoramaId: string;
    thumbnailId: string;
}