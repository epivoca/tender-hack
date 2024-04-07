import { SkuDto } from "api/models/sku.model.ts";

const baseUrl = "http://10.132.31.232:8000";
export const SkuEndpoint = new class {

    findOne = async (id: string): Promise<SkuDto.Item> => {
        const response = await fetch(`${baseUrl}/products/${id}/`);
        const data = await response.json();
        return SkuDto.Item.parse(data);
    };

    findList = async (): Promise<SkuDto.Item[]> => {
        const response = await fetch(`${baseUrl}/products/`);
        const data = await response.json();
        return data.map((item: never) => SkuDto.Item.parse(item));
    };

    create = async (data: SkuDto.Form): Promise<SkuDto.Item> => {
        const test = JSON.stringify(data);
        console.log(test);
        const response = await fetch(`${baseUrl}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return SkuDto.Item.parse(result);
    };

    predictNames = async (query: string): Promise<string[]> => {
        const response = await fetch(`${baseUrl}/predict_names/${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
            },
        });
        const result = await response.json();
        return SkuDto.PredictNameResponse.parse(result).names;
    };

    ///predict_categories/{product_name}

    predictCategory = async (query: string): Promise<SkuDto.PredictedSkuData> => {
        const response = await fetch(`${baseUrl}/predict_categories/${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
            },
        });
        const result = await response.json();
        return SkuDto.PredictedSkuData.parse(result);
    };
};

