import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import Products from './Products';
import { v4 } from 'uuid';

@Entity('images')
class Images {
  @PrimaryColumn()
  id: string;

  @Column()
  path: string;

  @ManyToOne(() => Products, product => product.images)
  @JoinColumn({ name: 'product_id' })
  product: Products;

  constructor(){
    if(!this.id){
      this.id = v4()
    }
  }

}

export default Images;
