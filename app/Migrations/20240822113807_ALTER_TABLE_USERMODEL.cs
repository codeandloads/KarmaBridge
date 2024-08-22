using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace app.Migrations
{
    /// <inheritdoc />
    public partial class ALTER_TABLE_USERMODEL : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobModelLocationModel_locations_LocationsId",
                table: "JobModelLocationModel");

            migrationBuilder.DropForeignKey(
                name: "FK_jobs_categories_CategoryModelId",
                table: "jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_saved_AspNetUsers_UserModelId",
                table: "saved");

            migrationBuilder.DropForeignKey(
                name: "FK_services_AspNetUsers_UserModelId",
                table: "services");

            migrationBuilder.DropPrimaryKey(
                name: "PK_services",
                table: "services");

            migrationBuilder.DropPrimaryKey(
                name: "PK_saved",
                table: "saved");

            migrationBuilder.DropPrimaryKey(
                name: "PK_locations",
                table: "locations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_categories",
                table: "categories");

            migrationBuilder.RenameTable(
                name: "services",
                newName: "Services");

            migrationBuilder.RenameTable(
                name: "saved",
                newName: "Saved");

            migrationBuilder.RenameTable(
                name: "locations",
                newName: "Locations");

            migrationBuilder.RenameTable(
                name: "categories",
                newName: "Categories");

            migrationBuilder.RenameIndex(
                name: "IX_services_UserModelId",
                table: "Services",
                newName: "IX_Services_UserModelId");

            migrationBuilder.RenameIndex(
                name: "IX_saved_UserModelId",
                table: "Saved",
                newName: "IX_Saved_UserModelId");

            migrationBuilder.AlterColumn<string>(
                name: "UserModelId",
                table: "Saved",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Services",
                table: "Services",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Saved",
                table: "Saved",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Locations",
                table: "Locations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_JobModelLocationModel_Locations_LocationsId",
                table: "JobModelLocationModel",
                column: "LocationsId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_jobs_Categories_CategoryModelId",
                table: "jobs",
                column: "CategoryModelId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Saved_AspNetUsers_UserModelId",
                table: "Saved",
                column: "UserModelId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Services_AspNetUsers_UserModelId",
                table: "Services",
                column: "UserModelId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobModelLocationModel_Locations_LocationsId",
                table: "JobModelLocationModel");

            migrationBuilder.DropForeignKey(
                name: "FK_jobs_Categories_CategoryModelId",
                table: "jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_Saved_AspNetUsers_UserModelId",
                table: "Saved");

            migrationBuilder.DropForeignKey(
                name: "FK_Services_AspNetUsers_UserModelId",
                table: "Services");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Services",
                table: "Services");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Saved",
                table: "Saved");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Locations",
                table: "Locations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.RenameTable(
                name: "Services",
                newName: "services");

            migrationBuilder.RenameTable(
                name: "Saved",
                newName: "saved");

            migrationBuilder.RenameTable(
                name: "Locations",
                newName: "locations");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "categories");

            migrationBuilder.RenameIndex(
                name: "IX_Services_UserModelId",
                table: "services",
                newName: "IX_services_UserModelId");

            migrationBuilder.RenameIndex(
                name: "IX_Saved_UserModelId",
                table: "saved",
                newName: "IX_saved_UserModelId");

            migrationBuilder.AlterColumn<string>(
                name: "UserModelId",
                table: "saved",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddPrimaryKey(
                name: "PK_services",
                table: "services",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_saved",
                table: "saved",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_locations",
                table: "locations",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_categories",
                table: "categories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_JobModelLocationModel_locations_LocationsId",
                table: "JobModelLocationModel",
                column: "LocationsId",
                principalTable: "locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_jobs_categories_CategoryModelId",
                table: "jobs",
                column: "CategoryModelId",
                principalTable: "categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_saved_AspNetUsers_UserModelId",
                table: "saved",
                column: "UserModelId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_services_AspNetUsers_UserModelId",
                table: "services",
                column: "UserModelId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
