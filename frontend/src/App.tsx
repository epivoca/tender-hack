import "./App.css";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import React, { useLayoutEffect } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { SkuEndpoint } from "api/endpoints/sku.endpoint.ts";
import { SkuDto } from "api/models/sku.model.ts";
import { Footer } from "components/ui/footer.tsx";
import { Content, Header } from "components/ui/header.tsx";
import { CreateSkuPage } from "views/create-sku/create-sku.page.tsx";
import { MainPage } from "views/main/main.page.tsx";
import { Text } from "./components/text.component.tsx";

const App = observer(() => {
    const location = useLocation();
    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [location.pathname]);

    const exampleform = SkuDto.SkuForm.parse({
        image: "https://example.com/image.jpg",
        product_type: "product_type",
        name: "name",
        model: "model",
        manufacturer: "manufacturer",
        measurement_unit: "measurement_unit",
        gost_classification: "gost_classification",
        country_of_origin: "country_of_origin",
        characteristics: [
            {
                name: "name",
                value: "value",
                unit: "unit",
            },
        ],
    });
    return (
        <div>
            <Header />
            <div style={{ minHeight: "calc(100vh - 76px)", paddingTop: "72px" }}>
                <Routes location={location}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/sku/view/:id" element={<div>SKU</div>} />
                    <Route path="/sku-change-request/new" element={<CreateSkuPage />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
});

export default App;

