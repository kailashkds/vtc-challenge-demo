<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231222093808 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (
        id INT AUTO_INCREMENT NOT NULL,
        name VARCHAR(50) NOT NULL,
        PRIMARY KEY(id)
    ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');

        $this->addSql('CREATE TABLE notes (
        id INT AUTO_INCREMENT NOT NULL,
        user_id INT NOT NULL,
        title VARCHAR(500) NOT NULL,
        content VARCHAR(500) NOT NULL,
        status VARCHAR(50) NOT NULL,
        category_id INT NOT NULL,
        INDEX IDX_11BA68C9D86650F (user_id),
        PRIMARY KEY(id)
    ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE notes ADD CONSTRAINT FK_11BA68C9777D11E FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('CREATE INDEX IDX_11BA68C9777D11E ON notes (category_id)');

        $this->addSql('ALTER TABLE user CHANGE is_active is_active TINYINT(1) NOT NULL');

        $this->addSql("INSERT INTO category (name) VALUES ('General'), ('Ideas'), ('To-Do Lists'), ('Reminders'), ('Projects'), ('Meetings'), ('Task Lists'), ('Clients'), ('Courses'), ('Lectures'), ('Research'), ('Fitness'), ('Nutrition'), ('Medical'), ('Destinations'), ('Itineraries'), ('Packing Lists'), ('Breakfast'), ('Lunch'), ('Dinner'), ('Desserts'), ('Budget'), ('Expenses'), ('Investments'), ('Reading List'), ('Book Reviews'), ('Inspirational'), ('Motivational'), ('Projects'), ('Snippets'), ('Algorithms')");
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE notes');
        $this->addSql('DROP TABLE status');
        $this->addSql('ALTER TABLE user CHANGE is_active is_active TINYINT(1) DEFAULT NULL');
        $this->addSql('CREATE UNIQUE INDEX user_UN ON user (email)');
        $this->addSql('ALTER TABLE notes DROP FOREIGN KEY FK_11BA68C9777D11E');
        $this->addSql('DROP INDEX IDX_11BA68C9777D11E ON notes');
        $this->addSql('ALTER TABLE notes DROP category_id');
    }
}
