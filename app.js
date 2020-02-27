class Checkout {
    constructor(promotionalRules) {
        this.items = [
            {
                productCode: '001',
                name: 'Red Scarf',
                price: 9.25
            },
            {
                productCode: '002',
                name: 'Silver cufflinks',
                price: 45
            },
            {
                productCode: '003',
                name: 'Silk Dress',
                price: 19.95
            },
            {
                productCode: '001',
                name: 'Red Scarf',
                price: 9.25
            },
        ]
        this.promotionalRules = promotionalRules
    }

    scan(item) {
        this.items.push(item)
    }

    total() {
        let items = this.items

        for (let i = 0; i < this.promotionalRules.length; i++) {
            items = promotionalRules[i](items)
        }

        let prices = items.map(item => item.price)

        return prices.reduce((a, b) => a + b)
    }
}

function totalAboveTreshholdDiscount(items) {
    let discount = 0
    const total = items.reduce((sum, nextItem) => sum + nextItem.price, 0)

    if (total > 60) discount = 0.1

    return items.map(item => ({ ...item, price: item.price *= (1 - discount) }))
}

function redScarfDiscount(items) {
    const redScarfProductCode = '001'
    let result = items
    let discount =
        items.filter(item => item.productCode === redScarfProductCode).length > 1 ? 0.75 : 0

    return result.map((item) => {
        if (item.productCode === redScarfProductCode)
            item.price -= discount
        return item
    });
}

const promotionalRules = [
    redScarfDiscount,
    totalAboveTreshholdDiscount
]

co = new Checkout(promotionalRules)
// co.scan(item)
// co.scan(item)
let price = co.total()

console.log(price);
