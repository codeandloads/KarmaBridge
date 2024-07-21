using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace app.Migrations
{
    /// <inheritdoc />
    public partial class modified_jobs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_jobs_categories_CategoryModelId",
                table: "jobs");

            migrationBuilder.DropIndex(
                name: "IX_jobs_CategoryModelId",
                table: "jobs");

            migrationBuilder.CreateTable(
                name: "CategoryModelJobModel",
                columns: table => new
                {
                    CategoriesId = table.Column<int>(type: "integer", nullable: false),
                    JobsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryModelJobModel", x => new { x.CategoriesId, x.JobsId });
                    table.ForeignKey(
                        name: "FK_CategoryModelJobModel_categories_CategoriesId",
                        column: x => x.CategoriesId,
                        principalTable: "categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryModelJobModel_jobs_JobsId",
                        column: x => x.JobsId,
                        principalTable: "jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryModelJobModel_JobsId",
                table: "CategoryModelJobModel",
                column: "JobsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryModelJobModel");

            migrationBuilder.CreateIndex(
                name: "IX_jobs_CategoryModelId",
                table: "jobs",
                column: "CategoryModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_jobs_categories_CategoryModelId",
                table: "jobs",
                column: "CategoryModelId",
                principalTable: "categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
