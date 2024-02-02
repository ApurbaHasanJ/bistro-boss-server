const stripe = require('stripe')('sk_test_51OewvnFpHUUs9w8UE8KihRF261XmMHjjKtFImjzZMXrgbPK6gSghJXdUhF1x3zRAWO62CgU6B223NLFm9uUh9NVU00cf6y6xTQ');
const express = require('express');
const app = express();
app.use(express.static('public'));


const handleStripeAPI= async(req, res)=>{
const {items} = req.body;

// get all menu items
const menuItems = items.map((item)=>({
    price_data:{
        currency:"usd",
        product_data:{
            name:item.name
        },
        unit_amount: item.price * 100,
    },
    quantity: 1
}))

const session = await stripe.checkout.sessions.create({
    // add payment method type
    payment_method_types: ['card'],

    line_items: menuItems,
    mode: 'payment',
    success_url: `http://localhost:5173/payment-success`,
    cancel_url: `http://localhost:5173/payment-error`,
  });
  res.json({id:session.id})
}

module.exports={
    handleStripeAPI
}