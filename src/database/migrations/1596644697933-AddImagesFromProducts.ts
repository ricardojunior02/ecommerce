import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddImagesFromProducts1596644697933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products', new TableColumn({
      name: 'product_images',
      type: 'varchar',
      isNullable: true,
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'product_image')
  }
}
