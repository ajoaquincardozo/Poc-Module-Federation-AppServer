import { Product, ProductDetail } from "./product.response"

export const mapToResponse = ({id, thumbnail ,title, price, description}) => {
    return { id, thumbnail ,title ,price ,description } as Product
}

export const mapToResponseDetail = ({id, images, title, price, description}) => {
    return {
        id,
        image: images[0],
        name: title,
        price,
        description,
        longDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    } as ProductDetail
}