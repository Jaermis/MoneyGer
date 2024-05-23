using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoneyGer.Server.Migrations
{
    /// <inheritdoc />
    public partial class Ticket : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_UserCompanyRole_CompanyId",
                table: "UserCompanyRole",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Segmentation_Company",
                table: "Segmentation",
                column: "Company");

            migrationBuilder.CreateIndex(
                name: "IX_Sales_Company",
                table: "Sales",
                column: "Company");

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_Company",
                table: "Inventory",
                column: "Company");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_Company",
                table: "Contacts",
                column: "Company");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_companies_Company",
                table: "Contacts",
                column: "Company",
                principalTable: "companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inventory_companies_Company",
                table: "Inventory",
                column: "Company",
                principalTable: "companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sales_companies_Company",
                table: "Sales",
                column: "Company",
                principalTable: "companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Segmentation_companies_Company",
                table: "Segmentation",
                column: "Company",
                principalTable: "companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCompanyRole_companies_CompanyId",
                table: "UserCompanyRole",
                column: "CompanyId",
                principalTable: "companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_companies_Company",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Inventory_companies_Company",
                table: "Inventory");

            migrationBuilder.DropForeignKey(
                name: "FK_Sales_companies_Company",
                table: "Sales");

            migrationBuilder.DropForeignKey(
                name: "FK_Segmentation_companies_Company",
                table: "Segmentation");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCompanyRole_companies_CompanyId",
                table: "UserCompanyRole");

            migrationBuilder.DropIndex(
                name: "IX_UserCompanyRole_CompanyId",
                table: "UserCompanyRole");

            migrationBuilder.DropIndex(
                name: "IX_Segmentation_Company",
                table: "Segmentation");

            migrationBuilder.DropIndex(
                name: "IX_Sales_Company",
                table: "Sales");

            migrationBuilder.DropIndex(
                name: "IX_Inventory_Company",
                table: "Inventory");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_Company",
                table: "Contacts");
        }
    }
}
