import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Products from '../models/Products';

class CreateProductsController {
  async show(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(Products);

    const { category } = req.query;

    if(category){
      var products = await repository.find({ where: { category } })
    }else{
      products = await repository.find({});
    }

    return res.json(products)
  }

  async store(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(Products);
    const { name, description, price, category, stock } = req.body;
    const image = req.files as Express.Multer.File[];

    const images = image.map((data) => {
      return { path: data.path }
    })

    const product = repository.create({
      name,
      description,
      price,
      category,
      stock,
      images
    });

    await repository.save(product);

    return res.json(product);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(Products);

    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    const product = await repository.findOne({ where: { id } });

    if (!product) {
      return res.status(400).json('Produto não existe');
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;

    await repository.save(product);

    return res.json(product);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(Products);

    const { id } = req.params;

    const product = await repository.findOne({ where: { id } });

    if (!product) {
      return res.status(400).json('Produto não existe');
    }

    await repository.remove(product);

    return res.status(200).send('Produto deletado');
  }
}

export default new CreateProductsController();
