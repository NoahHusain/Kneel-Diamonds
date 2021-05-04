import { getCustomOrders, getMetals, getSizes, getStyles, getType } from "./database.js"


const buildOrderListItem = (order) => {
    const metals = getMetals()
    const sizes = getSizes()
    const styles = getStyles()
    const types = getType()

    // Remember that the function you pass to find() must return true/false
    const foundMetal = metals.find(
        (metal) => {
            return metal.id === order.metalId
        }
    )
    const foundSize = sizes.find(
        (size) => {
            return size.id === order.sizeId
        }
    )
    const foundStyle = styles.find(
        (style) => {
            return style.id === order.styleId
        }
    )
    const foundType = types.find(
        (type) => {
            return type.id === order.typeId
        }
    )
    const totalCost = () => {
        if (foundType.type === 'Ring') {
            const newPrice = foundMetal.price + foundSize.price + foundStyle.price
            return newPrice
        }
        else if (foundType.type === 'Earring') {
            const newPrice = foundMetal.price + foundSize.price + foundStyle.price 
            return newPrice * 2
        }
        else (foundType.type === 'Necklace') ;
            const newPrice = foundMetal.price + foundSize.price + foundStyle.price 
            return newPrice * 4
    }


    const costString = totalCost().toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })


    return `<li>
        Order #${order.id} costs ${costString} and was placed on ${order.timestamp}
    </li>`
}
export const Orders = () => {
    const orders = getCustomOrders()

    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem)

    html += listItems.join("")
    html += "</ul>"

    return html
}

