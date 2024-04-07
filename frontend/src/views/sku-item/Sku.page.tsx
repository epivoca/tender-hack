
//GET ID FROM URL /sku/:id
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

export const SkuPage = observer(() => {
    const { id } = useParams<{ id: string }>();
    return (
        <div>
            <h1>SKU ID: { id }</h1>
        </div>
    );
});
