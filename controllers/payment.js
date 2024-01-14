const braintree = require("braintree");
const dotenv = require("dotenv").config();
const orderModel = require("../models/orders");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

const braintreeToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (error, response) {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const braintreePayment = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });

    const newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (err, result) {
        if (result) {
          const newOrder = await orderModel.create({
            products: cart,
            payment: result,
            buyer: req.user._id,
          });
          if (newOrder) {
            return res.json({ newOrder });
          }
        } else {
          res.status(500).send(err);
          console.log(result.message);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { braintreeToken, braintreePayment };
