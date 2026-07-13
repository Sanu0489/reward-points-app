import fs from "fs";
import path from "path";

const TOTAL_TRANSACTIONS = 500;

const customers = [
    { customerId: "C001", firstName: "John", lastName: "Smith" },
    { customerId: "C002", firstName: "Alice", lastName: "Johnson" },
    { customerId: "C003", firstName: "Michael", lastName: "Brown" },
    { customerId: "C004", firstName: "Emily", lastName: "Davis" },
    { customerId: "C005", firstName: "David", lastName: "Wilson" },
    { customerId: "C006", firstName: "Sophia", lastName: "Taylor" },
    { customerId: "C007", firstName: "James", lastName: "Anderson" },
    { customerId: "C008", firstName: "Olivia", lastName: "Thomas" },
    { customerId: "C009", firstName: "Daniel", lastName: "Jackson" },
    { customerId: "C010", firstName: "Emma", lastName: "White" },
    { customerId: "C011", firstName: "William", lastName: "Harris" },
    { customerId: "C012", firstName: "Charlotte", lastName: "Martin" },
    { customerId: "C013", firstName: "Benjamin", lastName: "Thompson" },
    { customerId: "C014", firstName: "Amelia", lastName: "Garcia" },
    { customerId: "C015", firstName: "Lucas", lastName: "Martinez" },
    { customerId: "C016", firstName: "Mia", lastName: "Robinson" },
    { customerId: "C017", firstName: "Henry", lastName: "Clark" },
    { customerId: "C018", firstName: "Harper", lastName: "Lewis" },
    { customerId: "C019", firstName: "Alexander", lastName: "Walker" },
    { customerId: "C020", firstName: "Evelyn", lastName: "Hall" },
];

const products = [
    "Mechanical Keyboard",
    "Gaming Keyboard",
    "Wireless Mouse",
    "Gaming Mouse",
    "USB-C Hub",
    "USB Flash Drive",
    "External SSD",
    "Portable SSD",
    "Docking Station",
    "Laptop Stand",
    "Laptop Sleeve",
    "Monitor Arm",
    "Webcam",
    "HDMI Cable",
    "DisplayPort Cable",
    "Ethernet Adapter",
    "Cooling Pad",
    "Bluetooth Keyboard",
    "Headset",
    "Mouse Pad",
];

const allMonths = [
    "2026-01",
    "2026-02",
    "2026-03",
    "2026-04",
    "2026-05",
    "2026-06",
];

const latestMonths = [
    "2026-04",
    "2026-05",
    "2026-06",
];

const randomItem = (array) =>
    array[Math.floor(Math.random() * array.length)];

const randomDay = () =>
    String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");

/*
20% -> < 50
30% -> 50-100
50% -> >100
*/
const randomAmount = () => {
    const value = Math.random();

    if (value < 0.2) {
        return Number((20 + Math.random() * 29).toFixed(2));
    }

    if (value < 0.5) {
        return Number((50 + Math.random() * 49).toFixed(2));
    }

    return Number((100 + Math.random() * 200).toFixed(2));
};

const transactions = [];
let id = 1;

/* Ensure every customer has data for Apr, May and Jun */
customers.forEach((customer) => {
    latestMonths.forEach((month) => {
        transactions.push({
            id: id++,
            customerId: customer.customerId,
            firstName: customer.firstName,
            lastName: customer.lastName,
            purchaseDate: `${month}-${randomDay()}`,
            product: randomItem(products),
            amount: randomAmount(),
        });
    });
});

/* Generate remaining transactions randomly */
while (transactions.length < TOTAL_TRANSACTIONS) {
    const customer = randomItem(customers);

    transactions.push({
        id: id++,
        customerId: customer.customerId,
        firstName: customer.firstName,
        lastName: customer.lastName,
        purchaseDate: `${randomItem(allMonths)}-${randomDay()}`,
        product: randomItem(products),
        amount: randomAmount(),
    });
}

/* Sort by purchase date */
transactions.sort((a, b) =>
    a.purchaseDate.localeCompare(b.purchaseDate)
);

const outputPath = path.join("public", "db.json");

fs.writeFileSync(
    outputPath,
    JSON.stringify({ transactions }, null, 2)
);

console.log(`✅ Generated ${transactions.length} transactions.`);
console.log(`📁 ${outputPath}`);