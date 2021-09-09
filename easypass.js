const { parse } = require("path");

var location = [
    {localId: 1, localName: "nimman", toll: 75 },
    {localId: 2, localName: "sanpatong", toll: 35 },
    {localId: 3, localName: "sansai", toll: 30 },
    {localId: 4, localName: "doisuthep", toll: 40 },
    {localId: 5, localName: "hangdong", toll: 45 }
]

var cardObj = [
    {cardId: 1, cardName: "jeff", cardMoney: 500 },
    {cardId: 2, cardName: "roberto", cardMoney: 700 },
    {cardId: 3, cardName: "silva", cardMoney: 1000}
]

fillmoney = (id,amount) => {
    console.log('id '+id);
    const index = cardObj.findIndex((item) => {
        console.log('item.cardId '+item.cardId)
        return item.cardId == id
    })
    console.log('index '+index);
    const [{cardMoney}] = cardObj.filter((item,key) => {
        if(index ==key){
            return item
        }
    })
    let result = parseInt(cardMoney) + parseInt(amount)
    console.log(result);
    cardObj[index].cardMoney = result;
    console.table(cardObj);
    return cardObj[index]
    
} 

checkmoney = (id) => {
    console.log('id '+id);
    const index = cardObj.findIndex((item) => {
        console.log('item.cardId '+item.cardId)
        return item.cardId == id
    })
    console.table(cardObj[index]);
    return cardObj[index]
}

showlocation = () => {
    console.table(location);
    return location
}
module.exports={
    fillmoney: fillmoney,
    showlocation: showlocation,
    checkmoney: checkmoney,
}