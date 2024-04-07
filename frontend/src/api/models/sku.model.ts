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
}

