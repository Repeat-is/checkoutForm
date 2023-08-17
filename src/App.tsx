import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

// This is the UUID for the Repeat test store (you can use this or replace with your own)
const myShopUUID = "59bbc67d-d58f-4c64-b897-7063b90141b4";
// This is the UUID for the Repeat test product (you can use this or replace with your own)
// Title, ordering and image are custom fields that are added to the product type, you dont need to add these
// this is only for demonstration purposes
const myProducts = [
  {
    uuid: "06e7dd11-2328-4f41-ab76-395751d57287",
    quantity: 5,
    title: "Repeat test vara",
    ordering: 1,
    image: "mynd.jpeg",
  },
];

interface Product {
  uuid: string;
  quantity: number;
}
interface FieldValues {
  // Customer is required
  customer: {
    // Name and email are the only required fields
    name: string;
    email: string;

    // The rest of the fields are optional
    ssid?: string;
    street?: string;
    postal_code?: number;
    town?: string;
    phone?: string;
  };

  // At least one product is required
  products: Product[];

  // Interval is optional, if it is not set the default interval for the product will be used
  // (under settings in the Repeat.is backend)
  interval?: {
    type: "MONTH" | "WEEK" | "YEAR";
    count: number;
    editable: boolean;
  };

  // External ref can be used to identify the order in the Repeat.is backend, not required
  external_ref?: string;
}

// A custom interface for the product type, this is so you can add your own fields to the product
// the "FieldValues" interface is the one that is used by the useForm hook so this is kept separate
interface MyCustomProduct extends Product {
  title: string;
  ordering: number;
  image: string;
}

export default function App() {
  const { register } = useForm<FieldValues>();
  const [interval] = useState<FieldValues["interval"] | undefined>();
  const [products, setProducts] = useState<MyCustomProduct[]>(myProducts);
  const [customer, setCustomer] = useState<FieldValues["customer"]>();

  return (
    <div style={{ width: "100%", display: "block" }}>
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
        action={`https://repeat.is/repeat_checkout/${myShopUUID}/`}
        method="POST"
      >
        {/* Customer */}

        <input
          placeholder="Nafn"
          {...register("customer.name")}
          onChange={(e) => {
            const val = e.target.value;
            if (val)
              setCustomer({
                ...customer,
                name: e.target.value || "",
                email: customer?.email || "",
              });
          }}
        />

        <input
          placeholder="Netfang"
          {...register("customer.email")}
          onChange={(e) => {
            const val = e.target.value;
            if (val)
              setCustomer({
                ...customer,
                name: customer?.name || "",
                email: e.target.value,
              });
          }}
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

      <div>
        <h2>Or with a link</h2>

        <pre>
          <a
            href={`https://repeat.is/repeat_checkout/${myShopUUID}/?name=${encodeURIComponent(
              customer?.name || ""
            )}&email=${encodeURIComponent(customer?.email || "")}${products.map(
              (p, i) =>
                `&product.${i}.uuid=${p.uuid}&product.${i}.quantity=${p.quantity}`
            )}`}
          >
            {`https://repeat.is/repeat_checkout/${myShopUUID}/?name=${encodeURIComponent(
              customer?.name || ""
            )}&email=${encodeURIComponent(customer?.email || "")}${products.map(
              (p, i) =>
                `&product.${i}.uuid=${p.uuid}&product.${i}.quantity=${p.quantity}`
            )}`}
          </a>

          <br />
          <br />

          <code>?name=</code>
          <code>{encodeURIComponent(customer?.name || "")}</code>

          <br />
          <br />

          <code>&email=</code>
          <code>{encodeURIComponent(customer?.email || "")}</code>

          <br />
          <br />

          {products.map((p, i) => (
            <>
              <code>&product.{i}.uuid=</code>
              <code>{p.uuid}</code>

              <br />

              <code>&product.{i}.quantity=</code>
              <code>{p.quantity}</code>

              <br />
              <br />
            </>
          ))}
        </pre>
      </div>
    </div>
  );
}
