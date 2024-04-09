using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MoneyGer.Server.Migrations
{
    /// <inheritdoc />
    public partial class Identity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "AccountID",
                table: "moneyger_users",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "AccessFailedCount",
                table: "moneyger_users",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "moneyger_users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "moneyger_users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmailConfirmed",
                table: "moneyger_users",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "moneyger_users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "LockoutEnabled",
                table: "moneyger_users",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "LockoutEnd",
                table: "moneyger_users",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedEmail",
                table: "moneyger_users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedUserName",
                table: "moneyger_users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "moneyger_users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "moneyger_users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PhoneNumberConfirmed",
                table: "moneyger_users",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "SecurityStamp",
                table: "moneyger_users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "TwoFactorEnabled",
                table: "moneyger_users",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "moneyger_users",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccessFailedCount",
                table: "moneyger_users");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "moneyger_users");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "moneyger_users");

            migrationBuilder.DropColumn(
                name: "EmailConfirmed",
                table: "moneyger_users");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "moneyger_users");

            migrationBuilder.DropColumn(
                name: "LockoutEnabled",
                table: "moneyger_users");

            migrationBuilder.DropColumn(
                name: "LockoutEnd",
                table: "moneyger_users");

            migrationBuilder.DropColumn(
                name: "NormalizedEmail",
                table: "moneyger_users");

            migrationBuilder.DropColumn(
                name: "NormalizedUserName",
                table: "moneyger_users");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "moneyger_users");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "moneyger_users");

            migrationBuilder.DropColumn(
                name: "PhoneNumberConfirmed",
                table: "moneyger_users");

            migrationBuilder.DropColumn(
                name: "SecurityStamp",
                table: "moneyger_users");

            migrationBuilder.DropColumn(
                name: "TwoFactorEnabled",
                table: "moneyger_users");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "moneyger_users");

            migrationBuilder.AlterColumn<int>(
                name: "AccountID",
                table: "moneyger_users",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);
        }
    }
}
