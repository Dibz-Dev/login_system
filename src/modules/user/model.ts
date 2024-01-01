import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" }) // Specify the type for firstName
  firstName: string;

  @Column({ type: "varchar" }) // Specify the type for lastName
  lastName: string;

  @Column({ type: "varchar" }) // Specify the type for email
  email: string;

  @Column({ type: "varchar" }) // Specify the type for password
  password: string;

  @Column({ type: "boolean" }) // Specify the type for isActive
  isActive: boolean;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
