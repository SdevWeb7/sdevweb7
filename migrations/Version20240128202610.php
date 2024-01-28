<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240128202610 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__todo AS SELECT id, user_id, content, is_checked FROM todo');
        $this->addSql('DROP TABLE todo');
        $this->addSql('CREATE TABLE todo (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER NOT NULL, value VARCHAR(255) NOT NULL, is_checked BOOLEAN NOT NULL, CONSTRAINT FK_5A0EB6A0A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO todo (id, user_id, value, is_checked) SELECT id, user_id, content, is_checked FROM __temp__todo');
        $this->addSql('DROP TABLE __temp__todo');
        $this->addSql('CREATE INDEX IDX_5A0EB6A0A76ED395 ON todo (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__todo AS SELECT id, user_id, value, is_checked FROM todo');
        $this->addSql('DROP TABLE todo');
        $this->addSql('CREATE TABLE todo (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, user_id INTEGER NOT NULL, content VARCHAR(255) NOT NULL, is_checked BOOLEAN NOT NULL, CONSTRAINT FK_5A0EB6A0A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE)');
        $this->addSql('INSERT INTO todo (id, user_id, content, is_checked) SELECT id, user_id, value, is_checked FROM __temp__todo');
        $this->addSql('DROP TABLE __temp__todo');
        $this->addSql('CREATE INDEX IDX_5A0EB6A0A76ED395 ON todo (user_id)');
    }
}
