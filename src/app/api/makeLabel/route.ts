import { shipEngine } from "@/shipengine/shipengine";

export async function POST(): Promise<Response> {
  // Static shipment details
  const shipmentData = {
    shipment: {
        service_code: "usps_priority_mail_international",
        ship_from: {
            company_name: "Example Corp.",
            name: "John Doe",
            phone: "111-111-1111",
            email: "sender@example.com",
            address_line1: "4301 Bull Creek Rd Ste. 300",
            city_locality: "Austin",
            state_province: "TX",
            postal_code: "78731",
            country_code: "US",
            address_residential_indicator: "no"
        },
        ship_to: {
            name: "John Doe",
            company_name: "Example Corp",
            address_line1: "Röntgenstr. 3",
            city_locality: "Esslingen am Neckar",
            state_province: "Stuttgart",
            postal_code: "73730",
            country_code: "DE",
            phone: "5555555555",
            email: "recipient@example.com"
        },
        packages: [
            {
                content_description: "Dog Toys",
                products: [
                    {
                        quantity: 4,
                        value: {
                            currency: "usd",
                            amount: 75
                        },
                        sku: "4225-776-3234",
                        sku_description: "Rubber-Ball",
                        harmonized_tariff_code: "4016.99.20",
                        country_of_origin: "US",
                        description: "Pet Chew Toy",
                        product_url: "https://tinyurl.com/adorable-womabt",
                        mid_code: "123456",
                        vat_rate: 0.02,
                        weight: {
                            value: 1,
                            unit: "ounce"
                        }
                    },
                    {
                        quantity: 2,
                        value: {
                            currency: "usd",
                            amount: 100
                        },
                        sku: "3001-776-3234",
                        sku_description: "Tug-of-War-Rope",
                        harmonized_tariff_code: "6307.90.75",
                        country_of_origin: "US",
                        description: "Cotton Pet Chew Toy",
                        product_url: "https://tinyurl.com/adorable-womabt",
                        mid_code: "123456",
                        vat_rate: null,
                        weight: {
                            value: 2,
                            unit: "ounce"
                        }
                    }
                ],
                package_id: "se-3",
                package_code: "package",
                weight: {
                    value: 9.6,
                    unit: "ounce"
                },
                dimensions: {
                    unit: "inch",
                    length: 10.0,
                    width: 8.0,
                    height: 8.0
                },
                insured_value: {
                    currency: "usd",
                    amount: 0
                },
                label_messages: {
                    reference1: null,
                    reference2: null,
                    reference3: null
                },
                external_package_id: "string"
            }
        ],
        
        customs: {
            contents: "merchandise",
            customs_items:[],
            contents_explanation: "required if contents = other",
            non_delivery: "return_to_sender",
            terms_of_trade_code: "DDP",
            declaration: "I hereby certify that the information on this invoice is true and correct and the contents and value of this shipment is as stated above. The exporter of the products covered by this document declares that, except where otherwise clearly indicated, these products are of specified preferential origin as indicated under column C/T/O on this document.<br>The exporter of the products covered by this document (Exporter Reference No ... (1)) declares that, except where otherwise clearly indicated, these products are of ...(2) preferential origin.<br> Washington Convention of March 3 1973 Complaint Goods Non taxable operation according to article 8, letter a) of Presidential Decree n. 633 of 1972. Goods do not contain dog and cat fur according to article - REG CEE 1523/2007 L 343",
            invoice_additional_details: {
                freight_charge: {
                    amount: 10.1,
                    currency: "USD"
                },
                insurance_charge: {
                    amount: 11.1,
                    currency: "USD"
                },
                other_charge: {
                    amount: 11,
                    currency: "USD"
                },
                discount: {
                    amount: 10,
                    currency: "USD"
                },
                other_charge_description: "description"
            }
        },
        tax_identifiers: [
            {
                taxable_entity_type: "shipper",
                identifier_type: "eori",
                value: "GB987654312000",
                issuing_authority: "GB"
            }
        ]
    }
};

console.log("Shipment Data:", JSON.stringify(shipmentData, null, 2));

  try {
    // Call the ShipEngine API to create the label with static data
    const result = await shipEngine.createLabelFromShipmentDetails(shipmentData);
console.log("REsult",result)
    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        label: result,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating label:", (error as Error).message);

    // Return error response
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to create shipping label",
        details: (error as Error).message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
