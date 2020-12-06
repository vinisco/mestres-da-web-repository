import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("SRU")
class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column("")
  SKU: string;
}

export default Product;
