import { z } from "zod";

export namespace SkuDto {
    export const SkuItem = z.object({
        _id: z.string(),
        image: z.string(),
        product_type: z.string(),
        name: z.string(),
        model: z.string(),
        manufacturer: z.string(),
        measurement_unit: z.string(),
        gost_classification: z.string().optional(),
        country_of_origin: z.string(),
        characteristics: z.array(z.object({
            name: z.string(),
            value: z.string(),
            unit: z.string(),
        })),
    });

    export type SkuItem = z.infer<typeof SkuItem>;

    export const SkuForm = z.object({
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

    export type SkuForm = z.infer<typeof SkuForm>;
}

