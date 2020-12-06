import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column("")
  SKU: string;
}

export default Product;
