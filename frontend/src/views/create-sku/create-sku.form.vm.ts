import { makeAutoObservable } from "mobx";
import { redirect } from "react-router-dom";
import { SkuEndpoint } from "api/endpoints/sku.endpoint.ts";
import { SkuDto } from "api/models/sku.model.ts";
import { debounce } from "utils/debounce.ts";

export class CreateSkuFormViewModel {
    constructor() {
        makeAutoObservable(this);
        void this.#init();
    }

    #init = async () => {
        this.isLoading = true;
        await Promise.all([
            this.#requestMeasurementUnits(),
            this.#requestCountriesOfOrigin(),
        ]);
        this.isLoading = false;
    };

    public form: SkuDto.Form = {
        image: "",
        product_type: "",
        name: "",
        model: "",
        manufacturer: "",
        measurement_unit: "Штука",
        gost_classification: "",
        country_of_origin: "",
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
            product_type: "",
            name: "",
            model: "",
            manufacturer: "",
            measurement_unit: "",
            gost_classification: "",
            country_of_origin: "",
            characteristics: []
        };
    }

    async submitForm() {
        const response = await SkuEndpoint.create(this.form);
        redirect("/");
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

    #requestMeasurementUnits = async () => {
        this.measurementUnits = ["Штука", "Метр", "Литр; кубический дециметр", "Грамм", "Килограмм", "Тонна; метрическая тонна (1000 кг)", "Ватт", "Герц", "Ом", "Час", "Сутки", "Лист", "Сантиметр", "Секунда", "Упаковка", "Дюжина упаковок", "Сто упаковок", "Минута", "Дециметр", "Сто листов"];
    };

    #requestCountriesOfOrigin = async () => {
        this.countries_of_origin = ["Абхазия", "Россия", "Казахстан", "Украина", "Беларусь", "Армения", "Азербайджан", "Грузия", "Туркменистан", "Узбекистан", "Таджикистан", "Киргизия", "Молдова", "Латвия", "Литва", "Эстония", "Германия", "Франция", "Италия", "Испания", "Португалия", "Великобритания", "Ирландия", "Норвегия", "Швеция", "Финляндия", "Дания", "Польша", "Чехия", "Словакия", "Венгрия", "Румыния", "Болгария", "Словения", "Хорватия", "Босния и Герцеговина", "Сербия", "Черногория", "Македония", "Греция", "Турция", "Кипр", "Мальта", "Албания", "Марокко", "Тунис", "Египет", "Израиль", "Иордания", "Ливан", "Сирия", "Ирак", "Иран", "Саудовская Аравия", "Йемен", "ОАЭ", "Катар", "Оман", "Кувейт", "Бахрейн", "Афганистан", "Пакистан", "Индия", "Непал", "Бангладеш", "Шри-Ланка", "Мьянма", "Таиланд", "Камбоджа", "Вьетнам", "Лаос", "Малайзия", "Индонезия", "Филиппины", "Сингапур", "Бруней", "Тимор-Лешти", "Китай"];
    };

    #requestProductTypes = async () => {
        this.productTypes = ["Строительные материалы", "Инструменты", "Оборудование"];
    };

    #sendNameToBackendDebounced = debounce(300, async () => {
        // Отправить значение имени на бэкэнд
        await this.#sendNameToBackend();
    }); // Установите нужную задержку в миллисекундах

    predictNames: string[] = [];
    predictedCategory: SkuDto.PredictedSkuData = {
        categories: []
    };

    #sendNameToBackend = async () => {
        if (!this.form.name.trim().length) {
            this.predictNames = [];
            return;
        }
        try {
            this.predictNames = await SkuEndpoint.predictNames(this.form.name.toLowerCase());
        } catch (e) {
            console.error(e);
            this.predictNames = [];
        }
        this.predictedCategory = await SkuEndpoint.predictCategory(this.form.name.toLowerCase());
    };

    getCategoryPredictions = () => {
        return this.predictedCategory.categories.map(x => x.category_name).filter((value, index, self) => self.indexOf(value) === index);
    };

    getModelPredictions = () => {
        return this.predictedCategory.categories.map(x => x.model);
    };

    getManufacturerPredictions = () => {
        return this.predictedCategory.categories.map(x => x.manufacturer);
    };

    getCategory = () => {
        //depends on selected category
        return this.predictedCategory.categories.filter(item => item.category_name === this.form.product_type).map(x => x.manufacturer);
    };

    getManufacturer = () => {
        //depends on selected category
        //delete duplicates
        return this.predictedCategory.categories.filter(item => item.category_name === this.form.product_type).map(x => x.manufacturer).filter((value, index, self) => self.indexOf(value) === index);

    };

    getModel = () => {
        return this.predictedCategory.categories.filter(item => item.category_name === this.form.product_type).filter(x => x.manufacturer === this.form.manufacturer).map(x => x.model).filter((value, index, self) => self.indexOf(value) === index);
    };
}
