import { NextResponse, NextRequest } from "next/server";
import stateGroupingJson from "../../../public/state-groups.json";

export async function GET(req: NextRequest) {
	return NextResponse.json({ state: "CA" });
}

export async function POST(req: NextRequest) {
	const body = await req.json();
	
	if( body.zip ) {
		const states = fetch(`https://api.zipcodestack.com/v1/search?codes=${body.zip}&country=us&apikey=01HQBHWAW6FATBCJXDH4H0N51P`, { cache: "no-cache" } );
		const state = await states;
		const stateData = await state.json();
		console.log(stateData);
		// sample stateData response
		// {"query":{"codes":["90210"],"country":"us"},"results":{"90210":[{"postal_code":"90210","country_code":"US","latitude":34.0901,"longitude":-118.4065,"city":"Beverly Hills","state":"California","city_en":"Beverly Hills","state_en":"California","state_code":"CA"}]}}

		if( stateData.results[body.zip] ) {
			// now search state in stateGroupingJson
			const groupings = stateGroupingJson;
			const stateGroup = groupings.find( (state: { state: string, stateGroup: string }) => state.state.toLowerCase() == stateData.results[body.zip][0].state.toLowerCase() );

			if( stateGroup !== undefined ) {
				return NextResponse.json({ state: stateData.results[body.zip][0].state, stateGroup: stateGroup.stateGroup });
			} else {
				return NextResponse.json({ state: stateData.results[body.zip][0].state, stateGroup: "Other" });
			
			}
		}
	}
	return NextResponse.json({ error: "No State Found" });
}
