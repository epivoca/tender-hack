class WildberriesParser:
    def __init__(self):
        pass

    @classmethod
    def get_busket(self, id):
        busket_masked_id = id // 100000
        if 0 <= busket_masked_id <= 143:
            basket = '01'
        elif 144 <= busket_masked_id <= 287:
            basket = '02'
        elif 288 <= busket_masked_id <= 431:
            basket = '03'
        elif 432 <= busket_masked_id <= 719:
            basket = '04'
        elif 720 <= busket_masked_id <= 1007:
            basket = '05'
        elif 1008 <= busket_masked_id <= 1061:
            basket = '06'
        elif 1062 <= busket_masked_id <= 1115:
            basket = '07'
        elif 1116 <= busket_masked_id <= 1169:
            basket = '08'
        elif 1170 <= busket_masked_id <= 1313:
            basket = '09'
        elif 1314 <= busket_masked_id <= 1601:
            basket = '10'
        elif 1602 <= busket_masked_id <= 1655:
            basket = '11'
        elif 1656 <= busket_masked_id <= 1919:
            basket = '12'
        elif 1920 <= busket_masked_id <= 2045:
            basket = '13'
        elif 2046 <= busket_masked_id <= 2189:
            basket = '14'
        elif 2091 <= busket_masked_id <= 2405:
            basket = '15'
        else:
            basket = '16'
        return basket

    @classmethod
    def do_while_not_true(self, func, *param):
        res = None
        flag = False
        while flag == False:
            try:
                res = func(*param)
                flag = True
            except Exception as e:
                pass
        return res

    @classmethod
    def get_product_by_parsing(self, name):
        import requests as req
        url = f'https://search.wb.ru/exactmatch/ru/common/v5/search?ab_testing=false&appType=1&curr=rub&dest=-1257786&query={name}&resultset=catalog&sort=popular&spp=30&suppressSpellcheck=false'
        res_cat_json = req.get(url).json()
        id_p = res_cat_json['data']['products'][0]['id']
        ref_card = f'https://basket-{self.get_busket(id_p)}.wbbasket.ru/vol{str(id_p)[:-5]}/part{str(id_p)[:-3]}/{id_p}/info/ru/card.json'
        res_card_json = req.get(ref_card).json()
        prod_features = res_card_json
        return prod_features

    @classmethod
    def get_product(self, name):
        result = self.do_while_not_true(self.get_product_by_parsing, name)
        print(result)
        result = {
            'subj_name': result['subj_name'],
            'brand': result['selling']['brand_name'],
            'category': result['subj_root_name'],
            'features': result['options'],
        }
        result = self.format_features(result)
        return result

    @classmethod
    def format_features(self, info):
        features = {}
        if 'features' in info:
            for feature in info['features']:
                name = feature['name']
                value = feature['value']
                features[name] = value
        info['features'] = features
        return info
