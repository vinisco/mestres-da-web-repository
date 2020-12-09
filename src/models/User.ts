import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import Sku from "./Sku";
import Product from "./Product";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Sku, (sku) => sku.user_id)
  sku: Sku[];

  @OneToMany(() => Product, (product) => product.user_id)
  product: Product[];
}

export default User;
