import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// POST — save a new inscription after successful tx
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { wallet, memo, tag, freq, signature } = body;

        if (!wallet || !memo || !tag || !freq || !signature) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 400 }
            );
        }

        // Check for duplicate signature
        const existing = await prisma.inscription.findUnique({
            where: { signature },
        });
        if (existing) {
            return NextResponse.json(
                { error: "This inscription already exists." },
                { status: 409 }
            );
        }

        const inscription = await prisma.inscription.create({
            data: {
                wallet: String(wallet).slice(0, 64),
                memo: String(memo).slice(0, 600),
                tag: String(tag).slice(0, 20),
                freq: String(freq).slice(0, 20),
                signature: String(signature).slice(0, 128),
            },
        });

        return NextResponse.json({ inscription }, { status: 201 });
    } catch (err: unknown) {
        console.error("Inscription save error:", err);
        return NextResponse.json(
            { error: "Failed to save inscription." },
            { status: 500 }
        );
    }
}

// GET — fetch recent inscriptions
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const limit = Math.min(
            parseInt(searchParams.get("limit") || "20", 10),
            50
        );

        const inscriptions = await prisma.inscription.findMany({
            orderBy: { createdAt: "desc" },
            take: limit,
            select: {
                id: true,
                wallet: true,
                memo: true,
                tag: true,
                freq: true,
                signature: true,
                createdAt: true,
            },
        });

        return NextResponse.json({ inscriptions });
    } catch (err: unknown) {
        console.error("Inscription fetch error:", err);
        return NextResponse.json(
            { error: "Failed to fetch inscriptions." },
            { status: 500 }
        );
    }
}
