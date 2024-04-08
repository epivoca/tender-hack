import { z } from "zod";

export namespace SkuDto {

    export const Characteristic = z.object({
        name: z.string(),
        value: z.string(),
        unit: z.string(),
    });

    export type Characteristic = z.infer<typeof Characteristic>;

    export const Item = z.object({
        _id: z.string(),
        image: z.string(),
        product_type: z.string(),
        name: z.string(),
        model: z.string(),
        manufacturer: z.string(),
        measurement_unit: z.string(),
        gost_classification: z.string().optional(),
        country_of_origin: z.string(),
        characteristics: z.array(Characteristic),
    });

    export type Item = z.infer<typeof Item>;

    export const Form = z.object({
        image: z.string(),
        product_type: z.string(),
        name: z.string(),
        model: z.string(),
        manufacturer: z.string(),
        measurement_unit: z.string(),
        gost_classification: z.string(),
        country_of_origin: z.string(),
        characteristics: z.array(z.object({
            name: z.string(),
            value: z.string(),
            unit: z.string(),
        })),
    });

    export type Form = z.infer<typeof Form>;

    export const PredictNameResponse = z.object({
        names: z.array(z.string()),
    });

    export type PredictNameResponse = z.infer<typeof PredictNameResponse>;

    export const CropCharacteristics = z.object({
        key: z.string(),
        value: z.string(),
    });

    export type CropCharacteristics = z.infer<typeof CropCharacteristics>;

    export const PredictedSkuData = z.object({
        categories: z.array(z.object({
            category_name: z.string(), // (string)
            model: z.string(), // (string)
            manufacturer: z.string(), // (string)
            characteristics: z.array(CropCharacteristics), // (array)
        })),
    });

    export type PredictedSkuData = z.infer<typeof PredictedSkuData>;

    export const covertStringToCharacteristic = (item: CropCharacteristics): Characteristic => {
        return {
            name: item.key,
            value: item.value,
            unit: "-",
        };
    };
}
