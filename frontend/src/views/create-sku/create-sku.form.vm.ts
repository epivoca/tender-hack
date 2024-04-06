import { makeAutoObservable } from "mobx";
import { SkuEndpoint } from "api/endpoints/sku.endpoint.ts";
import { SkuDto } from "api/models/sku.model.ts";
import { debounce, debounceAsync } from "utils/debounce.ts";

export class CreateSkuFormViewModel {
    constructor() {
        makeAutoObservable(this);
        void this.#init();
    }

    #init = async () => {
        this.isLoading = true;
        await Promise.all([
            this.#requestManufacturers(),
            this.#requestMeasurementUnits(),
            this.#requestCountriesOfOrigin(),
            this.#requestProductTypes()
        ]);
        this.isLoading = false;
    };

    public form: SkuDto.Form = {
        image: "",
        product_type: "Не выбрано",
        name: "",
        model: "",
        manufacturer: "Не выбрано",
        measurement_unit: "Не выбрано",
        gost_classification: "",
        country_of_origin: "Не выбрано",
        characteristics: []
    };

    #requiredFields = ["image", "product_type", "name", "model", "manufacturer", "measurement_unit", "country_of_origin"];

    public isFieldRequired = (field: string) => this.#requiredFields.includes(field);

    public manufacturers: string[] = [];
    public measurementUnits: string[] = [];
    public countries_of_origin: string[] = [];
    public productTypes: string[] = [];

    public isLoading = false;

    resetForm() {
        this.form = {
            image: "",
            product_type: "Не выбрано",
            name: "",
            model: "",
            manufacturer: "Не выбрано",
            measurement_unit: "",
            gost_classification: "",
            country_of_origin: "Не выбрано",
            characteristics: []
        };
    }

    async submitForm() {
        alert(JSON.stringify(this.form));
        const response = await SkuEndpoint.create(this.form);
    }

    setImage = async (item: File) => {
        if (!item) {
            return;
        }
        const result = await this.#fileToBase64(item);
        this.form.image = result;
    };

    onNameChange = (newValue: string) => {
        this.form.name = newValue;
        // Вызовите функцию с дебаунсом для отправки на бэкэнд
        void this.#sendNameToBackendDebounced();
    };

    #fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    #requestManufacturers = async () => {
        this.manufacturers = ["ООО Стройкомплект", "ООО ЯрБетон", "ООО Потребительский кооператив", "Не выбрано"];
    };

    #requestMeasurementUnits = async () => {
        this.measurementUnits = ["шт", "кг", "л", "м", "м2", "м3", "Не выбрано"];
    };

    #requestCountriesOfOrigin = async () => {
        this.countries_of_origin = ["Россия", "Китай", "Германия", "Не выбрано"];
    };

    #requestProductTypes = async () => {
        this.productTypes = ["Строительные материалы", "Инструменты", "Оборудование", "Не выбрано"];
    };

    #sendNameToBackendDebounced = debounce(300, async () => {
        // Отправить значение имени на бэкэнд
        await this.#sendNameToBackend();
    }); // Установите нужную задержку в миллисекундах

    #sendNameToBackend = async () => {
        console.log("debounced");
    };

}
