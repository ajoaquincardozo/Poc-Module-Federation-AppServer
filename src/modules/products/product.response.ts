export type Product = {
    id: number;
    thumbnail: string;
    title: string;
    price: Number;
    description: string;
}

export type ProductDetail = Omit<Product, "thumbnail" | "title"> & {
    name: string;
    image: string;
    longDescription: string;
}