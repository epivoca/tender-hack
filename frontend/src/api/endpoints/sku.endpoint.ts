import { SkuDto } from "api/models/sku.model.ts";

const baseUrl = "http://192.168.64.1:8000";
export const SkuEndpoint = new class {

    findOne = async (id: string): Promise<SkuDto.SkuItem> => {
        const response = await fetch(`${baseUrl}/products/${id}/`);
        const data = await response.json();
        return SkuDto.SkuItem.parse(data);
    };

    findList = async (): Promise<SkuDto.SkuItem[]> => {
        const response = await fetch("http://192.168.64.1:8000/products/");
        const data = await response.json();
        return data.map((item: never) => SkuDto.SkuItem.parse(item));
    };

    create = async (data: SkuDto.SkuForm): Promise<SkuDto.SkuItem> => {
        const test = JSON.stringify(data);
        console.log(test);
        const response = await fetch("http://192.168.64.1:8000/products/", {
            mode: "no-cors",
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        });
        const result = await response.json();
        return SkuDto.SkuItem.parse(result);
    };
};

