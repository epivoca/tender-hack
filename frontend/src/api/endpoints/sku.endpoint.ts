import { SkuDto } from "api/models/sku.model.ts";

const baseUrl = "http://192.168.64.1:8000";
export const SkuEndpoint = new class {

    findOne = async (id: string): Promise<SkuDto.Item> => {
        const response = await fetch(`${baseUrl}/products/${id}/`);
        const data = await response.json();
        return SkuDto.Item.parse(data);
    };

    findList = async (): Promise<SkuDto.Item[]> => {
        const response = await fetch("http://192.168.64.1:8000/products/");
        const data = await response.json();
        return data.map((item: never) => SkuDto.Item.parse(item));
    };

    create = async (data: SkuDto.Form): Promise<SkuDto.Item> => {
        const test = JSON.stringify(data);
        console.log(test);
        const response = await fetch("http://192.168.64.1:8000/products/", {
            // mode: "no-cors",
            method: "POST",
            body: JSON.stringify({
                "image": "base64ImageString",
                "product_type": "Electronic",
                "name": "Smartphone",
                "model": "XYZ123",
                "manufacturer": "PhoneMaker",
                "measurement_unit": "pcs",
                "gost_classification": "GOST123456",
                "country_of_origin": "Countryland",
                "characteristics": [
                    {
                        "name": "Screen Size",
                        "value": "6.5 inches",
                        "unit": "inches"
                    }
                ]
            }),
        });
        const result = await response.json();
        return SkuDto.Item.parse(result);
    };
};

