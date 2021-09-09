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

var array = []

pay = (id,idLoca) => {
    const inde = cardObj.findIndex((item) => {
        return item.cardId === id;
    })
    console.log(inde);
    const [{ cardMoney }] = cardObj.filter((item,key) => {
        if (inde === key){
            return item
        }
    })   

    const index = location.findIndex((item) => {
        
        return item.localId === idLoca;
    });

    const [{ toll }] = location.filter((item, key) => {
        if (index === key) {
            return item
        }
    });
    
    let result = cardMoney-toll;
    cardObj[inde].cardMoney = result;
    array.push(new Payment(inde+1,cardObj[inde].cardName,index+1,location[index].localName,toll,result))

    return {message:`${cardObj[inde].cardName} pay ${toll} at station ${location[index].localName} balance ${result}`}
    // console.table(cardObj);
    // console.log(cardObj[inde].cardName + ' pay '+ location[index].toll + ' baht at '+  location[index].localName+' station ');
}

fillmoney = (id,amount) => {
    const index = cardObj.findIndex((item) => {
        console.log('item.cardId '+item.cardId)
        return item.cardId == id
    })
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

const Payment = function(id,name,locaid,locaname,toll,money) {
    this.id=id;
    this.name=name;
    this.locaid=locaid;
    this.locaname=locaname;
    this.payed=toll;
    this.balance=money;
}

Payment.prototype.getPayment = function() {
    return  this.id,this.name
}

showpayment = () => {
    return array
}



module.exports={
    fillmoney: fillmoney,
    showlocation: showlocation,
    checkmoney: checkmoney,
    pay: pay,
    showpayment:showpayment,
}