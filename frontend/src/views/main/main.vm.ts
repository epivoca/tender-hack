const mockSkuItems: SkuDto.Item[] = [
    {
        _id: "1",
        image: "https://zakupki.mos.ru/newapi/api/Core/Thumbnail/208202039/250/250",
        product_type: "product_type",
        name: "Блокнот МАЛЫЙ ФОРМАТ А6 108х145 мм, 40 л., гребень, картон, клетка, BRAUBERG, \"Милые котята\", 114391",
        model: "Блокнот МАЛЫЙ ФОРМАТ А6 108х145 мм, 40 л., гребень, картон, клетка, BRAUBERG, \"Милые котята\", 114391",
        manufacturer: "Brauberg",
        measurement_unit: "measurement_unit",
        country_of_origin: "country_of_origin",
        characteristics: [
            {
                name: "Внутренний блок",
                value: "офсет",
                unit: "",
            },
            {
                name: "Количество листов",
                value: "40",
                unit: "",
            },
            {
                name: "Линовка блока",
                value: "клетка",
                unit: "",
            },
            {
                name: "Лицензионная обложка",
                value: "нет",
                unit: "",
            },
            {
                name: "Наличие разделителей",
                value: "нет",
                unit: "",
            },
            {
                name: "Плотность внутреннего блока",
                value: "60 гр/м2",
                unit: "",
            },
            {
                name: "Расположение переплета",
                value: "верхнее",
                unit: "",
            },
            {
                name: "Серия",
                value: "мелованный картон",
                unit: "",
            },
            {
                name: "Скрепление блока",
                value: "гребень (евроспираль)",
                unit: "",
            },
        ],
    },
    {
        _id: "2",
        image: "https://zakupki.mos.ru/newapi/api/Core/Thumbnail/208202042/300/300",
        product_type: "product_type",
        name: "name",
        model: "model",
        manufacturer: "manufacturer",
        measurement_unit: "measurement_unit",
        country_of_origin: "country_of_origin",
        characteristics: [
            {
                name: "name",
                value: "value",
                unit: "unit",
            },
        ],
    },
    {
        _id: "3",
        image: "https://zakupki.mos.ru/newapi/api/Core/Thumbnail/2101579239/300/300",
        product_type: "product_type",
        name: "Шпатлевка цементная Старатели \"Фасадно-финишная\" ГОСТ 33699 белая 20кг",
        model: "Фасадно-финишная",
        manufacturer: "Старатели",
        measurement_unit: "штука",
        country_of_origin: "country_of_origin",
        characteristics: [
            {
                name: "Готовность к последующей обработке через",
                value: "24 ч",
                unit: "",
            },
            {
                name: "Жизнеспособность готового раствора",
                value: "3 ч",
                unit: "",
            },
            {
                name: "Максимальная толщина слоя",
                value: "3 мм",
                unit: "",
            },
            {
                name: "Максимальный размер фракции",
                value: "0.2 мм",
                unit: "",
            },
            {
                name: "Минимальная толщина слоя",
                value: "0.3 мм",
                unit: "",
            },
            {
                name: "Морозостойкость",
                value: "25 циклы",
                unit: "",
            },
            {
                name: "Прочность сцепления с основанием",
                value: "1 МПа",
                unit: "",
            },
            {
                name: "Расход смеси (слой 1 мм)",
                value: "1 килограмм на квадратный метр (кг/м2)",
                unit: "",
            },
            {
                name: "Срок годности",
                value: "12 мес",
                unit: "",
            },
            {
                name: "Температура применения",
                value: "+10, +30 [0*]С",
                unit: "",
            },
            {
                name: "Тип использования",
                value: "внутренняя",
                unit: "",
            },
        ],
    },
];

import { makeAutoObservable } from "mobx";
import { SkuEndpoint } from "api/endpoints/sku.endpoint.ts";
import { SkuDto } from "api/models/sku.model.ts";

export class MainPageViewModel {
    constructor() {
        makeAutoObservable(this);
        void this.#getSkuList();
    }

    public skuList: SkuDto.Item[] = [];
    public isLoading = false;
    public error: string | null = null;

    #getSkuList = async () => {
        const res = await SkuEndpoint.findList();
        this.skuList = res;
    };
}
