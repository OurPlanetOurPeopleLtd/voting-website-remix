import {useState} from "react";
export const VariantPopup = ({ setSearchParams, currentVariant }: { setSearchParams: any, currentVariant: string }) => {
    const [selectedVariant, setSelectedVariant] = useState(currentVariant);

    const updateVariant = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newVariant = event.target.value;
        localStorage.clear()
        setSelectedVariant(newVariant);
        setSearchParams((prevParams: string[][] | Record<string, string> | string | URLSearchParams) => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set("variant", newVariant);
            return newParams;
        });
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                background: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                zIndex: 9999,
            }}
        >
            <label>Choose a variant:</label>
            <select value={selectedVariant} onChange={updateVariant}>
                <option value="Original">Original</option>
                <option value="One">One</option>
                <option value="Two">Two</option>               
                <option value="Five">Five</option>
                <option value="Six">Six</option>
            </select>
        </div>
    );
};