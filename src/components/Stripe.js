import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51NApM2SJhYdnIhPti6VquXIQYw8oBselhejewIsLc3UYzjsdDypURjzLPvdwqNFmY5RnCxH7HwIPEjA7epE3QVRP00Qru31A3o', {
  apiVersion: '2022-11-15', //Latest API version
});

export default stripe;
