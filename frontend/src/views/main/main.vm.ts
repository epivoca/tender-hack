import { makeAutoObservable } from "mobx";
import { SkuDto } from "api/models/sku.model.ts";

export class MainPageViewModel {
    constructor() {
        makeAutoObservable(this);
    }

    public skuList: SkuDto.SkuItem[] = [];
    public isLoading = false;
    public error: string | null = null;

}
