import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../prisma/client/db";
import fs from "fs";
import path from "path";
import Papa from "papaparse";

export async function GET(req: NextRequest) {
	const leads = await prisma.leadScoring.findMany();

	console.log('leads', leads.length);

	leads.forEach(function(lead) {
		console.log( 'Postal Code: ' + lead.postalCode );
	});

	const filePath = path.resolve('./public', 'leads.csv');
	const fileContent = fs.readFileSync(filePath, 'utf8');

	let rowCount = 0;
	// await Papa.parse(fileContent, {
	// 	header: true,
	// 	complete: function(results) {

	// 		let data: any[] = [];
	// 		results.data.forEach(function(row: any) {

	// 			if( rowCount > 4999 ) {
					
	// 				data.push({
	// 					postalCode: row['Postal Code'],
	// 					medianHouseHoldIncome: row['Median_Household_Income'],
	// 					medianHouseHoldIncomeValue: row['Hubspot Value'],
	// 					medianAge: row['Median_Age'],
	// 					medianAgeValue: row['Hubspot Value_1'],
	// 					population: row['Population'],
	// 					populationValue: row['Hubspot Value_2'],
	// 					edHighSchool: row['Ed_High_School'],
	// 					edHighSchoolValue: row['Hubspot Value_3'],
	// 					edSomeCollege: row['Ed_SomeCollege'],
	// 					edSomeCollegeValue: row['Hubspot Value_4'],
	// 					edAssociates: row['Ed_Associates'],
	// 					edAssociatesValue: row['Hubspot Value_5'],
	// 					edHighSchoolOrHigher: row['Ed_High_School_or_Higher'],
	// 					edHighSchoolOrHigherValue: row['Hubspot Value_6'],
	// 					edBachelorsOrHigher: row['Ed_Bachelors_or_Higher'],
	// 					edBachelorsOrHigherValue: row['Hubspot Value_7'],
	// 					laborParticipation: row['Labor_Participation'],
	// 					laborParticipationValue: row['Hubspot Value_8'],
	// 					createdAt: new Date(),
	// 					updatedAt: new Date()
	// 				})
	// 			}

	// 			rowCount++;

	// 		});

	// 		console.log( data );
	// 		prisma.leadScoring.createMany({
	// 			data: data,
	// 			}).catch((error) => {
	// 				console.log('error', error);
	// 			});
	// 	}
	// });

	return NextResponse.json({ state: "CA" });
}