import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/shared"

export default function ContactPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
			<PageHeader title="Contact" />
			<div className="w-full py-8">
				<div className="max-w-2xl mx-auto px-4">
					<Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
						<CardContent className="p-6 space-y-4">
							<p>
								Have feedback or questions? We'd love to hear from you.
							</p>
							<p>
								Email: <a href="mailto:hello@example.com" className="underline">hello@example.com</a>
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
} 