using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace app.Migrations
{
    /// <inheritdoc />
    public partial class ADDED_JOBS : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_jobs_AspNetUsers_UserModelId",
                table: "jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_jobs_categories_CategoryId",
                table: "jobs");

            migrationBuilder.DropIndex(
                name: "IX_jobs_CategoryId",
                table: "jobs");

            migrationBuilder.AlterColumn<string>(
                name: "UserModelId",
                table: "jobs",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoryModelId",
                table: "jobs",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_jobs_CategoryModelId",
                table: "jobs",
                column: "CategoryModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_jobs_AspNetUsers_UserModelId",
                table: "jobs",
                column: "UserModelId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_jobs_categories_CategoryModelId",
                table: "jobs",
                column: "CategoryModelId",
                principalTable: "categories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_jobs_AspNetUsers_UserModelId",
                table: "jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_jobs_categories_CategoryModelId",
                table: "jobs");

            migrationBuilder.DropIndex(
                name: "IX_jobs_CategoryModelId",
                table: "jobs");

            migrationBuilder.DropColumn(
                name: "CategoryModelId",
                table: "jobs");

            migrationBuilder.AlterColumn<string>(
                name: "UserModelId",
                table: "jobs",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateIndex(
                name: "IX_jobs_CategoryId",
                table: "jobs",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_jobs_AspNetUsers_UserModelId",
                table: "jobs",
                column: "UserModelId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_jobs_categories_CategoryId",
                table: "jobs",
                column: "CategoryId",
                principalTable: "categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
