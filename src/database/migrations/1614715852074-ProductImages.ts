import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ProductImages1614715852074 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
        name: 'images',
        columns: [
          {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
          },
          {
              name: 'path',
              type: 'varchar'
          },
          {
              name: 'product_id',
              type: 'uuid'
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
          }
        ],
        foreignKeys: [
            {
                name: 'ProductImages',
                columnNames: ['product_id'],
                referencedTableName: 'products',
                referencedColumnNames: ['id'],
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        ]
    }))
}
public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
}

}
