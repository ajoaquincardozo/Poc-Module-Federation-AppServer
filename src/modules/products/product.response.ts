export type Product = {
    id: number;
    thumbnail: string;
    title: string;
    price: Number;
    description: string;
}

export type ProductDetail = Omit<Product, "thumbnail"> & {
    image: string;
    longDescription: string;
}