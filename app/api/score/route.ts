import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client/db";


export async function POST(req: NextRequest) {
	const body = await req.json();
	
	const leadScore = await prisma.leadScoring.findFirst({ where: { postalCode: body.postalCode } });

	return NextResponse.json({ state: leadScore });
}