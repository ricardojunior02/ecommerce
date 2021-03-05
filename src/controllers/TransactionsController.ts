import { getRepository } from 'typeorm';
import { Request, Response } from  'express';
import pagarme from 'pagarme';
import Transaction from '../models/Transactions';
import User from '../models/Users';
import Products from '../models/Products';

class TransactionsController {
  async store(req: Request, res: Response): Promise<Response>{
    const transactionRepository = getRepository(Transaction);
    const productsRepository = getRepository(Products);
    const userRepository = getRepository(User);
    const id = req.userId;

    const user = await userRepository.findOne({ where:  { id } })

    if(!user){
      return res.status(400)
    }

    try {
      const { items, address } = req.body;
      const clientCardHash = await pagarme.client.connect({ encryption_key: process.env.ENCRYPTION_KEY });
      const cardHash = await clientCardHash.security.encrypt({
        card_number: process.env.CARD_NUMBER,
        card_holder_name: process.env.CARD_HOLDER_NAME,
        card_expiration_date: process.env.CARD_EXPIRATION_DATE,
        card_cvv: process.env.CARD_CVV,
      });

      const client = await pagarme.client.connect({
        api_key: process.env.API_KEY,
      });



      const fee = 1000;
      const value = items.map((item: { price: number; id: string}) => item.price);

      const totalAmount = value.reduce((accumulator: number, product: number) => {
        return accumulator + product * 100;
      }, 0);

      // console.log(user)

       const transactionPagarme = await client.transactions.create({
        amount: totalAmount + fee,
        card_hash: cardHash,
        customer: {
          name: user.name,
          email: user.email,
          country: 'br',
          external_id: user.id,
          type: 'individual',
          documents: [
            {
              type: 'cpf',
              number: user.cpf,
            },
            {
              type: 'rg',
              number: '4685858586',
            }
          ],
          phone_numbers: ["+5511999998888"],
        },
        shipping: {
          name: user.name,
          fee,
          expedited: false,
          address: {
            ...address,
            country: 'br',
            complementary: "fundo",
          }
        },
        billing: {
          name: user.name,
          address: {
            country: "br",
            state: user.state,
            city: user.city,
            neighborhood: "Rio Cotia",
            street: user.street,
            street_number: user.street_number,
            zipcode: user.cep,
          }
        },
        items: items.map((item: { id: string; name: string; price: number; amount: number; }) => ({
          id: `${item.id}`,
          title: item.name,
          unit_price: item.price,
          quantity: item.amount,
          tangible: true,
        })),
      });


      const transaction = transactionRepository.create({
        amount: transactionPagarme.authorized_amount,
        payment_method: transactionPagarme.payment_method,
        status: transactionPagarme.status,
        user_id: user.id,
        products_id: items.map((item: { id: string; }) => item.id),
        transaction_id: transactionPagarme.id
      });

      await transactionRepository.save(transaction);
      return res.status(200).json(transaction);
    } catch (error) {
      return res.status(400).json(error)
    }
  }
  async delete(req: Request, res: Response): Promise<Response>{
    return res.status(200);
  }
}

export default new TransactionsController();
