import { NextResponse } from "next/server";

const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY || "";

export async function POST(request: Request) {
    const { email, message } = await request.json();

    if (!email || !message) {
        return NextResponse.json({ error: "Email and message are required" }, { status: 400 });
    }

    const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
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
}
