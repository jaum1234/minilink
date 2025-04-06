import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1743906082157 implements MigrationInterface {
    name = 'Init1743906082157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`log_acesso\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`urlId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`url\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`origem\` varchar(80) NOT NULL,
                \`encurtada\` varchar(80) NOT NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deletedAt\` datetime(6) NULL,
                \`usuarioId\` int NULL,
                UNIQUE INDEX \`IDX_ENCURTADA\` (\`encurtada\`),
                UNIQUE INDEX \`IDX_2741938fac8ddb5e5921a25ce3\` (\`encurtada\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`usuario\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`email\` varchar(255) NOT NULL,
                \`senha\` varchar(255) NOT NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                UNIQUE INDEX \`IDX_2863682842e688ca198eb25c12\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`log_acesso\`
            ADD CONSTRAINT \`FK_1a3fdcabbad30066b0401bcbe15\` FOREIGN KEY (\`urlId\`) REFERENCES \`url\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`url\`
            ADD CONSTRAINT \`FK_c0e33c6c155b38432dd68de4eeb\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`url\` DROP FOREIGN KEY \`FK_c0e33c6c155b38432dd68de4eeb\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`log_acesso\` DROP FOREIGN KEY \`FK_1a3fdcabbad30066b0401bcbe15\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_2863682842e688ca198eb25c12\` ON \`usuario\`
        `);
        await queryRunner.query(`
            DROP TABLE \`usuario\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_2741938fac8ddb5e5921a25ce3\` ON \`url\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_ENCURTADA\` ON \`url\`
        `);
        await queryRunner.query(`
            DROP TABLE \`url\`
        `);
        await queryRunner.query(`
            DROP TABLE \`log_acesso\`
        `);
    }

}
