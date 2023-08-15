import { useState } from "react";
import { useForm } from "react-hook-form";

interface FieldValues {
  customer: {
    name: string;
    ssid: string;
    email: string;
  };
  products: {
    uuid: string;
    quantity: number;
    title: string;
    ordering: number;
  }[];
  interval: {
    type: string;
    count: number;
    editable: boolean;
  };
  external_ref: string;
}

export default function App() {
  const { register } = useForm<FieldValues>();

  const [interval] = useState<FieldValues["interval"] | undefined>();
  const [products, setProducts] = useState<FieldValues["products"]>([
    {
      uuid: "06e7dd11-2328-4f41-ab76-395751d57287",
      quantity: 5,
      title: "Repeat test vara",
      ordering: 1,
    },
  ]);

  return (
    <>
      {products
        .sort((a, b) => a.ordering - b.ordering)
        .map((product) => (
          <div key={product.uuid}>
            {product.title}
            <input
              value={product.quantity}
              onChange={(e) => {
                e.preventDefault();
                setProducts([
                  ...products.filter(
                    (_product) => _product.uuid !== product.uuid
                  ),
                  {
                    ...product,
                    quantity: parseInt(e.target.value),
                  },
                ]);
              }}
              aria-label="Quantity"
              type="number"
            />
          </div>
        ))}

      <form
        action="http://repeat.is/repeat_checkout/59bbc67d-d58f-4c64-b897-7063b90141b4/"
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
