export interface Book {
    title: string,
    subtitle: string,
    isbn13: string,
    price: string,
    image: string,
    url: string
}

export interface RespBook {
    books: string,
    error: string,
    page: string,
    total: string
}