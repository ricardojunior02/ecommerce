import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { v4 } from 'uuid';


@Entity('transactions')
class Transaction {
  @PrimaryColumn()
  id: string;

  @Column()
  amount: number;

  @Column({ array: true, default: {}})
  products_id: string;

  @Column()
  payment_method: string;

  @Column()
  user_id: string;

  @Column()
  status: string;

  @Column()
  transaction_id: string;

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

export default Transaction;
