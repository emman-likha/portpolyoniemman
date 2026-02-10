import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email, message } = await request.json();

        if (!email || !message) {
            return NextResponse.json({ error: "Email and message are required" }, { status: 400 });
        }

        const key = process.env.WEB3FORMS_KEY;
        if (!key) {
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                access_key: key,
                email,
                message,
                from_name: "Portfolio Contact Form",
                subject: `New message from ${email}`,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to send message" }, { status: res.status });
        }

        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
