import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class Transactions1597082331654 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
      name: 'transactions',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'amount',
          type: 'numeric'
        },
        {
          name: 'payment_method',
          type: 'varchar',
        },
        {
          name: 'user_id',
          type: 'uuid',
        },
        {
          name: 'status',
          type: 'varchar'
        },
        {
          name: 'transaction_id',
          type: 'varchar',
        },
        {
          name: 'products_id',
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    })),

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'AddUserIdToTransactions',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
    await queryRunner.dropForeignKey('transactions', 'AddUserIdToTransactions');

  }

}
