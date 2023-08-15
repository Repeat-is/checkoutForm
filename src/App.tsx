import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

interface Product {
  uuid: string;
  quantity: number;
}
interface FieldValues {
  // Customer is required, name and email are the only required fields
  customer: {
    name: string;
    email: string;

    ssid?: string;
    street?: string;
    postal_code?: number;
    town?: string;
    phone?: string;
  };
  products: Product[];
  interval?: {
    type: "MONTH" | "WEEK" | "YEAR";
    count: number;
    editable: boolean;
  };
  external_ref: string;
}

interface MyCustomProduct extends Product {
  title: string;
  ordering: number;
  image: string;
}

export default function App() {
  const { register } = useForm<FieldValues>();

  const [interval] = useState<FieldValues["interval"] | undefined>();
  const [products, setProducts] = useState<MyCustomProduct[]>([
    {
      uuid: "06e7dd11-2328-4f41-ab76-395751d57287",
      quantity: 5,
      title: "Repeat test vara",
      ordering: 1,
      image: "mynd.jpeg",
    },
  ]);

  return (
    <>
      {products
        .sort((a, b) => a.ordering - b.ordering)
        .map((product) => (
          <div key={product.uuid}>
            <img
              style={{ width: 150 }}
              src={product.image}
              alt="Product image"
            />

            <div>
              <strong>{product.title}</strong>
            </div>

            <div>
              <label>Magn</label>
              <input
                style={{ width: 50, textAlign: "center", marginLeft: 10 }}
                value={product.quantity}
                onChange={(e) => {
                  setProducts([
                    ...products.filter((p) => p.uuid !== product.uuid),
                    {
                      ...product,
                      quantity: parseInt(e.target.value) || 1,
                    },
                  ]);
                }}
                aria-label="Quantity"
                type="number"
              />
            </div>
          </div>
        ))}

      <form
        action="https://repeat.is/repeat_checkout/59bbc67d-d58f-4c64-b897-7063b90141b4/"
        method="POST"
      >
        {/* Customer */}
        <input value="Óli Tómas" {...register("customer.name")} />
        <input
          value="2202863399"
          placeholder="Kennitala"
          {...register("customer.ssid")}
        />
        <input
          value="olitomas@olitomas.com"
          placeholder="Netfang"
          {...register("customer.email")}
        />

        {/* Products */}
        {/* Map over the products state and render a ProductInput component for each product */}
        {products.map((product, index) => (
          <>
            <input
              hidden
              value={product.uuid}
              {...register(`products.${index}.uuid`)}
            />
            <input
              hidden
              value={product.quantity}
              {...register(`products.${index}.quantity`)}
            />
          </>
        ))}

        {/* Interval */}
        {interval && (
          <>
            <input
              hidden
              value={interval.type}
              {...register("interval.type")}
            />
            <input
              hidden
              value={interval.count}
              {...register("interval.count")}
            />
            <input
              hidden
              value={interval.editable.toString()}
              {...register("interval.editable")}
            />
          </>
        )}

        <input hidden value="some_identifier" {...register("external_ref")} />

        <input type="submit" />
      </form>
    </>
  );
}
