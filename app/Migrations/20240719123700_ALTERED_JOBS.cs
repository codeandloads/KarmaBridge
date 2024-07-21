using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace app.Migrations
{
    /// <inheritdoc />
    public partial class ALTERED_JOBS : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_jobs_categories_CategoryModelId",
                table: "jobs");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "jobs");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryModelId",
                table: "jobs",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_jobs_categories_CategoryModelId",
                table: "jobs",
                column: "CategoryModelId",
                principalTable: "categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_jobs_categories_CategoryModelId",
                table: "jobs");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryModelId",
                table: "jobs",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "jobs",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_jobs_categories_CategoryModelId",
                table: "jobs",
                column: "CategoryModelId",
                principalTable: "categories",
                principalColumn: "Id");
        }
    }
}
