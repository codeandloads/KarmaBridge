using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace app.Migrations
{
    /// <inheritdoc />
    public partial class ADD_NAV_PROP_SAVED_JOB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Saved_JobModelId",
                table: "Saved",
                column: "JobModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Saved_jobs_JobModelId",
                table: "Saved",
                column: "JobModelId",
                principalTable: "jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Saved_jobs_JobModelId",
                table: "Saved");

            migrationBuilder.DropIndex(
                name: "IX_Saved_JobModelId",
                table: "Saved");
        }
    }
}
