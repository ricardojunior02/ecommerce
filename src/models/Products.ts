import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { v4 } from 'uuid';
import Images from './Images';

@Entity('products')
class Products {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column()
  stock: number;

  @OneToMany(() => Images, image => image.product, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'product_id'})
  images: Images[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(){
    if(!this.id){
      this.id = v4()
    }
  }
}

export default Products;
