using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace app.Migrations
{
    /// <inheritdoc />
    public partial class ADDED_JOB_LOCATION_JOIN : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_jobs_locations_LocationId",
                table: "jobs");

            migrationBuilder.DropIndex(
                name: "IX_jobs_LocationId",
                table: "jobs");

            migrationBuilder.DropColumn(
                name: "LocationId",
                table: "jobs");

            migrationBuilder.CreateTable(
                name: "JobModelLocationModel",
                columns: table => new
                {
                    JobsId = table.Column<int>(type: "integer", nullable: false),
                    LocationsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobModelLocationModel", x => new { x.JobsId, x.LocationsId });
                    table.ForeignKey(
                        name: "FK_JobModelLocationModel_jobs_JobsId",
                        column: x => x.JobsId,
                        principalTable: "jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobModelLocationModel_locations_LocationsId",
                        column: x => x.LocationsId,
                        principalTable: "locations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobModelLocationModel_LocationsId",
                table: "JobModelLocationModel",
                column: "LocationsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobModelLocationModel");

            migrationBuilder.AddColumn<int>(
                name: "LocationId",
                table: "jobs",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_jobs_LocationId",
                table: "jobs",
                column: "LocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_jobs_locations_LocationId",
                table: "jobs",
                column: "LocationId",
                principalTable: "locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
